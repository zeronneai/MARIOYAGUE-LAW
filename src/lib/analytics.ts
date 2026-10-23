declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const MEASUREMENT_ID = 'G-G47X45BCTR';

/** Meta Pixel: eventos estándar para que Meta optimice los anuncios a leads y llamadas. */
function meta(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', event, params);
}

function isReady(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

export function trackPageView(url: string, title?: string) {
  meta('PageView');
  if (!isReady()) return;
  window.gtag!('event', 'page_view', {
    page_location: url,
    page_path: url.replace(/^https?:\/\/[^/]+/, '') || '/',
    page_title: title ?? document.title,
    send_to: MEASUREMENT_ID,
  });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  // el formulario de /pesadillas es un lead
  if (name === 'pesadillas_form_submit_success') meta('Lead', { content_name: 'pesadillas' });
  if (!isReady()) return;
  window.gtag!('event', name, params);
}

export function trackPhoneClick(location: string) {
  meta('Contact', { method: 'phone', location });
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: '+1-915-400-1099',
    click_location: location,
  });
}

export function trackEmailClick(location: string) {
  meta('Contact', { method: 'email', location });
  trackEvent('email_click', {
    event_category: 'engagement',
    event_label: 'mario@myr-law.com',
    click_location: location,
  });
}

export function trackWhatsAppClick(location: string) {
  meta('Contact', { method: 'whatsapp', location });
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    click_location: location,
  });
}

export function trackFormSubmit(formName: string, params: Record<string, unknown> = {}) {
  meta('Lead', { content_name: formName });
  trackEvent('form_submit', {
    event_category: 'lead',
    form_name: formName,
    ...params,
  });
}

export function trackLanguageToggle(from: 'en' | 'es', to: 'en' | 'es') {
  trackEvent('language_toggle', {
    event_category: 'engagement',
    from_language: from,
    to_language: to,
  });
}

export function trackServiceCardClick(
  service: 'personal-injury' | 'criminal-defense' | 'family-law' | 'dwi-defense' | string,
  location: string = 'home_services',
) {
  trackEvent('service_card_click', {
    event_category: 'navigation',
    service_slug: service,
    click_location: location,
  });
}
