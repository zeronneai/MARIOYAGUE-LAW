import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Check, ArrowRight, Phone, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';
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

const DISPLAY_FONT = "'Anton', 'Arial Narrow', 'Helvetica Neue', Impact, sans-serif";

// Offsets are in em so the 3D stack keeps the same proportions from the
// 3rem mobile size up to the 8rem desktop size.
const TEXT_3D = `
  0.025em 0.025em 0 #7C2D2D,
  0.05em 0.05em 0 #5A1F1F,
  0.075em 0.075em 0 #2B1F1A,
  0.1em 0.1em 0.16em rgba(0,0,0,0.6)
`;

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
// Anton (display face) — injected only on this route.
//
// The effect runs after first paint, but every headline starts at opacity 0
// and fades in, so the swap from the fallback face is never on screen.
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

// ─────────────────────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────────────────────
const Grain = ({ opacity = 0.12 }: { opacity?: number }) => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none mix-blend-overlay"
    style={{ backgroundImage: NOISE_TEXTURE, opacity }}
  />
);

const ScrollCue = ({
  label,
  onClick,
  delay = 1.2,
}: {
  label: string;
  onClick: () => void;
  delay?: number;
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay }}
    className="group absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 min-h-[44px] px-4 cursor-pointer"
    aria-label={label}
  >
    <span className="text-[#C9A87C]/60 group-hover:text-[#C9A87C] text-[10px] uppercase tracking-[0.3em] transition-colors">
      {label}
    </span>
    <motion.span
      animate={{ y: [0, 7, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      className="text-[#C9A87C]/60 group-hover:text-[#C9A87C] transition-colors"
    >
      <ChevronDown className="w-5 h-5" />
    </motion.span>
  </motion.button>
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
        className={`min-w-[44px] min-h-[44px] px-1 text-xs font-bold tracking-[0.2em] transition-colors duration-200 ${
          active ? 'text-[#C9A87C]' : 'text-[#B8AA9A]/45 hover:text-[#B8AA9A]/80'
        }`}
      >
        {text}
      </button>
    );
  };
  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center rounded-full border border-[#C9A87C]/20 px-1.5"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}
    >
      {opt('es', 'ES')}
      <span className="text-[#B8AA9A]/25 text-xs select-none">·</span>
      {opt('en', 'EN')}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Section 1 — Hero
// ─────────────────────────────────────────────────────────────
const HeroSection = ({ lang, onNext }: { lang: Lang; onNext: () => void }) => {
  // Three lines, each with its own tilt so the stack has rhythm
  const lines =
    lang === 'es'
      ? [
          { text: 'UN CHOQUE', skew: -8 },
          { text: 'PUEDE SER', skew: -5 },
          { text: 'UNA PESADILLA', skew: -9 },
        ]
      : [
          { text: 'A CRASH', skew: -8 },
          { text: 'CAN BE', skew: -5 },
          { text: 'A NIGHTMARE', skew: -9 },
        ];

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #2B1F1A 0%, #0F0806 100%)' }}
    >
      <Grain opacity={0.14} />
      {/* Vignette pulls focus to the centre */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 180px 70px rgba(15,8,6,0.95)' }}
      />

      {/* Wide enough that the longest line clears 8rem type even in the
          fallback face, so nothing reflows when Anton swaps in. */}
      <div className="relative z-10 w-full max-w-[1200px] m-auto text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="select-none"
          style={{
            fontFamily: DISPLAY_FONT,
            fontStyle: 'italic',
            fontWeight: 900,
            // Sized so the longest line ("UNA PESADILLA") still fits on one
            // line in the fallback face, which is much wider than Anton.
            // Otherwise the headline renders as 4 lines and reflows to 3 when
            // the webfont swaps in — a visible jump on the LCP element.
            fontSize: 'clamp(2.25rem, 9.5vw, 8rem)',
            lineHeight: 0.85,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#F5EFE6',
            textShadow: TEXT_3D,
            WebkitTextStroke: '1px #7C2D2D',
          }}
        >
          {lines.map((l) => (
            <span
              key={l.text}
              className="block"
              style={{ transform: `skewX(${l.skew}deg)` }}
            >
              {l.text}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 sm:mt-14 select-none"
          style={{
            fontFamily: DISPLAY_FONT,
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            letterSpacing: '0.02em',
            color: '#C9A87C',
            transform: 'skewX(-6deg)',
            textShadow: '0.03em 0.03em 0 #5A1F1F, 0.06em 0.06em 0.1em rgba(0,0,0,0.5)',
          }}
        >
          {lang === 'es' ? 'Pero no la tuya.' : 'But not yours.'}
        </motion.p>
      </div>

      <ScrollCue
        label={lang === 'es' ? 'Descubre cómo' : 'Discover how'}
        onClick={onNext}
        delay={1.2}
      />
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Section 2 — Message
// ─────────────────────────────────────────────────────────────
const MessageSection = ({ lang, onNext }: { lang: Lang; onNext: () => void }) => (
  <section className="relative min-h-[100svh] flex px-6 pt-24 pb-24 bg-[#1A0F0C] overflow-hidden">
    <Grain />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A87C]/25 to-transparent" />

    <div className="relative z-10 max-w-[700px] m-auto text-center">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-[#F5EFE6]"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.4 }}
      >
        {lang === 'es'
          ? 'Nosotros nos encargamos de que tu única preocupación sea sentirte mejor.'
          : 'We make sure your only concern is getting better.'}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 sm:mt-16 select-none"
        style={{
          fontFamily: DISPLAY_FONT,
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          lineHeight: 0.95,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: '#C9A87C',
          transform: 'skewX(-7deg)',
          textShadow: '0.025em 0.025em 0 #7C2D2D, 0.05em 0.05em 0 #5A1F1F, 0.07em 0.07em 0.14em rgba(0,0,0,0.55)',
        }}
      >
        {lang === 'es'
          ? 'La verdadera pesadilla la tendrán los seguros.'
          : 'The real nightmare will be for the insurance companies.'}
      </motion.p>
    </div>

    <ScrollCue label={lang === 'es' ? 'Continuar' : 'Continue'} onClick={onNext} delay={0.6} />
  </section>
);

// ─────────────────────────────────────────────────────────────
// Section 3 — Mario's video
// ─────────────────────────────────────────────────────────────
const VideoSection = ({ lang, onNext }: { lang: Lang; onNext: () => void }) => {
  const [notice, setNotice] = useState(false);

  const handlePlay = () => {
    trackEvent('pesadillas_video_play_attempt', { video: 'requisitos', language: lang });
    setNotice(true);
    setTimeout(() => setNotice(false), 2600);
  };

  return (
    <section
      className="relative min-h-[100svh] flex px-6 pt-24 pb-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #2B1F1A 0%, #140907 55%, #0F0806 100%)' }}
    >
      <Grain opacity={0.1} />
      <div className="relative z-10 w-full max-w-[700px] m-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="block text-[#C9A87C] text-[11px] sm:text-xs uppercase tracking-[0.35em] font-bold mb-4"
        >
          {lang === 'es' ? 'Escucha directamente a Mario' : 'Hear directly from Mario'}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#F5EFE6] font-bold mb-10"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: 1.15 }}
        >
          {lang === 'es' ? '¿Cumples con lo que necesitamos?' : 'Do you qualify?'}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto overflow-hidden rounded-lg"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
        >
          {REQUISITOS_VIDEO_READY ? (
            <video
              src={REQUISITOS_VIDEO}
              poster={HERO_IMAGE}
              controls
              playsInline
              className="w-full aspect-video object-cover bg-black"
            />
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="group relative block w-full aspect-video bg-black cursor-pointer"
              aria-label={lang === 'es' ? 'Reproducir video' : 'Play video'}
            >
              <img
                src={HERO_IMAGE}
                alt={
                  lang === 'es'
                    ? 'Hombre en pánico después de un accidente de auto'
                    : 'Man panicking after a car crash'
                }
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-20 h-20 rounded-full bg-[#F5EFE6] shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-8 h-8 text-[#7C2D2D] ml-1" fill="currentColor" />
                </span>
              </span>
              <AnimatePresence>
                {notice && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-[#F5EFE6] text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-sm backdrop-blur-sm"
                  >
                    {lang === 'es' ? 'Video próximamente' : 'Video coming soon'}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-base"
          style={{ color: 'rgba(245,239,230,0.6)' }}
        >
          {lang === 'es'
            ? 'En menos de 1 minuto Mario te explica los 5 requisitos.'
            : 'In less than 1 minute Mario walks you through the 5 requirements.'}
        </motion.p>
      </div>

      <ScrollCue label={lang === 'es' ? 'Cualificar' : 'Qualify'} onClick={onNext} delay={0.6} />
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Section 4 — Qualification checklist (the gate)
// ─────────────────────────────────────────────────────────────
const ChecklistSection = ({
  lang,
  checked,
  onToggle,
  onUnlock,
  unlocked,
}: {
  lang: Lang;
  checked: number[];
  onToggle: (id: number) => void;
  onUnlock: () => void;
  unlocked: boolean;
}) => {
  const count = checked.length;
  const qualified = count >= MIN_REQUIRED;
  const complete = count === REQUIREMENTS.length;
  const label = (es: string, en: string) => (lang === 'es' ? es : en);

  // Sections use m-auto on the child rather than items-center: when content
  // is taller than the viewport, align-items:center overflows the top and
  // slides under the fixed toggle. Auto margins centre without that.
  return (
    <section className="relative min-h-[100svh] flex px-6 pt-24 pb-20 bg-[#F5EFE6]">
      <div className="w-full max-w-[700px] m-auto">
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="block text-[#7C2D2D] text-[11px] uppercase tracking-[0.35em] font-bold mb-3"
          >
            {label('Cualificación', 'Qualify')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[#2B1F1A] font-bold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.75rem)' }}
          >
            {label('Palomea lo que aplique a tu caso', 'Check what applies to your case')}
          </motion.h2>
          <p className="text-[#2B1F1A]/55 text-sm sm:text-base">
            {label(
              `Necesitas al menos ${MIN_REQUIRED} de ${REQUIREMENTS.length} para continuar`,
              `You need at least ${MIN_REQUIRED} out of ${REQUIREMENTS.length} to continue`,
            )}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-7">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#2B1F1A] text-sm font-bold">
              {count} / {REQUIREMENTS.length} {label('requisitos', 'requirements')}
            </span>
            <AnimatePresence>
              {qualified && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="flex items-center gap-1.5 text-[#A03838] text-xs font-bold uppercase tracking-wider"
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                  {label('Calificas', 'You qualify')}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="h-2.5 w-full rounded-full overflow-hidden bg-[#2B1F1A]/10">
            <motion.div
              animate={{
                width: `${(count / REQUIREMENTS.length) * 100}%`,
                ...(complete ? { opacity: [1, 0.72, 1] } : { opacity: 1 }),
              }}
              transition={{
                width: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: complete
                  ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.2 },
              }}
              className="h-full rounded-full"
              style={{
                background: qualified
                  ? 'linear-gradient(90deg, #7C2D2D, #A03838)'
                  : 'linear-gradient(90deg, #A08878, #C9A87C)',
                boxShadow: qualified ? '0 0 16px rgba(160,56,56,0.55)' : 'none',
              }}
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
                onClick={() => onToggle(r.id)}
                role="checkbox"
                aria-checked={on}
                data-requirement={r.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                animate={on ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                whileHover={on ? {} : { y: -2 }}
                className={`w-full flex items-center gap-4 text-left cursor-pointer transition-colors duration-200 ${
                  on ? 'border-[#7C2D2D] bg-[#FBF7EE]' : 'border-transparent bg-white hover:border-[#7C2D2D]/35'
                }`}
                style={{
                  minHeight: 72,
                  padding: '20px 24px',
                  border: '2px solid',
                  borderRadius: 12,
                  boxShadow: on
                    ? '0 6px 20px rgba(124,45,45,0.14)'
                    : '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    on ? 'bg-[#7C2D2D] border-[#7C2D2D]' : 'border-[#2B1F1A]/25'
                  }`}
                  style={{ border: '2px solid' }}
                >
                  <AnimatePresence>
                    {on && (
                      <motion.span
                        initial={{ scale: 0, rotate: -25 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                      >
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span
                  className={`text-base sm:text-lg leading-snug ${
                    on ? 'text-[#2B1F1A] font-semibold' : 'text-[#2B1F1A]/70 font-medium'
                  }`}
                >
                  {lang === 'es' ? r.es : r.en}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Gate */}
        <div className="mt-9 text-center">
          <AnimatePresence mode="wait">
            {qualified ? (
              <motion.button
                key="unlock"
                type="button"
                onClick={onUnlock}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto text-white cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #7C2D2D, #A03838)',
                  padding: '20px 48px',
                  minWidth: 300,
                  minHeight: 56,
                  fontSize: 'clamp(1.05rem, 3vw, 1.75rem)',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  borderRadius: 8,
                  boxShadow: '0 12px 40px rgba(124,45,45,0.4)',
                }}
              >
                {unlocked
                  ? label('Ir al formulario', 'Go to form')
                  : label('Desbloquear formulario', 'Unlock form')}
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </motion.button>
            ) : (
              <motion.p
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[#2B1F1A]/40 text-sm font-bold uppercase tracking-wider py-5"
              >
                {label(
                  `Palomea al menos ${MIN_REQUIRED} para desbloquear el formulario`,
                  `Check at least ${MIN_REQUIRED} to unlock the form`,
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Application form — presentation reworked, submit logic unchanged
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
        className="text-center py-8"
      >
        <div
          className="w-20 h-20 mx-auto mb-7 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #7C2D2D, #A03838)',
            boxShadow: '0 0 50px rgba(160,56,56,0.55)',
          }}
        >
          <CheckCircle2 className="w-11 h-11 text-[#F5EFE6]" />
        </div>
        <h3
          className="text-[#F5EFE6] font-bold mb-5"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', lineHeight: 1.1 }}
        >
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
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto text-white"
          style={{
            background: 'linear-gradient(135deg, #7C2D2D, #A03838)',
            padding: '18px 40px',
            minHeight: 56,
            fontWeight: 900,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontSize: '0.95rem',
            borderRadius: 8,
            boxShadow: '0 12px 40px rgba(124,45,45,0.4)',
          }}
        >
          <Phone className="w-5 h-5" />
          {label(`Llamar ahora ${PHONE_DISPLAY}`, `Call now ${PHONE_DISPLAY}`)}
        </a>
      </motion.div>
    );
  }

  // Premium dark field styling
  const fieldStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(201,168,124,0.3)',
    color: '#F5EFE6',
    padding: '16px 20px',
    borderRadius: 6,
    fontSize: 16, // 16px avoids iOS auto-zoom on focus
    width: '100%',
    outline: 'none',
    transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
  };
  const focusProps = {
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.borderColor = '#C9A87C';
      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,168,124,0.15)';
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.borderColor = 'rgba(201,168,124,0.3)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };
  const styleFor = (k: string): React.CSSProperties =>
    errors[k] ? { ...fieldStyle, borderColor: '#E06565' } : fieldStyle;

  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p className="flex items-center gap-1.5 text-[#E06565] text-xs mt-1.5">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {errors[k]}
      </p>
    ) : null;

  const Lbl = ({ children, req = true }: { children: React.ReactNode; req?: boolean }) => (
    <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#C9A87C] mb-2">
      {children}
      {req && <span className="text-[#A03838] ml-1">*</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Submit failed — entered data is kept so retrying costs nothing */}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md p-5"
          style={{ border: '1px solid rgba(224,101,101,0.5)', background: 'rgba(224,101,101,0.1)' }}
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
              className="flex-1 inline-flex items-center justify-center gap-2 text-white"
              style={{
                background: 'linear-gradient(135deg, #7C2D2D, #A03838)',
                minHeight: 52,
                padding: '12px 24px',
                fontWeight: 900,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                borderRadius: 8,
              }}
            >
              <Phone className="w-4 h-4" />
              {label(`Llamar ahora ${PHONE_DISPLAY}`, `Call now ${PHONE_DISPLAY}`)}
            </a>
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C]/10 transition-colors duration-200"
              style={{
                minHeight: 52,
                padding: '12px 24px',
                border: '1px solid rgba(201,168,124,0.4)',
                borderRadius: 8,
                fontWeight: 700,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
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

      <div className="grid sm:grid-cols-2 gap-5">
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

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Lbl>{label('Día preferido para llamada', 'Preferred day for call')}</Lbl>
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
          style={{ ...fieldStyle, resize: 'vertical' }}
          {...focusProps}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={status === 'loading' ? {} : { scale: 1.02 }}
        whileTap={status === 'loading' ? {} : { scale: 0.99 }}
        className="w-full inline-flex items-center justify-center gap-3 text-white"
        style={{
          background: 'linear-gradient(135deg, #7C2D2D, #A03838)',
          padding: '20px 32px',
          minHeight: 56,
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: 900,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          borderRadius: 8,
          boxShadow: '0 12px 40px rgba(124,45,45,0.4)',
          opacity: status === 'loading' ? 0.7 : 1,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'loading' ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {label('Enviando…', 'Sending…')}
          </>
        ) : (
          <>
            {label('Enviar mi caso', 'Submit my case')}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </motion.button>

      <p className="text-center text-xs" style={{ color: 'rgba(245,239,230,0.4)' }}>
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
  const [formUnlocked, setFormUnlocked] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useDisplayFont();

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

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

  const unlockForm = () => {
    if (!formUnlocked) {
      trackEvent('pesadillas_form_unlocked', {
        checked_count: checked.length,
        checked_items: checked.join(','),
      });
      setFormUnlocked(true);
      // Wait for the section to mount before scrolling to it
      setTimeout(() => scrollTo(formRef), 120);
    } else {
      scrollTo(formRef);
    }
  };

  const label = (es: string, en: string) => (lang === 'es' ? es : en);

  return (
    <div className="bg-[#0F0806]">
      <LanguageToggle lang={lang} onChange={changeLang} />

      <HeroSection lang={lang} onNext={() => scrollTo(messageRef)} />

      <div ref={messageRef}>
        <MessageSection lang={lang} onNext={() => scrollTo(videoRef)} />
      </div>

      <div ref={videoRef}>
        <VideoSection lang={lang} onNext={() => scrollTo(checklistRef)} />
      </div>

      <div ref={checklistRef}>
        <ChecklistSection
          lang={lang}
          checked={checked}
          onToggle={toggle}
          onUnlock={unlockForm}
          unlocked={formUnlocked}
        />
      </div>

      {/* Section 5 — only exists in the DOM once the checklist unlocks it */}
      <AnimatePresence>
        {formUnlocked && (
          <motion.div
            ref={formRef}
            key="form-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <section className="relative min-h-[100svh] flex px-6 pt-24 pb-20 bg-[#1A0F0C] overflow-hidden">
              <Grain />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A87C]/25 to-transparent" />
              <div className="relative z-10 w-full max-w-[600px] m-auto">
                <div className="text-center mb-9">
                  <span className="block text-[#C9A87C] text-[11px] uppercase tracking-[0.35em] font-bold mb-3">
                    {label('Último paso', 'Last step')}
                  </span>
                  <h2
                    className="text-[#F5EFE6] font-bold leading-tight"
                    style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
                  >
                    {label('Cuéntanos tu caso', 'Tell us your case')}
                  </h2>
                </div>
                <ApplicationForm
                  lang={lang}
                  checkedIds={checked}
                  onSubmitted={() => scrollTo(formRef)}
                />
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legal footer */}
      <footer className="bg-black py-9 px-6">
        <p
          className="max-w-2xl mx-auto text-center text-[11px] leading-relaxed"
          style={{ color: 'rgba(184,170,154,0.45)' }}
        >
          {label(
            'Los resultados pasados no garantizan resultados futuros. Esta comunicación no crea una relación abogado-cliente. Consulta gratis y confidencial.',
            'Past results do not guarantee future outcomes. This communication does not create an attorney-client relationship. Free and confidential consultation.',
          )}
          <br />
          <span className="text-[#C9A87C]/50">
            Mario Yague Law · Texas Bar #24122235 · © {new Date().getFullYear()}
          </span>
        </p>
      </footer>
    </div>
  );
};

export default PesadillasFunnelPage;
