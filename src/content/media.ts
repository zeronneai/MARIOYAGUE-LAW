/**
 * Fotos y videos del sitio. Todo vive en el propio sitio (public/img y public/media),
 * ya comprimido, para no depender de Cloudinary.
 */
export const media = {
  logo: '/img/toro-logo.webp',
  logoMark: '/img/logo-mark.webp',
  /** la escena de Mario del hero, en 3 tamaños */
  hero: { src: '/img/hero-900.webp', srcSet: '/img/hero-600.webp 600w, /img/hero-900.webp 900w, /img/hero-1300.webp 1300w' },
  marioPhoto: '/mario.jpg',
};

export type Reel = { id: string; title: { en: string; es: string }; src: string; poster: string; lang: 'en' | 'es'; duration?: string };

/** Videos guardados en el propio sitio (public/media), comprimidos a 720p. */
const local = (id: string, title: Reel['title'], lang: Reel['lang'], duration?: string): Reel => ({
  id,
  title,
  lang,
  duration,
  src: `/media/${id}.mp4`,
  poster: `/media/${id}.jpg`,
});

/** Videos donde Mario explica. */
export const explainers: Reel[] = [
  local('i10', { en: 'Hit by a truck on I-10?', es: '¿Te pegó un tráiler en la I-10?' }, 'en', '0:25'),
  local('secreto', { en: 'Never tell the insurance you are fine', es: 'Nunca le digas al seguro que estás bien' }, 'es', '0:18'),
  local('playbook', { en: 'The insurance company playbook', es: 'La estrategia de las aseguradoras' }, 'en', '0:21'),
  local('si-no-hablas-ingles', { en: 'No English? You still have rights', es: '¿No hablas inglés? Aún tienes derechos' }, 'es', '0:19'),
  local('lose-money', { en: 'The fastest way to lose money after a crash', es: 'La forma más rápida de perder dinero tras un choque' }, 'en', '0:24'),
  local('june-2', { en: 'Small crashes hurt too', es: 'Los choques chiquitos también lastiman' }, 'es', '0:30'),
  local('true-false', { en: 'True or false?', es: '¿Verdadero o falso?' }, 'en', '0:22'),
  local('very-important', { en: 'Very important to remember', es: 'Muy importante que lo recuerdes' }, 'en', '0:18'),
  local('wallet', { en: 'Your wallet will thank you', es: 'Tu cartera te lo va a agradecer' }, 'en', '0:28'),
];

/** Testimonios en video de clientes reales. */
export const testimonials: Reel[] = [1, 2, 3, 7].map((file, i) =>
  local(`testimonial-${file}`, { en: `Client story #${i + 1}`, es: `Historia de cliente #${i + 1}` }, 'en'),
);

/** La historia de Mario (Nací en Juárez, crecí en El Paso). */
export const marioStory = local('history', { en: 'Born in Juárez, raised in El Paso', es: 'Nací en Juárez, crecí en El Paso' }, 'es', '0:30');
