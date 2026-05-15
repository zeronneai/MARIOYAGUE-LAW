import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Hero, Marquee, Services, MeetMario, About, Contact } from '../App';
import { useSeo } from '../seo/useSeo';

interface HomePageProps {
  isLoading: boolean;
}

export const HomePage = ({ isLoading }: HomePageProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useSeo({
    title:
      language === 'es'
        ? 'Mario Yague Law — Abogado de Lesiones Personales y Defensa Criminal en El Paso, TX | El Toro Law'
        : 'Mario Yague Law — Personal Injury & Criminal Defense Attorney in El Paso, TX | El Toro Law',
    description:
      language === 'es'
        ? 'Mario Yague Law, también conocido como El Toro Law, es una firma bilingüe de lesiones personales, defensa criminal y derecho familiar en El Paso, Texas. Consulta gratis. Sin honorarios a menos que ganemos. Llama al (915) 400-1099.'
        : 'Mario Yague Law, also known as El Toro Law, is a bilingual personal injury, criminal defense, and family law firm in El Paso, Texas. Free consultation. No fees unless we win. Hablamos español. Call (915) 400-1099.',
    canonical: 'https://www.marioyaguelaw.com/',
  });

  return (
    <main>
      <Hero startAnimation={!isLoading} />
      <Marquee />
      <Services />
      <MeetMario />
      <About />
      <Contact />
    </main>
  );
};
