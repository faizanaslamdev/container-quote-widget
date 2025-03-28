import React from 'react';
import { createRoot } from 'react-dom/client';
import QuoteForm from './components/QuoteForm';

// Create a function to initialize the widget
window.initContainerQuoteWidget = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container element with id "${containerId}" not found`);
    return;
  }

  const root = createRoot(container);
  root.render(<QuoteForm />);
}; 