import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

import {
  fetchMesas,
  abrirOuObterComanda,
  obterComandaAtiva,
  fecharComanda,
  listarPedidosDaComanda,
} from "../../../src/api";

import { AnimatedButton } from "../../../src/animations/Button";

export default function Mesas() {
  const router = useRouter();
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [comandaParaFechar, setComandaParaFechar] = useState(null);
  const [metodoPagamento, setMetodoPagamento] = useState("");

  const carregarMesas = async () => {
    try {
      setLoading(true);
      const mesasData = await fetchMesas();

      const mesasComComanda = await Promise.all(
        mesasData.map(async (mesa) => {
          try {
            const comanda = await obterComandaAtiva(mesa.idMesa);
            if (comanda && comanda.idComanda) {
              const pedidos = await listarPedidosDaComanda(comanda.idComanda);
              return { ...mesa, comandaAtiva: comanda, pedidos: pedidos || [] };
            }
            return { ...mesa, comandaAtiva: null, pedidos: [] };
          } catch (error) {
            console.error("Erro ao carregar comanda/pedidos:", error);
            return { ...mesa, comandaAtiva: null, pedidos: [] };
          }
        })
      );

      setMesas(mesasComComanda);
    } catch (error) {
      console.error("Erro fetchMesas:", error);
      alert("Não foi possível carregar as mesas. Tente novamente mais tarde.");
      setMesas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMesas();
  }, []);

  const handleAbrirOuEntrarComanda = async (mesaId) => {
    try {
      const comanda = await abrirOuObterComanda(mesaId);
      const comandaId = comanda?.idComanda ?? comanda?.id ?? null;
      if (!comandaId) return;
      router.push(`/screens/Pedidos/AdicionarPedido?comandaId=${comandaId}`);
    } catch (error) {
      console.error("Erro ao abrir/entrar na comanda:", error);
      alert("Erro ao abrir ou acessar a comanda.");
    }
  };

  const abrirModalFechar = (comandaId) => {
    setComandaParaFechar(comandaId);
    setMetodoPagamento("");
    setModalVisible(true);
  };

  const confirmarFechar = async () => {
    if (!metodoPagamento.trim()) {
      return alert("Informe um método de pagamento.");
    }

    try {
      await fecharComanda(comandaParaFechar, metodoPagamento);

      setMesas((prev) =>
        prev.map((mesa) =>
          mesa.comandaAtiva?.idComanda === comandaParaFechar
            ? { ...mesa, comandaAtiva: null, pedidos: [] }
            : mesa
        )
      );

      setModalVisible(false);
      alert("Comanda fechada com sucesso!");
    } catch (error) {
      console.error("Erro ao fechar comanda:", error);
      alert(
        error?.message ||
          "Erro ao fechar a comanda. Verifique se o servidor está funcionando."
      );
    }
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
      <Text style={styles.pageTitle}>Mesas Disponíveis</Text>

      <FlatList
        data={mesas}
        keyExtractor={(item) => item.idMesa.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Mesa {item.numero}</Text>
              <Text
                style={[
                  styles.status,
                  item.comandaAtiva ? styles.ocupada : styles.disponivel,
                ]}
              >
                {item.comandaAtiva ? "Ocupada" : "Livre"}
              </Text>
            </View>

            {item.pedidos.length > 0 && (
              <View style={styles.pedidosContainer}>
                <Text style={styles.subtitulo}>Pedidos atuais:</Text>
                {item.pedidos.map((pedido, index) => (
                  <Text key={index} style={styles.pedido}>
                    • Pedido #{pedido.idPedido} — {pedido.status} — Total: R$
                    {pedido.total}
                  </Text>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAbrirOuEntrarComanda(item.idMesa)}
            >
              <Text style={styles.buttonText}>
                {item.comandaAtiva ? "Adicionar pedido" : "Abrir comanda"}
              </Text>
            </TouchableOpacity>

            {item.comandaAtiva && (
              <TouchableOpacity
                style={[styles.button, styles.fecharButton]}
                onPress={() => abrirModalFechar(item.comandaAtiva.idComanda)}
              >
                <Text style={styles.buttonText}>Fechar comanda</Text>
              </TouchableOpacity>
            )}

            <View style={styles.buttonsContainer}>
              <AnimatedButton
                style={styles.backButton}
                onPress={() => router.push("/screens/Home/Home")}
              >
                <Text style={styles.backButtonText}>
                  Voltar para o Caldeirão
                </Text>
              </AnimatedButton>
            </View>
          </View>
        )}
      />

      {/* MODAL DE MÉTODO DE PAGAMENTO */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Informe o método de pagamento:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Dinheiro, Cartão"
              value={metodoPagamento}
              onChangeText={setMetodoPagamento}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonConfirm}
                onPress={confirmarFechar}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  title: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  status: {
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    textTransform: "uppercase",
  },
  disponivel: { backgroundColor: "#2ECC71", color: "#FFFFFF" },
  ocupada: { backgroundColor: "#E74C3C", color: "#FFFFFF" },
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
  pedidosContainer: { marginTop: 10 },
  subtitulo: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 5,
  },
  pedido: { color: "#FFFFFF", fontSize: 14, marginLeft: 10 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  buttonCancel: { padding: 10, backgroundColor: "#ccc", borderRadius: 8 },
  buttonConfirm: { padding: 10, backgroundColor: "#5E3370", borderRadius: 8 },
});
