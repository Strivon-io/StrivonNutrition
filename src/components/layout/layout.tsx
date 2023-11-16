import { SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components/native'
import { spacingPx } from '@constants/theme'
import { AppHeader } from './header'

interface Props {
  useSafeAreaView?: boolean
  isHeaderLogo?: boolean
  isBackArrow?: boolean
  children: React.ReactNode
}

export const AppLayout = ({
  useSafeAreaView,
  isHeaderLogo,
  isBackArrow,
  children,
}: Props) => {
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
`
