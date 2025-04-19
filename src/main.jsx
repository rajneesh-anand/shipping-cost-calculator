import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/main.css";
import "./assets/css/elegant-font-icons.css";
import App from "./App.jsx";

import { init, miniApp, mainButton, shareURL } from "@telegram-apps/sdk";

const initializeTelegramSDK = async () => {
  try {
    await init();
    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      await miniApp.setHeaderColor("#fcb69f");
      // console.log("mini app ready");
    }
  } catch (error) {
    console.error("Ошибка инициализации:", error);
  }
};

// Initialize SDK
initializeTelegramSDK();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
