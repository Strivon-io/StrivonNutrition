// Navigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../scene/home";
import { RecipesScreen } from "../scene/recipes";
import { ScheduleScreen } from "../scene/schedule";
import { ProfileScreen } from "../scene/profile";
import { SignupScreen } from "../scene/signup";
import { colors } from "../constants/theme";
import { NeedsResultScreen } from "@scene/needsResult";
import { RecipesResultScreen } from "@scene/recipesResult";
import { TabBar } from "../navigators/Tabbar";
import { SigninScreen } from "@scene/signin";
import { CreateRecipeSettingsScreen } from "@scene/createRecipeSettings";
import { RecipeScreen } from "@scene/recipe";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabbar = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      sceneContainerStyle={{ backgroundColor: colors.light.WhiteSmoke }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.Alizarin,
        tabBarIconStyle: { fontFamily: "AvenirNext-Medium" },
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
        name="Recipes"
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
  );
};

const NoTabStack = () => {
  return (
    <Stack.Group
      screenOptions={{
        headerShown: false,
        gestureResponseDistance: 250,
      }}
    >
      <Stack.Screen
        name="CreateRecipeSettingsScreen"
        key="CreateRecipeSettingsScreen"
        component={CreateRecipeSettingsScreen}
        options={{ cardStyle: { backgroundColor: colors.light.PureWhite } }}
      />
      <Stack.Screen
        name="RecipeScreen"
        key="RecipeScreen"
        options={{ cardStyle: { backgroundColor: colors.light.WhiteSmoke } }}
        component={RecipeScreen}
      />
    </Stack.Group>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={AppTabbar} />
      <Stack.Group screenOptions={{ headerShown: false }}>
        {NoTabStack()}
      </Stack.Group>
    </Stack.Navigator>
  );
};

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
  );
};

export const MainNavigation = () => {
  const isLoggedIn = true;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="App"
            component={AppStack}
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
  );
};
