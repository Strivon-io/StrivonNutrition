import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";

import { HomeScreen } from "~screens/home";
import { ScheduleScreen } from "~screens/schedule";
import { ProfileScreen } from "~screens/profile";
import { HomeIcon } from "../assets/icons/homeIcon";
import { RecipeIcon } from "../assets/icons/recipeIcon";
import { ScheduleIcon } from "../assets/icons/scheduleIcon";
import { ProfileIcon } from "../assets/icons/profileIcon";
import { colors, iconSize } from "~constants/theme";

import { RecipesNavigator } from "./recipes-navigator";
import { routeWithoutTabBar } from "./navigator-utils";

export type BottomTabParamList = {
  home: undefined;
  recipesNavigator: undefined;
  schedule: undefined;
  profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<Record<string, object | undefined>, string>;

const getTabBarVisibility = (route: Route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  const notHidding = routeWithoutTabBar.indexOf(routeName || "") <= -1;
  return notHidding ? "flex" : "none";
};

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      sceneContainerStyle={{ backgroundColor: colors.light.WhiteSmoke }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.Alizarin,
        tabBarIconStyle: { fontFamily: "AvenirNext-Medium" },
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              size={iconSize.m}
              color={
                focused ? colors.medium.StormyCloud : colors.medium.LinkWater
              }
              secondColor={focused ? colors.Alizarin : colors.medium.LinkWater}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="recipesNavigator"
        component={RecipesNavigator}
        options={({ route }) => ({
          tabBarLabel: "Recipes",
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ focused }) => (
            <RecipeIcon
              size={iconSize.m}
              color={
                focused ? colors.medium.StormyCloud : colors.medium.LinkWater
              }
              secondColor={focused ? colors.Alizarin : colors.medium.LinkWater}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="schedule"
        component={ScheduleScreen}
        options={({ route }) => ({
          tabBarLabel: "Schedule",
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ focused }) => (
            <ScheduleIcon
              size={iconSize.m}
              color={
                focused ? colors.medium.StormyCloud : colors.medium.LinkWater
              }
              secondColor={focused ? colors.Alizarin : colors.medium.LinkWater}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarLabel: "Profile",
          tabBarStyle: {
            display: getTabBarVisibility(route),
          },
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              size={iconSize.m}
              color={
                focused ? colors.medium.StormyCloud : colors.medium.LinkWater
              }
              secondColor={focused ? colors.Alizarin : colors.medium.LinkWater}
            />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
};
