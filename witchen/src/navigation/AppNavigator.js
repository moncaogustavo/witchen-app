import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import Home from "../screens/Home/Home";
import About from "../screens/Sobre/About";
import { screenTransition } from "../animations/transitions";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          ...screenTransition,
          headerStyle: {
            backgroundColor: '#2D1B3D',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ 
            title: 'Home',
            headerBackTitleVisible: false
          }}
        />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
