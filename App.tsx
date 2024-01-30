import React, { useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import { useFonts } from "expo-font";
import Constants from "expo-constants";

import "./src/translations/i18n.config";

import { MainNavigation } from "./src/navigation";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const appState = useRef(AppState.currentState);

  let [fontsLoaded] = useFonts({
    "avenir-regular": require("./src/assets/fonts/Avenir-Next-Regular.otf"),
    "avenir-medium": require("./src/assets/fonts/Avenir-Next-Medium.ttf"),
    "avenir-bold": require("./src/assets/fonts/Avenir-Next-Bold.otf"),
    "avenir-bold-italic": require("./src/assets/fonts/Avenir-Next-Bold-Italic.ttf"),
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
    });

    (async () => {
      console.log(`App version ${Constants.expoConfig.version} is mounted.`);

      setIsAppReady(true);
    })();

    return () => {
      subscription.remove();
    };
  }, []);

  if (!isAppReady || !fontsLoaded) {
    return;
  }

  return <MainNavigation />;
}
