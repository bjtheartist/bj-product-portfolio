/**
 * index.neobrutalist.tsx
 * 
 * WHAT THIS FILE DOES:
 * This is the "entry point" - the very first file that runs when someone visits your site.
 * It tells React: "Start here and render the App component."
 * 
 * HOW TO USE:
 * To switch to the neobrutalist design:
 * 1. Backup your current index.tsx
 * 2. Rename this file to index.tsx
 * 
 * REACT CONCEPT - "Rendering":
 * React "renders" your components, which means it converts your code
 * into actual HTML that browsers can display. This file kicks off that process.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import AppNeobrutalist from './AppNeobrutalist';

// Find the HTML element with id="root" and render our app inside it
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AppNeobrutalist />
    </React.StrictMode>
  );
}
