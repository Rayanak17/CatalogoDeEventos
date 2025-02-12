import React, { useState } from "react";
import "./Home.css";
import LoginModal from "../login/LoginModal"; // Importando LoginModal da pasta login
import SignupModal from "../signup/SignupModal"; // Importando SignupModal da pasta signup
import Catalogo from "../catalogo/Catalog"; // Importando o catálogo de eventos

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

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
        <button className="login-btn" onClick={openLoginModal}>Login</button>
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

      {/* Renderizando o Catálogo de Eventos */}
      <Catalogo />

      {showLoginModal && (
        <LoginModal
          onClose={closeLoginModal}
          onSwitchToSignup={() => {
            closeLoginModal();
            openSignupModal();
          }}
        />
      )}

      {showSignupModal && <SignupModal onClose={closeSignupModal} />}
    </div>
  );
}

