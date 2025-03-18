import React, { useState } from 'react';
import { Button } from '../../components/ui/button';

export function HelpModal({ onClose }) {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Precisa de ajuda com acessibilidade?</h2>
        <p>Aqui estão algumas opções para melhorar sua experiência:</p>
      </div>
    </div>
  );
}
