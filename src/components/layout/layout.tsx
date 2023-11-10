import { SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components'
import { spacingPx } from '@constants/theme'
import { AppHeader } from './header'

interface props {
  useSafeAreaView: boolean
  isHeaderLogo?: boolean
  isBackArrow?: boolean
  children: any
}

export const AppLayout = ({
  useSafeAreaView,
  isHeaderLogo,
  isBackArrow,
  children,
}: props) => {
  return (
    <LayoutStyled>
      {useSafeAreaView && <SafeAreaView />}
      {isHeaderLogo && (
        <AppHeader isLogo={isHeaderLogo} isBackArrow={isBackArrow} />
      )}
      {children}
    </LayoutStyled>
  )
}

const LayoutStyled = styled(View)`
  height: 100%;
  margin: 0 ${spacingPx.m};
`
