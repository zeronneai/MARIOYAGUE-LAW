import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { trackEmailClick, trackPhoneClick, trackServiceCardClick } from '../../lib/analytics';
import { media } from '../../content/media';
import { PHONE, PHONE_HREF } from '../../content/home';

export function Footer() {
  const { t, language, lp } = useLanguage();
  const es = language === 'es';
  const areas: [string, string][] = [
    ['/personal-injury', es ? 'Lesiones personales y accidentes' : 'Personal injury & accidents'],
    ['/criminal-defense', es ? 'Defensa criminal' : 'Criminal defense'],
    ['/dwi-defense', es ? 'Defensa DWI' : 'DWI defense'],
    ['/family-law', es ? 'Derecho familiar' : 'Family law'],
    ['/de-choque-a-cheque', 'De choque a cheque'],
    ['/faq', es ? 'Preguntas frecuentes' : 'FAQ'],
  ];
  return (
    <footer className="relative overflow-hidden bg-guinda pb-28 pt-16 text-paper lg:pb-12">
      <div className="poster pointer-events-none absolute -bottom-6 left-0 right-0 select-none whitespace-nowrap text-center text-[22vw] text-white/[0.05]" aria-hidden>
        El Toro
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={media.logo} alt="" width={52} height={52} className="h-13 w-13 rounded-full bg-paper object-contain p-1" loading="lazy" />
            <span className="poster text-4xl">Mario Yague<span className="accent block text-2xl text-paper/80">Law</span></span>
          </div>
          <p className="mt-5 max-w-sm text-paper/80">{t.footer.brandDesc}</p>
          <a href="https://www.instagram.com/yaguelaw/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold hover:text-white">
            <Instagram className="h-4 w-4" /> @yaguelaw
          </a>
        </div>
        <div>
          <div className="eyebrow mb-4 text-paper/60">{es ? 'Contacto' : 'Contact'}</div>
          <ul className="space-y-3">
            <li>
              <a href={PHONE_HREF} onClick={() => trackPhoneClick('footer')} className="flex items-center gap-2.5 font-display text-2xl font-extrabold hover:text-white">
                <Phone className="h-5 w-5" /> {PHONE}
              </a>
            </li>
            <li>
              <a href="mailto:mario@myr-law.com" onClick={() => trackEmailClick('footer')} className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-4 w-4" /> mario@myr-law.com
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps/place/1331+Wyoming+Ave,+El+Paso,+TX+79902" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> 1331 Wyoming Ave<br />El Paso, TX 79902
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4 text-paper/60">{es ? 'Horario' : 'Hours'}</div>
          <p>{t.footer.hoursWeekdays}</p>
          <p className="text-paper/70">{t.footer.hoursSaturday}</p>
          <p className="text-paper/70">{t.footer.hoursSunday}</p>
          <p className="accent mt-3 text-xl text-paper">{t.footer.hoursNote}</p>
        </div>
        <div>
          <div className="eyebrow mb-4 text-paper/60">{es ? 'Áreas' : 'Practice areas'}</div>
          <ul className="space-y-2">
            {areas.map(([href, label]) => (
              <li key={href}>
                <Link to={lp(href)} onClick={() => trackServiceCardClick(href.slice(1), 'footer')} className="hover:text-white hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mx-auto mt-12 max-w-7xl border-t border-paper/20 px-4 pt-6 text-xs text-paper/60 sm:px-6">
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.barCard}</p>
        </div>
        <p className="mt-4 leading-relaxed">
          <b>{t.footer.disclaimerLabel}:</b> {t.footer.disclaimerText}
        </p>
      </div>
    </footer>
  );
}
