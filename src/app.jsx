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
import ForgotPassword from "./components/auth/forgotpassword/ForgotPassword";  

import Navbar from "./components/layout/navbar/navbar";

import { EventsProvider } from "./components/EventsProvider";
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

const queryClient = new QueryClient();

function ProtectedRoute({ element, requiredRole }) {
  const { user, loading, error } = useAuth();
  
  if (loading) return <div>Carregando...</div>;
  
  if (error) return <div>{error}</div>;
  
  const hasAccess = requiredRole === 'admin' 
    ? user?.email === "teste@example.com" 
    : !!user;
    
  return hasAccess ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <QueryClientProvider client={queryClient}>
          <EventsProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/catalogocompleto" element={<CatalogoCompleto />} />
                <Route path="/explorar" element={<MapExploracao />} />
                <Route path="/login" element={<LoginModal />} />
                <Route path="/cadastro" element={<CadastroModal />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/recuperar-senha" element={<ForgotPassword />} />
                <Route path="/admin" element={<ProtectedRoute element={<PainelAdmin />} requiredRole="admin" />} />
                <Route path="/admin/adicionar" element={<ProtectedRoute element={<AdicionarEvento />} requiredRole="admin" />} />
                <Route path="/favoritos" element={<ProtectedRoute element={<FavoritosPage />} requiredRole="user" />} />
              </Routes>
            </BrowserRouter>
          </EventsProvider>
        </QueryClientProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
