import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import "./Login.css";
import { useAuth } from "../../../context/AuthContext";
import ForgotPasswordModal from "../forgotpassword/ForgotPassword";

const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { login, user } = useAuth();

  // Quando o usuário for autenticado e o estado for alterado
  useEffect(() => {
    if (user) {
      console.log("Usuário logado com sucesso:", user); // Para depuração
      onClose(); // Fecha o modal após o login bem-sucedido
    }
  }, [user, onClose]);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${AUTH_SERVICE_URL}/login`, {
        userEmail: email,
        passwordProvided: password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      const token = data.userToken;
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userData = {
        id: decoded.userId,
        name: data.userName,
        email: decoded.userEmail,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      login(userData); // Atualiza o contexto com os dados do usuário
      alert("Login realizado com sucesso!");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Erro ao fazer login");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");  // Limpa mensagens de erro anteriores
    loginMutation.mutate();  // Executa a mutação de login
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true); // Abre o modal de recuperação de senha
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordOpen(false); // Fecha o modal de recuperação de senha
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>

        <div className="left-section">
          <h2>LOGIN</h2>
          <p className="subtitle">USE SEU EMAIL E SENHA</p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loginMutation.isLoading}>
              {loginMutation.isLoading ? "Entrando..." : "Entrar"}
            </button>
            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Esqueceu a senha?
            </button>
          </form>
        </div>

        <div className="right-section">
          <p className="highlight">OLÁ, AMIGO!</p>
          <p className="signup-text">SE VOCÊ NÃO TEM UMA CONTA, CADASTRE-SE!</p>
          <button className="signup-link" onClick={onSwitchToSignup}>
            Cadastrar-se
          </button>
        </div>
      </div>

      {isForgotPasswordOpen && (
        <ForgotPasswordModal onClose={handleCloseForgotPassword} />
      )}
    </div>
  );
};

export default LoginModal;
