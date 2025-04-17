import React, { useState, useEffect } from "react";
import "./Home.css";
import LoginModal from "../../components/auth/login/LoginModal"; 
import SignupModal from "../../components/auth/signup/SignupModal"; 
import Catalogo from "../../components/layout/catalogo/Catalog"; 
import { Button } from "../../components/ui/button";
import { HelpCircle } from "lucide-react"; 
import { HelpModal } from '../help/HelpModal';
import Map from "../../components/layout/mapcomponente/MapComponente"; 
import Footer from "../../components/layout/footer/footer";
import Navbar from "../../components/layout/navbar/navbar"
import { Link } from 'react-router-dom'; // Importe o Link
import MapExploration from "../../components/layout/mapexploration/MapExploration";


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
      <Navbar />
      
      <main className="main-content">
        <div className="text-content">
          <h1>Descubra Eventos em João Pessoa</h1>
          <p>
            A melhor maneira de encontrar e divulgar eventos na sua região!
            Encontre eventos perto de você com um simples clique no mapa.
          </p>
          <Link to="/explorar">
            <button className="explore-btn">Explore eventos</button>
          </Link>

          <Navbar onLoginClick={() => setShowLoginModal(true)} />

        </div>
        <div className="image-content">
          <img src="../assets/fotomap.svg" alt="figura" />
        </div>
      </main>

      <Catalogo />

      {/* Modais de login e cadastro */}
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

      {/* Mapa */}
      <section id="map" className="map-section map-container">
        <MapExploration />
      </section>

      {/* Botão de ajuda */}
      <Button onClick={() => setShowHelpModal(true)} ariaLabel="Abrir ajuda" className="help-button">
        <HelpCircle size={24} />
      </Button>

      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
