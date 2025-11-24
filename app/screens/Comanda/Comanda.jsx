import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { abrirComanda, obterComandaAtiva } from "../../../src/api";
import { AnimatedButton } from "../../../src/animations/Button";
export default function Comanda() {
  const { mesaId } = useLocalSearchParams();
  const router = useRouter();

  const [comanda, setComanda] = useState(null);
  const [loading, setLoading] = useState(true);

  const mesaIdInt = Number(mesaId);

  const carregarComanda = async () => {
    setLoading(true);

    const data = await obterComandaAtiva(mesaIdInt);
    setComanda(data);

    setLoading(false);
  };

  const handleAbrirComanda = async () => {
    await abrirComanda(Number(mesaId));
    carregarComanda();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!comanda) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhuma comanda aberta</Text>

        <TouchableOpacity style={styles.button} onPress={handleAbrirComanda}>
          <Text style={styles.buttonText}>Abrir Comanda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comanda #{comanda.idComanda}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push(`/screens/Pedidos/Pedidos?comandaId=${comanda.idComanda}`)
        }
      >
        <Text style={styles.buttonText}>Ver Pedidos</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <AnimatedButton
          style={styles.backButton}
          onPress={() => router.push("/screens/Home/Home")}
        >
          <Text style={styles.backButtonText}>Voltar para o Caldeirão</Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A2C5A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A2C5A",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#4A2C5A",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
