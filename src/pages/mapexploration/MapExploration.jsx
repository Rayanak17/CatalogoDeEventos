import React from "react";
import "./MapExploration.css";

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
        <iframe
          src="https://event-service-eventscatalog.onrender.com/map?latitude=-7.119701&longitude=-34.861367"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default MapExploration;
