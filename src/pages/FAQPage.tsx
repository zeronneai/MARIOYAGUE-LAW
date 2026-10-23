import { useEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';
import { FAQAccordion } from '../components/FAQAccordion';
import { faqQuestions, faqPageSeo } from '../seo/pageContent';
import { useSeo, buildFaqJsonLd } from '../seo/useSeo';
import { useDrawer } from '../context/DrawerContext';
import { trackPhoneClick, trackEvent } from '../lib/analytics';

export const FAQPage = () => {
  const { language } = useLanguage();
  const { openDrawer } = useDrawer();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: faqPageSeo[language].title,
    description: faqPageSeo[language].description,
    canonical: 'https://www.marioyaguelaw.com/faq',
    jsonLd: buildFaqJsonLd(faqQuestions, language),
  });

  const heroTitle =
    language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions';
  const heroSubtitle =
    language === 'es'
      ? 'Respuestas claras a las preguntas más comunes sobre lesiones personales, defensa criminal y derecho familiar en El Paso'
      : 'Clear answers to the most common questions about personal injury, criminal defense, and family law in El Paso';
  const eyebrow = language === 'es' ? 'CENTRO DE AYUDA' : 'HELP CENTER';
  const ctaHeading =
    language === 'es' ? '¿Tienes otra pregunta?' : 'Have another question?';
  const ctaSubtext =
    language === 'es'
      ? 'Llámanos. La consulta es gratis y confidencial.'
      : 'Call us. The consultation is free and confidential.';
  const ctaButton =
    language === 'es' ? 'Llamar (915) 400-1099' : 'Call (915) 400-1099';

  return (
    <>
      <PageHero title={heroTitle} subtitle={heroSubtitle} eyebrow={eyebrow} />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FAQAccordion items={faqQuestions} lang={language} />
        </div>
      </section>

      <section className="bg-toro py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="poster text-[clamp(48px,7vw,90px)]">{ctaHeading}</h2>
          <p className="mt-3 text-lg text-white/85">{ctaSubtext}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="tel:+19154001099" onClick={() => trackPhoneClick('faq_cta')} className="btn bg-white text-toro shadow-[0_18px_40px_-22px_rgba(29,21,19,0.35)]">
              <Phone className="h-4 w-4" /> {ctaButton}
            </a>
            <button
              type="button"
              onClick={() => {
                trackEvent('form_drawer_open', { location: 'faq_cta' });
                openDrawer('faq_cta');
              }}
              className="btn border-2 border-white text-white hover:bg-white hover:text-toro"
            >
              {language === 'es' ? 'Consulta gratis' : 'Free consultation'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
