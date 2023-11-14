import { AppLayout } from '@components/layout/layout'
import { View, Text, Image } from 'react-native'
import { styled } from 'styled-components'

export const HomeScreen = () => {
  return (
    <AppLayout isSideSafeColumns useSafeAreaView>
      <StrivonLogo
        source={require('@assets/brand/Strivon.png')}
        resizeMode="contain"
      />
    </AppLayout>
  )
}

const StrivonLogo = styled(Image)`
  width: 100px;
`
