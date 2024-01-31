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

import { colors, ColorsKey, flattenedColors } from "~constants/theme";
import { AppHeader } from "./header";
import { withColor } from "~components/communStyles/withColor";

interface Props {
  children: React.ReactNode;
  isHeaderLogo?: boolean;
  isBackArrow?: boolean;
  isHeader?: boolean;
  isSeperatorLine?: boolean;
  statusStyle?: StatusBarStyle;
  pageTitle?: string;
  bg?: ColorsKey;
  noPadding?: boolean;
  scrollView?: boolean;
  bounces?: boolean;
  withoutSafeArea?: boolean;
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
  withoutSafeArea,
  scrollView,
  scrollViewOptions,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const { top } = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === "android" ? StatusBarRN.currentHeight || 0 : 0;
  const height = screenHeight + statusBarHeight;

  const styles = useMemo(
    () => getDynamicStyles(height, top, bg),
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
      {/* {isHeader && (
        <AppHeader
          isSeperatorLine={isSeperatorLine}
          isLogo={isHeaderLogo}
          isBackArrow={isBackArrow}
          pageTitle={pageTitle}
        />
      )} */}

      {children}
    </ScrollView>
  );

  const content = (
    <View style={[!noPadding && styles.padding, { flex: 1 }]}>
      {/* {isHeader && (
        <AppHeader
          isSeperatorLine={isSeperatorLine}
          isLogo={isHeaderLogo}
          isBackArrow={isBackArrow}
          pageTitle={pageTitle}
        />
      )} */}
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, withoutSafeArea && styles.withoutSafeArea]}
    >
      <StatusBar style={statusStyle || "light"} />
      {scrollView ? scrollContent : content}
    </SafeAreaView>
  );
};

const getDynamicStyles = (height: number, top: number, bg?: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: flattenedColors[bg] ?? colors.light.PureWhite,
    },
    scrollViewHeight: {
      minHeight: height,
    },
    scrollContainer: {
      flex: 1,
    },
    withoutSafeArea: {
      marginTop: -top,
    },
    padding: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
  });
