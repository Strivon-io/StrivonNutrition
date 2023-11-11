import { View } from 'react-native'
import { HeaderLogo } from './atoms/headerLogo'
import { styled } from 'styled-components'
import { LeftChevron } from '../atoms/icons/leftChevron'
import { colors } from '@constants/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface Props {
  isLogo?: boolean
  isBackArrow?: boolean
}

export const AppHeader = ({ isLogo, isBackArrow }: Props) => {
  const navigation = useNavigation()
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <Wrapper>
      {isBackArrow && (
        <View style={{ position: 'absolute', left: 0 }}>
          <TouchableOpacity onPress={handleBackPress}>
            <LeftChevron color={colors.Alizarin} />
          </TouchableOpacity>
        </View>
      )}
      {isLogo && <HeaderLogo />}
    </Wrapper>
  )
}

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`
