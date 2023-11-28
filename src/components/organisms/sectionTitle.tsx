import { MainText } from '@components/atoms/mainText'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { colors, fontSize, spacingPx } from '@constants/theme'
import { ReactNode } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

interface Props {
  title: string
  leftChild?: ReactNode
  fontType?: 'regular' | 'medium' | 'bold' | 'bold-italic'
  fontSize?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export const SectionTitle = ({
  title,
  leftChild,
  fontType,
  fontSize,
}: Props) => {
  return (
    <HeaderTitle>
      <MainText
        fontType={fontType ? fontType : 'medium'}
        fontSize={fontSize ? fontSize : 'l'}
      >
        {title}
      </MainText>

      {leftChild}
    </HeaderTitle>
  )
}

const HeaderTitle = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin: ${spacingPx.s} 0;
`
