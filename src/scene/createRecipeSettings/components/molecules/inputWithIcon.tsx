import { colors, iconSize, spacingPx } from '@constants/theme'
import { CrossIcon } from '@navigation/icons/crossIcon'
import { TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import styled from 'styled-components'

interface Props {
  ingredient: string
  index: number
  handleIngredientChange: (text: string, index: number) => void
  removeIngredient: (index: number) => void
}

export const InputWithIcon = ({
  ingredient,
  index,
  handleIngredientChange,
  removeIngredient,
}: Props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <StyledInput
        key={index.toString()}
        value={ingredient}
        onChangeText={(e) => handleIngredientChange(e, index)}
      />
      <IconInputWrapper onPress={() => removeIngredient(index)}>
        <CrossIcon size={iconSize.m} color={colors.Alizarin} />
      </IconInputWrapper>
    </View>
  )
}

const StyledInput = styled(TextInput)<{ textColor: string; fontType: string }>`
  padding-left: ${spacingPx.s};
  height: 40px;
  background-color: ${colors.light.AliceBlue};
  border-radius: ${spacingPx.xs} 0 0 ${spacingPx.xs};
  font-family: ${(props) =>
    props.fontType
      ? `AvenirNext-${
          props.fontType.substring(0, 1).toUpperCase() +
          props.fontType.substring(1)
        }`
      : 'AvenirNext-Medium'};
  color: ${(props) =>
    props.textColor ? props.textColor : colors.darker.DarkestBlack};
`

const IconInputWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.light.AliceBlue};
  height: 40px;
  padding: ${spacingPx.xs};
  margin: ${spacingPx.xs} 0;
  border-radius: 0 ${spacingPx.xs} ${spacingPx.xs} 0;
`
