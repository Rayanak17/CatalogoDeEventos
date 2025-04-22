import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext'; // Importando o contexto de favoritos
import './eventsfav.css';

const EventsFav = () => {
  const { user } = useAuth(); // Acessando os dados do usuário do AuthContext
  const { favorites, toggleFavorite, isFavorite } = useFavorites(); // Acessando o estado de favoritos e funções de alternância
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userServiceUrl = 'https://user-service-eventscatalog.onrender.com/favorites';
      const userRecentCadastreId = user.id;

      const fetchUserFavorites = async () => {
        try {
          if (!userRecentCadastreId) {
            throw new Error('ID do usuário ausente');
          }

          const token = localStorage.getItem('token');
          const url = `${userServiceUrl}/list?userId=${userRecentCadastreId}`;

          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            // Não estamos mais atualizando o estado de favoritos diretamente aqui.
            // Agora, o estado é gerenciado no contexto.
            setLoading(false);
          } else {
            throw new Error('Falha ao carregar favoritos');
          }
        } catch (error) {
          if (error.response) {
            setError(`Erro ${error.response.status}: ${error.response.data.message}`);
          } else {
            setError(error.message);
          }
          setLoading(false);
        }
      };

      fetchUserFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="events-favorites">
        <p>Por favor, faça login para ver seus eventos favoritos.</p>
        <button onClick={() => navigate('/login')}>Ir para Login</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="events-favorites">
        <p>Carregando seus eventos favoritos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-favorites">
        <h2>Erro ao carregar favoritos</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="events-favorites">
      <h2>Eventos Favoritos de {user?.name || 'Usuário'}</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((event, index) => (
            <li key={index}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              {/* Botão para alternar favorito */}
              <button onClick={() => toggleFavorite(event)}>
                {isFavorite(event.eventId) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você ainda não tem eventos favoritos.</p>
      )}
    </div>
  );
};

export default EventsFav;
