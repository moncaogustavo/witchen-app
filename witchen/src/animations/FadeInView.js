import { Animated, Easing } from 'react-native';
import React from 'react';


export const FadeInView = ({ duration = 600, style, children }) => {
const fadeAnim = new Animated.Value(0);


React.useEffect(() => {
Animated.timing(fadeAnim, {
toValue: 1,
duration,
useNativeDriver: true,
easing: Easing.out(Easing.ease),
}).start();
}, []);


return <Animated.View style={[style, { opacity: fadeAnim }]}>{children}</Animated.View>;
};