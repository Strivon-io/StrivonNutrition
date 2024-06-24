import { FC, useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { styled } from "styled-components";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BottomTabParamList } from "~navigators/bottom-tab-navigator";
import { Layout } from "~components/layout/layout";
import { colors, spacing } from "~constants/theme";

import { HomeWelcomeSection } from "./components/sections/welcomeSection";
import { DailyMealsSection } from "./components/sections/dailyMealsSection";
import { GroceryListSection } from "./components/sections/groceryListSection";
import { PlannifiedMealDays } from "./components/sections/plannifiedMealDays";
import { getProfile } from "~services/routes/user.service";
import { useQuery } from "@tanstack/react-query";
import { getDayEvents } from "~services/routes/dayEvents.service";
import { getScheduledRecipesDates } from "~services/routes/scheduledRecipe.service";

type HomeScreenProps = NativeStackScreenProps<BottomTabParamList, "home">;

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const scrollA = useSharedValue(0);
  const BANNER_H = 350;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollA.value = event.contentOffset.y;
  });

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: dayEventsData, isLoading } = useQuery({
    queryKey: ["dayEvents"],
    queryFn: () => getDayEvents(new Date()),
  });

  const {
    data: scheduledRecipesDates,
    isLoading: isLoadingScheduledRecipesDates,
  } = useQuery({
    queryKey: ["scheduledRecipesDates"],
    queryFn: getScheduledRecipesDates,
  });
  console.log("scheduledRecipesDates", scheduledRecipesDates);

  const HomeWelcomeSectionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollA.value,
            [-BANNER_H, 0, BANNER_H],
            [-BANNER_H / 2, 0, BANNER_H * 0.75],
            Extrapolate.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        scrollA.value,
        [0, BANNER_H * 0.1],
        [1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <Layout noPadding bg="#F8F8F8">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={{ paddingHorizontal: 20 }}>
            <StrivonLogo
              source={require("~assets/brand/Strivon.png")}
              resizeMode="contain"
            />
          </View>
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={HomeWelcomeSectionStyle}>
              <HomeWelcomeSection username={profileData.username} />
            </Animated.View>
            <View style={styles.homeCardSection}>
              <DailyMealsSection
                navigation={navigation}
                scheduledRecipes={dayEventsData?.scheduledRecipes}
              />
              <GroceryListSection shoppingList={dayEventsData?.shoppingList} />
              <PlannifiedMealDays
                scheduledRecipesDates={dayEventsData?.scheduledRecipesDates}
              />
            </View>
          </Animated.ScrollView>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  homeCardSection: {
    backgroundColor: colors.light.PureWhite,
    borderRadius: spacing.m,
    paddingHorizontal: 20,
    height: "100%",
  },
});
const StrivonLogo = styled(Image)`
  width: 100px;
`;
