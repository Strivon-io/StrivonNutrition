import styled from 'styled-components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Image, ImageSourcePropType, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ParamListBase } from '@react-navigation/native'

import { Text } from '~components/atoms/text'
import Tag from '~components/atoms/tag'
import { colors, spacingPx } from '~constants/theme'

interface Props<NavigationType = NativeStackNavigationProp<ParamListBase>> {
  title: string
  kcal: number
  imagePath: ImageSourcePropType
  tags: ('breakfast' | 'meal' | 'snack')[]
  recipeUuid: string
  navigation: NavigationType
}

export const MealSmallCard = ({
  title,
  kcal,
  imagePath,
  tags,
  recipeUuid,
  navigation,
}: Props) => {
  const navigateToRecipe = (recipeUuid: string) => {
    navigation.navigate('recipe', { recipeUuid })
  }

  return (
    <MealSmallCardStyled onPress={() => navigateToRecipe(recipeUuid)}>
      <DishImage source={imagePath} resizeMode="cover" />
      <TitleAndKcal>
        <Text
          fontFamily="Avenir-Medium"
          fontSize="m"
          color="darker.DarkestBlack"
        >
          {title}
        </Text>

        <Text fontFamily="Avenir-Bold" fontSize="m" color="Alizarin">
          <>{kcal}Kcal</>
        </Text>
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
  width: 100%;
  min-height: 170px;
  background-color: ${colors.light.PureWhite};
  border-radius: ${spacingPx.xs};
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
