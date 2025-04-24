import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [events, setEvents] = useState([]); // Armazenar eventos
  const [favoritos, setFavoritos] = useState([]); // Armazenar eventos favoritos
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const token = localStorage.getItem('token'); // Recupera o token de autenticação

  useEffect(() => {
    // Função para carregar eventos
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_EVENT_SERVICE_URL}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data); // Armazena os eventos no estado
      } catch (error) {
        console.error('Erro ao carregar eventos', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    // Função para carregar favoritos
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_FAVORITES_API_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const favoriteIds = response.data.map((favorite) => favorite.eventId);
        setFavoritos(favoriteIds); // Armazena os favoritos no estado
      } catch (error) {
        console.error('Erro ao carregar favoritos', error);
      }
    };

    fetchEvents();
    fetchFavorites();
  }, [token]);

  // Função para alternar entre favoritar e desfavoritar
  const toggleFavorite = async (eventId) => {
    try {
      if (favoritos.includes(eventId)) {
        // Se o evento já é favorito, desfavorita
        await axios.delete(`${process.env.VITE_FAVORITES_API_URL}/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoritos(favoritos.filter((id) => id !== eventId)); // Atualiza o estado removendo o evento dos favoritos
      } else {
        // Caso contrário, favoritar
        await axios.post(`${process.env.VITE_FAVORITES_API_URL}`, { eventId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoritos([...favoritos, eventId]); // Atualiza o estado adicionando o evento aos favoritos
      }
    } catch (error) {
      console.error('Erro ao favoritar/desfavoritar:', error);
    }
  };

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  return (
    <div>
      <h2>Eventos</h2>
      <div>
        {events.length === 0 ? (
          <p>Nenhum evento encontrado.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} style={{ marginBottom: '20px' }}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <button onClick={() => toggleFavorite(event.id)}>
                {favoritos.includes(event.id) ? 'Desfavoritar' : 'Favoritar'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyComponent;
