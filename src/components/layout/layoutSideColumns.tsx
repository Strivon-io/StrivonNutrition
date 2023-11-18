import { spacingPx } from '@constants/theme'
import { View } from 'react-native'
import { styled } from 'styled-components'

export const LayoutSideColumns = styled(View)<{ flex: number }>`
  margin: 0 ${spacingPx.m};
`
