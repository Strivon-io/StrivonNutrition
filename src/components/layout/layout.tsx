import { SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components'
import { spacing, spacingPx } from '../../constants/theme'
import { HeaderLogo } from './headerLogo'

interface props {
  useSafeAreaView: boolean
  children: any
}

export const AppLayout = ({ useSafeAreaView, children }: props) => {
  return (
    <LayoutStyled>
      {useSafeAreaView ? <SafeAreaView /> : <></>}
      <HeaderLogo />
      {children}
    </LayoutStyled>
  )
}

const LayoutStyled = styled(View)`
  margin: 0 ${spacingPx.m};
`
