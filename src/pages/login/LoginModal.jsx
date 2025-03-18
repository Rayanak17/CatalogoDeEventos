import React from 'react';
import './Login.css'; // Certifique-se de que o caminho está correto

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2>LOGIN</h2>
        <p>USE SEU EMAIL E SENHA</p>
        <p className="highlight">ÓLA, AMIGO!</p>
        <p>SE VOCÊ NÃO TEM UMA CONTA, <a href="#" onClick={onSwitchToSignup}>CADASTRE-SE!</a></p>

        <form>
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Entrar</button>
        </form>

        <button className="signup-link" onClick={onSwitchToSignup}>
          Cadastre-se
        </button>
        <a className="forgot-password" href="#">Esqueceu a senha?</a>
      </div>
    </div>
  );
};

export default LoginModal;