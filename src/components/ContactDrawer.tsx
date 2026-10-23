import { useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDrawer } from '../context/DrawerContext';
import { trackPhoneClick } from '../lib/analytics';
import { ContactForm } from './site/ContactForm';
import { PHONE, PHONE_HREF } from '../content/home';

/** Panel lateral con el formulario de consulta (el mismo de la home). */
export const ContactDrawer = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const { language } = useLanguage();
  const es = language === 'es';

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeDrawer();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeDrawer]);

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div onClick={closeDrawer} className={`absolute inset-0 bg-ink/60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={es ? 'Consulta gratis' : 'Free consultation'}
        className={`absolute inset-y-0 right-0 flex w-full max-w-lg flex-col overflow-y-auto border-l border-ink/10 bg-paper transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-start justify-between gap-4 bg-guinda px-6 pb-6 pt-7 text-paper">
          <div>
            <div className="eyebrow text-paper/70">{es ? 'Revisión gratis' : 'Free case review'}</div>
            <h2 className="poster mt-2 text-5xl">
              {es ? 'Cuéntanos' : 'Tell us'}
              <span className="accent block text-3xl text-paper/85">{es ? 'qué pasó.' : 'what happened.'}</span>
            </h2>
          </div>
          <button type="button" onClick={closeDrawer} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-ink" aria-label={es ? 'Cerrar' : 'Close'}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 p-6">
          {isOpen ? <ContactForm source="contact_form_drawer" /> : null}
          <a href={PHONE_HREF} onClick={() => trackPhoneClick('drawer')} className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-ink/15 bg-white py-4 font-display text-2xl font-extrabold text-guinda">
            <Phone className="h-5 w-5" /> {es ? 'O llama:' : 'Or call:'} {PHONE}
          </a>
        </div>
      </aside>
    </div>
  );
};
