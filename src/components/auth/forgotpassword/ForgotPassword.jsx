import React, { useState } from 'react';
import axios from 'axios';
import "./ForgotPassword.css";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sendRecoveryCode = async () => {
    try {
        await axios.post(
            "https://email-service-eventscatalog.onrender.com/emails/send-recovery-code",
            { email }
          );
          
      setSuccessMessage('Código de recuperação enviado para seu e-mail.');
      setError('');
      setTimeout(() => setStep(2), 2000);
    } catch (err) {
      console.error('Erro ao enviar código:', err);
      setError('Erro ao enviar o código de recuperação. Tente novamente.');
      setSuccessMessage('');
    }
  };

  // Função para atualizar a senha usando PATCH
  const handlePasswordRecovery = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do form
    setError('');
    setSuccessMessage('');
  
    try {
      const response = await axios.patch(
        "https://user-service-eventscatalog.onrender.com/users/recuperacao/atualizar-senha",
        { email, newPassword, recoveryCode },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Resposta do servidor:', response.data);
      setSuccessMessage('Senha atualizada com sucesso!');
      setTimeout(() => onClose(), 2000); // Fecha o modal após sucesso
    } catch (err) {
      console.error('Erro ao atualizar senha:', err.response || err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Erro: ${err.response.data.message}`);
      } else {
        setError('Erro desconhecido ao atualizar a senha. Tente novamente mais tarde.');
      }
    }
  };
    

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2>Recuperação de Senha</h2>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {step === 1 && (
          <div>
            <p>Digite seu e-mail para receber um código de recuperação:</p>
            <input 
              type="email" 
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendRecoveryCode}>Enviar código</button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handlePasswordRecovery}>
            <p>Confirme seu e-mail, digite o código de recuperação e sua nova senha:</p>
            <input 
              type="email" 
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Código de recuperação"
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Nova Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Atualizar Senha</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
