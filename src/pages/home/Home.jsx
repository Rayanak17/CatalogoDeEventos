import React, { useState, useEffect } from "react";
import "./Home.css";
import LoginModal from "../login/LoginModal"; 
import SignupModal from "../signup/SignupModal"; 
import Catalogo from "../catalogo/Catalog"; 
import Map from "../mapcomponente/MapComponente";
import { Button } from "../../components/ui/button";
import { HelpCircle } from "lucide-react";
import { HelpModal } from '../help/HelpModal';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para controle do tema

  // Função para alternar entre o modo claro e noturno
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Aplicar a classe de tema no body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">NomeSite</div>
        <ul className="nav-links">
          <li><a href="#about">Sobre nós</a></li>
          <li><a href="#events">Eventos</a></li>
          <li><a href="#map">Mapa</a></li>
          <li><a href="#help">Ajuda</a></li>
        </ul>
        
        <button className="login-btn" onClick={() => setShowLoginModal(true)}>Login</button>
        {/* Botão para alternar o tema */}
    
      </nav>

      <main className="main-content">
        <div className="text-content">
          <h1>Descubra Eventos em João Pessoa</h1>
          <p>
            A melhor maneira de encontrar e divulgar eventos na sua região!
            Encontre eventos perto de você com um simples clique no mapa.
            Navegue por categorias, datas e localizações. Simples, rápido e eficiente.
          </p>
          <button className="explore-btn">Explore eventos</button>
        </div>
        <div className="image-content">
          <img src="../assets/fotomap.svg" alt="figura" />
        </div>
      </main>

      <Catalogo />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}

      <Button onClick={() => setShowHelpModal(true)} ariaLabel="Abrir ajuda" className="help-button">
        <HelpCircle size={24} />
      </Button>

      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
    </div>
  );
}
