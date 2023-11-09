import { View, Text } from 'react-native'
import { AppLayout } from '../../components/layout/layout'
import { styled } from 'styled-components'
import { MainText } from '../../components/atoms/mainText'

export const SignupScreen = () => {
  return (
    <AppLayout useSafeAreaView isHeaderLogo>
      <SectionHeader>
        <MainText>test</MainText>
      </SectionHeader>
    </AppLayout>
  )
}

const SectionHeader = styled(View)``
