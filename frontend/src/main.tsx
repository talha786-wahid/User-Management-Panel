import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

async function prepare() {
  if (import.meta.env.VITE_USE_MOCK_API === "true") {
    const { worker } = await import("./shared/mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
