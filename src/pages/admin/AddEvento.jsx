import React, { useState } from 'react';

const AdicionarEvento = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, descricao, localizacao }); // Aqui faria a requisição ao backend
    alert('Evento adicionado com sucesso!');
  };

  return (
    <div>
      <h2>Adicionar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome do Evento" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <input type="text" placeholder="Localização" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required />
        <button type="submit">Adicionar Evento</button>
      </form>
    </div>
  );
};

export default AdicionarEvento;
