import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QuizProvider } from "./contexts/QuizContext.tsx";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>,
);
