import React, { useState, useContext, use } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedButton } from "../../../src/animations/Button";
import { FadeInView } from "../../../src/animations/FadeInView";
import { useAuth } from "../../../src/contexts/AuthContext";
import { useRouter } from "expo-router";
export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSignup = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "Senha deve ter no mínimo 6 caracteres");
      return;
    }

    try {
      await signup({ email, senha });

      router.replace("/screens/Home/Home");
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      Alert.alert("Erro", error?.message || "Erro ao cadastrar");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#2D1B3D", "#4A2C5A", "#6B3D7A"]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <FadeInView style={styles.fadeContainer}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logoImage}
            />

            <Text style={styles.title}>Witchen</Text>
            <Text style={styles.subtitle}>Criar Conta</Text>

            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Senha"
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />

            <AnimatedButton style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </AnimatedButton>

            <Text
              style={styles.link}
              onPress={() => router.push("/screens/Auth/Login")}
            >
              Já tem conta? Entrar
            </Text>
          </FadeInView>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 30,
    minHeight: "100%",
  },
  fadeContainer: {
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 20,
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
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#B19CD9",
    marginBottom: 40,
    textAlign: "center",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 22,
    fontSize: 18,
    height: 64,
    width: "98%",
    maxWidth: 600,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: "#4A2C5A",
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 14,
    marginTop: 18,
    minHeight: 64,
    width: "98%",
    maxWidth: 600,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 19,
    letterSpacing: 0.5,
    includeFontPadding: false,
    textAlignVertical: "center",
    flexShrink: 0,
  },
  link: {
    color: "#B19CD9",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    fontWeight: "500",
  },
});
