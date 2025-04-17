import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Importando o contexto de autenticação

const FavoritesContext = createContext();

// Hook para consumir o contexto de favoritos
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();  // Pegando o usuário do AuthContext
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [error, setError] = useState(null); // Adicionando estado de erro

  useEffect(() => {
    if (authLoading) return;  // Não faz nada enquanto o auth está carregando

    if (user?.id) {  // Verifica se o usuário tem um id
      fetchFavorites();  // Carrega os favoritos
    } else {
      setFavorites([]);  // Limpa os favoritos caso usuário deslogue
      setLoadingFavorites(false);
    }
  }, [user, authLoading]);  // Executa sempre que o usuário ou o loading muda

  const fetchFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token de autenticação ausente.");

      const response = await axios.get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setFavorites(response.data);
      } else {
        console.error("Dados de favoritos inválidos:", response.data);
        setFavorites([]);
      }
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      setError("Erro ao carregar favoritos. Tente novamente.");
    } finally {
      setLoadingFavorites(false);
    }
  };

  const toggleFavorite = async (event) => {
    if (!user?.id) {
      console.warn("Usuário não está logado ou ID de usuário ausente.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const apiUrl = "https://user-service-eventscatalog.onrender.com/favorites"; // URL da sua API
  
      // Enviar os parâmetros na URL
      const url = `${apiUrl}?userId=${user.id}&eventId=${event.eventId}`;
      console.log("Dados enviados para o servidor:", { userId: user.id, eventId: event.eventId });
  
      const response = await axios.post(url, null, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Resposta da API:", response.data); // Logando a resposta da API
  
      // Atualizando os favoritos após adicionar o favorito
      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
  
    } catch (error) {
      console.error("Erro ao alternar favorito:", error.response ? error.response.data : error.message);
    }
  };
  
  

  const isFavorite = (eventId) => {
    if (!Array.isArray(favorites)) return false;
    return favorites.some((fav) => fav.eventId === eventId);
  };

  if (authLoading || loadingFavorites) {
    return <div>Carregando favoritos...</div>;
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}  {/* Exibindo mensagem de erro */}
      {children}
    </FavoritesContext.Provider>
  );
};
