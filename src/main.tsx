import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PaletteProvider } from "./context/PaletteContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PaletteProvider>
        <App />
      </PaletteProvider>
    </BrowserRouter>
  </StrictMode>,
);
