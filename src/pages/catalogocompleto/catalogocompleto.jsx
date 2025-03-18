import React, { useState } from "react";
import { Search, HelpCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./CatalogoCompleto.css";

// URL da API (usei uma variável de ambiente, como no seu código anterior)
const EVENT_SERVICE_URL = import.meta.env.VITE_EVENT_SERVICE_URL;

export default function CatalogoCompleto() {
  const [search, setSearch] = useState("");

  // Função para buscar eventos usando useQuery
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${EVENT_SERVICE_URL}/events`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar eventos: " + error.message);
    }
  };

  const {
    data: events = [], // Se não vier nada, começa com array vazio
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // Filtro de eventos com base na data atual
  const now = new Date().toISOString();
  const filteredEvents = events.filter((event) => {
    return event.endDateTime
      ? event.endDateTime > now
      : event.startDateTime > now;
  }) || [];

  // Filtro por busca (input)
  const searchedEvents = filteredEvents.filter((event) =>
    event.eventTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="catalogo-completo-container">
      <header className="catalogo-header">
        <h1>Catálogo de Eventos</h1>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar eventos..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {isLoading && <p className="loading-message">Carregando eventos...</p>}
      {isError && <p className="error-message">{error.message}</p>}

      <div className="event-list">
        {searchedEvents.length > 0 ? (
          searchedEvents.slice(0, 8).map((event, index) => ( // Exibe até 8 eventos
            <div key={event.eventId || index} className="event-card">
              <div
                className="event-image"
                style={{
                  backgroundImage: `url(${EVENT_SERVICE_URL}/map?latitude=${event.latitude}&longitude=${event.longitude})`,
                }}
              ></div>
              <p className="event-date">
                {new Date(event.startDateTime).toLocaleDateString()} -{" "}
                {new Date(event.startDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <h2 className="event-name">{event.eventTitle}</h2>
              <p className="event-description">{event.eventDescription}</p>
            </div>
          ))
        ) : (
          !isLoading && <p className="no-events-message">Nenhum evento encontrado.</p>
        )}
      </div>
    </div>
  );
}
