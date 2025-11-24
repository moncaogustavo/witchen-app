import { Stack } from "expo-router";

import { AuthProvider } from "./../src/contexts/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Rota inicial */}
        <Stack.Screen name="index" options={{ animation: "fade" }} />

        {/* Auth */}
        <Stack.Screen
          name="screens/Auth/Login"
          options={{ animation: "slide_from_right" }}
        />

        <Stack.Screen
          name="screens/Auth/Signup"
          options={{ animation: "slide_from_right" }}
        />

        {/* Home */}
        <Stack.Screen
          name="screens/Home/Home"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </AuthProvider>
  );
}
