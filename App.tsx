import { useEffect, useState, useRef } from 'react'
import { AppState, Platform } from 'react-native'
import { useFonts } from 'expo-font'
import Constants from 'expo-constants'
import * as SplashScreen from 'expo-splash-screen'
import { enableScreens } from 'react-native-screens'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import '~translations/i18n.config'

import { AppNavigator } from '~navigators/app-navigator'
import { AuthProvider } from '~contexts/authContext'
import i18n from '~translations/i18n.config'
import { SettingsProvider } from '~contexts/settingsContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false)
  const queryClient = new QueryClient()

  const appState = useRef(AppState.currentState)

  let [fontsLoaded] = useFonts({
    'Avenir-Regular': require('./assets/fonts/Avenir-Next-Regular.otf'),
    'Avenir-Medium': require('./assets/fonts/Avenir-Next-Medium.ttf'),
    'Avenir-Bold': require('./assets/fonts/Avenir-Next-Bold.otf'),
    'Avenir-Bold-Italic': require('./assets/fonts/Avenir-Next-Bold-Italic.ttf'),
  })

  useEffect(() => {
    if (Platform.OS === 'ios') {
      enableScreens(false)
    }

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState
    })

    ;(async () => {
      console.log(`App version ${Constants.expoConfig.version} is mounted.`)

      setIsAppReady(true)
    })()

    return () => {
      subscription.remove()
    }
  }, [])

  if (!isAppReady || !fontsLoaded || !i18n.isInitialized) {
    return
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SettingsProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </SettingsProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
