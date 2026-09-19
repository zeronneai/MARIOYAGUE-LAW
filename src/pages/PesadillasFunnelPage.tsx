import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Check, ArrowRight, Phone, AlertCircle, X } from 'lucide-react';
import { useNoIndexSeo } from '../hooks/useNoIndexSeo';
import { trackEvent, trackPhoneClick } from '../lib/analytics';

// ─────────────────────────────────────────────────────────────
// Google Apps Script endpoint (live)
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

const REQUISITOS_VIDEO = '/videos/pesadillas-requisitos.mp4';
const REQUISITOS_VIDEO_READY = false;

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PHONE_DISPLAY = '(915) 400-1099';
const PHONE_HREF = 'tel:+19154001099';

const DISPLAY_FONT = "'Anton', 'Bebas Neue', 'Arial Narrow', Impact, sans-serif";
const SERIF_FONT = "Georgia, 'Times New Roman', serif";

const EASE = [0.4, 0, 0.2, 1] as const;

type Lang = 'en' | 'es';
type Layer = 0 | 1 | 2 | 3 | 4;

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

const REQUIREMENTS: Array<{ id: number; en: string; es: string }> = [
  { id: 1, es: 'Mi accidente fue en Texas', en: 'My accident was in Texas' },
  { id: 2, es: 'Fue en los últimos 2 años', en: 'Within the last 2 years' },
  { id: 3, es: 'Tengo (o puedo obtener) el reporte policial', en: 'I have (or can get) the police report' },
  { id: 4, es: 'Recibí atención médica o la necesito', en: 'I received or need medical attention' },
  { id: 5, es: 'NO he firmado con la aseguradora', en: 'I have NOT signed with the insurance' },
];

const MIN_REQUIRED = 3;

// Select values stay in English so the spreadsheet is consistent regardless
// of the language the lead used.
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
// Anton — injected only on this route, removed on unmount
// ─────────────────────────────────────────────────────────────
function useDisplayFont() {
  useEffect(() => {
    const added: HTMLLinkElement[] = [];
    const add = (rel: string, href: string, cross?: boolean) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const l = document.createElement('link');
      l.rel = rel;
      l.href = href;
      if (cross) l.crossOrigin = 'anonymous';
      document.head.appendChild(l);
      added.push(l);
    };
    add('preconnect', 'https://fonts.googleapis.com');
    add('preconnect', 'https://fonts.gstatic.com', true);
    add('stylesheet', 'https://fonts.googleapis.com/css2?family=Anton&display=swap');
    return () => added.forEach((l) => l.remove());
  }, []);
}

/** Keeps Tab cycling inside the open dialog. */
function useFocusTrap(active: boolean, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return;
    // Cast because the project ships no @types/react, so ref.current is any
    const node = ref.current as HTMLElement | null;
    if (!node) return;

    // Focus the container rather than the first field: auto-focusing an input
    // pops the mobile keyboard the instant the modal opens.
    node.focus({ preventScroll: true });

    // Typed as string, not a literal: TS otherwise tries to resolve the
    // selector-literal overload of querySelectorAll and yields unknown.
    const SEL: string =
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const found = node.querySelectorAll(SEL) as NodeListOf<HTMLElement>;
      const items: HTMLElement[] = Array.from(found).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, [active, ref]);
}

// ─────────────────────────────────────────────────────────────
// Shared presentation bits
// ─────────────────────────────────────────────────────────────
const Grain = ({ opacity = 0.12 }: { opacity?: number }) => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none mix-blend-overlay"
    style={{ backgroundImage: NOISE_TEXTURE, opacity }}
  />
);

const primaryBtn: React.CSSProperties = {
  background: 'linear-gradient(135deg, #A03838 0%, #7C2D2D 100%)',
  color: '#F5EFE6',
  fontFamily: DISPLAY_FONT,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  border: 'none',
  borderRadius: 4,
  boxShadow: '0 8px 32px rgba(124,45,45,0.5), 0 0 0 1px rgba(201,168,124,0.2) inset',
  cursor: 'pointer',
  transition: `all 300ms cubic-bezier(0.4,0,0.2,1)`,
  minHeight: 48,
};

const CloseButton = ({
  onClick,
  label,
  dark = true,
}: {
  onClick: () => void;
  label: string;
  dark?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    // Top-LEFT on purpose: the language toggle is fixed at top-right across
    // every layer, and a close button there sits underneath it.
    className="absolute z-20 flex items-center justify-center rounded-full transition-colors duration-200"
    style={{
      top: 14,
      left: 14,
      width: 40,
      height: 40,
      background: dark ? 'rgba(0,0,0,0.55)' : 'transparent',
      backdropFilter: dark ? 'blur(8px)' : undefined,
      color: dark ? '#F5EFE6' : '#7A6F62',
      border: dark ? '1px solid rgba(255,255,255,0.12)' : 'none',
      cursor: 'pointer',
    }}
  >
    <X className="w-5 h-5" />
  </button>
);

const LanguageToggle = ({ lang, onChange }: { lang: Lang; onChange: (n: Lang) => void }) => {
  const opt = (value: Lang, text: string) => {
    const active = lang === value;
    return (
      <button
        type="button"
        onClick={() => !active && onChange(value)}
        aria-pressed={active}
        aria-label={value === 'es' ? 'Español' : 'English'}
        className="transition-colors duration-200"
        style={{
          minWidth: 34,
          minHeight: 34,
          fontSize: '0.8rem',
          letterSpacing: '2px',
          fontWeight: active ? 700 : 400,
          color: active ? '#F5EFE6' : 'rgba(201,168,124,0.5)',
          background: 'none',
          border: 'none',
          cursor: active ? 'default' : 'pointer',
        }}
      >
        {text}
      </button>
    );
  };
  return (
    <div
      className="fixed flex items-center"
      style={{
        top: 20,
        right: 20,
        zIndex: 100,
        background: 'rgba(15,8,6,0.6)',
        backdropFilter: 'blur(12px)',
        padding: '4px 12px',
        borderRadius: 999,
        border: '1px solid rgba(201,168,124,0.2)',
      }}
    >
      {opt('es', 'ES')}
      <span style={{ color: 'rgba(201,168,124,0.35)', fontSize: '0.8rem' }}>·</span>
      {opt('en', 'EN')}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// LAYER 0 — Hero
// ─────────────────────────────────────────────────────────────
const HeroLayer = ({ lang, onWatch }: { lang: Lang; onWatch: () => void }) => {
  const line1 = lang === 'es' ? 'UN CHOQUE ES' : 'A CRASH IS';
  const line2 = lang === 'es' ? 'UNA PESADILLA.' : 'A NIGHTMARE.';

  const titleBase: React.CSSProperties = {
    fontFamily: DISPLAY_FONT,
    fontStyle: 'italic',
    fontWeight: 400,
    // Sized so the longest line still fits on ONE line in the fallback face,
    // which is far wider than Anton. Otherwise the headline wraps and then
    // reflows when the webfont swaps in — on the LCP element.
    fontSize: 'clamp(2.1rem, 10.5vw, 9rem)',
    lineHeight: 0.9,
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
    display: 'block',
    textShadow:
      // em offsets keep the 3D stack proportional from phone to desktop
      '0.03em 0.03em 0 #7C2D2D, 0.06em 0.06em 0 #5A1F1F, 0.09em 0.09em 0 #2B1F1A, 0.14em 0.14em 0.3em rgba(0,0,0,0.7)',
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image with a slow Ken Burns push */}
      <motion.div
        aria-hidden
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(15,8,6,0.75) 0%, rgba(43,31,26,0.85) 100%)',
        }}
      />
      <Grain opacity={0.13} />

      {/* Entrance wash */}
      <motion.div
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      {/* Content */}
      <div
        className="relative h-full w-full flex flex-col items-center justify-center text-center"
        style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: 900, margin: '0 auto' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="select-none"
          style={{ margin: 0 }}
        >
          <span style={{ ...titleBase, color: '#F5EFE6', transform: 'skewX(-6deg)' }}>
            {line1}
          </span>
          <span style={{ ...titleBase, color: '#E8C9A0', transform: 'skewX(-8deg)' }}>
            {line2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          style={{
            fontFamily: SERIF_FONT,
            fontStyle: 'italic',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.5rem)',
            color: '#C9A87C',
            letterSpacing: '0.02em',
            marginTop: 'clamp(20px, 4vh, 48px)',
            maxWidth: 600,
          }}
        >
          {lang === 'es'
            ? 'Pero no la tuya. Nosotros nos encargamos.'
            : 'But not yours. We handle everything.'}
        </motion.p>

        <motion.button
          type="button"
          onClick={onWatch}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1, ease: EASE }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ y: 0, scale: 0.98 }}
          style={{
            ...primaryBtn,
            fontSize: 'clamp(0.85rem, 2vw, 1.25rem)',
            padding: 'clamp(14px, 2vh, 20px) clamp(24px, 5vw, 48px)',
            marginTop: 'clamp(24px, 5vh, 56px)',
            minWidth: 'min(280px, 100%)',
          }}
        >
          {lang === 'es' ? '▶  VER EL MENSAJE DE MARIO' : "▶  WATCH MARIO'S MESSAGE"}
        </motion.button>
      </div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.4 }}
        className="absolute inset-x-0 bottom-0 text-center px-4"
        style={{
          paddingBottom: 'clamp(12px, 3vh, 32px)',
          fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)',
          color: 'rgba(201,168,124,0.7)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        {lang === 'es'
          ? 'Texas Bar #24122235 · Bilingüe · Consulta Gratis'
          : 'Texas Bar #24122235 · Bilingual · Free Consultation'}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// LAYER 1 — Video
// ─────────────────────────────────────────────────────────────
const VideoLayer = ({
  lang,
  onClose,
  onContinue,
}: {
  key?: string;
  lang: Lang;
  onClose: () => void;
  onContinue: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState(false);
  useFocusTrap(true, ref);

  const label = (es: string, en: string) => (lang === 'es' ? es : en);

  const handlePlay = () => {
    trackEvent('pesadillas_video_play_attempt', { video: 'requisitos', language: lang });
    setNotice(true);
    // Placeholder behaviour: nudge into the checklist after the notice reads
    setTimeout(onContinue, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 50,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(20px)',
        padding: 'clamp(16px, 5vw, 60px)',
      }}
    >
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label('Mensaje de Mario', "Mario's message")}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative w-full outline-none"
        style={{ maxWidth: 'min(90vw, 1000px)' }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '16 / 9',
            maxHeight: '70vh',
            borderRadius: 12,
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
            background: '#000',
          }}
        >
          {REQUISITOS_VIDEO_READY ? (
            <video
              src={REQUISITOS_VIDEO}
              poster={HERO_IMAGE}
              controls
              autoPlay
              playsInline
              onEnded={onContinue}
              className="w-full h-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="group relative block w-full h-full cursor-pointer"
              aria-label={label('Reproducir video', 'Play video')}
            >
              <img
                src={HERO_IMAGE}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                referrerPolicy="no-referrer"
              />
              <span className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex items-center justify-center">
                  <span
                    className="absolute rounded-full animate-ping"
                    style={{ width: 100, height: 100, background: 'rgba(160,56,56,0.4)' }}
                  />
                  <span
                    className="relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: 100,
                      height: 100,
                      background: 'rgba(245,239,230,0.95)',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                    }}
                  >
                    <Play className="w-10 h-10 text-[#7C2D2D] ml-1.5" fill="currentColor" />
                  </span>
                </span>
              </span>
              <AnimatePresence>
                {notice && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-4 bottom-4 mx-auto text-center"
                    style={{
                      maxWidth: 460,
                      background: 'rgba(0,0,0,0.85)',
                      color: '#F5EFE6',
                      fontSize: '0.8rem',
                      lineHeight: 1.45,
                      padding: '12px 16px',
                      borderRadius: 8,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {label(
                      'Video próximamente. Mientras tanto, continúa para ver si cumples con los requisitos.',
                      'Video coming soon. In the meantime, continue to see if you qualify.',
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
          <CloseButton onClick={onClose} label={label('Cerrar', 'Close')} />
        </div>

        <div className="flex justify-center" style={{ marginTop: 24 }}>
          <button
            type="button"
            onClick={onContinue}
            style={{
              ...primaryBtn,
              fontSize: 'clamp(0.75rem, 1.8vw, 0.95rem)',
              padding: '14px 28px',
              letterSpacing: '2px',
            }}
          >
            {label('CONTINUAR AL CUESTIONARIO →', 'CONTINUE TO QUALIFICATION →')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// LAYER 2 — Checklist
// ─────────────────────────────────────────────────────────────
const ChecklistLayer = ({
  lang,
  checked,
  onToggle,
  onClose,
  onContinue,
}: {
  key?: string;
  lang: Lang;
  checked: number[];
  onToggle: (id: number) => void;
  onClose: () => void;
  onContinue: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(true, ref);
  const label = (es: string, en: string) => (lang === 'es' ? es : en);
  const count = checked.length;
  const qualified = count >= MIN_REQUIRED;
  const complete = count === REQUIREMENTS.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 flex items-center justify-center overflow-y-auto"
      style={{
        zIndex: 60,
        background: 'linear-gradient(135deg, rgba(15,8,6,0.95), rgba(43,31,26,0.98))',
        backdropFilter: 'blur(20px)',
        padding: 'clamp(12px, 3vh, 40px) clamp(14px, 4vw, 40px)',
      }}
    >
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label('Cuestionario de cualificación', 'Qualification checklist')}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative w-full my-auto outline-none"
        style={{
          maxWidth: 600,
          background: '#F5EFE6',
          borderRadius: 16,
          padding: 'clamp(20px, 3.5vh, 44px) clamp(18px, 5vw, 38px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        }}
      >
        <CloseButton onClick={onClose} label={label('Cerrar', 'Close')} dark={false} />

        <div style={{ marginBottom: 4 }}>
          <span
            style={{
              color: '#7C2D2D',
              letterSpacing: '3px',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            {label('Paso 1 de 2', 'Step 1 of 2')}
          </span>
        </div>
        <h2
          style={{
            fontWeight: 800,
            fontSize: 'clamp(1.35rem, 4vw, 2rem)',
            color: '#2B1F1A',
            margin: '10px 0 6px',
            lineHeight: 1.15,
          }}
        >
          {label('¿Cumples con esto?', 'Do you qualify?')}
        </h2>
        <p style={{ color: '#7A6F62', fontSize: '0.92rem' }}>
          {label('Palomea al menos 3 para continuar', 'Check at least 3 to continue')}
        </p>

        {/* Progress */}
        <div style={{ margin: '16px 0 20px' }}>
          <div className="flex justify-end" style={{ marginBottom: 6 }}>
            <span style={{ fontSize: '0.82rem', color: '#7C2D2D', fontWeight: 700 }}>
              {count} / {REQUIREMENTS.length}
            </span>
          </div>
          <div style={{ height: 8, background: '#E0D9CB', borderRadius: 999, overflow: 'hidden' }}>
            <motion.div
              animate={{
                width: `${(count / REQUIREMENTS.length) * 100}%`,
                ...(complete ? { opacity: [1, 0.7, 1] } : { opacity: 1 }),
              }}
              transition={{
                width: { duration: 0.4, ease: EASE },
                opacity: complete
                  ? { duration: 1.3, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.2 },
              }}
              style={{
                height: '100%',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #7C2D2D, #A03838)',
                boxShadow: qualified ? '0 0 12px rgba(124,45,45,0.5)' : 'none',
              }}
            />
          </div>
        </div>

        {/* Items */}
        <div>
          {REQUIREMENTS.map((r) => {
            const on = checked.includes(r.id);
            return (
              <motion.button
                key={r.id}
                type="button"
                role="checkbox"
                aria-checked={on}
                data-requirement={r.id}
                onClick={() => onToggle(r.id)}
                animate={on ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full flex items-center text-left transition-colors duration-200"
                style={{
                  background: on ? '#FBF7EE' : '#FFFFFF',
                  border: `2px solid ${on ? '#7C2D2D' : 'transparent'}`,
                  borderRadius: 10,
                  padding: '13px 16px',
                  marginBottom: 8,
                  gap: 13,
                  minHeight: 52,
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <span
                  className="flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-200"
                  style={{
                    width: 22,
                    height: 22,
                    border: `2px solid ${on ? '#7C2D2D' : '#C9A87C'}`,
                    background: on ? '#7C2D2D' : 'transparent',
                  }}
                >
                  <AnimatePresence>
                    {on && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                        className="flex"
                      >
                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span
                  style={{
                    fontSize: '0.93rem',
                    lineHeight: 1.35,
                    color: on ? '#2B1F1A' : '#3A3530',
                    fontWeight: on ? 500 : 400,
                  }}
                >
                  {lang === 'es' ? r.es : r.en}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Gate */}
        <motion.button
          type="button"
          disabled={!qualified}
          onClick={qualified ? onContinue : undefined}
          animate={qualified ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          whileHover={qualified ? { scale: 1.02 } : {}}
          className="w-full"
          style={{
            marginTop: 16,
            padding: '15px 26px',
            width: '100%',
            minHeight: 50,
            fontFamily: DISPLAY_FONT,
            fontSize: '0.95rem',
            letterSpacing: '2px',
            borderRadius: 8,
            border: 'none',
            transition: 'all 300ms cubic-bezier(0.4,0,0.2,1)',
            ...(qualified
              ? {
                  background: 'linear-gradient(135deg, #A03838, #7C2D2D)',
                  color: '#F5EFE6',
                  boxShadow: '0 8px 24px rgba(124,45,45,0.4)',
                  cursor: 'pointer',
                }
              : {
                  background: '#E0D9CB',
                  color: '#7A6F62',
                  cursor: 'not-allowed',
                  boxShadow: 'none',
                }),
          }}
        >
          {qualified
            ? label('CONTINUAR AL FORMULARIO →', 'CONTINUE TO FORM →')
            : label('PALOMEA AL MENOS 3', 'CHECK AT LEAST 3')}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// LAYER 3 — Form
// ─────────────────────────────────────────────────────────────
const FormLayer = ({
  lang,
  checkedIds,
  onClose,
  onSuccess,
}: {
  key?: string;
  lang: Lang;
  checkedIds: number[];
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(true, ref);

  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
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

    // Bring the first field that needs attention into view inside the modal
    const firstBad = FIELD_ORDER.find((f) => next[f]);
    if (firstBad) {
      const el = ref.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`);
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

      trackEvent('pesadillas_form_submit_success', {
        accident_type: form.accident_type,
        preferred_day: form.preferred_day,
        preferred_time: form.preferred_time,
        checked_count: checkedIds.length,
        language: lang,
      });
      onSuccess();
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

  const fieldStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(201,168,124,0.25)',
    color: '#F5EFE6',
    padding: '14px 16px',
    borderRadius: 6,
    fontSize: 16, // 16px avoids iOS auto-zoom on focus
    width: '100%',
    outline: 'none',
    transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
  };
  const focusProps = {
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.borderColor = '#C9A87C';
      e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,168,124,0.15)';
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.borderColor = 'rgba(201,168,124,0.25)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };
  const styleFor = (k: string): React.CSSProperties =>
    errors[k] ? { ...fieldStyle, borderColor: '#E06565' } : fieldStyle;

  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p className="flex items-center gap-1.5" style={{ color: '#E06565', fontSize: '0.72rem', marginTop: 5 }}>
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {errors[k]}
      </p>
    ) : null;

  const Lbl = ({ children, req = true }: { children: React.ReactNode; req?: boolean }) => (
    <label
      className="block"
      style={{
        fontSize: '0.72rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#C9A87C',
        marginBottom: 6,
      }}
    >
      {children}
      {req && <span style={{ color: '#A03838', marginLeft: 3 }}>*</span>}
    </label>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 flex items-center justify-center overflow-y-auto"
      style={{
        zIndex: 70,
        background: 'linear-gradient(135deg, rgba(15,8,6,0.98), rgba(43,31,26,1))',
        padding: 'clamp(12px, 3vh, 40px) clamp(12px, 4vw, 40px)',
      }}
    >
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label('Formulario de caso', 'Case form')}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative w-full my-auto outline-none overflow-y-auto"
        style={{
          maxWidth: 600,
          maxHeight: '92vh',
          background: '#1A0F0C',
          border: '1px solid rgba(201,168,124,0.2)',
          borderRadius: 16,
          padding: 'clamp(24px, 4vh, 40px) clamp(18px, 5vw, 36px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        }}
      >
        <CloseButton onClick={onClose} label={label('Cerrar', 'Close')} />

        <span
          style={{
            color: '#C9A87C',
            letterSpacing: '3px',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {label('Paso 2 de 2 · Último paso', 'Step 2 of 2 · Final step')}
        </span>
        <h2
          style={{
            color: '#F5EFE6',
            fontWeight: 800,
            fontSize: 'clamp(1.35rem, 4vw, 2rem)',
            margin: '10px 0 6px',
            lineHeight: 1.15,
          }}
        >
          {label('Cuéntanos tu caso', 'Tell us your case')}
        </h2>
        <p style={{ color: 'rgba(245,239,230,0.6)', fontSize: '0.88rem', marginBottom: 22 }}>
          {label(
            'Toma 60 segundos. Mario te contactará en las próximas 24 horas.',
            'Takes 60 seconds. Mario will contact you within 24 hours.',
          )}
        </p>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: 16 }}>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                border: '1px solid rgba(224,101,101,0.5)',
                background: 'rgba(224,101,101,0.1)',
                borderRadius: 8,
                padding: 16,
              }}
            >
              <p
                className="flex items-start gap-2"
                style={{ color: '#F5EFE6', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 12 }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#E06565' }} />
                {label(
                  `Hubo un problema al enviar tu información. Llámanos al ${PHONE_DISPLAY} o intenta de nuevo.`,
                  `There was an issue submitting your information. Call us at ${PHONE_DISPLAY} or try again.`,
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={PHONE_HREF}
                  onClick={() => trackPhoneClick('pesadillas_form_error')}
                  className="flex-1 inline-flex items-center justify-center gap-2"
                  style={{ ...primaryBtn, fontSize: '0.75rem', padding: '12px 18px', letterSpacing: '1.5px' }}
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
                <button
                  type="button"
                  onClick={retry}
                  style={{
                    minHeight: 48,
                    padding: '12px 18px',
                    border: '1px solid rgba(201,168,124,0.4)',
                    borderRadius: 4,
                    background: 'transparent',
                    color: '#C9A87C',
                    fontSize: '0.72rem',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
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
              style={styleFor('name')}
              {...focusProps}
            />
            <Err k="name" />
          </div>

          <div className="grid sm:grid-cols-2" style={{ gap: 16 }}>
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
                style={styleFor('phone')}
                {...focusProps}
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
                style={styleFor('email')}
                {...focusProps}
              />
              <Err k="email" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2" style={{ gap: 16 }}>
            <div>
              <Lbl>{label('Tipo de accidente', 'Accident type')}</Lbl>
              <select
                name="accident_type"
                value={form.accident_type}
                onChange={handleChange}
                style={styleFor('accident_type')}
                {...focusProps}
              >
                <option value="">{label('Selecciona…', 'Select…')}</option>
                {ACCIDENT_TYPES.map((o) => (
                  <option key={o.value} value={o.value} style={{ background: '#1A0F0C' }}>
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
                className="[color-scheme:dark]"
                style={styleFor('accident_date')}
                {...focusProps}
              />
              <Err k="accident_date" />
            </div>
          </div>

          <div>
            <Lbl req={false}>{label('Descripción breve', 'Brief description')}</Lbl>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder={label(
                'Cuéntanos qué pasó con tus palabras…',
                'Tell us what happened in your own words…',
              )}
              style={{ ...fieldStyle, resize: 'vertical' }}
              {...focusProps}
            />
          </div>

          <div className="grid sm:grid-cols-2" style={{ gap: 16 }}>
            <div>
              <Lbl>{label('Día preferido', 'Preferred day')}</Lbl>
              <select
                name="preferred_day"
                value={form.preferred_day}
                onChange={handleChange}
                style={styleFor('preferred_day')}
                {...focusProps}
              >
                <option value="">{label('Selecciona…', 'Select…')}</option>
                {DAYS.map((o) => (
                  <option key={o.value} value={o.value} style={{ background: '#1A0F0C' }}>
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
                style={styleFor('preferred_time')}
                {...focusProps}
              >
                <option value="">{label('Selecciona…', 'Select…')}</option>
                {TIMES.map((o) => (
                  <option key={o.value} value={o.value} style={{ background: '#1A0F0C' }}>
                    {lang === 'es' ? o.es : o.en}
                  </option>
                ))}
              </select>
              <Err k="preferred_time" />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center gap-3"
            style={{
              ...primaryBtn,
              width: '100%',
              padding: 18,
              marginTop: 8,
              fontSize: '0.95rem',
              opacity: status === 'loading' ? 0.7 : 1,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'loading' ? (
              <>
                <span
                  className="rounded-full animate-spin"
                  style={{
                    width: 18,
                    height: 18,
                    border: '2px solid rgba(245,239,230,0.3)',
                    borderTopColor: '#F5EFE6',
                  }}
                />
                {label('ENVIANDO...', 'SENDING...')}
              </>
            ) : (
              <>{label('ENVIAR MI CASO →', 'SUBMIT MY CASE →')}</>
            )}
          </button>

          <p
            style={{
              fontSize: '0.68rem',
              color: 'rgba(245,239,230,0.4)',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            {label(
              'Al enviar, aceptas ser contactado por Mario Yague Law.',
              'By submitting, you agree to be contacted by Mario Yague Law.',
            )}
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// LAYER 4 — Thank you (no close affordance by design)
// ─────────────────────────────────────────────────────────────
const ThankYouLayer = ({ lang }: { key?: string; lang: Lang }) => {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(true, ref);
  const label = (es: string, en: string) => (lang === 'es' ? es : en);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 flex items-center justify-center overflow-y-auto"
      style={{
        zIndex: 80,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(20px)',
        padding: 'clamp(16px, 4vh, 40px) clamp(14px, 4vw, 40px)',
      }}
    >
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label('Caso recibido', 'Case received')}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative w-full my-auto text-center outline-none"
        style={{
          maxWidth: 500,
          background: 'linear-gradient(135deg, #7C2D2D, #2B1F1A)',
          borderRadius: 16,
          padding: 'clamp(32px, 5vh, 48px) clamp(22px, 5vw, 40px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        }}
      >
        {/* Animated check */}
        <div className="flex justify-center" style={{ marginBottom: 24 }}>
          <span className="relative flex items-center justify-center">
            <motion.span
              className="absolute rounded-full"
              style={{ width: 80, height: 80, background: 'rgba(201,168,124,0.25)' }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <span
              className="relative flex items-center justify-center rounded-full"
              style={{ width: 80, height: 80, border: '2px solid rgba(201,168,124,0.5)' }}
            >
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden>
                <motion.path
                  d="M8 19.5 L16 27 L30 12"
                  stroke="#C9A87C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                />
              </svg>
            </span>
          </span>
        </div>

        <h2
          style={{
            fontFamily: DISPLAY_FONT,
            fontStyle: 'italic',
            color: '#F5EFE6',
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            lineHeight: 1.05,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          {label('Tu caso fue recibido', 'Your case was received')}
        </h2>

        <p
          style={{
            color: 'rgba(245,239,230,0.85)',
            fontSize: '0.98rem',
            lineHeight: 1.5,
            marginBottom: 28,
          }}
        >
          {label(
            'Mario o alguien de su equipo te contactará en las próximas 24 horas en tu horario preferido.',
            'Mario or someone from his team will contact you within the next 24 hours at your preferred time.',
          )}
        </p>

        <a
          href={PHONE_HREF}
          onClick={() => trackPhoneClick('pesadillas_thankyou')}
          className="flex items-center justify-center w-full"
          style={{
            background: '#FFFFFF',
            color: '#7C2D2D',
            padding: 16,
            minHeight: 52,
            fontFamily: DISPLAY_FONT,
            fontSize: '0.9rem',
            letterSpacing: '2px',
            borderRadius: 8,
            textTransform: 'uppercase',
          }}
        >
          {label(`¿URGENTE? LLAMAR AHORA ${PHONE_DISPLAY}`, `URGENT? CALL NOW ${PHONE_DISPLAY}`)}
        </a>

        <p style={{ color: '#C9A87C', fontSize: '0.8rem', marginTop: 16 }}>
          {label(
            'Guarda nuestro número. Te llamamos pronto.',
            'Save our number. We will call you soon.',
          )}
        </p>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Page — layer state machine
// ─────────────────────────────────────────────────────────────
const PesadillasFunnelPage = () => {
  const [lang, setLang] = useState<Lang>(DEFAULT_FUNNEL_LANG);
  const [layer, setLayer] = useState<Layer>(0);
  const [checked, setChecked] = useState<number[]>([]);

  useDisplayFont();

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

  // The whole experience is zero-scroll, so the page locks the document for
  // as long as it is mounted rather than only while a modal is open.
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  // ESC steps back one layer; the thank-you layer is terminal.
  useEffect(() => {
    if (layer === 0 || layer === 4) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setLayer((l) => (l === 3 ? 2 : l === 2 ? 0 : 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [layer]);

  const changeLang = (next: Lang) => {
    trackEvent('pesadillas_language_toggle', { from: lang, to: next });
    setLang(next);
  };

  const toggle = useCallback((id: number) => {
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
  }, []);

  const openVideo = () => {
    trackEvent('pesadillas_hero_video_click', { language: lang });
    setLayer(1);
  };

  const videoContinue = () => {
    trackEvent('pesadillas_video_continue', { language: lang });
    setLayer(2);
  };

  const checklistContinue = () => {
    trackEvent('pesadillas_checklist_complete', {
      checked_count: checked.length,
      checked_items: checked.join(','),
    });
    setLayer(3);
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#0F0806' }}>
      <LanguageToggle lang={lang} onChange={changeLang} />

      {/* Layer 0 stays mounted as the visual base */}
      <HeroLayer lang={lang} onWatch={openVideo} />

      <AnimatePresence>
        {layer === 1 && (
          <VideoLayer
            key="video"
            lang={lang}
            onClose={() => setLayer(0)}
            onContinue={videoContinue}
          />
        )}
        {layer === 2 && (
          <ChecklistLayer
            key="checklist"
            lang={lang}
            checked={checked}
            onToggle={toggle}
            onClose={() => setLayer(0)}
            onContinue={checklistContinue}
          />
        )}
        {layer === 3 && (
          <FormLayer
            key="form"
            lang={lang}
            checkedIds={checked}
            onClose={() => setLayer(2)}
            onSuccess={() => setLayer(4)}
          />
        )}
        {layer === 4 && <ThankYouLayer key="thankyou" lang={lang} />}
      </AnimatePresence>
    </div>
  );
};

export default PesadillasFunnelPage;
