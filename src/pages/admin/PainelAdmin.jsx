import React from 'react';
import { useNavigate } from 'react-router-dom';

const PainelAdmin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Painel do Administrador</h2>
      <button onClick={() => navigate('/admin/adicionar')}>Adicionar Evento</button>
    </div>
  );
};

export default PainelAdmin;
