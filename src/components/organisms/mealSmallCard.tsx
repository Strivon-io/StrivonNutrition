import { MainText } from '@components/atoms/mainText'
import Tag from '@components/atoms/tag'
import { boxShadow, colors, spacingPx } from '@constants/theme'
import { useNavigation } from '@react-navigation/native'
import { Image, ImageSourcePropType, Touchable } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'

interface Props {
  title: string
  kcal: number
  imagePath: ImageSourcePropType
  tags: ('breakfast' | 'meal' | 'snack')[]
  recipeUuid: string
}

export const MealSmallCard = ({
  title,
  kcal,
  imagePath,
  tags,
  recipeUuid,
}: Props) => {
  const navigation = useNavigation()

  const navigateToRecette = (recipeUuid: string) => {
    navigation.navigate('RecipeScreen', { recipeUuid })
  }

  return (
    <MealSmallCardStyled onPress={() => navigateToRecette(recipeUuid)}>
      <DishImage source={imagePath} resizeMode="cover" />
      <TitleAndKcal>
        <MainText
          fontType="medium"
          fontSize="m"
          color={colors.darker.DarkestBlack}
        >
          {title}
        </MainText>

        <MainText fontType="bold" fontSize="m" color={colors.Alizarin}>
          {kcal}Kcal
        </MainText>
        <TagList>
          {tags.map((tag, index) => (
            <Tag key={index.toString()} label={tag} />
          ))}
        </TagList>
      </TitleAndKcal>
    </MealSmallCardStyled>
  )
}

const TagList = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: 4px;
  row-gap: 4px;
`

const MealSmallCardStyled = styled(TouchableOpacity)`
  justify-content: space-between;
  width: 95%;
  min-height: 170px;
  background-color: ${colors.light.PureWhite};
  border-radius: ${spacingPx.xs};
  margin: ${spacingPx.xs};
`

const TitleAndKcal = styled(View)`
  padding: ${spacingPx.xs};
  row-gap: ${spacingPx.xs};
`

const DishImage = styled(Image)`
  width: 100%;
  height: 100px;
  border-radius: ${spacingPx.xs} ${spacingPx.xs} 0 0;
`
