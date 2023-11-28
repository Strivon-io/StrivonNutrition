import { MainText } from '@components/atoms/mainText'
import {
  boxShadow,
  colors,
  iconSize,
  spacing,
  spacingPx,
} from '@constants/theme'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { RecipeTitleAndInformations } from './components/organisms/recipeTitleAndInformations'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { MainButton } from '@components/molecules/mainButton'
import { isSmallScreen } from '@utils/deviceDetector'
import { LeftArrow } from '@components/atoms/icons/leftArrow'
import { CrossIcon } from '@navigation/icons/crossIcon'
import MarkdownText from '@utils/markdownText'
import Markdown from 'react-native-markdown-display'
import { useNavigation } from '@react-navigation/native'
import { BottomFixedButton } from '@components/organisms/bottomFixedButton'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

export const RecipeScreen = ({ route }) => {
  const { t } = useTranslation()

  const markdownContent = `
  ## **Ingrédients**
  
  - Blancs de poulet cuits et tranchés
  - Laitue romaine hachée
  - Tomates cerises, coupées en deux
  - Concombre, tranché finement
  - Carottes râpées
  - Poivrons rouges, coupés en lanières
  - Maïs doux
  - Avocat, tranché
  - Oignons rouges, tranchés finement
  - Olives noires dénoyautées
  - Quelques feuilles de basilic frais
  
  ## **Vinaigrette**
  
  - Huile d'olive extra vierge
  - Vinaigre balsamique
  - Moutarde de Dijon
  - Miel
  - Sel et poivre
  
  ## **Instructions**
  
  1. **Préparez la vinaigrette :** Dans un petit bol, mélangez l'huile d'olive, le vinaigre balsamique, la moutarde de Dijon, le miel, le sel et le poivre. Fouettez jusqu'à obtenir une consistance homogène.
  
  2. **Assemblez la salade :** Dans un grand saladier, combinez la laitue romaine, les tomates cerises, le concombre, les carottes, les poivrons, le maïs, l'avocat, les oignons rouges, et les olives noires.
  
  3. **Ajoutez le poulet :** Dispersez les tranches de poulet cuit sur la salade.
  
  4. **Assaisonnez :** Versez la vinaigrette sur la salade et mélangez délicatement pour bien enrober tous les ingrédients.
  
  5. **Servez :** Garnissez de feuilles de basilic frais avant de servir.
  
  Bon appétit !  
    `

  const navigation = useNavigation()
  const handleBackPress = () => {
    navigation.goBack()
  }

  const scrollA = useSharedValue(0)
  const BANNER_H = 150

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollA.value = event.contentOffset.y
  })

  const ImageSection = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollA.value,
            [-BANNER_H, 0, BANNER_H],
            [-BANNER_H / 2, 0, BANNER_H * 0.75],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }
  })

  return (
    <>
      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={10}>
        <Animated.View style={ImageSection}>
          <IconInputWrapper onPress={handleBackPress}>
            <CrossIcon size={iconSize.m} color={colors.Alizarin} />
          </IconInputWrapper>
          <DishImage
            source={require('@assets/recipeImages/exempleOfRecipe.png')}
            resizeMode="cover"
          />
          <Overlay />
        </Animated.View>
        <LayoutSideColumns style={{ marginBottom: spacing.l }}>
          <RecipeTitleAndInformations
            title={'Salade aux poulet et au multiple légumes'}
            informations={{
              protein: 12,
              carbohydrate: 12,
              calories: 12,
            }}
          />
          <IntrudctionWrapper>
            <Markdown style={markdownStyles}>{markdownContent}</Markdown>
          </IntrudctionWrapper>
        </LayoutSideColumns>
      </Animated.ScrollView>
      <BottomFixedButton label={t('programmeThisRecipe')} onPress={() => {}} />
    </>
  )
}

const IntrudctionWrapper = styled(View)`
  ${boxShadow}
  width: 100%;
  transform: translateY(-80px);
  margin-top: ${spacingPx.m};
  align-self: center;
  background-color: ${colors.light.PureWhite};
  border-radius: ${spacingPx.xs};
  padding: ${spacingPx.m};
`

const DishImage = styled(Image)`
  width: 100%;
  height: 300px;
`

const Overlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

const IconInputWrapper = styled(TouchableOpacity)`
  position: absolute;
  z-index: 1;
  top: ${parseInt(spacingPx.l, 10) + 10}px;
  right: ${spacingPx.m};
  border-radius: ${spacingPx.xl};
  border-width: 1px;
  border-color: ${colors.Alizarin};
`

const markdownStyles = {
  heading1: {
    marginBottom: spacing.xs,
    marginTop: spacing.m,
  },
  heading2: {
    marginBottom: spacing.xs,
    marginTop: spacing.s,
  },
  text: {
    lineHeight: 20,
  },
}
