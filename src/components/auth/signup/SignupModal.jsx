import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import "./Signup.css";

const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL;

const CadastroModal = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signupMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${USER_SERVICE_URL}/users`, {
        firstName: name,
        lastName: sobrenome,
        email,
        phoneNumber: phone,
        password,
      });
      return response.data;
    },
    onSuccess: () => {
      alert('Cadastro realizado com sucesso!');
      onClose();  // Fecha o modal após o cadastro bem-sucedido
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Erro ao cadastrar');
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');  // Limpa a mensagem de erro anterior

    // Validação simples para garantir que os campos não estão vazios
    if (!name || !sobrenome || !email || !phone || !password) {
      setError('Todos os campos são obrigatórios!');
      return;
    }

    signupMutation.mutate();
  };

  return (
    <div className="modal-overlay signup-modal">
      <div className="modal-content signup-content">
        <button className="close-modal" onClick={onClose}>×</button>

        <div className="left-side">
          <p className="highlight">OLÁ, AMIGO!</p>
          <p>SE VOCÊ JÁ TEM UMA CONTA, FAÇA LOGIN</p>
        </div>
       


        <div className="right-side">
          <h2>Cadastro</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={signupMutation.isLoading}
              className="signup-link">
              {signupMutation.isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroModal;
