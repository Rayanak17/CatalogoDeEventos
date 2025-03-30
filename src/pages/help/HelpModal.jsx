import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import "./HelpModal.css"
export function HelpModal({ onClose }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const toggleContrast = () => {
    setHighContrast((prev) => !prev);
    document.body.classList.toggle('high-contrast');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Precisa de ajuda com acessibilidade?</h2>
        <p>Aqui estão algumas opções para melhorar sua experiência:</p>
        <ul>
          <li>
            <strong>🔹 Modo Alto Contraste</strong>: Ative cores mais contrastantes para facilitar a leitura.
            <Button onClick={toggleContrast} aria-label="Ativar/Desativar Alto Contraste">
              {highContrast ? 'Desativar' : 'Ativar'} Alto Contraste
            </Button>
          </li>
          <li>
            <strong>🔹 Ajuste de Fonte</strong>: Aumente ou diminua o tamanho do texto conforme sua necessidade.
            <div>
              <Button onClick={() => setFontSize((prev) => Math.min(prev + 2, 24))} aria-label="Aumentar Fonte">
                A+
              </Button>
              <Button onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))} aria-label="Diminuir Fonte">
                A-
              </Button>
            </div>
          </li>
        </ul>
        <Button onClick={onClose} aria-label="Fechar ajuda">
          Fechar
        </Button>
      </div>
    </div>
  );
}
