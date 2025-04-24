import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx';

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("O elemento com id 'root' não foi encontrado no HTML.");
}
