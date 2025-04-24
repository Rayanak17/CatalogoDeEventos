import React, { useState, useEffect } from 'react';
import './Home.css';
import LoginModal from '../../components/auth/login/LoginModal.jsx'; 
import SignupModal from '../../components/auth/signup/SignupModal.jsx'; 
import Catalogo from '../../components/layout/catalogo/Catalog.jsx'; 
import { Button } from '../../components/ui/button.jsx';
import { HelpCircle } from 'lucide-react'; 
import Map from '../../components/layout/mapcomponente/MapComponente.jsx'; 
import Footer from '../../components/layout/footer/footer.jsx';
import Navbar from '../../components/layout/navbar/navbar.jsx';
import { Link } from 'react-router-dom';
import MapExploration from '../../components/layout/mapexploration/MapExploration.jsx';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className='App'>
      <Navbar onLoginClick={() => setShowLoginModal(true)} />
      
      <main className='main-content'>
        <div className='text-content'>
          <h1>Descubra Eventos em João Pessoa</h1>
          <p>
            A melhor maneira de encontrar e divulgar eventos na sua região!
            Encontre eventos perto de você com um simples clique no mapa.
          </p>
          <Link to='/explorar'>
            <button className='explore-btn'>Explore eventos</button>
          </Link>
        </div>
        <div className='image-content'>
          <img src='/assets/fotomap.svg' alt='figura' />
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

      <section id='map' className='map-section map-container'>
        <MapExploration />
      </section>

      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}

      <Footer />
    </div>
  );
}
