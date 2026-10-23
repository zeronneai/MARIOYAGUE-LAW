/** Prerender: arma el HTML de cada página al compilar, para Google y las IAs (que no corren JavaScript). */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App, { PAGES } from './App';
import { LanguageProvider } from './context/LanguageContext';
import { SeoCollectorContext, type SeoCollected } from './seo/useSeo';

export const ROUTES = PAGES.map(([p]) => p);

export function render(url: string) {
  const seo: SeoCollected = {};
  const html = renderToString(
    <StrictMode>
      <SeoCollectorContext.Provider value={seo}>
        <StaticRouter location={url}>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </StaticRouter>
      </SeoCollectorContext.Provider>
    </StrictMode>,
  );
  return { html, seo };
}
