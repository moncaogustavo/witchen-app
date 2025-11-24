import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchMesas } from "../../../src/api/index";

export default function Mesas() {
  const router = useRouter();
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMesas()
      .then(setMesas)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Mesas Disponíveis</Text>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={mesas}
        keyExtractor={(item, index) =>
          item?.id?.toString() || item?.idMesa?.toString() || String(index)
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Mesa {item.numero}</Text>
              <Text
                style={[
                  styles.status,
                  item.status?.toLowerCase() === "ocupada"
                    ? styles.ocupada
                    : styles.disponivel,
                ]}
              >
                {item.status}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push(`/comandas?mesaId=${item.id}`)}
            >
              <Text style={styles.buttonText}>Adicionar pedido</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A1838",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A1838",
  },

  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 1.5,
  },

  listContent: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#4A2C5A",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  status: {
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    textTransform: "uppercase",
  },

  disponivel: {
    backgroundColor: "#2ECC71",
    color: "#FFFFFF",
  },

  ocupada: {
    backgroundColor: "#E74C3C",
    color: "#FFFFFF",
  },

  button: {
    marginTop: 12,
    backgroundColor: "#5E3370",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
