import React from 'react';

const SignupModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastro</h2>
        <form>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="Telefone" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Cadastrar</button>
        </form>
        <button className="close-modal" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default SignupModal;