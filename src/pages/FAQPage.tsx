import { useEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';
import { FAQAccordion } from '../components/FAQAccordion';
import { faqQuestions, faqPageSeo } from '../seo/pageContent';
import { useSeo, buildFaqJsonLd } from '../seo/useSeo';
import { trackPhoneClick } from '../lib/analytics';

export const FAQPage = () => {
  const { language } = useLanguage();

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

      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-6">
          <FAQAccordion items={faqQuestions} lang={language} />
        </div>
      </section>

      <section className="py-20 bg-charcoal text-beige">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-3 text-beige">
            {ctaHeading}
          </h2>
          <p className="text-beige/70 mb-8">{ctaSubtext}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19154001099"
              onClick={() => trackPhoneClick('faq_cta')}
              className="inline-flex items-center justify-center gap-3 bg-burgundy text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-xl shadow-burgundy/30 border border-gold/40 rounded-sm text-sm"
            >
              <Phone className="w-4 h-4" />
              {ctaButton}
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 border border-gold/40 text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded-sm text-sm"
            >
              {language === 'es' ? 'Formulario de Contacto' : 'Contact Form'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
