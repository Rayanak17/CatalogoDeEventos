// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"; // Sua página Home
import Catalogo from "./pages/catalogo/Catalog"; // Catálogo resumido
import CatalogoCompleto from "./pages/catalogocompleto/catalogocompleto"; // Catálogo completo

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Página principal */}
      <Route path="/catalogo" element={<Catalogo />} /> {/* Catálogo resumido */}
      <Route path="/catalogocompleto" element={<CatalogoCompleto />} /> {/* Catálogo completo */}
    </Routes>
  );
}
