import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  AlertTriangle,
  PhoneCall,
  Swords,
  CircleDollarSign,
  Award,
  Languages,
  Scale,
  Check,
  Mail,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDrawer } from '../context/DrawerContext';
import { FAQAccordion } from '../components/FAQAccordion';
import { useSeo } from '../seo/useSeo';
import type { LocalizedQA } from '../seo/pageContent';
import { trackPhoneClick, trackEmailClick, trackEvent } from '../lib/analytics';

const SITE = 'https://www.marioyaguelaw.com';

const faqItems: LocalizedQA[] = [
  {
    en: {
      q: 'What does "De Choque a Cheque" mean?',
      a: '"De Choque a Cheque" is Spanish for "From Crash to Check." It is the campaign promise of Mario Yague Law: when you have been hurt in an accident in El Paso, we turn your crash into a check — the compensation you deserve. The phrase captures our entire process, from the moment of the accident to the moment you receive your settlement, with no fee unless we win.',
    },
    es: {
      q: '¿Qué significa "De Choque a Cheque"?',
      a: '"De Choque a Cheque" es la promesa de campaña de Mario Yague Law: cuando has sido lastimado en un accidente en El Paso, convertimos tu choque en un cheque — la compensación que mereces. La frase resume todo nuestro proceso, desde el momento del accidente hasta el momento en que recibes tu acuerdo, sin honorarios a menos que ganemos.',
    },
  },
  {
    en: {
      q: 'How long does the De Choque a Cheque process take?',
      a: 'Most personal injury cases in El Paso resolve in 6 months to 3 years, depending on the severity of the injuries, the insurance company\'s response, and whether the case settles or goes to trial. Simple cases with clear liability and minor injuries can settle in 4–6 months. Complex cases with serious injuries or disputed liability can take 1–3 years. We move as fast as the medical and legal facts allow, and we keep you updated at every stage.',
    },
    es: {
      q: '¿Cuánto tarda el proceso De Choque a Cheque?',
      a: 'La mayoría de los casos de lesiones personales en El Paso se resuelven entre 6 meses y 3 años, dependiendo de la severidad de las lesiones, la respuesta de la compañía de seguros, y si el caso se resuelve por acuerdo o va a juicio. Casos simples con responsabilidad clara y lesiones menores pueden resolverse en 4 a 6 meses. Casos complejos con lesiones graves o responsabilidad disputada pueden tomar de 1 a 3 años. Avanzamos tan rápido como los hechos médicos y legales lo permiten, y te mantenemos informado en cada etapa.',
    },
  },
  {
    en: {
      q: 'What are the attorney fees for De Choque a Cheque?',
      a: 'You pay nothing upfront. Mario Yague Law works on a contingency fee — we only get paid if we win your case, typically 33–40% of the final settlement. The initial consultation is free and confidential. If we do not recover compensation for you, you owe us nothing. No fee unless we win.',
    },
    es: {
      q: '¿Cuánto cobra Mario Yague Law?',
      a: 'No pagas nada por adelantado. Mario Yague Law trabaja con honorarios de contingencia — solo cobramos si ganamos tu caso, típicamente entre 33% y 40% del acuerdo final. La consulta inicial es gratis y confidencial. Si no recuperamos compensación para ti, no nos debes nada. Sin honorarios a menos que ganemos.',
    },
  },
  {
    en: {
      q: 'What types of accidents qualify for De Choque a Cheque?',
      a: 'Car accidents, truck and 18-wheeler accidents, motorcycle accidents, pedestrian and bicycle accidents, slip and fall injuries, workplace injuries, wrongful death, and other incidents where someone else\'s negligence caused you harm. If you are not sure whether your situation qualifies, call us — the consultation is free and we will tell you straight.',
    },
    es: {
      q: '¿Qué tipos de accidentes califican para De Choque a Cheque?',
      a: 'Accidentes de auto, accidentes de camiones y tráileres de 18 ruedas, accidentes de motocicleta, accidentes peatonales y de bicicleta, resbalones y caídas, lesiones en el trabajo, muerte por negligencia, y otros incidentes donde la negligencia de alguien más te causó daño. Si no estás seguro si tu situación califica, llámanos — la consulta es gratis y te lo decimos directo.',
    },
  },
  {
    en: {
      q: 'Does Mario Yague speak Spanish?',
      a: 'Yes. Mario Yague Law is fully bilingual. Mario himself is bilingual, and our entire team handles consultations, court representation, document review, and client communication in both English and Spanish. Given El Paso\'s location on the U.S.-Mexico border, bilingual representation is essential to make sure you understand every step of your case. Llámanos en español o inglés al (915) 400-1099.',
    },
    es: {
      q: '¿Mario Yague atiende en español?',
      a: 'Sí. Mario Yague Law es completamente bilingüe. Mario mismo es bilingüe, y todo nuestro equipo maneja consultas, representación en corte, revisión de documentos, y comunicación con clientes en inglés y español. Dada la ubicación de El Paso en la frontera EE.UU.-México, la representación bilingüe es esencial para asegurarnos de que entiendes cada paso de tu caso. Call us in Spanish or English at (915) 400-1099.',
    },
  },
];

const buildJsonLd = (lang: 'en' | 'es') => [
  {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'De Choque a Cheque by Mario Yague Law',
    alternateName: ['De Choque a Cheque', 'From Crash to Cash', 'From Crash to Check'],
    description:
      lang === 'es'
        ? 'De Choque a Cheque es la campaña de Mario Yague Law que convierte tu accidente en tu compensación. Abogado bilingüe de lesiones personales en El Paso, Texas. Sin honorarios a menos que ganemos.'
        : 'De Choque a Cheque is the Mario Yague Law campaign that turns your crash into your check. Bilingual personal injury attorney in El Paso, Texas. No fees unless we win.',
    url: `${SITE}/de-choque-a-cheque`,
    slogan: 'De Choque a Cheque',
    inLanguage: ['en-US', 'es-MX'],
    provider: { '@id': `${SITE}/#legalservice` },
    areaServed: {
      '@type': 'City',
      name: 'El Paso',
      containedInPlace: { '@type': 'State', name: 'Texas' },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item[lang].q,
      acceptedAnswer: { '@type': 'Answer', text: item[lang].a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'es' ? 'Inicio' : 'Home',
        item: `${SITE}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'De Choque a Cheque',
        item: `${SITE}/de-choque-a-cheque`,
      },
    ],
  },
];

export const DeChoqueAChequePage = () => {
  const { language } = useLanguage();
  const { openDrawer } = useDrawer();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title:
      language === 'es'
        ? 'De Choque a Cheque — Mario Yague Law | Abogado de Accidentes El Paso'
        : 'De Choque a Cheque — Mario Yague Law | El Paso Accident Attorney',
    description:
      language === 'es'
        ? 'De Choque a Cheque: Mario Yague convierte tu accidente en tu compensación. $10M+ recuperados. Abogado bilingüe en El Paso, TX. Sin honorarios si no ganas. (915) 400-1099.'
        : 'De Choque a Cheque: Mario Yague turns your crash into your check. $10M+ recovered. Bilingual attorney in El Paso, TX. No fee unless we win. (915) 400-1099.',
    canonical: `${SITE}/de-choque-a-cheque`,
    jsonLd: buildJsonLd(language),
  });

  const heroTitle = 'De Choque a Cheque';
  const heroSubtitle =
    language === 'es'
      ? 'Si tuviste un accidente en El Paso, convertimos tu choque en un cheque. Sin pagar nada por adelantado.'
      : 'If you had an accident in El Paso, we turn your crash into your check. You pay nothing upfront.';

  const callCta = language === 'es' ? 'Llamar Ahora · (915) 400-1099' : 'Call Now · (915) 400-1099';
  const freeCta = language === 'es' ? 'Consulta Gratis' : 'Free Consultation';

  const statBig = '$10M+';
  const statLabel =
    language === 'es' ? 'Recuperados para nuestros clientes' : 'Recovered for our clients';
  const disclaimer =
    language === 'es'
      ? 'Resultados pasados no garantizan resultados futuros.'
      : 'Past results do not guarantee future outcomes.';

  const meaningHeading =
    language === 'es' ? '¿Qué significa De Choque a Cheque?' : 'What does De Choque a Cheque mean?';
  const meaningBody =
    language === 'es'
      ? '"De Choque a Cheque" es la promesa de Mario Yague Law a la gente de El Paso: tomamos tu accidente — el choque — y lo convertimos en tu compensación — el cheque. No es un eslogan vacío. Es nuestro proceso completo: investigamos, peleamos con la aseguradora, y no descansamos hasta que tienes en tus manos el cheque que mereces. Y lo hacemos con honorarios de contingencia. Eso significa que vas de Choque a Cheque sin pagar un solo centavo por adelantado. Si no ganamos, no nos debes nada. Así de simple es nuestra promesa De Choque a Cheque.'
      : '"De Choque a Cheque" — Spanish for "From Crash to Check" — is Mario Yague Law\'s promise to the people of El Paso: we take your accident, the crash, and we turn it into your compensation, the check. It is not an empty slogan. It is our entire process: we investigate, we fight the insurance company, and we do not rest until the check you deserve is in your hand. And we do it on contingency. That means you go from Crash to Check without paying a single dollar upfront. If we do not win, you do not owe us anything. That is how simple our De Choque a Cheque promise is.';

  const processHeading =
    language === 'es' ? 'El proceso De Choque a Cheque' : 'The De Choque a Cheque process';

  const steps = [
    {
      icon: AlertTriangle,
      label: language === 'es' ? '1. El Choque' : '1. The Crash',
      body:
        language === 'es'
          ? 'Tuviste un accidente. Lo primero es tu seguridad y la de los tuyos. Llama al 911, busca atención médica, y documenta todo lo que puedas.'
          : 'You had an accident. First priority: your safety and the safety of your loved ones. Call 911, seek medical care, and document everything you can.',
    },
    {
      icon: PhoneCall,
      label: language === 'es' ? '2. La Llamada' : '2. The Call',
      body:
        language === 'es'
          ? 'Nos llamas al (915) 400-1099. Consulta gratuita, en español o inglés, 24/7. Te escuchamos y te decimos directo si tienes un caso.'
          : 'You call us at (915) 400-1099. Free consultation, in English or Spanish, 24/7. We listen and tell you straight whether you have a case.',
    },
    {
      icon: Swords,
      label: language === 'es' ? '3. La Lucha' : '3. The Fight',
      body:
        language === 'es'
          ? 'Peleamos con la aseguradora por ti. Reunimos evidencia, negociamos agresivamente, y si hay que ir a juicio, vamos. Tú te concentras en sanar.'
          : 'We fight the insurance company for you. We gather evidence, negotiate aggressively, and if we have to go to trial, we go. You focus on healing.',
    },
    {
      icon: CircleDollarSign,
      label: language === 'es' ? '4. El Cheque' : '4. The Check',
      body:
        language === 'es'
          ? 'Recibes tu compensación. Tu choque se convierte en tu cheque. Sin honorarios si no ganamos.'
          : 'You receive your compensation. Your crash becomes your check. No fee unless we win.',
    },
  ];

  const accidentsHeading =
    language === 'es'
      ? 'Tipos de choques que convertimos en cheques'
      : 'Types of crashes we turn into checks';
  const accidentList =
    language === 'es'
      ? [
          'Accidentes de auto',
          'Accidentes de camión y tráiler 18 ruedas',
          'Accidentes de motocicleta',
          'Accidentes peatonales y de bicicleta',
          'Resbalones y caídas',
          'Lesiones laborales',
          'Muerte por negligencia',
        ]
      : [
          'Car accidents',
          'Truck and 18-wheeler accidents',
          'Motorcycle accidents',
          'Pedestrian and bicycle accidents',
          'Slip and fall injuries',
          'Workplace injuries',
          'Wrongful death',
        ];

  const whyHeading = language === 'es' ? '¿Por qué Mario Yague?' : 'Why Mario Yague?';
  const whyItems = [
    {
      icon: CircleDollarSign,
      title: language === 'es' ? '$10 Millones+ Recuperados' : '$10 Million+ Recovered',
      body:
        language === 'es'
          ? 'Para nuestros clientes en El Paso y la región Borderplex.'
          : 'For our clients across El Paso and the Borderplex region.',
    },
    {
      icon: Award,
      title: 'Top 40 Under 40 — NTLA 2024',
      body:
        language === 'es'
          ? 'Reconocido por la National Trial Lawyers Association como uno de los 40 mejores abogados de demandantes civiles menores de 40 años.'
          : 'Recognized by the National Trial Lawyers Association as one of the top 40 civil plaintiff attorneys under 40.',
    },
    {
      icon: Scale,
      title: 'Texas Bar #24122235',
      body:
        language === 'es'
          ? 'Licenciado por el Colegio de Abogados del Estado de Texas desde 2021.'
          : 'Licensed by the State Bar of Texas since 2021.',
    },
    {
      icon: Languages,
      title: language === 'es' ? 'Bilingüe Inglés/Español' : 'Bilingual English/Spanish',
      body:
        language === 'es'
          ? 'Todo el proceso, de principio a fin, en el idioma en que te sientes seguro.'
          : 'The entire process, start to finish, in the language you are comfortable in.',
    },
    {
      icon: Check,
      title: language === 'es' ? 'Sin honorarios si no ganamos' : 'No fee unless we win',
      body:
        language === 'es'
          ? 'Contingency fee. Si no recuperamos, no nos debes nada.'
          : 'Contingency fee. If we do not recover, you owe us nothing.',
    },
  ];

  const faqHeading = language === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions';
  const finalHeading =
    language === 'es'
      ? 'Convirtamos tu choque en tu cheque.'
      : "Let's turn your crash into your check.";
  const finalSubtitle =
    language === 'es' ? 'Llámanos hoy. Consulta gratis.' : 'Call us today. Free consultation.';

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 pb-20 bg-charcoal text-beige overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              'url(https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1773424907/my_law_logo_transparent_gvtvdw.png)',
          }}
        />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-gold uppercase tracking-[0.3em] text-xs font-bold mb-5"
          >
            {language === 'es' ? 'CAMPAÑA · MARIO YAGUE LAW' : 'CAMPAIGN · MARIO YAGUE LAW'}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif tracking-tight text-beige mb-6 leading-none"
          >
            De Choque <span className="text-gold">a</span> Cheque
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-beige/75 max-w-2xl mx-auto text-lg leading-relaxed mb-8"
          >
            {heroSubtitle}
          </motion.p>

          {/* Big stat */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="inline-block border border-gold/30 bg-black/30 backdrop-blur-sm rounded-sm px-8 py-5 mb-8"
          >
            <div className="text-4xl md:text-5xl font-display text-gold leading-none mb-1">
              {statBig}
            </div>
            <div className="text-beige/70 text-[11px] uppercase tracking-[0.25em] font-bold">
              {statLabel}
            </div>
            <div className="text-beige/35 text-[10px] mt-2">{disclaimer}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="tel:+19154001099"
              onClick={() => trackPhoneClick('de_choque_a_cheque_hero')}
              className="inline-flex items-center justify-center gap-3 bg-burgundy text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-xl shadow-burgundy/30 border border-gold/40 rounded-sm text-sm"
            >
              <Phone className="w-4 h-4" />
              {callCta}
            </a>
            <button
              onClick={() => {
                trackEvent('form_drawer_open', { location: 'de_choque_a_cheque_hero' });
                openDrawer('de_choque_a_cheque_hero');
              }}
              className="inline-flex items-center justify-center gap-3 border border-gold/40 text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded-sm text-sm"
            >
              {freeCta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* MEANING */}
      <section className="py-20 bg-beige">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-3">
            {language === 'es' ? 'La promesa' : 'The promise'}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight mb-6">
            {meaningHeading}
          </h2>
          <p className="text-charcoal/75 leading-relaxed text-base md:text-lg">{meaningBody}</p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-3">
              {language === 'es' ? '4 pasos' : '4 steps'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal">{processHeading}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 border border-burgundy/15 bg-beige/40 rounded-sm relative"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-burgundy text-beige flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-burgundy font-serif text-xl mb-2 mt-2">{step.label}</div>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{step.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACCIDENT TYPES */}
      <section className="py-20 bg-charcoal text-beige">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-3">
              {language === 'es' ? 'Cobertura' : 'Coverage'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-beige">{accidentsHeading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {accidentList.map((kind) => (
              <div
                key={kind}
                className="flex items-start gap-3 p-4 border border-gold/15 bg-white/5 rounded-sm"
              >
                <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-beige/90 text-sm font-medium">{kind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 bg-beige">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-3">
              {language === 'es' ? 'La razón' : 'The reason'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal">{whyHeading}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {whyItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex items-start gap-4 p-5 border border-burgundy/15 bg-white rounded-sm shadow-sm"
                >
                  <div className="w-11 h-11 rounded-sm bg-burgundy/10 text-burgundy flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif text-charcoal text-lg mb-1">{item.title}</div>
                    <p className="text-charcoal/70 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-charcoal/45 text-xs mt-8 text-center max-w-2xl mx-auto">
            {disclaimer}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-3">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal">{faqHeading}</h2>
          </div>
          <FAQAccordion items={faqItems} lang={language} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-burgundy text-beige">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-3 text-beige leading-tight">
            {finalHeading}
          </h2>
          <p className="text-beige/80 mb-8 text-lg">{finalSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19154001099"
              onClick={() => trackPhoneClick('de_choque_a_cheque_final_cta')}
              className="inline-flex items-center justify-center gap-3 bg-charcoal text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-black transition-all border border-gold/40 rounded-sm text-sm"
            >
              <Phone className="w-4 h-4" />
              {callCta}
            </a>
            <a
              href="mailto:mario@myr-law.com"
              onClick={() => trackEmailClick('de_choque_a_cheque_final_cta')}
              className="inline-flex items-center justify-center gap-3 bg-beige text-burgundy px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all rounded-sm text-sm"
            >
              <Mail className="w-4 h-4" />
              mario@myr-law.com
            </a>
          </div>
          <div className="mt-8">
            <Link
              to="/personal-injury"
              onClick={() =>
                trackEvent('de_choque_a_cheque_link_click', {
                  location: 'final_cta_to_personal_injury',
                })
              }
              className="text-beige/70 hover:text-gold text-xs uppercase tracking-widest border-b border-beige/30 hover:border-gold/60 pb-0.5"
            >
              {language === 'es'
                ? 'Conoce más sobre Lesiones Personales →'
                : 'Learn more about Personal Injury →'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
