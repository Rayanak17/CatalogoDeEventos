import React from 'react';

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastro</h2>
        <p className="highlight">ÓLA, AMIGO!</p>
        <p>SE VOCÊ JÁ TEM UMA CONTA, FAÇA LOGIN</p>
        <form>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="Telefone" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Cadastrar</button>
        </form>

        {/* 🔥 Botão agora chama a função correta */}
        <button className="login-link" onClick={onSwitchToLogin}>Login</button>

        <button className="close-modal" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default SignupModal;
