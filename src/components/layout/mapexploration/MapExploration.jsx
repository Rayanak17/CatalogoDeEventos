import React from 'react';
import './MapExploration.css'; // Certifique-se de que o caminho do CSS está correto
import MapComponente from '../mapcomponente/MapComponente'; // Importe o componente do mapa

const MapExploration = () => {
  return (
    <div className="map-section">
  <div className="map-info">
    <h2>Mapa de Exploração</h2>
    <p>
      Explore os eventos disponíveis na sua área com nosso mapa interativo.
      Clique em cada marcador para ver mais detalhes.
    </p>
    <button className="expand-btn">Expandir</button>
  </div>

  <div className="map-container">
    <MapComponente />
  </div>
</div>

  );
};

export default MapExploration;
