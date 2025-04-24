import axios from "axios";

const eventsApi = axios.create({
  baseURL: import.meta.env.VITE_EVENT_SERVICE_URL, // nova URL do serviço de eventos
});

eventsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

eventsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Apenas rejeita o erro com uma flag indicando que precisa redirecionar
      error.isAuthError = true;
    }
    return Promise.reject(error);
  }
);

export default eventsApi;
