import React from 'react';
import './MapExploration.css';
import { useNavigate } from 'react-router-dom';
import MapComponente from '../mapcomponente/MapComponente';

const MapExploration = () => {
  const navigate = useNavigate();

  const abrirPaginaMapa = () => {
    navigate('/mapa');
  };

  return (
    <section id='map' className='map-section map-container'>
      <div className="map-info">
        <h1>Mapa de Exploração</h1>
        <p>
          Explore os eventos disponíveis na sua área com nosso mapa interativo.
          Clique em cada marcador para ver mais detalhes.
        </p>
      </div>

      <div className="map-container">
        <MapComponente />
      </div>
    </section>
  );
};

export default MapExploration;