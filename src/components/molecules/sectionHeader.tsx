import { styled } from 'styled-components'
import { MainText } from '../atoms/mainText'
import { View } from 'react-native'
import { ReactNode } from 'react'

interface Props {
  title: string
  sideElement?: ReactNode
}

export const SectionHeader = ({ title, sideElement }: Props) => {
  return (
    <SectionHeaderStyled>
      <MainText fontSize="xl" fontType="bold-italic">
        {title}
      </MainText>
      {sideElement}
    </SectionHeaderStyled>
  )
}

const SectionHeaderStyled = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
