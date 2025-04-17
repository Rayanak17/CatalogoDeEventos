import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/home/home";
import Catalogo from "./components/layout/catalogo/Catalog";
import CatalogoCompleto from "./components/layout/catalogocompleto/catalogocompleto";
import MapExploracao from "./components/layout/mapexploration/MapExploration";
import LoginModal from "./components/auth/login/LoginModal";
import CadastroModal from "./components/auth/signup/SignupModal";
import PainelAdmin from "./pages/admin/PainelAdmin";
import AdicionarEvento from "./pages/admin/AddEvent";
import FavoritosPage from "./pages/favoritespage/eventsfav";
import Sobre from "./pages/sobre/sobrenos";


import Navbar from "./components/layout/navbar/navbar"

import { EventsProvider } from "./components/EventsProvider";
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

const queryClient = new QueryClient();

function PrivateRoute({ element }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  return user ? element : <Navigate to="/login" />;
}

function AdminRoute({ element }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  const isAdmin = user?.email === "teste@example.com";
  return isAdmin ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <QueryClientProvider client={queryClient}>
          <EventsProvider>
            <BrowserRouter>
              <Navbar /> {/* <-- Aqui está a Navbar sendo renderizada em todas as rotas */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/catalogocompleto" element={<CatalogoCompleto />} />
                <Route path="/explorar" element={<MapExploracao />} />
                <Route path="/login" element={<LoginModal />} />
                <Route path="/cadastro" element={<CadastroModal />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/admin" element={<AdminRoute element={<PainelAdmin />} />} />
                <Route path="/admin/adicionar" element={<AdminRoute element={<AdicionarEvento />} />} />
                <Route path="/favoritos" element={<PrivateRoute element={<FavoritosPage />} />} />
              </Routes>
            </BrowserRouter>
          </EventsProvider>
        </QueryClientProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
