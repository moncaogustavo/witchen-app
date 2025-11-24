const BASE_URL = "https://witchen.azurewebsites.net/api/v1";

// ---------------- MESAS ----------------

export async function fetchMesas() {
  try {
    const response = await fetch(`${BASE_URL}/mesa`);

    if (!response.ok)
      throw new Error(`Erro ao buscar mesas: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Erro fetchMesas:", error);
    return [];
  }
}

// ---------------- PRODUTOS ----------------

export async function fetchProdutos() {
  try {
    const response = await fetch(`${BASE_URL}/produto`);

    if (!response.ok)
      throw new Error(`Erro ao buscar produtos: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Erro fetchProdutos:", error);
    return [];
  }
}

// ---------------- COMANDAS ----------------

export const abrirComanda = async (mesaId) => {
  try {
    const response = await fetch(`${BASE_URL}/Comanda/abrir/${mesaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao abrir comanda: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro abrirComanda:", error.message);
    return null;
  }
};

export async function listarPedidosDaComanda(idComanda) {
  try {
    const response = await fetch(`${BASE_URL}/Comanda/${idComanda}/pedidos`);

    if (!response.ok)
      throw new Error(`Erro ao listar pedidos da comanda: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Erro listarPedidosDaComanda:", error);
    return [];
  }
}


export async function obterComandaAtiva(mesaId) {
  try {
    const response = await fetch(`${BASE_URL}/Comanda/ativa/${mesaId}`);

    if (response.status === 404) return null;

    if (!response.ok)
      throw new Error(`Erro ao buscar comanda ativa: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Erro obterComandaAtiva:", error);
    return null;
  }
}
export const abrirOuObterComanda = async (mesaId) => {
  try {
    const resAtiva = await fetch(`${BASE_URL}/Comanda/ativa/${mesaId}`);

    if (resAtiva.ok) {
      const comandaAtiva = await resAtiva.json();

      if (comandaAtiva) {
        console.log("Comanda já ativa:", comandaAtiva);
        return comandaAtiva;
      }
    }

    const resAbrir = await fetch(`${BASE_URL}/Comanda/abrir/${mesaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resAbrir.ok) {
      const erro = await resAbrir.text();
      throw new Error(`Erro ao abrir comanda: ${resAbrir.status} - ${erro}`);
    }

    const novaComanda = await resAbrir.json();
    console.log("Nova comanda aberta:", novaComanda);

    return novaComanda;

  } catch (error) {
    console.error("Erro em abrirOuObterComanda:", error);
    return null;
  }
};


export async function listarPedidos(comandaId) {
  const response = await fetch(
    `${BASE_URL}/v1/Comanda/${comandaId}/pedidos`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar pedidos");
  }

  return await response.json();
}
export const listarPedidosPorComanda = async (comandaId) => {
  try {
    const response = await api.get(`/api/v1/comanda/${comandaId}/pedidos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error?.response?.data || error);
    throw new Error("Erro ao buscar pedidos");
  }
};

// ---------------- PEDIDOS ----------------

export async function adicionarPedido(comandaId, itens) {
  try {
    const response = await fetch(
      `${BASE_URL}/Comanda/${comandaId}/pedidos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itens),
      }
    );

    if (!response.ok)
      throw new Error(`Erro ao adicionar pedido: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Erro adicionarPedido:", error);
    return null;
  }
}

export async function cancelarPedido(pedidoId) {
  try {
    const response = await fetch(
      `${BASE_URL}/Comanda/pedidos/${pedidoId}/cancelar`,
      {
        method: "PUT",
      }
    );

    if (!response.ok)
      throw new Error(`Erro ao cancelar pedido: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Erro cancelarPedido:", error);
    return null;
  }
}

// ---------------- FECHAR COMANDA ----------------

export async function fecharComanda(comandaId, metodoPagamento) {
  try {
    const response = await fetch(
      `${BASE_URL}/comanda/${comandaId}/fechar?metodoPagamento=${encodeURIComponent(metodoPagamento)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Erro fecharComanda:", response.status, text);
      throw new Error(`Erro ao fechar comanda: ${response.status} ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao chamar fecharComanda:", error);
    throw error;
  }
}

