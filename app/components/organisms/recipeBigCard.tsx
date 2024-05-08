import { FC } from 'react'
import { View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

import { boxShadow, colors, spacing, spacingPx } from '~constants/theme'
import { Text } from '~components/atoms/text'

type RecipeBigCardProps = {
  title: string
  kcal: number
  recipe: string
  index: number
}

export const RecipeBigCard: FC<RecipeBigCardProps> = () => {
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
            source={require('~assets/recipeImages/exempleOfRecipe.png')}
            resizeMode="cover"
          />
          <ImageOverlay />
          <TitleAndKcal>
            <Text fontFamily="Avenir-Bold" fontSize="m" color="light.PureWhite">
              Grilled Chicken and Vegetable Salad
            </Text>
            <Text fontFamily="Avenir-Bold" fontSize="m" color="Alizarin">
              240Kcal
            </Text>
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
            <Text mb={spacing.xs} fontFamily="Avenir-Bold-Italic" fontSize="m">
              {t('ingredient')}
            </Text>
            {ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>
                <BulletPoint>•</BulletPoint>
                <Text fontSize="m">{ingredient}</Text>
              </IngredientItem>
            ))}
            <Text mb={spacing.xs} fontFamily="Avenir-Bold-Italic" fontSize="m">
              {t('instructions')}
            </Text>
            {instructions.map((instruction, index) => (
              <InstructionItem key={index}>
                <Text fontSize="m" mb={spacing.xs}>
                  {(index + 1).toString()}
                </Text>
                <Text fontSize="m">{instruction}</Text>
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
