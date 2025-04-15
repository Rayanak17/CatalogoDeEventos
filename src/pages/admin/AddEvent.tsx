import React, { useState } from 'react';
import './AddEvent.css'; // Certifique-se de que o caminho do CSS está correto

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventDescription: '',
    eventLink: '',
    eventPrice: 0,
    eventAddressStreet: '',
    eventAddressNumber: '',
    eventAddressNeighborhood: '',
    eventAddressComplement: '',
    startDateTime: '',
    endDateTime: '',
    eventAccessibilityLevel: '',
    eventCategoryId: '',
    eventOrganizerId: ''
  });

  const organizers = [
    { id: '1', name: 'Organizador A' },
    { id: '2', name: 'Organizador B' },
    { id: '3', name: 'Organizador C' }
  ];

  const categories = [
    { id: '1', name: 'Categoria 1' },
    { id: '2', name: 'Categoria 2' },
    { id: '3', name: 'Categoria 3' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Evento adicionado com sucesso!');
  };

  return (
    <div className="add-event-page">
      <h2>Adicionar Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="eventTitle">Título do Evento:</label>
            <input
              type="text"
              id="eventTitle"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleInputChange}
              placeholder="Título do Evento"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="eventLink">Link do Evento:</label>
            <input
              type="url"
              id="eventLink"
              name="eventLink"
              value={formData.eventLink}
              onChange={handleInputChange}
              placeholder="Link do Evento"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="eventDescription">Descrição do Evento:</label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleInputChange}
              placeholder="Descrição do Evento"
            />
          </div>

          <div className="input-group">
            <label htmlFor="eventPrice">Preço:</label>
            <input
              type="number"
              id="eventPrice"
              name="eventPrice"
              value={formData.eventPrice}
              onChange={handleInputChange}
              placeholder="Preço"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="eventAddressStreet">Rua:</label>
            <input
              type="text"
              id="eventAddressStreet"
              name="eventAddressStreet"
              value={formData.eventAddressStreet}
              onChange={handleInputChange}
              placeholder="Rua"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="eventAddressNumber">Número:</label>
            <input
              type="text"
              id="eventAddressNumber"
              name="eventAddressNumber"
              value={formData.eventAddressNumber}
              onChange={handleInputChange}
              placeholder="Número"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="eventAddressNeighborhood">Bairro:</label>
            <input
              type="text"
              id="eventAddressNeighborhood"
              name="eventAddressNeighborhood"
              value={formData.eventAddressNeighborhood}
              onChange={handleInputChange}
              placeholder="Bairro"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="eventAddressComplement">Complemento:</label>
            <input
              type="text"
              id="eventAddressComplement"
              name="eventAddressComplement"
              value={formData.eventAddressComplement}
              onChange={handleInputChange}
              placeholder="Complemento"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="startDateTime">Data e Hora de Início:</label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="endDateTime">Data e Hora de Fim:</label>
            <input
              type="datetime-local"
              id="endDateTime"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="eventAccessibilityLevel">Nível de Acessibilidade:</label>
            <select
              id="eventAccessibilityLevel"
              name="eventAccessibilityLevel"
              value={formData.eventAccessibilityLevel}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="SEM_ACESSIBILIDADE">Sem Acessibilidade</option>
              <option value="ACESSIBILIDADE_BASICA">Acessibilidade Básica</option>
              <option value="ACESSIBILIDADE_AUDITIVA">Acessibilidade Auditiva</option>
              <option value="ACESSIBILIDADE_VISUAL">Acessibilidade Visual</option>
              <option value="ACESSIBILIDADE_COMPLETA">Acessibilidade Completa</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="eventCategoryId">Categoria do Evento:</label>
            <select
              id="eventCategoryId"
              name="eventCategoryId"
              value={formData.eventCategoryId}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma Categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="eventOrganizerId">Organizador do Evento:</label>
            <select
              id="eventOrganizerId"
              name="eventOrganizerId"
              value={formData.eventOrganizerId}
              onChange={handleInputChange}
            >
              <option value="">Selecione um Organizador</option>
              {organizers.map((organizer) => (
                <option key={organizer.id} value={organizer.id}>
                  {organizer.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit">Adicionar Evento</button>
      </form>
    </div>
  );
};

export default AddEvent;
