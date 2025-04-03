import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL;

const SignupModal = ({ onClose, onSwitchToLogin }) => {
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
      onClose();
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Erro ao cadastrar');
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    signupMutation.mutate();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastro</h2>
        <p className="highlight">OLÁ, AMIGO!</p>
        <p>SE VOCÊ JÁ TEM UMA CONTA, FAÇA LOGIN</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={signupMutation.isLoading}>
            {signupMutation.isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <button className="login-link" onClick={onSwitchToLogin}>Login</button>
        <button className="close-modal" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default SignupModal;
