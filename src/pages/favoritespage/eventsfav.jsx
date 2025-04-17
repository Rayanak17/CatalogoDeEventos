import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import "./eventsfav.css";

const EventsFav = () => {
  const { user } = useAuth();  // Acessando os dados do usuário do AuthContext
  const { favorites } = useFavorites();  // Acessando os eventos favoritos do FavoritesContext
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    // Verifica se o usuário está logado e se favorites é um array
    if (user && Array.isArray(favorites)) {
      // Filtra os eventos favoritos do usuário
      const filteredFavorites = favorites.filter(event => event.userId === user.id);
      setUserFavorites(filteredFavorites);
    }
  }, [user, favorites]);  // Recalcula sempre que o usuário ou os favoritos mudarem

  // Exibe mensagem de erro caso o usuário não esteja logado
  if (!user) {
    return <div>Por favor, faça login para ver seus eventos favoritos.</div>;
  }

  // Exibe mensagem caso não haja favoritos
  if (userFavorites.length === 0) {
    return (
      <div className="events-favorites">
        <h2>Eventos Favoritos de {user?.name}</h2>
        <p>Você ainda não tem eventos favoritos.</p>
      </div>
    );
  }

  return (
    <div className="events-favorites">
      <h2>Eventos Favoritos de {user?.name}</h2>
      <ul>
        {userFavorites.map((event, index) => (
          <li key={index}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsFav;
