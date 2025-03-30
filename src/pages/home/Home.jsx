import React, { useState, useEffect } from "react";
import "./Home.css";
import LoginModal from "../login/LoginModal"; 
import SignupModal from "../signup/SignupModal"; 
import Catalogo from "../catalogo/Catalog"; 
import { Button } from "../../components/ui/button";
import { HelpCircle, Moon, Sun } from "lucide-react"; 
import { HelpModal } from '../help/HelpModal';
import MapExploration from "../mapexploration/MapExploration";  // Aqui está a importação
import Footer from "../../components/layout/footer";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; // Salva a escolha do usuário
  });

  // Alternar o tema
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Aplica o tema ao carregar a página
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
        
        <div className="nav-buttons">
          <button className="login-btn" onClick={() => setShowLoginModal(true)}>Login</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="text-content">
          <h1>Descubra Eventos em João Pessoa</h1>
          <p>
            A melhor maneira de encontrar e divulgar eventos na sua região!
            Encontre eventos perto de você com um simples clique no mapa.
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

      {/* Aqui está o mapa sendo inserido na home */}
      <section id="map" className="map-section">
        <MapExploration />
      </section>

      {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}

      <Button onClick={() => setShowHelpModal(true)} ariaLabel="Abrir ajuda" className="help-button">
        <HelpCircle size={24} />
      </Button>

      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}

      <Footer />

    </div>
  );
}
