import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import styled, { ThemeProvider } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import './src/translations/i18n.config'
import { MainNavigation } from './src/navigation'
import * as Font from 'expo-font'
import { ActionTray, ActionTrayRef } from '@components/molecules/BottomSheet'
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

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

const App = () => {
  return <MainNavigation />
}

export default App
