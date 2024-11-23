import 'react-app-polyfill/ie11'; // Para compatibilidad con IE 11 (opcional)
import 'react-app-polyfill/stable'; // Para compatibilidad con características modernas de JavaScript
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Router } from "./router.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>
);
