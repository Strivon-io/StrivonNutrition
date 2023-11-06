import React from 'react'
import { View, Text } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { theme } from './src/constants/theme'
import { useTranslation } from 'react-i18next'
import './src/translations/i18n.config'
import { MainNavigation } from './src/navigation'

const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  background-color: white;
`

const Title = styled.Text`
  font-size: 24px;
  color: #333;
`

export default function App() {
  const { t } = useTranslation()
  return (
    <ThemeProvider theme={theme}>
      <MainNavigation />
    </ThemeProvider>
  )
}
