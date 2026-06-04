import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackPhoneClick } from '../lib/analytics';

interface PageHeroProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
}

export const PageHero = ({ title, subtitle, eyebrow }: PageHeroProps) => {
  const { language } = useLanguage();
  const ctaLabel =
    language === 'es' ? 'Agenda una Consulta Gratuita' : 'Schedule a Free Consultation';
  const phoneLabel = language === 'es' ? 'Llama Ahora' : 'Call Now';

  return (
    <section className="relative pt-36 pb-20 bg-charcoal text-beige overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1773424907/my_law_logo_transparent_gvtvdw.png)',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-gold uppercase tracking-[0.3em] text-xs font-bold mb-5"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-serif tracking-tight text-beige mb-5 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-beige/70 max-w-2xl mx-auto text-lg leading-relaxed mb-10"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 bg-burgundy text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-xl shadow-burgundy/30 border border-gold/40 rounded-sm text-sm"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="tel:+19154001099"
            onClick={() => trackPhoneClick('page_hero')}
            className="inline-flex items-center gap-3 border border-gold/40 text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded-sm text-sm"
          >
            <Phone className="w-4 h-4" />
            {phoneLabel} · (915) 400-1099
          </a>
        </motion.div>
      </div>
    </section>
  );
};
