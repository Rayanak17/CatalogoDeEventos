import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home/home"; // Sua página Home
import Catalogo from "./pages/catalogo/Catalog"; // Catálogo resumido
import CatalogoCompleto from "./pages/catalogocompleto/catalogocompleto"; // Catálogo completo
import "./Modalscontroller"

// Importando as novas páginas
import MapExploracao from "./pages/mapexploration/MapExploration"; // Mapa de Exploração
import LoginModal from "./pages/login/LoginModal"; // Modal de Login
import CadastroModal from "./pages/signup/SignupModal"; // Modal de Cadastro
import PainelAdmin from "./pages/admin/PainelAdmin"; // Painel do Admin
import AdicionarEvento from "./pages/admin/AddEvento"; // Formulário para adicionar eventos

// Criando uma instância do QueryClient
const queryClient = new QueryClient();

function App() {
  // Controle de login/admin (simulação básica)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Simulação do login (exemplo simples)
  const handleLogin = (email, senha) => {
    if (email === "admin@email.com" && senha === "admin123") {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else {
      setIsAdmin(false);
      setIsLoggedIn(true);
    }
  };

  return (
    // Provedor do React Query englobando o app inteiro
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogocompleto" element={<CatalogoCompleto />} />
          <Route path="/explorar" element={<MapExploracao />} />
          <Route path="/login" element={<LoginModal onLogin={handleLogin} />} />
          <Route path="/cadastro" element={<CadastroModal />} />

          {/* Rotas protegidas - só para admin */}
          <Route
            path="/admin"
            element={isAdmin ? <PainelAdmin /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/adicionar"
            element={isAdmin ? <AdicionarEvento /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
