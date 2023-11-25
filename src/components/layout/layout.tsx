import { SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components/native'
import { spacingPx } from '@constants/theme'
import { AppHeader } from './header'

interface Props {
  useSafeAreaView?: boolean
  isHeaderLogo?: boolean
  isBackArrow?: boolean
  children: React.ReactNode
  isSeperatorLine?: boolean
}

export const AppLayout = ({
  useSafeAreaView,
  isHeaderLogo,
  isBackArrow,
  children,
  isSeperatorLine,
}: Props) => {
  return (
    <LayoutStyled>
      {useSafeAreaView && <SafeAreaView />}
      {isHeaderLogo && (
        <AppHeader
          isSeperatorLine={isSeperatorLine}
          isLogo={isHeaderLogo}
          isBackArrow={isBackArrow}
        />
      )}
      {children}
    </LayoutStyled>
  )
}

const LayoutStyled = styled(View)`
  height: 100%;
`
