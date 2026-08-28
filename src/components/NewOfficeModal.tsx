import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDrawer } from '../context/DrawerContext';
import { trackEvent } from '../lib/analytics';

const STORAGE_KEY = 'my-law-new-office-seen';

export const NewOfficeModal = () => {
  const { language } = useLanguage();
  const { openDrawer } = useDrawer();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      // sessionStorage unavailable — show anyway
    }
    if (seen) return;

    // Wait for the loading screen + hero animation to settle before appearing
    const timer = setTimeout(() => {
      setIsVisible(true);
      trackEvent('new_office_popup', { action: 'shown' });
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // ignore
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsVisible(false);
    trackEvent('new_office_popup', { action: 'closed' });
  };

  const goToForm = () => {
    setIsVisible(false);
    trackEvent('new_office_popup', { action: 'clicked_to_form' });
    openDrawer('new_office_popup');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[65] w-[calc(100%-2rem)] max-w-md bg-white rounded-sm shadow-2xl overflow-hidden border-t-4 border-gold"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'es' ? 'El Toro tiene nuevo corral' : 'The Bull has a new corral'}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label={language === 'es' ? 'Cerrar aviso' : 'Close notice'}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Office photo — clicking it opens the consultation form */}
            <button onClick={goToForm} className="block w-full text-left cursor-pointer group">
              <div className="relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1787936945/OFFICE_dnxpyh.jpg"
                  alt={language === 'es' ? 'Nueva oficina de Mario Yague Law — 1331 Wyoming Ave, El Paso' : 'Mario Yague Law new office — 1331 Wyoming Ave, El Paso'}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-4 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-sm">
                  {language === 'es' ? '¡Nuevo Corral!' : 'New Corral!'}
                </span>
              </div>
            </button>

            <div className="p-6 text-center">
              <h3 className="text-2xl font-serif text-burgundy mb-2 leading-tight">
                {language === 'es' ? 'El Toro tiene nuevo corral 🐂' : 'The Bull has a new corral 🐂'}
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed mb-4">
                {language === 'es'
                  ? 'Nos mudamos para atenderte mejor. Misma fuerza, mismo corazón — nuevo hogar. Ven a visitarnos:'
                  : 'We moved to serve you better. Same strength, same heart — new home. Come visit us:'}
              </p>
              <div className="inline-flex items-center gap-2 text-charcoal font-bold text-sm mb-6">
                <MapPin className="w-4 h-4 text-burgundy flex-shrink-0" />
                1331 Wyoming Ave, El Paso, TX 79902
              </div>
              <button
                onClick={goToForm}
                className="w-full bg-burgundy text-beige py-3.5 font-bold uppercase tracking-widest text-xs hover:bg-burgundy-dark transition-all shadow-lg shadow-burgundy/20 flex items-center justify-center gap-2 rounded-sm"
              >
                {language === 'es' ? 'Agenda tu Consulta Gratis' : 'Book Your Free Consultation'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
