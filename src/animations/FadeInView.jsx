import { Animated, Easing, Platform } from 'react-native';
import React, { useRef } from 'react';

export const FadeInView = ({ duration = 600, style, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: Platform.OS !== 'web',
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);

  return <Animated.View style={[style, { opacity: fadeAnim }]}>{children}</Animated.View>;
};

