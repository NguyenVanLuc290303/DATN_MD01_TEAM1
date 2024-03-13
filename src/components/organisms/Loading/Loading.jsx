import React, {useEffect, useRef, Animated} from 'react';
import { View , StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
// import Animated ,{Easing} from 'react-native-reanimated'

// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function Loading() {
//   const animationProgress = useRef(new Animated.Value(0));

//   useEffect(() => {
//     Animated.timing(animationProgress.current, {
//       toValue: 1,
//       duration: 5000,
//       easing: Easing.linear,
//       useNativeDriver: false,
//     }).start();
//   }, []);

  return (
    <View
          style={{ flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}
        >
          <LottieView
            style={{
              height: 50,
              width: 50,
            }}
            source={require('../../../assets/animations/Animation_loading.json')}
            autoPlay
            loop
          />
        </View>
  );
}
