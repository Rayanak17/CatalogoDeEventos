import React, { useState } from 'react';
import LoginModal  from './pages/login/LoginModal';
import SignupModal from './pages/signup/SignupModal';

const ModalsController = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleSwitchToLogin = () => {
    console.log("Mudando para o modal de Login...");
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleSwitchToSignup = () => {
    console.log("Mudando para o modal de Cadastro...");
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div>
      <button onClick={() => setShowLogin(true)}>Abrir Login</button>
      <button onClick={() => setShowSignup(true)}>Abrir Cadastro</button>

      {showLogin && (
        <LoginModal 
          onClose={handleClose} 
          onSwitchToSignup={handleSwitchToSignup} 
        />
      )}

      {showSignup && (
        <SignupModal 
          onClose={handleClose} 
          onSwitchToLogin={handleSwitchToLogin} 
        />
      )}
    </div>
  );
};

export default ModalsController;
