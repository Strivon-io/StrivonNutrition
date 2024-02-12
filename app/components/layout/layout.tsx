import { FC, useMemo } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar as StatusBarRN,
  RefreshControlProps,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { useNavigationState } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { colors, ColorsKey, flattenedColors } from "~constants/theme";
import { AppHeader } from "./header";
import { withColor } from "~components/communStyles/withColor";
import { routeWithoutTabBar } from "~navigators/navigator-utils";

interface Props {
  children: React.ReactNode;
  isHeaderLogo?: boolean;
  isBackArrow?: boolean;
  isHeader?: boolean;
  isSeperatorLine?: boolean;
  statusStyle?: StatusBarStyle;
  pageTitle?: string;
  bg?: string;
  noPadding?: boolean;
  scrollView?: boolean;
  bounces?: boolean;
  withoutTopSafeArea?: boolean;
  withoutBottomSafeArea?: boolean;
  scrollViewOptions?: {
    refreshControlerProps?: RefreshControlProps;
    withTopSafeArea?: boolean;
  };
}

export const Layout: FC<Props> = ({
  isHeaderLogo,
  isBackArrow,
  children,
  isHeader,
  isSeperatorLine,
  pageTitle,
  bg,
  bounces,
  statusStyle,
  noPadding,
  withoutTopSafeArea,
  withoutBottomSafeArea,
  scrollView,
  scrollViewOptions,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const { top, bottom } = useSafeAreaInsets();
  const route = useNavigationState((state) => state);

  const statusBarHeight =
    Platform.OS === "android" ? StatusBarRN.currentHeight || 0 : 0;

  const tabBarHeight = route.routeNames.some((item) =>
    routeWithoutTabBar.includes(item)
  )
    ? useBottomTabBarHeight()
    : 0;

  const height = screenHeight - statusBarHeight - tabBarHeight - top - bottom;

  const styles = useMemo(
    () => getDynamicStyles(height, top, bottom, bg),
    [height, top]
  );

  const scrollContent = (
    <ScrollView
      bounces={bounces}
      endFillColor={bg ?? colors.light.PureWhite}
      contentContainerStyle={[
        styles.scrollViewHeight,
        !scrollView && styles.scrollContainer,
        !noPadding && styles.padding,
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        scrollViewOptions?.refreshControlerProps && (
          <RefreshControl {...scrollViewOptions.refreshControlerProps} />
        )
      }
    >
      {isHeader && (
        <AppHeader
          isSeperatorLine={isSeperatorLine}
          isLogo={isHeaderLogo}
          isBackArrow={isBackArrow}
          pageTitle={pageTitle}
        />
      )}

      {children}
    </ScrollView>
  );

  const content = (
    <View style={[!noPadding && styles.padding, { flex: 1 }]}>
      {isHeader && (
        <AppHeader
          isSeperatorLine={isSeperatorLine}
          isLogo={isHeaderLogo}
          isBackArrow={isBackArrow}
          pageTitle={pageTitle}
        />
      )}
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        withoutTopSafeArea && styles.withoutTopSafeArea,
        withoutBottomSafeArea && styles.withoutBottomSafeArea,
      ]}
    >
      <StatusBar style={statusStyle || "dark"} />
      {scrollView ? scrollContent : content}
    </SafeAreaView>
  );
};

const getDynamicStyles = (
  height: number,
  top: number,
  bottom: number,
  bg?: string
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: bg ?? colors.light.PureWhite,
    },
    scrollViewHeight: {
      minHeight: height,
    },
    scrollContainer: {
      flex: 1,
    },
    withoutTopSafeArea: {
      marginTop: -top,
    },
    withoutBottomSafeArea: {
      marginBottom: -bottom,
    },
    padding: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
  });
