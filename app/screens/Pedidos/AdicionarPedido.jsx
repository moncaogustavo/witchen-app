import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { adicionarPedido } from "../../../src/api/index";
import { fetchProdutos } from "../../../src/api/index"; // sua API que retorna o JSON de produtos

export default function AdicionarPedido() {
  const { comandaId } = useLocalSearchParams();
  const router = useRouter();

  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState({});

  useEffect(() => {
    fetchProdutos().then(setProdutos);
  }, []);

  const alterarQuantidade = (produtoId, valor) => {
    const qtd = parseInt(valor) || 0;

    setItens((prev) => ({
      ...prev,
      [produtoId]: qtd,
    }));
  };

  const enviarPedido = async () => {
    const pedido = Object.entries(itens)
      .filter(([_, qtd]) => qtd > 0)
      .map(([produtoId, qtd]) => ({
        produtoId: Number(produtoId),
        quantidade: qtd,
      }));

    if (pedido.length === 0) {
      Alert.alert(
        "Pedido vazio",
        "Selecione pelo menos 1 item antes de enviar."
      );
      return;
    }

    try {
      await adicionarPedido(comandaId, pedido);
      Alert.alert("Sucesso", "Pedido adicionado com sucesso!");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao adicionar pedido.");
    }
  };

  const aumentarQuantidade = (produtoId) => {
    setItens((prev) => ({
      ...prev,
      [produtoId]: (prev[produtoId] || 0) + 1,
    }));
  };

  const diminuirQuantidade = (produtoId) => {
    setItens((prev) => ({
      ...prev,
      [produtoId]: Math.max((prev[produtoId] || 0) - 1, 0),
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Pedido</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.idProduto.toString()}
        renderItem={({ item }) => {
          const quantidade = itens[item.idProduto] || 0;

          return (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.nomeProduto}</Text>
                <Text style={{ color: "#dcdcdc", fontSize: 13 }}>
                  {item.ingredientesProduto}
                </Text>
                <Text style={styles.price}>R$ {item.precoProduto}</Text>
              </View>

              {/* Area de controle */}
              <View style={styles.contador}>
                <TouchableOpacity
                  style={styles.botaoQtd}
                  onPress={() => diminuirQuantidade(item.idProduto)}
                >
                  <Text style={styles.txtQt}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtd}>{quantidade}</Text>

                <TouchableOpacity
                  style={styles.botaoQtd}
                  onPress={() => aumentarQuantidade(item.idProduto)}
                >
                  <Text style={styles.txtQt}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 130 }}
      />

      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity style={styles.button} onPress={enviarPedido}>
          <Text style={styles.buttonText}>Enviar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A2C5A",
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
    alignSelf: "center",
  },

  card: {
    backgroundColor: "#5E3B72",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  price: {
    marginTop: 4,
    fontWeight: "bold",
    color: "#2ecc71",
  },

  input: {
    borderWidth: 1,
    borderColor: "#8e44ad",
    padding: 6,
    borderRadius: 6,
    width: 60,
    textAlign: "center",
    backgroundColor: "#4A2C5A",
    color: "#fff",
  },

  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#2ecc71",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  contador: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  botaoQtd: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#8e44ad",
    alignItems: "center",
    justifyContent: "center",
  },

  txtQt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  qtd: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
});
