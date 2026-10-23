import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bike, Car, Check, Footprints, MessageCircle, Phone, Play, Smartphone, Truck, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useDrawer } from '../../context/DrawerContext';
import { home, PHONE, PHONE_HREF, WHATSAPP_HREF } from '../../content/home';
import { explainers, marioStory, media, testimonials, type Reel } from '../../content/media';
import { faqQuestions } from '../../seo/pageContent';
import { trackEvent, trackPhoneClick, trackServiceCardClick, trackWhatsAppClick } from '../../lib/analytics';
import { FAQAccordion } from '../FAQAccordion';
import { ContactForm } from '../site/ContactForm';
import { Reveal } from '../site/Reveal';

const useCopy = () => {
  const { language } = useLanguage();
  return home[language];
};

/** Título de cartel: primera línea en tinta, segunda en itálica guinda. */
function Title({ lines, className = '', light = false }: { lines: readonly [string, string] | readonly string[]; className?: string; light?: boolean }) {
  return (
    <h2 className={`poster text-[clamp(44px,7vw,96px)] ${light ? 'text-paper' : 'text-ink'} ${className}`}>
      {lines[0]}
      <span className={`accent mt-1 block text-[0.62em] leading-[1.05] ${light ? 'text-paper/85' : 'text-guinda'}`}>{lines[1]}</span>
    </h2>
  );
}

function Kicker({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`eyebrow mb-5 flex items-center gap-2 ${light ? 'text-paper/80' : 'text-toro'}`}>
      <span className={`h-2 w-2 rounded-full ${light ? 'bg-paper' : 'bg-toro'}`} /> {children}
    </div>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

/** Sello giratorio con el logo del Toro. */
function Stamp({ text }: { text: string }) {
  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="stamp-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--color-toro)" />
        <text fill="#fff" style={{ font: '800 17px "Big Shoulders Display Variable", sans-serif', letterSpacing: '3.4px' }}>
          <textPath href="#stamp-circle">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] grid place-items-center rounded-full bg-paper">
        <img src={media.logo} alt="El Toro" width={80} height={80} className="h-[70%] w-[70%] object-contain" />
      </div>
    </div>
  );
}

export function Hero() {
  const c = useCopy().hero;
  const { openDrawer } = useDrawer();
  return (
    <section className="grain relative overflow-hidden pt-[88px]">
      {/* bloque guinda diagonal detrás de la foto */}
      <div className="absolute -right-24 top-0 hidden h-full w-[46%] -skew-x-6 bg-guinda lg:block" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-14">
        <div className="animate-rise">
          <h1>
            <span className="tag mb-6 border-toro font-sans text-toro">
              <span className="h-2 w-2 animate-pulse rounded-full bg-toro" /> {c.kicker}
            </span>
            <span className="poster block text-[clamp(76px,13vw,190px)] text-guinda">{c.line1}</span>
            <span className="poster block text-[clamp(76px,13vw,190px)] text-toro">{c.line2}</span>
          </h1>
          <p className="accent mt-6 max-w-xl text-[clamp(26px,3.2vw,40px)] leading-[1.08] text-ink">{c.sub}</p>
          <p className="mt-4 max-w-xl text-lg text-ink/70">{c.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={PHONE_HREF} onClick={() => trackPhoneClick('hero')} className="btn-toro !px-7 !py-4 !text-base">
              <Phone className="h-5 w-5" /> {c.call}
            </a>
            <button
              type="button"
              onClick={() => {
                trackEvent('form_drawer_open', { location: 'hero' });
                openDrawer('hero');
              }}
              className="btn-line !px-7 !py-4 !text-base"
            >
              {c.form} <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {c.proof.map((p) => (
              <li key={p} className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-guinda text-white"><Check className="h-3 w-3" strokeWidth={3} /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] animate-rise [animation-delay:120ms]">
          <div className="overflow-hidden rounded-[28px] border border-ink/15 bg-ink shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)]">
            <img
              src={media.hero.src}
              srcSet={media.hero.srcSet}
              sizes="(min-width: 1024px) 520px, 92vw"
              alt="Mario Yague, El Toro, abogado de accidentes en El Paso"
              width={900}
              height={1100}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-6 sm:-left-10">
            <Stamp text={c.stamp} />
          </div>
          <div className="absolute -right-2 top-6 rounded-xl border border-ink/15 bg-paper px-4 py-2 shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)] sm:-right-6">
            <div className="poster text-3xl text-toro">{c.proof[1]}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Cinta ───────────────────────────── */

export function Ticker() {
  const items = useCopy().ticker;
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="poster px-6 text-[clamp(32px,4.5vw,60px)] text-paper">{t}</span>
          <span className="text-2xl text-toro">★</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-guinda py-3" aria-hidden>
      <div className="flex w-max animate-marquee">{row}{row}</div>
    </div>
  );
}

/* ───────────────────────────── 3 pasos ───────────────────────────── */

export function Steps() {
  const c = useCopy().steps;
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <Kicker>{c.kicker}</Kicker>
          <Title lines={c.title} />
        </Reveal>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {c.items.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90} className={`card relative p-7 ${i === 1 ? 'md:translate-y-4' : ''} ${i === 2 ? '!bg-guinda text-paper' : ''}`}>
              <div className={`poster text-[88px] ${i === 2 ? 'text-paper/25' : 'stroke-ink'}`}>{s.n}</div>
              <h3 className={`poster mt-2 text-4xl ${i === 2 ? 'text-paper' : 'text-guinda'}`}>{s.title}</h3>
              <p className={`mt-3 leading-relaxed ${i === 2 ? 'text-paper/85' : 'text-ink/75'}`}>{s.body}</p>
              {i === 2 ? (
                <a href={PHONE_HREF} onClick={() => trackPhoneClick('steps')} className="btn mt-6 bg-paper text-guinda shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)]">
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              ) : null}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────────── Videos ───────────────────────────── */

function VideoModal({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  const { language } = useLanguage();
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', k);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/85 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={reel.title[language]}>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink" aria-label="Cerrar">
          <X className="h-5 w-5" />
        </button>
        <video src={reel.src} poster={reel.poster} controls autoPlay playsInline className="aspect-video w-full rounded-[22px] border-2 border-paper bg-ink object-contain" />
      </div>
    </div>
  );
}

function ReelCard({ reel, onOpen, tall = false, fluid = false }: { reel: Reel; onOpen: () => void; tall?: boolean; fluid?: boolean }) {
  const { language } = useLanguage();
  return (
    <button type="button" onClick={onOpen} className={`group relative shrink-0 snap-start overflow-hidden rounded-[22px] border border-ink/15 bg-ink text-left shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)] transition ${fluid ? 'w-full' : tall ? 'w-[min(86vw,460px)]' : 'w-[min(80vw,380px)]'}`}>
      <img src={reel.poster} alt="" loading="lazy" width={540} height={304} className="aspect-video w-full object-cover opacity-90 transition group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-toro text-white shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)] transition group-hover:scale-110">
        <Play className="ml-1 h-7 w-7 fill-white" />
      </span>
      <span className="absolute left-3 top-3 flex gap-1.5">
        <span className="rounded-full bg-paper px-2 py-0.5 text-[11px] font-bold text-ink">{reel.lang === 'es' ? 'ESPAÑOL' : 'ENGLISH'}</span>
        {reel.duration ? <span className="rounded-full bg-ink/70 px-2 py-0.5 text-[11px] font-bold text-paper">{reel.duration}</span> : null}
      </span>
      <span className="poster absolute inset-x-0 bottom-0 p-4 text-[30px] leading-[0.95] text-paper">{reel.title[language]}</span>
    </button>
  );
}

function ReelRow({ reels, tall, grid = false }: { reels: Reel[]; tall?: boolean; grid?: boolean }) {
  const [open, setOpen] = useState<Reel | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };
  useEffect(update, [reels]);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };
  const play = (r: Reel) => {
    trackEvent('video_play', { video: r.id });
    setOpen(r);
  };
  const arrow = 'grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-paper text-ink transition hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30';
  return (
    <>
      {grid ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reels.map((r) => <ReelCard key={r.id} reel={r} fluid onOpen={() => play(r)} />)}
        </div>
      ) : (
        <div className="relative">
          <div ref={track} onScroll={update} className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
            {reels.map((r) => <ReelCard key={r.id} reel={r} tall={tall} onOpen={() => play(r)} />)}
          </div>
          <div className="mt-4 hidden justify-end gap-3 md:flex">
            <button type="button" onClick={() => move(-1)} disabled={edge.start} className={arrow} aria-label="Anterior / Previous">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => move(1)} disabled={edge.end} className={arrow} aria-label="Siguiente / Next">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      {open ? <VideoModal reel={open} onClose={() => setOpen(null)} /> : null}
    </>
  );
}

export function Videos() {
  const c = useCopy().videos;
  const { language } = useLanguage();
  if (!explainers.length) return null;
  // primero los que están en el idioma de quien visita
  const reels = [...explainers].sort((a, b) => Number(b.lang === language) - Number(a.lang === language));
  return (
    <section id="videos" className="scroll-mt-24 border-y border-ink/10 bg-bone py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <Kicker>{c.kicker}</Kicker>
            <Title lines={c.title} />
          </Reveal>
          <p className="max-w-sm text-lg text-ink/70">{c.sub}</p>
        </div>
        <ReelRow reels={reels} tall />
      </div>
    </section>
  );
}

/* ───────────────────────────── Tipos de accidente ───────────────────────────── */

const CASE_ICONS = { car: Car, truck: Truck, moto: Bike, walk: Footprints, ride: Smartphone } as const;

export function Cases() {
  const c = useCopy().cases;
  const { lp, language } = useLanguage();
  const es = language === 'es';
  const others: [string, string][] = [
    ['/criminal-defense', es ? 'Defensa criminal' : 'Criminal defense'],
    ['/dwi-defense', es ? 'Defensa DWI' : 'DWI defense'],
    ['/family-law', es ? 'Derecho familiar' : 'Family law'],
  ];
  return (
    <section id="accidents" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <Kicker>{c.kicker}</Kicker>
          <Title lines={c.title} />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {c.items.map((it, i) => {
            const Icon = CASE_ICONS[it.key as keyof typeof CASE_ICONS];
            const big = i < 2;
            const red = i === 0;
            return (
              <Reveal key={it.key} delay={i * 60} className={big ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <Link
                  to={lp('/personal-injury')}
                  onClick={() => trackServiceCardClick(`accident_${it.key}`, 'home_cases')}
                  className={`card group flex h-full flex-col justify-between p-7 transition ${red ? '!bg-toro text-white' : ''} ${big ? 'min-h-[260px]' : 'min-h-[220px]'}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl border-2 ${red ? 'border-white/40 bg-white/10' : 'border-ink bg-paper'}`}>
                      <Icon className="h-7 w-7" />
                    </span>
                    <ArrowUpRight className="h-7 w-7 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <div>
                    <h3 className={`poster mt-6 ${big ? 'text-6xl' : 'text-5xl'} ${red ? 'text-white' : 'text-guinda'}`}>{it.title}</h3>
                    <p className={`mt-2 ${red ? 'text-white/85' : 'text-ink/70'}`}>{it.body}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link to={lp('/personal-injury')} className="btn-guinda">
            {c.more} <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="ml-2 text-sm font-semibold text-ink/60">{c.other}:</span>
          {others.map(([href, label]) => (
            <Link key={href} to={lp(href)} onClick={() => trackServiceCardClick(href.slice(1), 'home_others')} className="tag hover:bg-ink hover:text-paper">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Ellos vs. el Toro ───────────────────────────── */

export function Versus() {
  const c = useCopy().vs;
  return (
    <section className="relative overflow-hidden bg-guinda py-24 text-paper">
      <div className="poster pointer-events-none absolute -right-10 top-6 select-none text-[34vw] leading-none text-white/[0.04]" aria-hidden>VS</div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <Kicker light>{c.kicker}</Kicker>
          <Title lines={c.title} light />
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[22px] border-2 border-paper/25 p-7">
            <div className="poster mb-6 text-4xl text-paper/60">{c.them}</div>
            <ul className="space-y-5">
              {c.rows.map(([them]: readonly string[]) => (
                <li key={them} className="flex gap-3 text-lg text-paper/65">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-paper/30"><X className="h-3.5 w-3.5" /></span>
                  <span className="line-through decoration-toro decoration-2">{them}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-[22px] border border-ink/15 bg-paper p-7 text-ink shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)]">
            <div className="poster mb-6 flex items-center gap-3 text-4xl text-toro">
              <img src={media.logo} alt="" width={40} height={40} className="h-10 w-10 object-contain" loading="lazy" /> {c.us}
            </div>
            <ul className="space-y-5">
              {c.rows.map(([, us]: readonly string[]) => (
                <li key={us} className="flex gap-3 text-lg font-semibold">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-toro text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                  {us}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Testimonios ───────────────────────────── */

export function Testimonials() {
  const c = useCopy().testimonials;
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid items-end gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Kicker>{c.kicker}</Kicker>
            <Title lines={c.title} />
          </Reveal>
          <Reveal delay={100}>
            <dl className="grid grid-cols-3 gap-3">
              {c.stats.map(([v, k]) => (
                <div key={v} className="rounded-2xl border border-ink/15 bg-white px-3 py-4 shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)] sm:px-5">
                  <dt className="poster text-[clamp(34px,5vw,64px)] text-toro">{v}</dt>
                  <dd className="mt-1 text-xs font-semibold leading-snug text-ink/70 sm:text-sm">{k}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <ReelRow reels={testimonials} grid />
        <p className="mt-4 text-xs text-ink/50">{c.disclaimer}</p>
      </div>
    </section>
  );
}

/* ───────────────────────────── Mario ───────────────────────────── */

export function MeetMario() {
  const all = useCopy();
  const c = all.mario;
  const cta = all.steps.cta;
  const { openDrawer } = useDrawer();
  const { language } = useLanguage();
  const [story, setStory] = useState(false);
  return (
    <section id="mario" className="scroll-mt-24 border-y border-ink/10 bg-bone py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative mx-auto w-full max-w-[460px]">
          <div className="overflow-hidden rounded-[28px] border border-ink/15 shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)]">
            <img src={media.marioPhoto} alt="Mario Yague, abogado fundador de Mario Yague Law en El Paso, Texas" width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <button
            type="button"
            onClick={() => {
              trackEvent('video_play', { video: marioStory.id });
              setStory(true);
            }}
            className="absolute -bottom-6 -right-3 flex items-center gap-3 rounded-2xl border border-ink/15 bg-toro px-5 py-3 text-left text-white shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)] transition"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-toro"><Play className="ml-0.5 h-5 w-5 fill-toro" /></span>
            <span>
              <span className="poster block text-3xl">{language === 'es' ? 'Su historia' : 'His story'}</span>
              <span className="text-xs font-semibold text-white/85">{marioStory.title[language]} · {marioStory.duration}</span>
            </span>
          </button>
          {story ? <VideoModal reel={marioStory} onClose={() => setStory(false)} /> : null}
        </Reveal>
        <Reveal delay={100}>
          <Kicker>{c.kicker}</Kicker>
          <h2 className="poster text-[clamp(56px,8vw,112px)] text-guinda">{c.name}</h2>
          <p className="eyebrow mt-2 text-ink/60">{c.role}</p>
          <blockquote className="accent mt-8 border-l-4 border-toro pl-5 text-[clamp(30px,3.6vw,46px)] leading-[1.05] text-ink">“{c.quote}”</blockquote>
          {c.body.map((p) => (
            <p key={p} className="mt-5 text-lg leading-relaxed text-ink/75">{p}</p>
          ))}
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {c.creds.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-ink/15 bg-paper px-4 py-3">
                <dt className="font-display text-2xl font-extrabold uppercase text-guinda">{k}</dt>
                <dd className="text-sm text-ink/70">{v}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            onClick={() => {
              trackEvent('form_drawer_open', { location: 'meet_mario' });
              openDrawer('meet_mario');
            }}
            className="btn-toro mt-9"
          >
            {cta} <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── Equipo ───────────────────────────── */

export function Team() {
  const c = useCopy().team;
  return (
    <section id="team" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-12 grid items-end gap-6 lg:grid-cols-2">
          <div>
            <Kicker>{c.kicker}</Kicker>
            <Title lines={c.title} />
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink/70 lg:justify-self-end">{c.sub}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {c.people.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className={i % 2 ? 'lg:translate-y-8' : ''}>
              <figure className="group overflow-hidden rounded-[24px] border border-ink/15 bg-guinda shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)]">
                <div className="overflow-hidden">
                  <img src={p.photo} alt={`${p.name}, ${p.role}, Mario Yague Law`} width={543} height={724} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                </div>
                <figcaption className="border-t border-ink/10 bg-paper px-4 py-3">
                  <div className="poster text-2xl text-ink sm:text-3xl">{p.name}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-toro">{p.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── FAQ ───────────────────────────── */

export function HomeFaq() {
  const c = useCopy().faq;
  const { language, lp } = useLanguage();
  return (
    <section id="faq" className="scroll-mt-24 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Kicker>{c.kicker}</Kicker>
          <Title lines={c.title} />
          <Link to={lp('/faq')} className="btn-line mt-8">
            {c.all} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <FAQAccordion items={faqQuestions.slice(0, 6)} lang={language} />
      </div>
    </section>
  );
}

/* ───────────────────────────── Contacto ───────────────────────────── */

export function ContactSection() {
  const c = useCopy().contact;
  const { language, t } = useLanguage();
  const wa = WHATSAPP_HREF + encodeURIComponent(language === 'es' ? 'Hola Toro, tuve un accidente y necesito ayuda.' : 'Hi Toro, I was in an accident and need help.');
  return (
    <section id="contact" className="scroll-mt-24 relative overflow-hidden bg-toro py-24 text-white">
      <div className="poster pointer-events-none absolute -left-6 bottom-0 select-none text-[26vw] leading-[0.75] text-white/[0.07]" aria-hidden>Toro</div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Kicker light>{c.kicker}</Kicker>
          <Title lines={c.title} light />
          <p className="mt-6 max-w-md text-lg text-white/85">{c.sub}</p>
          <div className="mt-8 space-y-5">
            <a href={PHONE_HREF} onClick={() => trackPhoneClick('contact_section')} className="poster block text-[clamp(44px,6vw,72px)] text-white hover:underline">
              {PHONE}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('contact_section')} className="btn bg-white text-toro shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)]">
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
            <p className="pt-4 text-white/80">1331 Wyoming Ave, El Paso, TX 79902 · {t.footer.hoursWeekdays}</p>
          </div>
        </div>
        <div className="card p-6 text-ink sm:p-8">
          <ContactForm source="contact_form" />
        </div>
      </div>
    </section>
  );
}
