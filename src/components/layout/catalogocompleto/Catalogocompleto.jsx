import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from "../../../context/FavoritesContext";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import "./CatalogoCompleto.css";

const EVENT_SERVICE_URL = import.meta.env.VITE_EVENT_SERVICE_URL;

export default function CatalogoCompleto() {
  const [filters, setFilters] = useState({
    search: "",
    dateFilter: "all",
    priceFilter: "all",
  });

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${EVENT_SERVICE_URL}/events`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar eventos: " + error.message);
    }
  };

  const { data: events = [], isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const getFilterDates = () => {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const thisWeekend = new Date(now);
    thisWeekend.setDate(thisWeekend.getDate() + (6 - now.getDay()));

    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return { tomorrow, thisWeekend, nextWeek, nextMonth };
  };

  const { tomorrow, thisWeekend, nextWeek, nextMonth } = useMemo(() => getFilterDates(), []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDateTime).toISOString().split("T")[0];
      const isUpcoming = new Date(event.startDateTime) > now;

      const matchesDate =
        filters.dateFilter === "all" ||
        (filters.dateFilter === "today" && eventDate === today) ||
        (filters.dateFilter === "tomorrow" && eventDate === tomorrow.toISOString().split("T")[0]) ||
        (filters.dateFilter === "weekend" && eventDate >= today && eventDate <= thisWeekend.toISOString().split("T")[0]) ||
        (filters.dateFilter === "next7days" && eventDate >= today && eventDate <= nextWeek.toISOString().split("T")[0]) ||
        (filters.dateFilter === "nextMonth" && eventDate >= today && eventDate <= nextMonth.toISOString().split("T")[0]);

      const matchesPrice =
        filters.priceFilter === "all" ||
        (filters.priceFilter === "free" && event.price === 0) ||
        (filters.priceFilter === "paid" && event.price > 0);

      const matchesSearch = event.eventTitle.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory =
        categoriaSelecionada === "" || String(event.categoryId) === categoriaSelecionada;

      return isUpcoming && matchesDate && matchesPrice && matchesSearch && matchesCategory;
    });
  }, [events, filters, categoriaSelecionada]);

  const handleFavoriteClick = (event) => {
    if (!user) {
      alert("Você precisa estar logado para favoritar um evento.");
      return;
    }

    toggleFavorite(event); // Chamando a função do context para alternar o favorito
  };

  return (
    <div className="catalogo-completo-container">
      <header className="catalogo-header">
        <h1>Catálogo de Eventos</h1>

        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar eventos"
            className="search-input"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="filters-container">
          <select
            className="date-filter"
            value={filters.dateFilter}
            onChange={(e) => setFilters({ ...filters, dateFilter: e.target.value })}
          >
            <option value="all">Data</option>
            <option value="today">Hoje</option>
            <option value="tomorrow">Amanhã</option>
            <option value="weekend">Este fim de semana</option>
            <option value="next7days">Próxima semana</option>
            <option value="nextMonth">Este mês</option>
          </select>

          <select
            id="categoria"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="">Categoria</option>
            <option value="1">Turísticos</option>
            <option value="2">Religiosos</option>
            <option value="3">Culturais</option>
            <option value="4">De lazer</option>
            <option value="5">Desportivos</option>
            <option value="6">Artísticos</option>
            <option value="7">Cívicos</option>
            <option value="8">Científicos</option>
            <option value="9">Promocionais</option>
          </select>

          <select
            className="select-filters"
            value={filters.priceFilter}
            onChange={(e) => setFilters({ ...filters, priceFilter: e.target.value })}
          >
            <option value="all">Preços</option>
            <option value="free">Gratuitos</option>
            <option value="paid">Pagos</option>
          </select>
        </div>
      </header>

      {isLoading && <p className="loading-message">Carregando eventos...</p>}
      {isError && <p className="error-message">{error.message}</p>}

      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.slice(0, 8).map((event) => (
            <div key={event.eventId} className="event-card">
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

              {user ? (
                <button
                  className={`favorite-button ${isFavorite(event.eventId) ? "filled" : ""}`}
                  onClick={() => handleFavoriteClick(event)}
                >
                  {isFavorite(event.eventId) ? <FaHeart /> : <FaRegHeart />}
                </button>
              ) : (
                <button
                  className="favorite-button"
                  onClick={() => alert("Você precisa estar logado para favoritar um evento.")}
                >
                  <FaRegHeart />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Nenhum evento encontrado.</p>
        )}
      </div>
    </div>
  );
}
