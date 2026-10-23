/**
 * Mario Yague Law · El Toro
 * Las rutas existen en inglés (/faq) y en español (/es/faq) para que Google y las IAs indexen las dos.
 */
import { lazy, Suspense, useEffect, type ReactElement } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DrawerProvider } from './context/DrawerContext';
import { ContactDrawer } from './components/ContactDrawer';
import { Nav } from './components/site/Nav';
import { Footer } from './components/site/Footer';
import { MobileBar } from './components/site/MobileBar';
import { HomePage } from './pages/HomePage';
import { FAQPage } from './pages/FAQPage';
import { PersonalInjuryPage } from './pages/PersonalInjuryPage';
import { CriminalDefensePage } from './pages/CriminalDefensePage';
import { FamilyLawPage } from './pages/FamilyLawPage';
import { DWIDefensePage } from './pages/DWIDefensePage';
import { DeChoqueAChequePage } from './pages/DeChoqueAChequePage';
import { useAnalytics } from './hooks/useAnalytics';
import { stripLang } from './context/LanguageContext';

// Landing de anuncios: va aparte para que nunca cargue para los demás
const PesadillasFunnelPage = lazy(() => import('./pages/PesadillasFunnelPage'));

export const PAGES: [string, () => ReactElement][] = [
  ['/', () => <HomePage />],
  ['/faq', () => <FAQPage />],
  ['/personal-injury', () => <PersonalInjuryPage />],
  ['/criminal-defense', () => <CriminalDefensePage />],
  ['/family-law', () => <FamilyLawPage />],
  ['/dwi-defense', () => <DWIDefensePage />],
  ['/de-choque-a-cheque', () => <DeChoqueAChequePage />],
];

export default function App() {
  const { pathname } = useLocation();
  const isStandalone = stripLang(pathname) === '/pesadillas';
  useAnalytics();

  // la etiqueta <html lang> sigue al idioma de la página
  useEffect(() => {
    document.documentElement.lang = pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
  }, [pathname]);

  return (
    <DrawerProvider>
      {!isStandalone && <Nav />}
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <Routes>
          {PAGES.map(([path, el]) => (
            <Route key={path} path={path} element={el()} />
          ))}
          {PAGES.map(([path, el]) => (
            <Route key={`es${path}`} path={path === '/' ? '/es' : `/es${path}`} element={el()} />
          ))}
          <Route path="/pesadillas" element={<PesadillasFunnelPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
      {!isStandalone && (
        <>
          <Footer />
          <MobileBar />
          <ContactDrawer />
        </>
      )}
    </DrawerProvider>
  );
}
