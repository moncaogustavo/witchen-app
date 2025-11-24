import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { listarPedidos, cancelarPedido } from "../../../src/api";

export default function Pedidos() {
  const { comandaId } = useLocalSearchParams();
  const router = useRouter();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarPedidos = async () => {
    setLoading(true);
    const data = await listarPedidos(comandaId);
    setPedidos(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const handleCancelar = async (pedidoId) => {
    await cancelarPedido(pedidoId);
    carregarPedidos();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Pedido #{item.id}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>

            {item.itens?.map((i) => (
              <Text key={i.produtoId} style={styles.text}>
                {i.nomeProduto} x {i.quantidade}
              </Text>
            ))}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelar(item.id)}
            >
              <Text style={styles.cancelText}>Cancelar Pedido</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          router.push(`/screens/Pedidos/AdicionarPedido?comandaId=${comandaId}`)
        }
      >
        <Text style={styles.addText}>Adicionar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    padding: 15,
  },
  card: {
    backgroundColor: "#34495e",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  text: { color: "#ecf0f1", fontSize: 14 },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});
