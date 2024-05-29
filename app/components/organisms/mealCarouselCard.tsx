import { FC } from 'react'
import { View, Image } from 'react-native'
import { preview } from 'react-native-ide'
import { styled } from 'styled-components'

import { Text } from '~components/atoms/text'
import { spacingPx } from '~constants/theme'

export const MealCarouselCard: FC = () => {
  return (
    <View style={{ height: 100 }}>
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
