import { styled } from 'styled-components'
import { MainText } from '../atoms/mainText'
import { View } from 'react-native'
import { ReactNode } from 'react'
import { LeftArrow } from '@components/atoms/icons/leftArrow'
import { colors, iconSize, spacing } from '@constants/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LeftChevron } from '@components/atoms/icons/leftChevron'

interface Props {
  title: string
  sideElement?: ReactNode
  isBackArrow?: boolean
  handleBackArrow?: () => void
}

export const SectionHeader = ({
  title,
  sideElement,
  isBackArrow,
  handleBackArrow,
}: Props) => {
  return (
    <SectionHeaderStyled>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isBackArrow && (
          <TouchableOpacity onPress={handleBackArrow}>
            <LeftChevron size={iconSize.m} color={colors.darker.DarkestBlack} />
          </TouchableOpacity>
        )}
        <MainText
          style={{ marginLeft: isBackArrow ? spacing.s : 0 }}
          fontSize="xl"
          fontType="bold-italic"
        >
          {title}
        </MainText>
      </View>
      {sideElement}
    </SectionHeaderStyled>
  )
}

const SectionHeaderStyled = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
