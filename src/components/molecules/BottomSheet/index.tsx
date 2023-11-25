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

// Get the screen height
const { height: SCREEN_HEIGHT } = Dimensions.get('window')

// Define the props for the BottomSheet component
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

// Create the BottomSheet component
export const MainBottomSheet = React.forwardRef<
  bottomSheetRef,
  bottomSheetProps
>(({ children, style, maxHeight = SCREEN_HEIGHT, onClose }, ref) => {
  // Create a shared value for translateY animation
  const translateY = useSharedValue(maxHeight)

  // Define the maximum translateY value for the BottomSheet
  const MAX_TRANSLATE_Y = -maxHeight

  // Create a shared value to track the active state
  const active = useSharedValue(false)

  // Function to scroll to a specific Y position
  const scrollTo = useCallback((destination: number) => {
    'worklet'
    active.value = destination !== maxHeight

    translateY.value = withSpring(destination, {
      mass: 0.4,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Function to close the BottomSheet
  const close = useCallback(() => {
    'worklet'
    return scrollTo(maxHeight)
  }, [maxHeight, scrollTo])

  // Expose functions and values through useImperativeHandle
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

  // Create a shared value for context
  const context = useSharedValue({ y: 0 })

  // Create a gesture handler for pan gestures
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      // Handle just gestures to swipe down
      if (event.translationY > -50) {
        // Update the translateY value with clamping
        translateY.value = event.translationY + context.value.y
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100) {
        // Close the Action Tray when the user swipes down
        if (onClose) {
          runOnJS(onClose)()
        } else close()
      } else {
        // Restore to the previous position if the users doesn't swipe down enough
        scrollTo(context.value.y)
      }
    })
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const handleKeyboardOpen = () => {
    setKeyboardOpen(true)
  }

  // Function to handle keyboard close event
  const handleKeyboardClose = () => {
    setKeyboardOpen(false)
  }

  // Subscribe to keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardOpen,
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardClose,
    )

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  // Update the bottomSheetContainer style
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
      {/* Backdrop to handle tap events */}
      <Backdrop onTap={onClose ?? close} isActive={active} />
      {/* Gesture detector to handle pan gestures */}
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

// Define the styles for the BottomSheet component
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
