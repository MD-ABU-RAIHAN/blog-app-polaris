import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

//Import React
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

createRoot(document.getElementById("root")).render(
  <AppProvider i18n={enTranslations}>
    <App />
  </AppProvider>
);
