import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CatalogoCompleto.css";

export default function CatalogoCompleto() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Requisição para obter todos os eventos
        const response = await axios.get(
          "https://event-service-eventscatalog.onrender.com/events"
        );

        // Verificação se a resposta foi bem-sucedida
        if (response.status === 200) {
          // Ordenando os eventos pela data mais recente (se necessário)
          const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setEvents(sortedEvents);
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
    <div className="catalogo-completo-container">
      <header className="catalogo-header">
        <h1>Catálogo de Eventos</h1>
      </header>

      {loading && <p className="loading-message">Carregando eventos...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="event-list">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <div
                className="event-image"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              ></div>
              <div className="event-info">
                <p className="event-date">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <h2 className="event-name">{event.name}</h2>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="no-events-message">Nenhum evento encontrado.</p>
        )}
      </div>
    </div>
  );
}

