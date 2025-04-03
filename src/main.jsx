import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // Certo
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./useAuth.jsx"; // Caminho certo

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
