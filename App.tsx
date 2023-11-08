import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import './src/translations/i18n.config'
import { MainNavigation } from './src/navigation'
import * as Font from 'expo-font'

const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  background-color: white;
`

const Title = styled.Text`
  font-size: 24px;
  color: #333;
`

const MainContainer = styled.View`
  background-color: 'white';
`

const loadCustomFonts = async () => {
  await Font.loadAsync({
    'avenir-regular': require('./src/assets/fonts/Avenir-Next-Regular.otf'),
    'avenir-medium': require('./src/assets/fonts/Avenir-Next-Medium.ttf'),
    'avenir-bold': require('./src/assets/fonts/Avenir-Next-Bold.otf'),
    'avenir-bold-italic': require('./src/assets/fonts/Avenir-Next-Bold-Italic.ttf'),
  })
}

export default function App() {
  const { t } = useTranslation()
  return <MainNavigation />
}
