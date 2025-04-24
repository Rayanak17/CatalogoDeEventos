import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";  // Caso você precise fazer requisições

// Criando o contexto de autenticação
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento de autenticação
  const [error, setError] = useState(null); // Adicionando um estado de erro para capturar falhas na autenticação

  // Carregar usuário salvo no localStorage ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token"); // Carrega o token do localStorage

        if (storedUser && token) {
          const parsedUser = JSON.parse(storedUser);
          // Validar token com a API (exemplo)
          const response = await axios.get("/auth/validate-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            console.log("Usuário autenticado:", parsedUser);
            setUser(parsedUser);
          } else {
            logout(); // Se o token for inválido, faz logout
          }
        }
      } catch (err) {
        setError("Falha ao carregar o usuário do armazenamento local.");
        console.error("Erro ao carregar o usuário:", err);
      } finally {
        setLoading(false);
      }
    };
  
    loadUser();
  }, []);

  // Função de login assíncrona
  const login = async (userData) => {
    try {
      // Chamada à API de autenticação para obter o token (exemplo)
      const response = await axios.post("/auth/login", userData);
      const { token, user } = response.data;

      // Salva no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      setUser(user); // Atualiza o estado do usuário
    } catch (err) {
      setError("Falha ao realizar login.");
      console.error("Erro ao fazer login:", err);
    }
  };

  // Função de logout
  const logout = () => {
    try {
      localStorage.removeItem("user"); // Remove o usuário do localStorage
      localStorage.removeItem("token"); // Remove o token também
      setUser(null); // Limpa o estado do usuário
    } catch (err) {
      setError("Falha ao remover o usuário do armazenamento local.");
      console.error("Erro ao remover o usuário:", err);
    }
  };

  // Se estiver carregando ou com erro, podemos retornar um estado de loading ou erro
  if (loading) {
    return <div>Carregando...</div>; // Retorna um componente de loading enquanto o estado não estiver pronto
  }

  if (error) {
    return <div>{error}</div>; // Exibe uma mensagem de erro se houve um problema ao carregar o usuário
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};
