import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, Check, Stethoscope, Scale, Heart, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';
import { FAQAccordion } from '../components/FAQAccordion';
import type { PracticeAreaContent } from '../seo/pageContent';
import { useSeo, buildPracticeAreaJsonLd } from '../seo/useSeo';

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

      {/* Section 1: Overview */}
      <section className="py-20 bg-beige">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-14 h-14 rounded-sm bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-2">
                {labels.overview}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-charcoal leading-tight">
                {page.hero[language].title}
              </h2>
            </div>
          </div>
          <p className="text-charcoal/75 leading-relaxed text-base md:text-lg">
            {page.overview[language]}
          </p>
        </div>
      </section>

      {/* Section 2: Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-3">
              {labels.cases}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
              {labels.cases}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {page.cases[language].map((caseType) => (
              <div
                key={caseType}
                className="flex items-start gap-3 p-4 border border-burgundy/10 bg-beige/40 rounded-sm hover:border-gold/30 transition-colors"
              >
                <Check className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" />
                <span className="text-charcoal text-sm font-medium">{caseType}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Us */}
      <section className="py-20 bg-charcoal text-beige">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-3">
              {labels.whyUs}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-beige">{labels.whyUs}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {page.whyUs[language].map((reason, idx) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex items-start gap-4 p-5 border border-gold/15 bg-white/5 rounded-sm"
              >
                <div className="w-9 h-9 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {idx + 1}
                </div>
                <p className="text-beige/85 leading-relaxed text-sm md:text-base pt-1">
                  {reason}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Mini FAQ */}
      <section className="py-20 bg-beige">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-3">
              {labels.miniFaq}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
              {labels.miniFaq}
            </h2>
          </div>
          <FAQAccordion items={page.miniFaq} lang={language} />
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="py-20 bg-burgundy text-beige">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-3 text-beige">
            {labels.ctaTitle}
          </h2>
          <p className="text-beige/80 mb-8 text-lg">{labels.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19154001099"
              className="inline-flex items-center justify-center gap-3 bg-charcoal text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-black transition-all border border-gold/40 rounded-sm text-sm"
            >
              <Phone className="w-4 h-4" />
              {labels.callCta} · (915) 400-1099
            </a>
            <a
              href="mailto:mario@myr-law.com"
              className="inline-flex items-center justify-center gap-3 bg-beige text-burgundy px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all rounded-sm text-sm"
            >
              {labels.emailCta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
