import { View } from 'react-native'
import { HeaderLogo } from './atoms/headerLogo'
import { styled } from 'styled-components'
import { LeftChevron } from '../atoms/icons/leftChevron'
import { colors, spacing } from '@constants/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { LayoutSideColumns } from './layoutSideColumns'

interface Props {
  isLogo?: boolean
  isBackArrow?: boolean
  isSeperatorLine?: boolean
}

export const AppHeader = ({ isLogo, isBackArrow, isSeperatorLine }: Props) => {
  const navigation = useNavigation()
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <View
      style={{
        borderBottomColor: colors.Alizarin,
        borderBottomWidth: isSeperatorLine ? 0.3 : 0,
        paddingBottom: spacing.xs,
      }}
    >
      <LayoutSideColumns>
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
      </LayoutSideColumns>
    </View>
  )
}

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`
