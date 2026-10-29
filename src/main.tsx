import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import '@fontsource-variable/big-shoulders-display/wght';
import '@fontsource-variable/bricolage-grotesque/wght';
import '@fontsource/instrument-serif/latin-400';
import '@fontsource/instrument-serif/latin-400-italic';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { inject } from '@vercel/analytics';

// Vercel Web Analytics (visitas en el panel de Vercel); sigue los cambios de página solo
inject({ mode: import.meta.env.PROD ? 'production' : 'development' });

const root = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);

// Si la página ya viene armada (prerender), React solo la "despierta"; si no, la dibuja
if (root.hasChildNodes()) hydrateRoot(root, tree);
else createRoot(root).render(tree);
