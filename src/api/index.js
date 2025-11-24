const BASE_URL = 'https://witchen.azurewebsites.net/api/v1';

// Função para buscar mesas
export async function fetchMesas() {
  try {
    const response = await fetch(`${BASE_URL}/mesa`);
    if (!response.ok) throw new Error('Erro ao buscar mesas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Função para buscar produtos
export async function fetchProdutos() {
  try {
    const response = await fetch(`${BASE_URL}/produto`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
