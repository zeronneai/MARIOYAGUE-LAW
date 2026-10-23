import { MessageCircle, Phone, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useDrawer } from '../../context/DrawerContext';
import { home, PHONE_HREF, WHATSAPP_HREF } from '../../content/home';
import { trackPhoneClick, trackWhatsAppClick, trackEvent } from '../../lib/analytics';

/** Barra fija abajo en el celular: llamar, WhatsApp y consulta. Es lo que más convierte en móvil. */
export function MobileBar() {
  const { language } = useLanguage();
  const { openDrawer } = useDrawer();
  const c = home[language].mobileBar;
  const wa = WHATSAPP_HREF + encodeURIComponent(language === 'es' ? 'Hola Toro, tuve un accidente y necesito ayuda.' : 'Hi Toro, I was in an accident and need help.');
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-3">
        <a href={PHONE_HREF} onClick={() => trackPhoneClick('mobile_bar')} className="flex flex-col items-center gap-0.5 bg-toro py-2.5 text-xs font-bold text-white">
          <Phone className="h-5 w-5" /> {c.call}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('mobile_bar')} className="flex flex-col items-center gap-0.5 border-x-2 border-ink py-2.5 text-xs font-bold text-ink">
          <MessageCircle className="h-5 w-5" /> {c.whatsapp}
        </a>
        <button
          type="button"
          onClick={() => {
            trackEvent('form_drawer_open', { location: 'mobile_bar' });
            openDrawer('mobile_bar');
          }}
          className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold text-guinda"
        >
          <FileText className="h-5 w-5" /> {c.form}
        </button>
      </div>
    </div>
  );
}
