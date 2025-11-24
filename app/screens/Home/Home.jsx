import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FadeInView } from "../../../src/animations/FadeInView";
import { AnimatedButton } from "../../../src/animations/Button";
import { useAuth } from "../../../src/contexts/AuthContext"; // useAuth já traz logout
import { useRouter } from "expo-router";

export default function Home() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <LinearGradient
      colors={["#2D1B3D", "#4A2C5A", "#6B3D7A", "#8B5FA8"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FadeInView style={styles.fadeContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Bem-vindo!</Text>

          <View style={styles.buttonsContainer}>
            <AnimatedButton
              style={styles.menuButton}
              onPress={() => router.push("/screens/Comanda/Mesas")}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="color-wand-outline"
                  size={24}
                  color="#FFFFFF"
                  style={styles.buttonIcon}
                />
                <Text style={styles.menuButtonText}>Cadastrar Pedido</Text>
              </View>
            </AnimatedButton>

            <AnimatedButton
              style={styles.menuButton}
              onPress={() => router.push("/screens/Comanda/Cardapio")}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="receipt-outline"
                  size={24}
                  color="#FFFFFF"
                  style={styles.buttonIcon}
                />
                <Text style={styles.menuButtonText}>Cardápio</Text>
              </View>
            </AnimatedButton>

            <AnimatedButton
              style={styles.menuButton}
              onPress={() => router.push("/screens/Sobre/About")}
            >
              <View style={styles.buttonContent}>
                <Ionicons
                  name="sparkles"
                  size={24}
                  color="#FFFFFF"
                  style={styles.buttonIcon}
                />
                <Text style={styles.menuButtonText}>Sobre o App</Text>
              </View>
            </AnimatedButton>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair do Caldeirão</Text>
          </TouchableOpacity>
        </FadeInView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    minHeight: "100%",
  },
  fadeContainer: {
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 50,
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 40,
  },
  menuButton: {
    backgroundColor: "#4A2C5A",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginBottom: 16,
    width: "100%",
    height: 64,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  buttonIcon: {
    marginRight: 16,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  menuButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "left",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
