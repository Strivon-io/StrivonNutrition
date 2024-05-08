import { FC } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { styled } from 'styled-components'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { BottomTabParamList } from '~navigators/bottom-tab-navigator'
import { Layout } from '~components/layout/layout'
import { colors, spacing } from '~constants/theme'

import { HomeWelcomeSection } from './components/sections/welcomeSection'
import { DailyMealsSection } from './components/sections/dailyMealsSection'
import { GroceryListSection } from './components/sections/groceryListSection'
import { PlannifiedMealDays } from './components/sections/plannifiedMealDays'

type HomeScreenProps = NativeStackScreenProps<BottomTabParamList, 'home'>

export const HomeScreen: FC<HomeScreenProps> = () => {
  const scrollA = useSharedValue(0)
  const BANNER_H = 350

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollA.value = event.contentOffset.y
  })

  const HomeWelcomeSectionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollA.value,
            [-BANNER_H, 0, BANNER_H],
            [-BANNER_H / 2, 0, BANNER_H * 0.75],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        scrollA.value,
        [0, BANNER_H * 0.1],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    }
  })

  return (
    <Layout noPadding bg="#F8F8F8">
      <>
        <View style={{ paddingHorizontal: 20 }}>
          <StrivonLogo
            source={require('~assets/brand/Strivon.png')}
            resizeMode="contain"
          />
        </View>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={HomeWelcomeSectionStyle}>
            <HomeWelcomeSection />
          </Animated.View>
          <View style={styles.homeCardSection}>
            <DailyMealsSection />
            <GroceryListSection />
            <PlannifiedMealDays />
          </View>
        </Animated.ScrollView>
      </>
    </Layout>
  )
}

const styles = StyleSheet.create({
  homeCardSection: {
    backgroundColor: colors.light.PureWhite,
    borderRadius: spacing.m,
    paddingHorizontal: 20,
    height: '100%',
  },
})
const StrivonLogo = styled(Image)`
  width: 100px;
`
