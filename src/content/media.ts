/**
 * Fotos y videos del sitio. Cloudinary entrega el tamaño y formato justo para cada pantalla.
 * Para agregar un video: súbelo a Cloudinary y agrégalo a `explainers` o `testimonials`.
 */
const CLOUD = 'https://res.cloudinary.com/dsprn0ew4';

/** Imagen con ancho fijo, formato y calidad automáticos. */
export const img = (path: string, w: number) => `${CLOUD}/image/upload/f_auto,q_auto,w_${w}/${path}`;
/** Video comprimido para web (720 de ancho máx). */
export const vid = (path: string, w = 720) => `${CLOUD}/video/upload/f_auto,q_auto,w_${w}/${path}.mp4`;
/** Portada del video: un cuadro del segundo `at`. */
export const poster = (path: string, w = 540, at = 1) => `${CLOUD}/video/upload/so_${at},f_auto,q_auto,w_${w}/${path}.jpg`;

export const media = {
  logo: `${CLOUD}/image/upload/f_auto,q_auto,w_160/v1774036245/TORO_wiossl.png`,
  logoMark: `${CLOUD}/image/upload/f_auto,q_auto,w_400/v1773424907/my_law_logo_transparent_gvtvdw.png`,
  /** la escena de Mario del hero */
  heroScene: 'v1775165505/genera_esa_misma_202604021530_cqegpo.jpg',
  marioPhoto: '/mario.jpg',
  /** video corto de Mario para el hero (sin sonido, en loop) */
  heroVideo: 'v1775164758/Mario_Yague_El_Toro_Final_ohedjn',
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
