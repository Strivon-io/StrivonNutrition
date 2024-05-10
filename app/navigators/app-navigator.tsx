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
import { useAuth } from '~contexts/authContext'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '~services/routes/user'
import { ProfileProvider } from '~contexts/profileContext'

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
      <Stack.Screen name="bottomTab">
        {() => (
          <ProfileProvider>
            <BottomTabNavigator />
          </ProfileProvider>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const [initialRoute, setInitialRoute] = useState<keyof NavigatorParamList>(
    'signIn',
  )

  const { accessToken, isLoading: authIsLoading } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const { refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: false,
    enabled: false,
  })

  const handleGetProfile = async () => {
    const { data } = await refetch()
    console.log('fooo->', data)
    if (!data) {
      return 'signIn'
    } else {
      return 'bottomTab'
    }
  }

  useEffect(() => {
    console.log('test, ', accessToken, authIsLoading)
    if (authIsLoading) return
    ;(async () => {
      if (accessToken) {
        try {
          const route = await handleGetProfile()

          setInitialRoute(route)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    })()
  }, [accessToken, authIsLoading])

  if (isLoading) return null

  return (
    <NavigationContainer theme={DefaultTheme} {...props}>
      <AppStack initialRouteName={initialRoute} />
    </NavigationContainer>
  )
}

AppNavigator.displayName = 'AppNavigator'
