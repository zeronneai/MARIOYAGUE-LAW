import { ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDrawer } from '../context/DrawerContext';
import { trackPhoneClick, trackEvent } from '../lib/analytics';
import { media } from '../content/media';
import { PHONE, PHONE_HREF } from '../content/home';

interface PageHeroProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
}

/** Encabezado de páginas internas: mismo estilo cartel que la home. */
export const PageHero = ({ title, subtitle, eyebrow }: PageHeroProps) => {
  const { language } = useLanguage();
  const { openDrawer } = useDrawer();
  const es = language === 'es';
  return (
    <section className="grain relative overflow-hidden border-b-2 border-ink pb-16 pt-32 sm:pt-36">
      <img src={media.logoMark} alt="" aria-hidden width={400} height={400} className="pointer-events-none absolute -right-16 top-16 hidden w-[380px] opacity-[0.07] md:block" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {eyebrow ? (
          <span className="tag mb-6 border-toro text-toro">
            <span className="h-2 w-2 rounded-full bg-toro" /> {eyebrow}
          </span>
        ) : null}
        <h1 className="poster text-[clamp(52px,8.5vw,120px)] text-guinda">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">{subtitle}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={PHONE_HREF} onClick={() => trackPhoneClick('page_hero')} className="btn-toro">
            <Phone className="h-4 w-4" /> {es ? 'Llama' : 'Call'} {PHONE}
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent('form_drawer_open', { location: 'page_hero' });
              openDrawer('page_hero');
            }}
            className="btn-line"
          >
            {es ? 'Consulta gratis' : 'Free consultation'} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
