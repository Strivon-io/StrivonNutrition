import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "@scene/home";
import { ScheduleScreen } from "@scene/schedule";
import { ProfileScreen } from "@scene/profile";
import { colors } from "@constants/theme";

import { TabBar } from "./Tabbar";
import { RecipesNavigator } from "./recipes-navigator";

export type BottomTabParamList = {
  home: undefined;
  recipesNavigator: undefined;
  schedule: undefined;
  profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <TabBar {...props} />}
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
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="recipesNavigator"
        component={RecipesNavigator}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="schedule"
        component={ScheduleScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};
