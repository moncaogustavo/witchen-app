import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { fetchProdutos } from "../../../src/api";

export default function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProdutos()
      .then(setProdutos)
      .finally(() => setLoading(false));
  }, []);

  const formatarPreco = (valor) => {
    const numero = Number(valor);
    return isNaN(numero) ? "0.00" : numero.toFixed(2);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={produtos}
        keyExtractor={(item, index) =>
          item.idProduto?.toString() || String(index)
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nomeProduto}</Text>

            <Text style={styles.cardPreco}>
              R$ {formatarPreco(item.precoProduto)}
            </Text>

            <Text style={styles.cardDescricao}>{item.ingredientesProduto}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A1838", // fundo principal
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A1838",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1.5,
  },

  listContent: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#4A2C5A",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  cardPreco: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F5D56B", // douradinho
    marginBottom: 8,
  },

  cardDescricao: {
    fontSize: 14,
    color: "#DADADA",
    lineHeight: 20,
  },
});
