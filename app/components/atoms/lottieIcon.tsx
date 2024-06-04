import { FC, useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'

interface LottieIconProps {
  source: any
  focused: boolean
  size: number
}

export const LottieIcon: FC<LottieIconProps> = ({ source, focused, size }) => {
  const animation = useRef<LottieView>(null)

  useEffect(() => {
    if (focused) {
      animation.current?.play()
    } else {
      animation.current?.reset()
    }
  }, [focused])

  return (
    <LottieView
      ref={animation}
      source={source}
      style={{ width: size, height: size }}
      loop={false}
      resizeMode="contain"
    />
  )
}
