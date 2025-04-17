import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Api from "../../../api";
import { useAuth } from "../../../context/AuthContext";


const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Pegando a função login do contexto

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${AUTH_SERVICE_URL}/login`, { 
        userEmail: email, 
        passwordProvided: password 
      });
      return response.data;
    },
    onSuccess: (data) => {
      const token = data.userToken;
    
      // Decodifica o token JWT para extrair o ID
      const decoded = JSON.parse(atob(token.split('.')[1]));
    
      const userData = {
        id: decoded.userId, // ✅ Agora com ID extraído
        name: data.userName,
        email: decoded.userEmail
      };
    
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    
      login(userData);
      alert("Login realizado com sucesso!");
      onClose();
    },
    
    onError: (err) => {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2>LOGIN</h2>
        <p>USE SEU EMAIL E SENHA</p>
        <p className="highlight">OLÁ, AMIGO!</p>
        <p>SE VOCÊ NÃO TEM UMA CONTA, CADASTRE-SE!</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <button className="signup-link" onClick={onSwitchToSignup}>Cadastrar-se</button>
        <a className="forgot-password" href="#">Esqueceu a senha?</a>
      </div>
    </div>
  );
};

export default LoginModal;
