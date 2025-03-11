import React, { useState, useEffect } from "react";
import { Search, HelpCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import "./Catalog.css";
import "../home/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Catalogo() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Requisição para obter os eventos
        const response = await axios.get("https://event-service-eventscatalog.onrender.com/events");

        // Verificação se a resposta foi bem-sucedida
        if (response.status === 200) {
          setEvents(response.data);
        } else {
          console.error("Erro na resposta da API: Status", response.status);
          setError("Erro ao carregar eventos. Tente novamente.");
        }
      } catch (err) {
        console.error("Erro na requisição da API:", err);
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

      {loading && <p className="loading-message">Carregando eventos...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="event-list">
        {events.length > 0 ? (
          events.slice(0, 8).map((event, index) => ( // Exibindo os primeiros 6 eventos
            <div key={index} className="event-card">
              <div
                className="event-image"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              ></div>
              <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
              <h2 className="event-name">{event.name}</h2>
              <p className="event-description">{event.description}</p>
            </div>
          ))
        ) : (
          !loading && <p className="no-events-message">Nenhum evento encontrado.</p>
        )}
      </div>

      <Link to="/catalogocompleto">
  <button className="explore-btn">Ver mais eventos</button>
      </Link>

      <button className="help-button">
        <HelpCircle />
      </button>
    </div>
  );
}
