import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import "./navbar.css";
import { User } from "lucide-react";

const Navbar = ({ onLoginClick }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Estado para o menu do usuário
  const menuRef = useRef(null); // Ref para o menu do usuário

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false); // Fecha o menu se clicar fora
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fechar o menu do usuário quando o menu de navegação for aberto
    if (menuOpen) {
      setUserMenuOpen(false); // Fecha o menu de usuário
    }
  }, [menuOpen]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">JampaEvents</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/sobre">Sobre nós</Link></li>
          <li><Link to="/catalogocompleto">Eventos</Link></li>
          <li><Link to="/explorar">Mapa</Link></li>
        </ul>
        <div className="nav-buttons">
          {user ? (
            <div className="user-menu" ref={menuRef} onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <User className="user-icon" />
              {userMenuOpen && (
                <div className="dropdown-menu">
                  <Link to="/favoritos">Eventos Favoritos</Link>
                  {(user?.email === "lucasm241301@gmail.com" || user?.email === "rayanatxr@gmail.com") && (
                    <Link to="/admin/adicionar">Adicionar Evento</Link>
                  )}
                  <button className="logout-btn" onClick={logout}>Sair</button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={onLoginClick}>Login</button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
