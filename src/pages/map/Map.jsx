import { useState } from "react";
import "./Map.css"; // Verifique se esse arquivo está correto, ou ajuste
import { FaQuestionCircle } from "react-icons/fa"; // Exemplo de ícone, pode remover se não for usar
import "../home/Home.css"; // Verifique se a estilização da home não afeta a renderização do mapa

export default function Map() {
  return (
    <div className="map-container">
      <div className="map-placeholder">
        <h1>Mapa de Exploração</h1>
      </div>
    </div>
  );
}

