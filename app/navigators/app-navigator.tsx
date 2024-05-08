import { useState, useEffect } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen'

import { SigninScreen } from '~screens/signin'
import { SignupScreen } from '~screens/signup'
import { NeedsResultScreen } from '~screens/needsResult'
import { RecipesResultScreen } from '~screens/recipesResult'

import { BottomTabNavigator } from './bottom-tab-navigator'
import { NeedsResultExplanationScreen } from '~screens/needsResultExplanation'

export type NavigatorParamList = {
  signIn: undefined
  signUp: undefined
  needsResult: undefined
  recipesResult: undefined
  needsResultExplanation: undefined
  bottomTab: undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = ({
  initialRouteName,
}: {
  initialRouteName: keyof NavigatorParamList
}) => {
  console.log('Initial route: ', initialRouteName)

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync()
  }

  useEffect(() => {
    hideSplashScreen()
  }, [])

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="signIn" component={SigninScreen} />
      <Stack.Screen name="signUp" component={SignupScreen} />
      <Stack.Screen name="needsResult" component={NeedsResultScreen} />
      <Stack.Screen
        name="needsResultExplanation"
        component={NeedsResultExplanationScreen}
      />
      <Stack.Screen name="recipesResult" component={RecipesResultScreen} />
      <Stack.Screen name="bottomTab" component={BottomTabNavigator} />
    </Stack.Navigator>
  )
}

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const [initialRoute, setInitialRoute] = useState<keyof NavigatorParamList>(
    'signIn',
  )

  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) return null

  return (
    <NavigationContainer theme={DefaultTheme} {...props}>
      <AppStack initialRouteName={initialRoute} />
    </NavigationContainer>
  )
}

AppNavigator.displayName = 'AppNavigator'
