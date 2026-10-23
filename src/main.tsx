import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QuizProvider } from "./contexts/QuizContext.tsx";

createRoot(document.getElementById("root")!).render(
  <QuizProvider>
    <App />
  </QuizProvider>,
);
