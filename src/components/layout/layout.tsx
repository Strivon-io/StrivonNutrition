import { SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components'
import { spacing, spacingPx } from '../../constants/theme'
import { HeaderLogo } from './headerLogo'

interface props {
  useSafeAreaView: boolean
  isHeaderLogo?: boolean
  children: any
}

export const AppLayout = ({
  useSafeAreaView,
  isHeaderLogo,
  children,
}: props) => {
  return (
    <LayoutStyled>
      {useSafeAreaView && <SafeAreaView />}
      {isHeaderLogo && <HeaderLogo />}
      {children}
    </LayoutStyled>
  )
}

const LayoutStyled = styled(View)`
  margin: 0 ${spacingPx.m};
`
