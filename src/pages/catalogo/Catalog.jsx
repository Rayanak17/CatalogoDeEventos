import { useState, useEffect } from "react";
import { Search, HelpCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import "./Catalog.css";
import "../home/Home.css";
import axios from "axios";

export default function Catalogo() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("https://event-service-eventscatalog.onrender.com/events");
        if (!response.ok) throw new Error("Erro ao carregar eventos");
        const data = await response.json();
        console.log(data); // Verificar como os dados estão estruturados
        setEvents(data);
      } catch (err) {
        setError("Não foi possível carregar os eventos.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Catálogo</h1>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar eventos, palestras, shows..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* <div className="filters">
        <div>
          <span className="filter-title">Filtrar por:</span>
        </div>
        <div>
          <span className="filter-title">Ordenar por:</span> 
        </div>
      </div>  */}

      {loading && <p className="loading-message">Carregando eventos...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="event-list">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-image" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
              <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
              <h2 className="event-name">{event.name}</h2>
              <p className="event-description">{event.description}</p>
            </div>
          ))
        ) : (
          !loading && <p className="no-events-message">Nenhum evento encontrado.</p>
        )}
      </div>

      <button className="help-button">
        <HelpCircle />
      </button>
    </div>
  );
}
