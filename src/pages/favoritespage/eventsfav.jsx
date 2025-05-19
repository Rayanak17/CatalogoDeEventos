// src/pages/favoritespage/EventsFav.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useEvents } from "../../context/eventsContext.jsx";
import { useNavigate } from "react-router-dom";
import "./eventsfav.css";

const EventsFav = () => {
  const { user } = useAuth();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { categories } = useEvents();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!user) {
    return (
      <div className="favorites-page">
        <p>Por favor, faça login para ver seus eventos favoritos.</p>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Ir para Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="favorites-page">
        <p>Carregando seus eventos favoritos...</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h2>Eventos Favoritos</h2>

      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((event) => {
            const start = new Date(event.startDateTime);
            const dateStr = isNaN(start)
              ? "Data não informada"
              : start.toLocaleDateString("pt-BR");
            const timeStr = isNaN(start)
              ? "Horário não informado"
              : start.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
            const address = [
              event.eventAddressStreet,
              event.eventAddressNumber,
              event.eventAddressComplement,
              event.eventAddressNeighborhood,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <li key={event.eventId} className="favorite-card">
                <div className="favorite-card-left">
                  <div className="favorite-card-header">
                    <h3>{event.eventTitle}</h3>
                    <span
                      className="favorite-toggle"
                      onClick={() => toggleFavorite(event)}
                    >
                      {isFavorite(event.eventId) ? "❤" : "🤍"}
                    </span>
                  </div>

                  <div className="favorite-card-info">
                    <p>
                      <strong>Data:</strong> {dateStr}
                    </p>
                    <p>
                      <strong>Horário:</strong> {timeStr}
                    </p>
                    <p>
                      <strong>Endereço:</strong> {address || "Não informado"}
                    </p>
                  </div>

                  <p className="favorite-card-description">
                    {event.eventDescription}
                  </p>

                  <div className="favorite-card-tags">
                    <span className="favorite-tag">
                      {Number(event.eventPrice) > 0
                        ? `A partir de $${event.eventPrice}`
                        : "Gratuito"}
                    </span>
                    <span className="favorite-tag">
                      {
                        categories.find(
                          (category) =>
                            category.categoryId === event.eventCategoryId
                        )?.categoryName || "Categoria não encontrada"
                      }
                    </span>
                  </div>

                  <a
                    href={event.eventUrl}
                    className="favorite-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website do evento
                  </a>
                </div>

                <div className="favorite-card-map">
                  {event.latitude && event.longitude ? (
                    <img
                      src={`https://event-service-eventscatalog.onrender.com/map?latitude=${event.latitude}&longitude=${event.longitude}`}
                      alt="Mapa do evento"
                      className="favorite-map-img"
                    />
                  ) : (
                    <div className="favorite-no-img">Imagem não disponível</div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Você ainda não tem eventos favoritos.</p>
      )}
    </div>
  );
};

export default EventsFav;
