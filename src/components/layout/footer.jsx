import React from 'react';
import '../layout/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 MeuSite. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="/about">Sobre</a>
          <a href="/privacy">Privacidade</a>
          <a href="/contact">Contato</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
