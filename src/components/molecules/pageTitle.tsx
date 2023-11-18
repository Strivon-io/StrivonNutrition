import { MainText } from '@components/atoms/mainText'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { ReactNode } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

export const PageTitle = ({
  title,
  leftChild,
}: {
  title: string
  leftChild?: ReactNode
}) => {
  return (
    <View style={{ width: '100%' }}>
      <LayoutSideColumns>
        <PageTitleWrapper>
          <MainText fontType="bold-italic" fontSize="xxl">
            {title}
          </MainText>
          {leftChild && leftChild}
        </PageTitleWrapper>
      </LayoutSideColumns>
    </View>
  )
}

const PageTitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
