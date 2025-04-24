import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth(); // Pegando o usuário do AuthContext
  const [favorites, setFavorites] = useState([]); // Estado para armazenar os favoritos
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [error, setError] = useState(null); // Adicionando estado de erro

  // Carrega favoritos do localStorage ao iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      console.log(savedFavorites)
      setFavorites(JSON.parse(savedFavorites)); // Carrega favoritos salvos no localStorage
    }
    setLoadingFavorites(false); // Finaliza o carregamento
  }, []);

  const toggleFavorite = async (event) => {
    console.log(event);
    
    if (!user?.id) {
      console.warn("Usuário não está logado ou ID de usuário ausente.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setError("Token não encontrado. Faça login novamente.");
        console.error("Token não encontrado.");
        return;
      }
  
      console.log("Token enviado:", token);
  
      const apiUrl = "https://user-service-eventscatalog.onrender.com/favorites";
      const url = `${apiUrl}?userId=${user.id}&eventId=${event.eventId}`;
  
      // Verificando se o evento já está nos favoritos
      if (isFavorite(event.eventId)) {
        const favoriteItem = favorites.find((fav) => fav.eventId === event.eventId);
  
        console.log("favoriteItem encontrado:", favoriteItem);
  
        if (!favoriteItem?.favoriteId) {
          console.warn("favoriteId não encontrado para o evento. Ignorando exclusão.");
          return;
        }
  
        await axios.delete(`${apiUrl}?userId=${user.id}&favoriteId=${favoriteItem.favoriteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Atualizando o estado dos favoritos após a remoção
        setFavorites((prevFavorites) => {
          const updatedFavorites = prevFavorites.filter(
            (fav) => fav.eventId !== event.eventId
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          return updatedFavorites;
        });
      } else {
        // Adicionar evento aos favoritos
        const response = await axios.post(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data?.favoriteId) {
          setFavorites((prevFavorites) => {
            const updatedFavorites = [
              ...prevFavorites,
              {
                ...event, 
                favoriteId: response.data.favoriteId, // Adicionando favoriteId retornado pela API
              }
            ];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
          });
        } else {
          console.error("favoriteId não retornado pela API");
          setError("Erro ao processar o favorito.");
        }
      }

      // Limpar erro após operação bem-sucedida
      setError('');
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar:", error);
  
      // Verificando a resposta de erro
      if (error.response) {
        console.error("Resposta do erro:", error.response);
        setError(error.response.data.message || "Erro desconhecido ao processar o favorito.");
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
        setError("Erro na requisição. Tente novamente.");
      } else {
        console.error("Erro desconhecido:", error.message);
        setError("Erro desconhecido.");
      }
    }
  };

  

  // Função para verificar se o evento já está nos favoritos
  const isFavorite = (eventId) => {
    if (!Array.isArray(favorites)) return false;
    return favorites.some((fav) => fav.eventId === eventId);
  };

  if (authLoading || loadingFavorites) {
    return <div>Carregando favoritos...</div>;
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {children}
    </FavoritesContext.Provider>
  );
};
