import { spacingPx } from '@constants/theme'
import { View } from 'react-native'
import { styled } from 'styled-components'

interface LayoutStyledProps {
  isSideSafeColumns: boolean
}

export const LayoutSideColumns = styled(View)<LayoutStyledProps>`
  margin: 0 ${spacingPx.m};
`
