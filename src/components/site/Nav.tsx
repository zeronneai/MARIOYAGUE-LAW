import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useDrawer } from '../../context/DrawerContext';
import { trackLanguageToggle, trackPhoneClick, trackEvent } from '../../lib/analytics';
import { media } from '../../content/media';
import { PHONE, PHONE_HREF } from '../../content/home';

const LINKS = {
  en: [
    ['/#accidents', 'Accidents'],
    ['/#videos', 'Videos'],
    ['/#mario', 'Mario'],
    ['/faq', 'FAQ'],
    ['/#contact', 'Contact'],
  ],
  es: [
    ['/#accidents', 'Accidentes'],
    ['/#videos', 'Videos'],
    ['/#mario', 'Mario'],
    ['/faq', 'Preguntas'],
    ['/#contact', 'Contacto'],
  ],
} as const;

export function Nav() {
  const { language, setLanguage, lp } = useLanguage();
  const { openDrawer } = useDrawer();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const toggleLang = () => {
    const next = language === 'en' ? 'es' : 'en';
    trackLanguageToggle(language, next);
    setLanguage(next);
  };

  const link = (href: string, label: string, cls: string) =>
    href.startsWith('/#') ? (
      <a key={href} href={lp(href)} className={cls} onClick={() => setOpen(false)}>{label}</a>
    ) : (
      <Link key={href} to={lp(href)} className={cls}>{label}</Link>
    );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled || open ? 'bg-paper/95 shadow-[0_2px_0_var(--color-ink)] backdrop-blur' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to={lp('/')} className="flex items-center gap-2.5" aria-label="Mario Yague Law">
          <img src={media.logo} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          <span className="font-display text-[22px] font-black uppercase leading-none tracking-tight text-guinda">
            Mario Yague<span className="block text-[11px] font-bold tracking-[0.3em] text-ink/70">Law · El Toro</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Principal">
          {LINKS[language].map(([href, label]) => link(href, label, 'text-[15px] font-semibold text-ink/80 transition hover:text-toro'))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-6">
          <button type="button" onClick={toggleLang} className="tag !px-2.5 hover:bg-ink hover:text-paper" aria-label={language === 'en' ? 'Ver en español' : 'View in English'}>
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <a href={PHONE_HREF} onClick={() => trackPhoneClick('nav')} className="btn-toro hidden !py-2.5 !text-sm sm:inline-flex">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent('form_drawer_open', { location: 'navbar' });
              openDrawer('navbar');
            }}
            className="btn-line hidden !py-2.5 !text-sm xl:inline-flex"
          >
            {language === 'es' ? 'Consulta gratis' : 'Free consultation'}
          </button>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t-2 border-ink bg-paper px-4 pb-6 pt-2 lg:hidden">
          {LINKS[language].map(([href, label]) => link(href, label, 'block border-b border-ink/10 py-4 font-display text-3xl font-extrabold uppercase text-ink'))}
          <a href={PHONE_HREF} onClick={() => trackPhoneClick('nav_mobile')} className="btn-toro mt-5 w-full">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>
      ) : null}
    </header>
  );
}
