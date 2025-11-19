// PARTE DE JAVA API

export const API_BASE = "http://SEU_BACKEND.com/api";


export const endpoints = {
login: `${API_BASE}/auth/login`,
signup: `${API_BASE}/auth/signup`,
mesas: `${API_BASE}/mesas`, // CRUD completo — adicionar no backend
pedidos: `${API_BASE}/pedidos`,
};