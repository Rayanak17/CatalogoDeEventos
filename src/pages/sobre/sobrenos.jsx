import React from 'react';
import './sobrenos.css'; // Se quiser adicionar estilo depois

const Sobre = () => {
  return (
    <section className="sobre-container">
      <h1>Sobre Nós</h1>

      <div className="foto-container">
        <div>
          <img
            src="../assets/rayana.jpg"  // Usando a imagem importada
            alt="Rayana"
          />
          <p><strong>Rayana</strong></p>
        </div>

        <div>
          <img
            src="../assets/lucas.jpg"  // Usando a imagem importada
            alt="Lucas"
          />
          <p><strong>Lucas</strong></p>
        </div>
      </div>

      <p>Olá!</p>
      <p>Somos Rayana e Lucas, estudantes apaixonados por tecnologia e desenvolvimento de sistemas.</p>

      <p>Atualmente, estamos trabalhando juntos no desenvolvimento de um sistema de catálogo de eventos interativo, que permite explorar locais e atividades em um mapa de forma prática e intuitiva, este projeto é parte do nosso TCC.</p>

      <p>A Rayana atua na parte de front-end, cuidando da interface e da experiência dos usuários. Já o Lucas é responsável pelo back-end, garantindo que toda a lógica da aplicação funcione direito.</p>

      <p>Obrigada por visitar nossa plataforma! 🚀</p>
    </section>
  );
};

export default Sobre;
