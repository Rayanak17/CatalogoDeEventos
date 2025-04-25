import React from 'react';
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">

        <div className="footer-left">
        <a href="/sobre" className="footer-link">Sobre</a>
          <p className="footer-dev">Desenvolvido por <strong>Rayana Ketyn</strong> & <strong> Lucas Mateus</strong></p>
          <p className="footer-copy">Todos os direitos reservados © 2025</p>
        </div>

        <div className="footer-right">
          <p className="footer-names">Rayana  &  Lucas</p>
          <div className="social-icons">
            <a href="https://github.com/Rayanak17" target="_blank" rel="noopener noreferrer" title="GitHub Rayana">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub Rayana" />
            </a>
            <a href="https://www.linkedin.com/in/rayanaketyn/" target="_blank" rel="noopener noreferrer" title="LinkedIn Rayana">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn Rayana" />
            </a>
            <a href="https://github.com/LucasMCFidelis" target="_blank" rel="noopener noreferrer" title="GitHub Lucas">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub Lucas" />
            </a>
            <a href="https://www.linkedin.com/in/lucas-fidelis-778705149/" target="_blank" rel="noopener noreferrer" title="LinkedIn Lucas">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn Lucas" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
