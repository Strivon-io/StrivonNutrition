import React from 'react'
import { View, Image, Text, Platform } from 'react-native'
import styled from 'styled-components/native'
import { boxShadow, colors, spacing, spacingPx } from '@constants/theme'
import { MainText } from '@components/atoms/mainText'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { ScrollSafeZone } from '@utils/scrollSafeZone'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

export const RecipeBigCard = ({ title, kcal, recipe, index }) => {
  const { t } = useTranslation()

  // TODO : Better create fake services that return fake datas 
  const ingredients = [
    '100g de blanc de poulet grillé',
    '1 tomate moyenne, tranchée',
    '1/2 concombre, tranché',
    '1/2 poivron, tranché',
    '30g de fromage feta, émietté',
    '2 cuillères à soupe de vinaigrette légère',
    'Sel et poivre, au goût',
  ]

  const instructions = [
    'Préparez les légumes : lavez et coupez la tomate, le concombre et le poivron.',
    "Cuisinez le poulet : faites griller le blanc de poulet jusqu'à ce qu'il soit bien cuit, en assaisonnant avec du sel et du poivre. Laissez-le refroidir et coupez-le en lanières.",
    'Assemblez la salade : dans un bol, mélangez les légumes coupés et le poulet grillé.',
    'Ajoutez le fromage et la vinaigrette : saupoudrez le fromage feta sur la salade. Arrosez de vinaigrette légère.',
    'Servez : mélangez doucement la salade pour mélanger les ingrédients. Servez immédiatement.',
  ]

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  const imageStyle = useAnimatedStyle(() => {
    const minHeight = 80
    const Height = 140

    const newHeight = Math.max(minHeight, Height - scrollY.value)

    return {
      height: 140,
      maxHeight: newHeight,
    }
  })

  return (
    <CardWrapper style={boxShadow}>
      <View style={{ flex: 1 }}>
        <Animated.View style={[imageStyle]}>
          <DishImage
            source={require('@assets/recipeImages/exempleOfRecipe.png')}
            resizeMode="cover"
          />
          <ImageOverlay />
          <TitleAndKcal>
            <MainText
              fontType="bold"
              fontSize="m"
              color={colors.light.PureWhite}
            >
              Grilled Chicken and Vegetable Salad
            </MainText>
            <MainText fontType="bold" fontSize="m" color={colors.Alizarin}>
              240Kcal
            </MainText>
          </TitleAndKcal>
        </Animated.View>
        <Animated.ScrollView
          style={{
            flex: 1,
            paddingRight: spacing.l,
            paddingLeft: spacing.s,
            paddingTop: spacing.s,
          }}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <View style={{ marginBottom: spacing.l }}>
            <MainText
              style={{ marginBottom: spacing.xs }}
              fontType="bold-italic"
              fontSize="m"
            >
              {t('ingredient')}
            </MainText>
            {ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>
                <BulletPoint>•</BulletPoint>
                <MainText fontSize="m">{ingredient}</MainText>
              </IngredientItem>
            ))}
            <MainText
              style={{ marginBottom: spacing.xs }}
              fontType="bold-italic"
              fontSize="m"
            >
              {t('instructions')}
            </MainText>
            {instructions.map((instruction, index) => (
              <InstructionItem key={index}>
                <MainText fontSize="m" style={{ marginRight: spacing.xs }}>
                  {index + 1}
                </MainText>
                <MainText fontSize="m">{instruction}</MainText>
              </InstructionItem>
            ))}
          </View>
        </Animated.ScrollView>
      </View>
      <TextDisappearanceBlock
        style={{
          shadowColor: 'white',
          shadowOffset: {
            width: 0,
            height: -10,
          },
          shadowOpacity: 1,
          shadowRadius: 4,
        }}
      />
    </CardWrapper>
  )
}

const TextDisappearanceBlock = styled(View)`
  position: absolute;
  bottom: 0;
  height: 15px;
  width: 93%;
  background-color: white;
  align-self: center;
  padding: 0 ${spacingPx.m};
  opacity: 0.9;
`

const InstructionItem = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${spacingPx.xs};
`

const MainContent = styled(ScrollView)`
  padding: ${spacingPx.m};
`

const TitleAndKcal = styled(View)`
  position: absolute;
  bottom: ${spacingPx.s};
  margin-left: ${spacingPx.s};
`

const CardWrapper = styled(View)`
  background-color: ${colors.light.PureWhite};
  border-radius: ${spacingPx.s};
  height: 90%;
`

const DishImageWrapper = styled(View)`
  flex: 1;
  min-height: 140px;
  width: auto;
  border-radius: ${spacingPx.s} ${spacingPx.s} 0 0;
  position: relative;
`

const DishImage = styled(Image)`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: ${spacingPx.s} ${spacingPx.s} 0 0;
`

const ImageOverlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${spacingPx.s} ${spacingPx.s} 0 0;
`

const IngredientItem = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacingPx.xs};
`

const BulletPoint = styled(Text)`
  font-size: 16px;
  margin-right: ${spacingPx.xs};
`

const IngredientText = styled(Text)`
  font-size: 16px;
`
