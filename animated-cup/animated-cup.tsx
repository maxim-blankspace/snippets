import { Box } from '@components/index'
import { useEffect, useRef } from 'react'
import { vs } from 'react-native-size-matters/extend'
import { Image, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, Easing, withTiming, withDelay } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'

type CupProps = {
  progress: number // 0..100
}

const AnimatedCup = ({ progress }: CupProps) => {
  const lottieRef = useRef()
  const cupTransY = useSharedValue(0)

  const animatedCup = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: cupTransY.value }],
    }
  })

  useEffect(() => {
    setTimeout(() => {
      lottieRef?.current.play(36.8, 36.9)
      lottieRef?.current.play(36.9, 55)
      cupTransY.value = withDelay(
        600,
        withTiming((vs(-51) * progress) / 100, {
          duration: 900,
          easing: Easing.out(Easing.cubic),
        }),
      )
    }, 0)
  }, [])

  return (
    <Box height={vs(125)} bg="white" style={styles.overflowBox}>
      <Box width={vs(100)} style={styles.overflowBox}>
        <LottieView
          ref={lottieRef}
          loop={false}
          speed={0.7}
          source={require('@assets/animations/cupDroplet.json')}
          style={styles.droplet}
        />
      </Box>
      <Animated.View style={[animatedCup, styles.liquidWrapper]}>
        <Image source={require('@assets/images/cupLiquid.png')} style={styles.liquid} />
      </Animated.View>
      <Box position="absolute">
        <Image source={require('@assets/images/cupMask.png')} style={styles.cup} />
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  overflowBox: { overflow: 'hidden', alignItems: 'center' },
  liquid: {
    width: vs(100),
    height: vs(52),
    alignItems: 'center',
    transform: [{ translateX: vs(4) }],
  },
  liquidWrapper: { position: 'absolute', bottom: vs(-30) },
  cup: { width: vs(147), height: vs(125) },
  droplet: { height: vs(300), top: vs(-34.3) },
})

export default AnimatedCup
