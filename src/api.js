import axios from "axios";

// Crie uma instância do axios com a URL base
const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL, // Aqui você usa a URL correta do seu serviço
});

// Adiciona o token no cabeçalho de cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho
  }
  return config;
});

export default api;
