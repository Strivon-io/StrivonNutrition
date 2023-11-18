import { MainText } from '@components/atoms/mainText'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { colors, spacingPx } from '@constants/theme'
import { ReactNode } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

interface Props {
  title: string
  leftChild?: ReactNode
}

export const SectionTitle = ({ title, leftChild }: Props) => {
  return (
    <LayoutSideColumns>
      <HeaderTitle>
        <MainText fontType="medium" fontSize="l">
          {title}
        </MainText>
        {leftChild}
      </HeaderTitle>
    </LayoutSideColumns>
  )
}

const HeaderTitle = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin: ${spacingPx.m} 0;
`
