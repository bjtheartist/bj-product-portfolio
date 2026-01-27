/**
 * index.tsx - Entry Point with Design Switcher
 * 
 * WHAT THIS FILE DOES:
 * This is the starting point of your website. It decides which design to show:
 * - The original TemsVision design (App.tsx)
 * - The new Neobrutalist design (AppNeobrutalist.tsx)
 * 
 * HOW TO SWITCH DESIGNS:
 * Change the USE_NEOBRUTALIST_DESIGN variable below:
 * - true = New neobrutalist design
 * - false = Original design
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App (neobrutalist with ThemeProvider)
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
