import { createContext, useContext, useState, useEffect } from "react";

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
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.id) {
            console.log("Usuário carregado:", parsedUser);
            setUser(parsedUser);
          }
        }
      } catch (err) {
        setError("Falha ao carregar o usuário do armazenamento local.");
        console.error("Erro ao carregar o usuário do localStorage:", err);
      } finally {
        setLoading(false);
      }
    };
  
    loadUser();
  }, []);
  
  // Função de login
  const login = (userData) => {
    try {
      // Verifique se 'userData' contém o campo 'id'
      if (userData?.id) {
        localStorage.setItem("user", JSON.stringify(userData)); // Salva o usuário no localStorage
        setUser(userData); // Atualiza o estado do usuário
      } else {
        throw new Error("ID do usuário não encontrado.");
      }
    } catch (err) {
      setError("Falha ao salvar o usuário no armazenamento local.");
      console.error("Erro ao salvar o usuário:", err);
    }
  };
  

  // Função de logout
  const logout = () => {
    try {
      localStorage.removeItem("user"); // Remove o usuário do localStorage
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
