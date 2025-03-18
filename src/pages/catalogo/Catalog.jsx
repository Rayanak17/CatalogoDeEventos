import React, { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import "./Catalog.css";
import "../home/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const EVENT_SERVICE_URL = import.meta.env.VITE_EVENT_SERVICE_URL;

export default function Catalogo() {
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
    data: events = [], // se não vier nada, começa com array vazio
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // Filtro de eventos com base na data atual
  const now = new Date().toISOString();
  const filteredEvents =
    events.filter((event) => {
      return event.endDateTime
        ? event.endDateTime > now
        : event.startDateTime > now;
    }) || [];

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Vem ver o que está rolando em JP!</h1>
        {/* O bloco do input de pesquisa foi removido */}
      </header>

      {isLoading && <p className="loading-message">Carregando eventos...</p>}
      {isError && <p className="error-message">{error.message}</p>}

      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.slice(0, 8).map((event, index) => ( // Exibe até 8 eventos
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

      <Link to="/catalogocompleto">
        <button className="explore-btn">Ver mais eventos</button>
      </Link>
    </div>
  );
}
