import { MainText } from '@components/atoms/mainText'
import { boxShadow, colors, spacingPx } from '@constants/theme'
import { Image, ImageSourcePropType } from 'react-native'
import { View } from 'react-native'
import styled from 'styled-components'

interface Props {
  title: string
  kcal: number
  imagePath: ImageSourcePropType
}

export const MealSmallCard = ({ title, kcal, imagePath }: Props) => {
  return (
    <MealSmallCardStyled>
      <DishImage source={imagePath} resizeMode="cover" />
      <TitleAndKcal>
        <MainText
          fontType="bold"
          fontSize="m"
          color={colors.darker.DarkestBlack}
        >
          {title}
        </MainText>
        <MainText fontType="bold" fontSize="m" color={colors.Alizarin}>
          {kcal}Kcal
        </MainText>
      </TitleAndKcal>
    </MealSmallCardStyled>
  )
}

const MealSmallCardStyled = styled(View)`
  justify-content: space-between;
  width: 95%;
  min-height: 170px;
  background-color: ${colors.light.PureWhite};
  border-radius: ${spacingPx.xs};
  margin: ${spacingPx.xs};
`

const TitleAndKcal = styled(View)`
  padding: ${spacingPx.xs};
`

const DishImage = styled(Image)`
  width: 100%;
  height: 100px;
  border-radius: ${spacingPx.xs} ${spacingPx.xs} 0 0;
`
