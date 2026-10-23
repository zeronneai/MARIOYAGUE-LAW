import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../translations';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Ruta en el idioma actual: lp('/faq') => '/es/faq' en español */
  lp: (path: string) => string;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** El idioma vive en la URL: /es/... es español, todo lo demás inglés. Así Google e IAs ven las dos versiones. */
export const langFromPath = (path: string): Language => (path === '/es' || path.startsWith('/es/') ? 'es' : 'en');
export const stripLang = (path: string) => (langFromPath(path) === 'es' ? path.replace(/^\/es(?=\/|$)/, '') || '/' : path);
export const withLang = (path: string, lang: Language) => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return clean;
  return clean === '/' ? '/es' : `/es${clean}`;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = langFromPath(location.pathname);

  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === language) return;
      try {
        localStorage.setItem('lang', lang);
      } catch {
        /* sin almacenamiento */
      }
      navigate(withLang(stripLang(location.pathname), lang) + location.search + location.hash);
    },
    [language, location, navigate],
  );

  const lp = useCallback((path: string) => {
    const [p, hash] = path.split('#');
    return withLang(p || '/', language) + (hash ? `#${hash}` : '');
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, lp, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
