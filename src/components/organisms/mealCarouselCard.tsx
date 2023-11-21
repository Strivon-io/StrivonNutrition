import { View, Text, Image } from 'react-native'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { styled } from 'styled-components'
import { MainText } from '@components/atoms/mainText'
import { colors, spacing, spacingPx } from '@constants/theme'

export const MealCarouselCard = () => {
  return (
    <View style={{ height: 100 }}>
      <DishImage
        source={require('@assets/recipeImages/exempleOfRecipe.png')}
        resizeMode="cover"
      />
      <ImageOverlay />
      <TitleAndKcal>
        <MainText fontType="bold" fontSize="m" color={colors.light.PureWhite}>
          Grilled Chicken and Vegetable Salad
        </MainText>
        <MainText fontType="bold" fontSize="m" color={colors.Alizarin}>
          240Kcal
        </MainText>
      </TitleAndKcal>
    </View>
  )
}

const TitleAndKcal = styled(View)`
  position: absolute;
  bottom: ${spacingPx.s};
  margin-left: ${spacingPx.s};
`

const DishImage = styled(Image)`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: ${spacingPx.s};
`

const ImageOverlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${spacingPx.s};
`
