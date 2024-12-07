import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./DarkModeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <Provider store={store}>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </Provider>
  </StrictMode>
);
