import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Lock, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDrawer } from '../context/DrawerContext';
import { trackFormSubmit, trackPhoneClick } from '../lib/analytics';

// Same form fields, endpoint, and behavior as the Contact section form —
// only rendered in a slide-over panel so visitors keep their scroll position.
export const ContactDrawer = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const { language, t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    caseType: '',
    message: '',
  });

  useEffect(() => {
    if (t.contact.form.options && formData.caseType === '') {
      setFormData(prev => ({ ...prev, caseType: t.contact.form.options[0] }));
    }
  }, [t, formData.caseType]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeDrawer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/xvzwyvjd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        trackFormSubmit('contact_form_drawer', { case_type: formData.caseType });
        setStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          caseType: t.contact.form.options[0],
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    closeDrawer();
    // Reset success state after the exit animation so reopening shows a fresh form
    if (status === 'success') setTimeout(() => setStatus('idle'), 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[80] shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={t.contact.title}
          >
            {/* Header */}
            <div className="bg-charcoal px-6 py-5 flex items-center justify-between border-b-4 border-burgundy flex-shrink-0">
              <div>
                <h2 className="text-xl font-serif text-beige">{t.contact.title}</h2>
                <p className="text-beige/60 text-xs mt-0.5">{t.contact.urgency}</p>
              </div>
              <button
                onClick={handleClose}
                aria-label={language === 'es' ? 'Cerrar' : 'Close'}
                className="w-10 h-10 rounded-full bg-white/10 text-beige flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                    {language === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!'}
                  </h3>
                  <p className="text-charcoal/60 max-w-md">
                    {language === 'es'
                      ? 'Gracias por contactarnos. El Toro revisará tu caso personalmente y te contactaremos a la brevedad.'
                      : 'Thank you for contacting us. The Bull will review your case personally and we will contact you shortly.'}
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 bg-burgundy text-beige px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-burgundy-dark transition-all rounded-sm"
                  >
                    {language === 'es' ? 'Seguir navegando' : 'Continue browsing'}
                  </button>
                </div>
              ) : (
                <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.name}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all"
                      placeholder={t.contact.form.placeholderName}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all"
                      placeholder={t.contact.form.placeholderPhone}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.email}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all"
                      placeholder={t.contact.form.placeholderEmail}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.caseType}</label>
                    <select
                      name="caseType"
                      value={formData.caseType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all"
                    >
                      {t.contact.form.options.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.message}</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all"
                      placeholder={t.contact.form.placeholderMessage}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`w-full bg-burgundy text-beige py-4 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-lg shadow-burgundy/20 flex items-center justify-center gap-3 text-sm animate-pulse-gold ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-beige/30 border-t-beige rounded-full animate-spin" />
                          {language === 'es' ? 'Enviando...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          {t.contact.form.submit}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Lock className="w-3 h-3 text-charcoal/40" />
                      <p className="text-charcoal/40 text-xs">{t.contact.form.privacy}</p>
                    </div>
                    {status === 'error' && (
                      <p className="mt-4 text-red-600 text-sm text-center font-medium">
                        {language === 'es' ? 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.' : 'There was an error sending the message. Please try again.'}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Footer: quick phone escape hatch */}
            <div className="border-t border-gray-100 px-6 py-4 flex-shrink-0 bg-beige/40">
              <a
                href="tel:+19154001099"
                onClick={() => trackPhoneClick('contact_drawer')}
                className="flex items-center justify-center gap-2 text-burgundy font-bold text-sm hover:text-burgundy-dark transition-colors"
              >
                <Phone className="w-4 h-4" />
                {language === 'es' ? '¿Prefieres llamar? (915) 400-1099' : 'Prefer to call? (915) 400-1099'}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
