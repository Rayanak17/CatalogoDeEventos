import React, { useState } from 'react';
import "./AddEvent.css";

const AdicionarEvento = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventAddressStreet, setEventAddressStreet] = useState('');
  const [eventAddressNumber, setEventAddressNumber] = useState('');
  const [eventAddressNeighborhood, setEventAddressNeighborhood] = useState('');
  const [eventAddressComplement, setEventAddressComplement] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [eventAccessibilityLevel, setEventAccessibilityLevel] = useState('');
  const [eventCategoryId, setEventCategoryId] = useState('');
  const [eventOrganizerId, setEventOrganizerId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      eventTitle,
      eventDescription,
      eventLink,
      eventPrice,
      eventAddressStreet,
      eventAddressNumber,
      eventAddressNeighborhood,
      eventAddressComplement,
      startDateTime,
      endDateTime,
      eventAccessibilityLevel,
      eventCategoryId,
      eventOrganizerId
    };
    console.log(eventData);
    alert('Evento adicionado com sucesso!');
  };

  return (
    <div className="add-event-page">
      <h2>Adicionar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="text"
            placeholder="Título do Evento"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Link do Evento"
            value={eventLink}
            onChange={(e) => setEventLink(e.target.value)}
            required
          />
        </div>

        <textarea
          placeholder="Descrição do Evento"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        />

        <div className="input-row">
          <input
            type="number"
            placeholder="Preço do Evento"
            value={eventPrice}
            onChange={(e) => setEventPrice(e.target.value)}
            required
          />
          <select
            value={eventAccessibilityLevel}
            onChange={(e) => setEventAccessibilityLevel(e.target.value)}
            required
          >
            <option value="">Nível de Acessibilidade</option>
            <option value="baixo">Baixo</option>
            <option value="medio">Médio</option>
            <option value="alto">Alto</option>
          </select>
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Rua"
            value={eventAddressStreet}
            onChange={(e) => setEventAddressStreet(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Número"
            value={eventAddressNumber}
            onChange={(e) => setEventAddressNumber(e.target.value)}
            required
          />
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Bairro"
            value={eventAddressNeighborhood}
            onChange={(e) => setEventAddressNeighborhood(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Complemento"
            value={eventAddressComplement}
            onChange={(e) => setEventAddressComplement(e.target.value)}
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="startDateTime">Data de Início</label>
            <input
              type="datetime-local"
              id="startDateTime"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="endDateTime">Data de Término</label>
            <input
              type="datetime-local"
              id="endDateTime"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-row">
  <div className="input-group">
    <label htmlFor="eventCategoryId">Categoria do Evento</label>
    <select
      id="eventCategoryId"
      value={eventCategoryId}
      onChange={(e) => setEventCategoryId(e.target.value)}
      required
    >
      <option value="">Selecione uma categoria</option>
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
  </div>

  <div className="input-group">
    <label htmlFor="eventOrganizerId">Organizador do Evento</label>
    <select
      id="eventOrganizerId"
      value={eventOrganizerId}
      onChange={(e) => setEventOrganizerId(e.target.value)}
      required
    >
      <option value="">Selecione um organizador</option>
      <option value="1">Organizador 1</option>
      <option value="2">Organizador 2</option>
    </select>
      </div>
      </div>

        <button type="submit">Adicionar Evento</button>
      </form>
    </div>
  );
};

export default AdicionarEvento;
