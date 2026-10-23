import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSeo } from '../seo/useSeo';
import { Cases, ContactSection, Hero, HomeFaq, MeetMario, Steps, Testimonials, Ticker, Versus, Videos } from '../components/home/HomeSections';

export const HomePage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useSeo({
    title:
      language === 'es'
        ? 'Abogado de Accidentes en El Paso, TX | Mario Yague "El Toro" Law'
        : 'El Paso Car Accident & Personal Injury Lawyer | Mario Yague "El Toro" Law',
    description:
      language === 'es'
        ? 'Abogado de accidentes en El Paso: autos, tráileres, motos y peatones en Texas y Nuevo México. Consulta gratis, si no ganamos no pagas, hablamos español. Llama al (915) 400-1099.'
        : 'El Paso personal injury lawyer for car, 18-wheeler, motorcycle and pedestrian accidents in Texas and New Mexico. Free consultation, no fee unless we win, se habla español. Call (915) 400-1099.',
    canonical: 'https://www.marioyaguelaw.com/',
  });

  return (
    <main>
      <Hero />
      <Ticker />
      <Steps />
      <Videos />
      <Cases />
      <Versus />
      <Testimonials />
      <MeetMario />
      <HomeFaq />
      <ContactSection />
    </main>
  );
};
