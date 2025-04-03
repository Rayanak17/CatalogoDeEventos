import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import "./navbar.css";
import { User } from "lucide-react";

const Navbar = ({ onLoginClick }) => {
  const { user, logout, favoriteEvents } = useAuth();

  console.log("Usuário atual:", user); // Depuração para ver se o usuário está sendo atualizado

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">NomeSite</div>
        <ul className="nav-links">
          <li><Link to="/about">Sobre nós</Link></li>
          <li><Link to="/events">Eventos</Link></li>
          <li><Link to="/map">Mapa</Link></li>
          <li><Link to="/help">Ajuda</Link></li>
        </ul>
        <div className="nav-buttons">
          {user ? (
            <div className="user-menu" ref={menuRef} onClick={() => setMenuOpen(!menuOpen)}>
            <User className="user-icon" />
            {menuOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile">Eventos Favoritos</Link>
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
