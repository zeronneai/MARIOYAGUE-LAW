import { useEffect } from 'react';
import { Phone, ArrowRight, Check, Stethoscope, Scale, Heart, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';
import { FAQAccordion } from '../components/FAQAccordion';
import type { PracticeAreaContent } from '../seo/pageContent';
import { useSeo, buildPracticeAreaJsonLd } from '../seo/useSeo';
import { trackPhoneClick, trackEmailClick } from '../lib/analytics';

const iconMap = {
  Stethoscope,
  Scale,
  Heart,
  Car,
};

interface PracticeAreaPageProps {
  page: PracticeAreaContent;
}

export const PracticeAreaPage = ({ page }: PracticeAreaPageProps) => {
  const { language } = useLanguage();
  const Icon = iconMap[page.iconName];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page.slug]);

  useSeo({
    title: page.seo[language].title,
    description: page.seo[language].description,
    canonical: `https://www.marioyaguelaw.com/${page.slug}`,
    jsonLd: buildPracticeAreaJsonLd(page, language),
  });

  const labels = {
    overview: language === 'es' ? 'Visión General' : 'Overview',
    cases: language === 'es' ? 'Tipos de Casos que Manejamos' : 'Types of Cases We Handle',
    whyUs: language === 'es' ? '¿Por Qué Elegirnos?' : 'Why Choose Us',
    miniFaq: language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions',
    ctaTitle:
      language === 'es' ? 'Habla con Mario Hoy' : 'Talk to Mario Today',
    ctaSubtitle:
      language === 'es'
        ? 'Consulta gratis. Sin compromiso. Bilingüe.'
        : 'Free consultation. No obligation. Bilingual.',
    callCta: language === 'es' ? 'Llamar Ahora' : 'Call Now',
    emailCta: language === 'es' ? 'Enviar Email' : 'Send Email',
  };

  return (
    <>
      <PageHero
        title={page.hero[language].title}
        subtitle={page.hero[language].subtitle}
        eyebrow={page.seo[language].title.split(' | ')[0].toUpperCase()}
      />

      {/* Resumen */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[auto_1fr]">
          <div className="grid h-20 w-20 place-items-center rounded-3xl border-2 border-ink bg-toro text-white shadow-[5px_5px_0_var(--color-ink)]">
            <Icon className="h-9 w-9" />
          </div>
          <div>
            <div className="eyebrow mb-3 text-toro">{labels.overview}</div>
            <p className="max-w-3xl text-xl leading-relaxed text-ink/80">{page.overview[language]}</p>
          </div>
        </div>
      </section>

      {/* Casos */}
      <section className="border-y-2 border-ink bg-bone py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="poster text-[clamp(44px,6vw,80px)] text-ink">{labels.cases}</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.cases[language].map((caseType) => (
              <li key={caseType} className="flex items-start gap-3 rounded-2xl border-2 border-ink bg-white p-4">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-guinda text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                <span className="font-semibold text-ink">{caseType}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Por qué */}
      <section className="bg-guinda py-20 text-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="poster text-[clamp(44px,6vw,80px)]">{labels.whyUs}</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {page.whyUs[language].map((reason, idx) => (
              <li key={reason} className="flex items-start gap-4 rounded-2xl border-2 border-paper/20 p-5">
                <span className="poster text-5xl text-toro">{String(idx + 1).padStart(2, '0')}</span>
                <p className="pt-1 text-lg leading-relaxed text-paper/90">{reason}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Preguntas */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="poster mb-10 text-center text-[clamp(44px,6vw,80px)] text-ink">{labels.miniFaq}</h2>
          <FAQAccordion items={page.miniFaq} lang={language} />
        </div>
      </section>

      {/* Llamada final */}
      <section className="bg-toro py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="poster text-[clamp(48px,7vw,96px)]">{labels.ctaTitle}</h2>
          <p className="mt-3 text-lg text-white/85">{labels.ctaSubtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="tel:+19154001099" onClick={() => trackPhoneClick(`practice_area_cta:${page.slug}`)} className="btn bg-white text-toro shadow-[4px_4px_0_var(--color-ink)]">
              <Phone className="h-4 w-4" /> {labels.callCta} · (915) 400-1099
            </a>
            <a href="mailto:mario@myr-law.com" onClick={() => trackEmailClick(`practice_area_cta:${page.slug}`)} className="btn border-2 border-white text-white hover:bg-white hover:text-toro">
              {labels.emailCta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
