import React from "react";
import "./MapExploration.css";
import MapComponente from "../mapcomponente/MapComponente";

const MapExploration = () => {
  return (
    <div className="map-section">
      {/* Mapa à esquerda */}
      <div className="map-container">
        <MapComponente />
      </div>

      <div className="map-info">
        <h2>Mapa de Exploração</h2>
        <p>
          Explore os eventos disponíveis na sua área com nosso mapa interativo.
          Clique em cada marcador para ver mais detalhes.
        </p>
        <button className="expand-btn">Expandir</button>
      </div>
    </div>
  );
};

export default MapExploration;
