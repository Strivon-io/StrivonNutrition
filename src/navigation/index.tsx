// Navigation.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../scene/home'
import { RecipesScreen } from '../scene/recipes'
import { ScheduleScreen } from '../scene/schedule'
import { ProfileScreen } from '../scene/profile'
import { SignupScreen } from '../scene/signup'
import { SigninScreen } from '../scene/signin'
import { colors } from '../constants/theme'
import { NeedsResultScreen } from '@scene/needsResult'
import { View } from 'react-native'
import { RecipesResultScreen } from '@scene/recipesResult'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.Alizarin,
        tabBarIconStyle: { fontFamily: 'AvenirNext-Medium' },
        // cardStyle: { backgroundColor: colors.light.PureWhite },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

const UnauthenticatedApp = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: colors.light.PureWhite },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signin"
        component={SigninScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={SignupScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="NeedsResult"
        component={NeedsResultScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RecipesResult"
        component={RecipesResultScreen}
      />
    </Stack.Navigator>
  )
}

export const MainNavigation = () => {
  const isLoggedIn = false
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={UnauthenticatedApp}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
