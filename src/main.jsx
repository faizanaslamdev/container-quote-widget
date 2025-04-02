import React from "react";
import ReactDOM from "react-dom/client";
import QuoteForm from "./components/QuoteForm";
import "./styles/QuoteForm.css";

// Create a function to initialize the widget
window.initQuoteWidget = function (containerId = "quote-widget-container") {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <QuoteForm />
      </React.StrictMode>
    );
  }
};

// Auto-initialize if the default container exists
document.addEventListener("DOMContentLoaded", () => {
  window.initQuoteWidget();
});
