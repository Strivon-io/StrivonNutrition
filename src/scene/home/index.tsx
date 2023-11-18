import { AppLayout } from '@components/layout/layout'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { colors, spacingPx } from '@constants/theme'
import { View, Image } from 'react-native'
import { styled } from 'styled-components'
import { HomeWelcomeSection } from './components/sections/welcomeSection'
import { DailyMealsSection } from './components/sections/dailyMealsSection'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { GroceryListSection } from './components/sections/groceryListSection'
import { PlannifiedMealDays } from './components/sections/plannifiedMealDays'

export const HomeScreen = () => {
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
    <AppLayout useSafeAreaView>
      <LayoutSideColumns>
        <StrivonLogo
          source={require('@assets/brand/Strivon.png')}
          resizeMode="contain"
        />
      </LayoutSideColumns>
      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        <Animated.View style={HomeWelcomeSectionStyle}>
          <HomeWelcomeSection />
        </Animated.View>
        <HomeCardSection>
          <DailyMealsSection />
          <GroceryListSection />
          <PlannifiedMealDays />
        </HomeCardSection>
      </Animated.ScrollView>
    </AppLayout>
  )
}

const StrivonLogo = styled(Image)`
  width: 100px;
`

const boxShadow = {
  shadowColor: '#3A296A',
  shadowOpacity: 0.1,
  shadowRadius: 10,
}

const HomeCardSection = styled(View)`
  /* ${boxShadow} */
  background-color: ${colors.light.PureWhite};
  border-radius: ${spacingPx.m};
  height: 100%;
`
