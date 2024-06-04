import { createNavigationContainerRef } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: { toggle: boolean };
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList]
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const resetAndNavigate = (
  navigator: string,
  screens: Array<{ name: string; params?: any }>
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: navigator,
            state: {
              index: screens.length - 1,
              routes: screens,
            },
          },
        ],
      })
    );
  }
};

export const routeWithoutTabBar = [];
