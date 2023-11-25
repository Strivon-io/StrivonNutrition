import type { StyleProp, ViewStyle } from 'react-native'
import { Dimensions, Keyboard, StyleSheet } from 'react-native'
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  FadeIn,
  FadeOut,
  Layout,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { Backdrop } from './Backdrop'
import { spacing } from '@constants/theme'
import { isSmallScreen } from '@utils/deviceDetector'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type bottomSheetProps = {
  children?: React.ReactNode
  maxHeight?: number
  style?: StyleProp<ViewStyle>
  onClose?: () => void
}

export type bottomSheetRef = {
  open: () => void
  isActive: () => boolean
  close: () => void
}

export const MainBottomSheet = React.forwardRef<
  bottomSheetRef,
  bottomSheetProps
>(({ children, style, maxHeight = SCREEN_HEIGHT, onClose }, ref) => {
  const translateY = useSharedValue(maxHeight)

  const MAX_TRANSLATE_Y = -maxHeight

  const active = useSharedValue(false)

  const scrollTo = useCallback((destination: number) => {
    'worklet'
    active.value = destination !== maxHeight

    translateY.value = withSpring(destination, {
      mass: 0.4,
    })
  }, [])

  const close = useCallback(() => {
    'worklet'
    return scrollTo(maxHeight)
  }, [maxHeight, scrollTo])

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        'worklet'
        scrollTo(0)
      },
      close,
      isActive: () => {
        return active.value
      },
    }),
    [close, scrollTo, active.value],
  )

  const context = useSharedValue({ y: 0 })

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      if (event.translationY > -50) {
        translateY.value = event.translationY + context.value.y
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100) {
        if (onClose) {
          runOnJS(onClose)()
        } else close()
      } else {
        scrollTo(context.value.y)
      }
    })
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const handleKeyboardOpen = () => {
    setKeyboardOpen(true)
  }

  const handleKeyboardClose = () => {
    setKeyboardOpen(false)
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardOpen,
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardClose,
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const rbottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP,
    )

    const bottom = withSpring(
      !isSmallScreen && keyboardOpen ? 250 : spacing.xs,
      {
        stiffness: 100,
        damping: 20,
      },
    )

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
      bottom,
    }
  })

  return (
    <>
      <Backdrop onTap={onClose ?? close} isActive={active} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.bottomSheetContainer, rbottomSheetStyle, style]}
        >
          <Animated.View layout={Layout} entering={FadeIn} exiting={FadeOut}>
            {children}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  )
})

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: '#FFF',
    width: '95%',
    position: 'absolute',
    bottom: 20,
    borderCurve: 'continuous',
    alignSelf: 'center',
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  fill: { flex: 1 },
})
