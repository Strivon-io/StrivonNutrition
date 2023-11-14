import { MainText } from '@components/atoms/mainText'
import { AppLayout } from '@components/layout/layout'
import { MainButton } from '@components/molecules/mainButton'
import { RecipeBigCard } from '@components/organisms/recipeBigCard'
import { boxShadow, colors, spacing, spacingPx } from '@constants/theme'
import { isSmallScreen } from '@utils/deviceDetector'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import { View, Image, Text, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

export const RecipesResultScreen = () => {
  const { t } = useTranslation()
  const handleGoToApp = () => {}

  const recipesData = [
    { title: 'test1', kcal: 564, recipe: {} },
    { title: 'test2', kcal: 564, recipe: {} },
    { title: 'test3', kcal: 564, recipe: {} },
  ]

  const { width: viewportWidth } = Dimensions.get('window')

  const renderRecipeCard = ({ item, index }) => {
    return (
      <RecipeBigCard title={item.title} kcal={item.kcal} recipe={item.recipe} />
    )
  }

  return (
    <AppLayout useSafeAreaView isHeaderLogo>
      <MainText
        fontType="bold"
        fontSize="l"
        style={{
          alignSelf: 'center',
          marginTop: spacing.xs,
          marginBottom: spacing.m,
        }}
      >
        {t('yourFirst3Recipes')}
      </MainText>
      <View style={{ height: '60%' }}>
        <Carousel
          data={recipesData}
          renderItem={renderRecipeCard}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth - 100}
        />
      </View>
      <ButtonWrapper>
        <MainButton label={t('viewMyFirstRecipes')} onPress={handleGoToApp} />
      </ButtonWrapper>
    </AppLayout>
  )
}

const ButtonWrapper = styled(View)`
  position: absolute;
  align-self: center;
  width: 90%;
  padding-top: ${spacingPx.m};
  bottom: ${isSmallScreen ? spacingPx.m : spacingPx.l};
  background-color: ${colors.light.PureWhite};
`
