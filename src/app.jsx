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
import { EventsProvider } from "./components/EventsProvider";
import { AuthProvider, useAuth } from './context/AuthContext';

const queryClient = new QueryClient();

function PrivateRoute({ element }) {
  const { user } = useAuth(); // Pegando o usuário do contexto
  return user ? element : <Navigate to="/login" />;
}

function AdminRoute({ element }) {
  const { user } = useAuth();
  return user?.email === "teste@example.com" ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <EventsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/catalogocompleto" element={<CatalogoCompleto />} />
              <Route path="/explorar" element={<MapExploracao />} />
              <Route path="/login" element={<LoginModal />} />
              <Route path="/cadastro" element={<CadastroModal />} />
              <Route path="/admin" element={<AdminRoute element={<PainelAdmin />} />} />
              <Route path="/admin/adicionar" element={<AdminRoute element={<AdicionarEvento />} />} />
            </Routes>
          </BrowserRouter>
        </EventsProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
