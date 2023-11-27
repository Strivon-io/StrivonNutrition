import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { styled } from 'styled-components'
import { MainText } from '@components/atoms/mainText'
import { colors, spacing, spacingPx } from '@constants/theme'
import { MealCarouselCard } from '@components/organisms/mealCarouselCard'
import { Carousel } from 'react-native-snap-carousel'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@components/organisms/sectionTitle'

export const DailyMealsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = useRef(null)
  const mealsData = [
    { title: 'test1', kcal: 564, recipe: {} },
    { title: 'test2', kcal: 564, recipe: {} },
    { title: 'test3', kcal: 564, recipe: {} },
    { title: 'test4', kcal: 564, recipe: {} },
  ]

  const { t } = useTranslation()

  const renderRecipeCard = () => {
    return (
      <MealCarouselCard
      // title={item.title}
      // kcal={item.kcal}
      // recipe={item.recipe}
      // index={index}
      />
    )
  }

  const { width: viewportWidth } = Dimensions.get('window')

  const onPressNext = () => {
    if (carouselRef) {
      carouselRef?.current?.snapToItem(activeSlide + 1, true)
    }
  }

  const onPressPrevious = () => {
    if (carouselRef) {
      carouselRef?.current?.snapToItem(activeSlide - 1, true)
    }
  }

  const mealLabels = [t('morning'), t('lunch'), t('dinner'), t('snack')]

  return (
    <View style={{ marginBottom: spacing.m }}>
      <LayoutSideColumns>
        <SectionTitle
          title={t('yourDailyMeals')}
          leftChild={
            <MainText color={colors.Alizarin} fontType="bold" fontSize="m">
              1459Kcal
            </MainText>
          }
        />
      </LayoutSideColumns>
      <MealLabels activeSlide={activeSlide} mealLabels={mealLabels} />
      <Carousel
        data={mealsData}
        renderItem={renderRecipeCard}
        sliderWidth={viewportWidth}
        onScrollIndexChanged={(index) => setActiveSlide(index)}
        itemWidth={viewportWidth - spacing.l}
        ref={carouselRef}
        vertical={false}
        loopClonesPerSide={2}
        autoplayDelay={500}
        autoplayInterval={3000}
        autoplay
      />
    </View>
  )
}

const MealLabels = ({ activeSlide, mealLabels }) => {
  return (
    <LayoutSideColumns>
      <MealLabelsContainer>
        {mealLabels.map((label, index) => (
          <MainText
            fontType="bold-italic"
            color={
              activeSlide === index
                ? colors.Alizarin
                : colors.darker.DarkestBlack
            }
            key={index}
          >
            {label}
          </MainText>
        ))}
      </MealLabelsContainer>
    </LayoutSideColumns>
  )
}

const MealLabelsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${spacingPx.s};
`
