import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home/home.jsx';
import Catalogo from './components/layout/catalogo/Catalog.jsx';
import CatalogoCompleto from './components/layout/catalogocompleto/Catalogocompleto.jsx';
import MapExploracao from './components/layout/mapexploration/MapExploration.jsx';
import LoginModal from './components/auth/login/LoginModal.jsx';
import CadastroModal from './components/auth/signup/SignupModal.jsx';
import PainelAdmin from './pages/admin/PainelAdmin.jsx';
import AdicionarEvento from './pages/admin/AddEvent.jsx';
import FavoritosPage from './pages/favoritespage/eventsfav.jsx';
import Sobre from './pages/sobre/sobrenos.jsx';
import ForgotPassword from './components/auth/forgotpassword/ForgotPassword.jsx';  
import Navbar from './components/layout/navbar/navbar.jsx';
import Footer from './components/layout/footer/footer.jsx'; // Importando Footer
import { EventsProvider } from './components/EventsProvider.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

const queryClient = new QueryClient();

function ProtectedRoute({ element, requiredRole }) {
  const { user, loading, error } = useAuth();
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Ocorreu um erro. Tente novamente mais tarde.</div>;
  
  const hasAccess = requiredRole === 'admin'
    ? user?.role === "admin" 
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
              <Navbar /> {/* Navbar exibida em todas as páginas */}
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
              <Footer /> {/* Footer exibido em todas as páginas */}
            </BrowserRouter>
          </EventsProvider>
        </QueryClientProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
