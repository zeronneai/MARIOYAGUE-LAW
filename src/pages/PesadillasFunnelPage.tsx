import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Check, ArrowRight, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNoIndexSeo } from '../hooks/useNoIndexSeo';
import { trackEvent, trackPhoneClick } from '../lib/analytics';

// ─────────────────────────────────────────────────────────────
// Google Apps Script endpoint.
// Fabian: paste the deployed web app URL here (Deploy > New deployment >
// Web app > Execute as: Me > Who has access: Anyone).
// ─────────────────────────────────────────────────────────────
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx5emrpg1BFymXBJHn4oQEYr-b3xacCA1Mci5DAsVOhDJE8HPazf8O5nE2XCFLhkuUh4Q/exec';

// Field order used to scroll to the first invalid input on a failed submit
const FIELD_ORDER = [
  'name',
  'phone',
  'email',
  'accident_type',
  'accident_date',
  'preferred_day',
  'preferred_time',
] as const;

const HERO_IMAGE =
  'https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1789850641/Man_panicking_after_car_crash_2K_20260919144322_nhkatl.jpg';
const BULL_LOGO =
  'https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1774036245/TORO_wiossl.png';

// Videos land here once Fabian delivers them; the media components switch
// from image placeholder to <video> when these files exist.
const HERO_VIDEO = '/videos/pesadillas.mp4';
const REQUISITOS_VIDEO = '/videos/requisitos.mp4';
const HERO_VIDEO_READY = false;
const REQUISITOS_VIDEO_READY = false;

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PHONE_DISPLAY = '(915) 400-1099';
const PHONE_HREF = 'tel:+19154001099';

type Lang = 'en' | 'es';

/**
 * This funnel owns its language locally instead of reading LanguageContext.
 *
 * Ads for this page are aimed at a Spanish-speaking audience, so it must open
 * in Spanish on the very first paint regardless of what the rest of the site
 * is set to. Driving it from context would mean rendering once in English and
 * correcting it in an effect — a visible flash on the headline. Owning the
 * state here also means the toggle never mutates the global language, so the
 * main site keeps whatever it had with nothing to restore on unmount.
 */
const DEFAULT_FUNNEL_LANG: Lang = 'es';

// ─────────────────────────────────────────────────────────────
// Requirements checklist
// ─────────────────────────────────────────────────────────────
const REQUIREMENTS: Array<{ id: number; en: string; es: string }> = [
  { id: 1, es: 'Mi accidente ocurrió en Texas', en: 'My accident happened in Texas' },
  { id: 2, es: 'Fue en los últimos 2 años', en: 'It was within the last 2 years' },
  { id: 3, es: 'Tengo o puedo conseguir el reporte policial', en: 'I have or can get the police report' },
  { id: 4, es: 'Recibí atención médica (o la necesito)', en: 'I received medical attention (or need it)' },
  { id: 5, es: 'NO he firmado nada con la aseguradora', en: 'I have NOT signed anything with the insurance company' },
];

const MIN_REQUIRED = 3;

// Select option values are stored in English so the spreadsheet stays
// consistent regardless of the language the lead used.
const ACCIDENT_TYPES = [
  { value: 'Auto accident', es: 'Accidente de auto', en: 'Auto accident' },
  { value: 'Truck accident', es: 'Accidente de camión', en: 'Truck accident' },
  { value: 'Motorcycle', es: 'Motocicleta', en: 'Motorcycle' },
  { value: 'Slip and fall', es: 'Resbalón y caída', en: 'Slip and fall' },
  { value: 'Wrongful death', es: 'Muerte injusta', en: 'Wrongful death' },
  { value: 'Other', es: 'Otro', en: 'Other' },
];

const DAYS = [
  { value: 'Monday', es: 'Lunes', en: 'Monday' },
  { value: 'Tuesday', es: 'Martes', en: 'Tuesday' },
  { value: 'Wednesday', es: 'Miércoles', en: 'Wednesday' },
  { value: 'Thursday', es: 'Jueves', en: 'Thursday' },
  { value: 'Friday', es: 'Viernes', en: 'Friday' },
  { value: 'Saturday', es: 'Sábado', en: 'Saturday' },
];

const TIMES = [
  { value: 'Morning 8am-12pm', es: 'Mañana 8am-12pm', en: 'Morning 8am-12pm' },
  { value: 'Afternoon 12pm-5pm', es: 'Tarde 12pm-5pm', en: 'Afternoon 12pm-5pm' },
  { value: 'Evening 5pm-8pm', es: 'Noche 5pm-8pm', en: 'Evening 5pm-8pm' },
];

// ─────────────────────────────────────────────────────────────
// Language toggle — scoped to this page, never touches global state
// ─────────────────────────────────────────────────────────────
const LanguageToggle = ({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (next: Lang) => void;
}) => {
  const opt = (value: Lang, text: string) => {
    const active = lang === value;
    return (
      <button
        type="button"
        onClick={() => !active && onChange(value)}
        aria-pressed={active}
        aria-label={value === 'es' ? 'Español' : 'English'}
        className={`min-w-[44px] min-h-[44px] px-2 text-xs font-bold tracking-[0.2em] transition-colors duration-200 ${
          active ? 'text-[#C9A87C]' : 'text-[#B8AA9A]/40 hover:text-[#B8AA9A]/70'
        }`}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="flex items-center rounded-sm bg-black/30 backdrop-blur-sm border border-[#C9A87C]/15">
      {opt('es', 'ES')}
      <span className="text-[#B8AA9A]/25 text-xs select-none">·</span>
      {opt('en', 'EN')}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Hero media — image placeholder now, <video> once the file lands
// ─────────────────────────────────────────────────────────────
const HeroMedia = ({ lang }: { lang: Lang }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-video overflow-hidden bg-[#1A0F0C]">
      {/* Blur placeholder while the hero image decodes */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#2A1512] to-[#0F0806] transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {HERO_VIDEO_READY ? (
        <video
          src={HERO_VIDEO}
          poster={HERO_IMAGE}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          <motion.img
            src={HERO_IMAGE}
            alt={
              lang === 'es'
                ? 'Hombre en pánico después de un accidente de auto'
                : 'Man panicking after a car crash'
            }
            fetchPriority="high"
            decoding="async"
            onLoad={() => setLoaded(true)}
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 18, ease: 'linear' }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Play affordance — becomes the real control when the video ships */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 18 }}
              className="relative"
            >
              <span className="absolute inset-0 rounded-full bg-[#A03838]/40 animate-ping" />
              <span className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#A03838]/90 border-2 border-[#C9A87C]/60 shadow-[0_0_40px_rgba(160,56,56,0.6)] backdrop-blur-sm">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#F5EFE6] ml-1" fill="currentColor" />
              </span>
            </motion.div>
          </div>
        </>
      )}

      {/* Cinematic vignette + bottom fade for headline legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0806] via-[#0F0806]/30 to-[#0F0806]/50" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_60px_rgba(15,8,6,0.9)]" />

      {/* Headline over the media */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-14">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl text-[2rem] leading-[1.05] sm:text-5xl md:text-6xl font-serif font-bold text-[#F5EFE6] [text-shadow:0_4px_30px_rgba(0,0,0,0.9)]"
        >
          {lang === 'es' ? 'Un choque puede ser como una pesadilla' : 'A crash can feel like a nightmare'}
        </motion.h1>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Secondary video placeholder (Mario explains the process)
// ─────────────────────────────────────────────────────────────
const VideoPlayer = ({ lang }: { lang: Lang }) => (
  <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-gradient-to-br from-[#2A1512] to-[#0F0806] border border-[#C9A87C]/20">
    {REQUISITOS_VIDEO_READY ? (
      <video src={REQUISITOS_VIDEO} controls playsInline className="absolute inset-0 w-full h-full object-cover" />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <img
          src={BULL_LOGO}
          alt="Mario Yague Law"
          loading="lazy"
          className="w-20 h-20 object-contain opacity-30"
          referrerPolicy="no-referrer"
        />
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#A03838]/90 border-2 border-[#C9A87C]/50 shadow-[0_0_30px_rgba(160,56,56,0.5)]">
          <Play className="w-7 h-7 text-[#F5EFE6] ml-0.5" fill="currentColor" />
        </span>
        <span className="text-[#B8AA9A] text-[10px] uppercase tracking-[0.3em]">
          {lang === 'es' ? 'Video próximamente' : 'Video coming soon'}
        </span>
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Application form
// ─────────────────────────────────────────────────────────────
interface FormProps {
  lang: Lang;
  checkedIds: number[];
  /** Called after a successful submit so the parent can scroll the thank-you into view. */
  onSubmitted?: () => void;
}

const ApplicationForm = ({ lang, checkedIds, onSubmitted }: FormProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedRef = useRef(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    accident_type: '',
    accident_date: '',
    description: '',
    preferred_day: '',
    preferred_time: '',
  });

  // Capture UTM parameters once on mount
  const utm = useMemo(() => {
    if (typeof window === 'undefined') return {} as Record<string, string>;
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '',
      utm_content: p.get('utm_content') || '',
      utm_term: p.get('utm_term') || '',
    };
  }, []);

  const label = (es: string, en: string) => (lang === 'es' ? es : en);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('pesadillas_form_start', { language: lang });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    markStarted();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    const req = label('Campo obligatorio', 'Required field');

    if (!form.name.trim()) next.name = req;
    else if (form.name.trim().length < 2)
      next.name = label('Nombre demasiado corto', 'Name is too short');

    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) next.phone = req;
    else if (digits.length < 10) next.phone = label('Teléfono inválido', 'Invalid phone number');

    if (!form.email.trim()) next.email = req;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      next.email = label('Email inválido', 'Invalid email');

    if (!form.accident_type) next.accident_type = req;

    if (!form.accident_date) next.accident_date = req;
    else if (new Date(form.accident_date) > new Date())
      next.accident_date = label('La fecha no puede ser futura', 'Date cannot be in the future');

    if (!form.preferred_day) next.preferred_day = req;
    if (!form.preferred_time) next.preferred_time = req;

    setErrors(next);

    // Move the viewport to the first field that needs attention
    const firstBad = FIELD_ORDER.find((f) => next[f]);
    if (firstBad) {
      const el = document.querySelector<HTMLElement>(`[name="${firstBad}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => el?.focus({ preventScroll: true }), 400);
    }

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('pesadillas_form_submit_attempt', {
      accident_type: form.accident_type,
      checked_count: checkedIds.length,
    });

    if (!validate()) {
      trackEvent('pesadillas_form_submit_error', { reason: 'validation' });
      return;
    }

    setStatus('loading');

    const payload = new URLSearchParams({
      ...form,
      source: 'pesadillas_funnel',
      landing_url: window.location.href,
      ...utm,
      submitted_at: new Date().toISOString(),
      checked_requirements: checkedIds.join(','),
      checked_count: String(checkedIds.length),
      requirements_detail: REQUIREMENTS.filter((r) => checkedIds.includes(r.id))
        .map((r) => r.en)
        .join(' | '),
      language: lang,
    });

    try {
      // Apps Script sends no CORS headers, so the request goes out opaque.
      // urlencoded is one of the few Content-Types no-cors allows, and it is
      // what Apps Script reads most reliably via e.parameter.
      //
      // Tradeoff: an opaque response exposes no status, so a server-side
      // failure is indistinguishable from success and only a network-level
      // failure (offline, DNS) rejects. We optimistically report success —
      // preferable here to the alternative, where a CORS rejection would show
      // an error for a lead that Apps Script had in fact already saved, and
      // push the person into submitting twice.
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      setStatus('success');
      onSubmitted?.();
      trackEvent('pesadillas_form_submit_success', {
        accident_type: form.accident_type,
        preferred_day: form.preferred_day,
        preferred_time: form.preferred_time,
        checked_count: checkedIds.length,
        language: lang,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[pesadillas] submit failed', err);
      setStatus('error');
      trackEvent('pesadillas_form_submit_error', { reason: 'network', error_message: message });
      trackEvent('pesadillas_error_shown', {});
    }
  };

  const retry = () => {
    setStatus('idle');
    trackEvent('pesadillas_form_retry', {});
  };

  // ── Thank you state ──
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-10 px-6"
      >
        <div className="w-20 h-20 mx-auto mb-7 rounded-full bg-[#A03838] flex items-center justify-center shadow-[0_0_50px_rgba(160,56,56,0.55)]">
          <CheckCircle2 className="w-11 h-11 text-[#F5EFE6]" />
        </div>
        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5EFE6] mb-5">
          {label('Tu caso fue recibido', 'Your case was received')}
        </h3>
        <p className="text-[#B8AA9A] leading-relaxed max-w-lg mx-auto mb-3">
          {label(
            'Mario o alguien de su equipo se pondrá en contacto contigo dentro de las próximas 24 horas en el horario que indicaste.',
            'Mario or someone from his team will contact you within the next 24 hours during your preferred time.',
          )}
        </p>
        <p className="text-[#B8AA9A] leading-relaxed max-w-lg mx-auto mb-9">
          {label('Si tu caso es urgente, llámanos directamente.', 'If your case is urgent, call us directly.')}
        </p>
        <a
          href={PHONE_HREF}
          onClick={() => trackPhoneClick('pesadillas_thankyou')}
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto min-h-[56px] bg-[#A03838] text-[#F5EFE6] px-10 py-4 font-bold uppercase tracking-widest text-sm rounded-sm shadow-[0_0_40px_rgba(160,56,56,0.5)] hover:bg-[#B54242] transition-all duration-200"
        >
          <Phone className="w-5 h-5" />
          {label(`LLAMAR AHORA ${PHONE_DISPLAY}`, `CALL NOW ${PHONE_DISPLAY}`)}
        </a>
      </motion.div>
    );
  }

  const fieldBase =
    'w-full min-h-[48px] px-4 py-3 bg-[#0F0806] border text-[#F5EFE6] placeholder-[#B8AA9A]/40 outline-none transition-colors duration-200 rounded-sm focus:border-[#C9A87C]';
  const errCls = (k: string) => (errors[k] ? 'border-[#E06565]' : 'border-[#C9A87C]/25');

  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p className="flex items-center gap-1.5 text-[#E06565] text-xs mt-1.5">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {errors[k]}
      </p>
    ) : null;

  const Lbl = ({ children, req = true }: { children: React.ReactNode; req?: boolean }) => (
    <label className="block text-[11px] uppercase tracking-[0.15em] font-bold text-[#C9A87C] mb-2">
      {children}
      {req && <span className="text-[#A03838] ml-1">*</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Submit failed — the entered data is kept so retrying costs nothing */}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[#E06565]/50 bg-[#E06565]/10 rounded-sm p-5"
        >
          <p className="flex items-start gap-2.5 text-[#F5EFE6] text-sm leading-relaxed mb-4">
            <AlertCircle className="w-5 h-5 text-[#E06565] flex-shrink-0 mt-0.5" />
            {label(
              `Hubo un problema al enviar tu información. Por favor llámanos directamente al ${PHONE_DISPLAY} o intenta de nuevo.`,
              `There was an issue submitting your information. Please call us directly at ${PHONE_DISPLAY} or try again.`,
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={PHONE_HREF}
              onClick={() => trackPhoneClick('pesadillas_form_error')}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[52px] bg-[#A03838] text-[#F5EFE6] px-6 py-3 font-bold uppercase tracking-widest text-sm rounded-sm shadow-[0_0_30px_rgba(160,56,56,0.45)] hover:bg-[#B54242] transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              {label(`LLAMAR AHORA ${PHONE_DISPLAY}`, `CALL NOW ${PHONE_DISPLAY}`)}
            </a>
            <button
              type="button"
              onClick={retry}
              className="sm:flex-none inline-flex items-center justify-center min-h-[52px] border border-[#C9A87C]/40 text-[#C9A87C] px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-[#C9A87C]/10 transition-all duration-200"
            >
              {label('Intentar de nuevo', 'Try again')}
            </button>
          </div>
        </motion.div>
      )}

      <div>
        <Lbl>{label('Nombre completo', 'Full name')}</Lbl>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          placeholder={label('Juan Pérez', 'John Doe')}
          className={`${fieldBase} ${errCls('name')}`}
        />
        <Err k="name" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Lbl>{label('Teléfono', 'Phone')}</Lbl>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            inputMode="tel"
            placeholder="(915) 000-0000"
            className={`${fieldBase} ${errCls('phone')}`}
          />
          <Err k="phone" />
        </div>
        <div>
          <Lbl>{label('Correo electrónico', 'Email')}</Lbl>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            inputMode="email"
            placeholder={label('tu@correo.com', 'you@email.com')}
            className={`${fieldBase} ${errCls('email')}`}
          />
          <Err k="email" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Lbl>{label('Tipo de accidente', 'Accident type')}</Lbl>
          <select
            name="accident_type"
            value={form.accident_type}
            onChange={handleChange}
            className={`${fieldBase} ${errCls('accident_type')}`}
          >
            <option value="">{label('Selecciona…', 'Select…')}</option>
            {ACCIDENT_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {lang === 'es' ? o.es : o.en}
              </option>
            ))}
          </select>
          <Err k="accident_type" />
        </div>
        <div>
          <Lbl>{label('Fecha del accidente', 'Date of accident')}</Lbl>
          <input
            type="date"
            name="accident_date"
            value={form.accident_date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={`${fieldBase} ${errCls('accident_date')} [color-scheme:dark]`}
          />
          <Err k="accident_date" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Lbl>{label('Día preferido para llamada', 'Preferred day for call')}</Lbl>
          <select
            name="preferred_day"
            value={form.preferred_day}
            onChange={handleChange}
            className={`${fieldBase} ${errCls('preferred_day')}`}
          >
            <option value="">{label('Selecciona…', 'Select…')}</option>
            {DAYS.map((o) => (
              <option key={o.value} value={o.value}>
                {lang === 'es' ? o.es : o.en}
              </option>
            ))}
          </select>
          <Err k="preferred_day" />
        </div>
        <div>
          <Lbl>{label('Hora preferida', 'Preferred time')}</Lbl>
          <select
            name="preferred_time"
            value={form.preferred_time}
            onChange={handleChange}
            className={`${fieldBase} ${errCls('preferred_time')}`}
          >
            <option value="">{label('Selecciona…', 'Select…')}</option>
            {TIMES.map((o) => (
              <option key={o.value} value={o.value}>
                {lang === 'es' ? o.es : o.en}
              </option>
            ))}
          </select>
          <Err k="preferred_time" />
        </div>
      </div>

      <div>
        <Lbl req={false}>{label('Descripción breve', 'Brief description')}</Lbl>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder={label(
            'Cuéntanos qué pasó con tus palabras…',
            'Tell us what happened in your own words…',
          )}
          className={`${fieldBase} border-[#C9A87C]/25 resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full min-h-[56px] bg-[#A03838] text-[#F5EFE6] py-4 font-bold uppercase tracking-widest text-sm rounded-sm shadow-[0_8px_30px_rgba(160,56,56,0.35)] hover:bg-[#B54242] hover:shadow-[0_0_45px_rgba(160,56,56,0.6)] transition-all duration-200 flex items-center justify-center gap-3 ${
          status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {status === 'loading' ? (
          <>
            <span className="w-5 h-5 border-2 border-[#F5EFE6]/30 border-t-[#F5EFE6] rounded-full animate-spin" />
            {label('Enviando…', 'Sending…')}
          </>
        ) : (
          <>
            {label('ENVIAR MI CASO', 'SUBMIT MY CASE')}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-[#B8AA9A]/60 text-xs">
        {label(
          '100% confidencial. Nunca compartimos tu información.',
          '100% confidential. We never share your information.',
        )}
      </p>
    </form>
  );
};

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
const PesadillasFunnelPage = () => {
  const [lang, setLang] = useState<Lang>(DEFAULT_FUNNEL_LANG);
  const [checked, setChecked] = useState<number[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useNoIndexSeo({
    title:
      lang === 'es'
        ? 'Pesadillas en los Seguros - Mario Yague Law | Aplicación'
        : 'Insurance Nightmares - Mario Yague Law | Application',
    description:
      lang === 'es'
        ? 'Aplica ahora. Convertimos tu choque en una pesadilla para los seguros. Consulta gratis en El Paso.'
        : 'Apply now. We turn your crash into a nightmare for the insurance companies. Free consultation in El Paso.',
    preloadImage: HERO_IMAGE,
  });

  const changeLang = (next: Lang) => {
    trackEvent('pesadillas_language_toggle', { from: lang, to: next });
    setLang(next);
  };

  const label = (es: string, en: string) => (lang === 'es' ? es : en);
  const count = checked.length;
  const qualified = count >= MIN_REQUIRED;

  const toggle = (id: number) => {
    setChecked((prev) => {
      const isChecked = prev.includes(id);
      const next = isChecked ? prev.filter((x) => x !== id) : [...prev, id].sort((a, b) => a - b);
      trackEvent('pesadillas_requirement_toggle', {
        requirement_id: id,
        new_state: !isChecked,
        total_checked: next.length,
      });
      return next;
    });
  };

  const goToForm = () => {
    trackEvent('pesadillas_apply_click', {
      checked_count: count,
      checked_items: checked.join(','),
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#0F0806] min-h-screen">
      {/* ── HERO ── */}
      <section className="relative">
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
        {/* Standalone brand mark + language toggle — no navbar on this page */}
        <div className="relative z-20 flex items-center justify-center pt-7 pb-5 px-4">
          <img
            src={BULL_LOGO}
            alt="Mario Yague Law"
            width={48}
            height={48}
            className="w-12 h-12 object-contain opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <LanguageToggle lang={lang} onChange={changeLang} />
          </div>
        </div>
        <HeroMedia lang={lang} />
      </section>

      {/* ── EL MENSAJE ── */}
      <section className="relative bg-[#1A0F0C] py-16 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A87C]/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        >
          <p className="text-[#B8AA9A] text-lg sm:text-2xl leading-relaxed mb-10">
            {label(
              'Pero nosotros nos encargamos de que tu única preocupación sea sentirte mejor mientras nosotros nos encargamos de todo lo demás.',
              'But we make sure your only concern is getting better while we handle everything else.',
            )}
          </p>
          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#C9A87C] leading-[1.1] [text-shadow:0_4px_40px_rgba(201,168,124,0.25)]"
          >
            {label(
              'La verdadera pesadilla la tendrán los seguros.',
              'The real nightmare will be for the insurance companies.',
            )}
          </motion.p>
        </motion.div>
      </section>

      {/* ── CHECKLIST ── */}
      <section className="bg-[#F5EFE6] py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A0F0C] leading-tight mb-3">
              {label(
                'Antes de aplicar, palomea lo que aplique a tu caso:',
                'Before applying, check what applies to your case:',
              )}
            </h2>
            <p className="text-[#7C2D2D] text-sm font-bold uppercase tracking-wider">
              {label(
                `Necesitas al menos ${MIN_REQUIRED} de ${REQUIREMENTS.length} para prospectar contigo`,
                `You need at least ${MIN_REQUIRED} out of ${REQUIREMENTS.length} to qualify`,
              )}
            </p>
          </motion.div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#1A0F0C] text-sm font-bold">
                {label(
                  `${count} / ${REQUIREMENTS.length} requisitos cumplidos`,
                  `${count} / ${REQUIREMENTS.length} requirements met`,
                )}
              </span>
              {qualified && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 text-[#A03838] text-xs font-bold uppercase tracking-wider"
                >
                  <Check className="w-4 h-4" />
                  {label('¡Calificas!', 'You qualify!')}
                </motion.span>
              )}
            </div>
            <div className="h-2 w-full bg-[#1A0F0C]/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(count / REQUIREMENTS.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                className={`h-full rounded-full ${qualified ? 'bg-[#A03838]' : 'bg-[#C9A87C]'}`}
              />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {REQUIREMENTS.map((r, i) => {
              const on = checked.includes(r.id);
              return (
                <motion.button
                  key={r.id}
                  type="button"
                  onClick={() => toggle(r.id)}
                  role="checkbox"
                  aria-checked={on}
                  data-requirement={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ scale: on ? 1.015 : 1 }}
                  className={`w-full min-h-[64px] flex items-center gap-4 text-left p-4 sm:p-5 rounded-sm border-2 transition-colors duration-200 ${
                    on
                      ? 'bg-[#A03838] border-[#A03838] shadow-[0_6px_24px_rgba(160,56,56,0.3)]'
                      : 'bg-white border-[#1A0F0C]/10 hover:border-[#C9A87C]'
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-sm border-2 flex items-center justify-center transition-colors duration-200 ${
                      on ? 'bg-[#F5EFE6] border-[#F5EFE6]' : 'border-[#1A0F0C]/25'
                    }`}
                  >
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        >
                          <Check className="w-5 h-5 text-[#A03838]" strokeWidth={3.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span
                    className={`text-base sm:text-lg font-medium leading-snug ${
                      on ? 'text-[#F5EFE6]' : 'text-[#1A0F0C]'
                    }`}
                  >
                    {lang === 'es' ? r.es : r.en}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {qualified ? (
                <motion.button
                  key="active"
                  type="button"
                  onClick={goToForm}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full min-h-[60px] bg-[#A03838] text-[#F5EFE6] py-4 px-6 font-bold uppercase tracking-widest text-sm sm:text-base rounded-sm shadow-[0_10px_35px_rgba(160,56,56,0.4)] hover:bg-[#B54242] hover:shadow-[0_0_50px_rgba(160,56,56,0.65)] transition-all duration-200 flex items-center justify-center gap-3"
                >
                  {label('¿ESTÁS LISTO? APLICA AHORA', 'ARE YOU READY? APPLY NOW')}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.div
                  key="disabled"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full min-h-[60px] bg-[#1A0F0C]/10 text-[#1A0F0C]/40 py-4 px-6 font-bold uppercase tracking-widest text-sm rounded-sm flex items-center justify-center text-center cursor-not-allowed select-none"
                >
                  {label(
                    `Palomea al menos ${MIN_REQUIRED} para continuar`,
                    `Check at least ${MIN_REQUIRED} to continue`,
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── VIDEO DE MARIO ── */}
      <section className="relative bg-[#0F0806] py-16 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl mx-auto px-6"
        >
          <div className="bg-[#1A0F0C] border border-[#C9A87C]/20 rounded-sm p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5EFE6] text-center mb-5">
              {label('Escucha directamente a Mario', 'Hear directly from Mario')}
            </h3>
            <VideoPlayer lang={lang} />
            <p className="text-[#B8AA9A] text-sm text-center mt-5">
              {label(
                'En 30 segundos Mario te explica cómo funciona el proceso',
                'In 30 seconds Mario walks you through the process',
              )}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── FORMULARIO ── */}
      <section ref={formRef} className="relative bg-[#1A0F0C] py-16 sm:py-24 scroll-mt-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A87C]/30 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-serif font-bold text-[#F5EFE6] text-center mb-10"
          >
            {label('Cuéntanos tu caso', 'Tell us your case')}
          </motion.h2>
          <ApplicationForm
            lang={lang}
            checkedIds={checked}
            onSubmitted={() =>
              formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          />
        </div>
      </section>

      {/* ── LEGAL ── */}
      <footer className="bg-[#0F0806] py-10 px-6 border-t border-[#C9A87C]/10">
        <p className="max-w-2xl mx-auto text-center text-[#B8AA9A]/45 text-[11px] leading-relaxed">
          {label(
            'Los resultados pasados no garantizan resultados futuros. Esta comunicación no crea una relación abogado-cliente. Consulta gratis y confidencial. Mario Yague Law · Texas Bar #24122235',
            'Past results do not guarantee future outcomes. This communication does not create an attorney-client relationship. Free and confidential consultation. Mario Yague Law · Texas Bar #24122235',
          )}
        </p>
      </footer>
    </div>
  );
};

export default PesadillasFunnelPage;
