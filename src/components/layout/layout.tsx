import { SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components/native'
import { spacingPx } from '@constants/theme'
import { AppHeader } from './header'

interface Props {
  useSafeAreaView?: boolean
  isSideSafeColumns?: boolean
  isHeaderLogo?: boolean
  isBackArrow?: boolean
  children: React.ReactNode
}

interface LayoutStyledProps {
  isSideSafeColumns: boolean
}

export const AppLayout = ({
  useSafeAreaView,
  isSideSafeColumns,
  isHeaderLogo,
  isBackArrow,
  children,
}: Props) => {
  return (
    <LayoutStyled isSideSafeColumns={isSideSafeColumns}>
      {useSafeAreaView && <SafeAreaView />}
      {isHeaderLogo && (
        <AppHeader isLogo={isHeaderLogo} isBackArrow={isBackArrow} />
      )}
      {children}
    </LayoutStyled>
  )
}

const LayoutStyled = styled(View)<LayoutStyledProps>`
  height: 100%;
  margin: 0 ${(props) => (props.isSideSafeColumns ? spacingPx.m : 0)};
`
