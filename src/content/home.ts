/**
 * Contenido de la home nueva (inglés y español).
 * Solo datos reales del despacho: nada de cifras ni testimonios inventados.
 */
export const PHONE = '(915) 400-1099';
export const PHONE_HREF = 'tel:+19154001099';
export const WHATSAPP_HREF = 'https://wa.me/19154001099?text=';

export const home = {
  en: {
    hero: {
      kicker: 'El Paso personal injury lawyer · Mario Yague',
      line1: 'Crash',
      line2: 'to check.',
      sub: 'The insurance company has a team of lawyers. You have El Toro.',
      body: 'Car, truck, motorcycle or pedestrian accident in Texas or New Mexico? Mario Yague fights the insurance company so you can focus on getting better.',
      call: `Call ${PHONE}`,
      form: 'Free case review',
      proof: ['Free consultation', 'No fee unless we win', 'Hablamos español'],
      stamp: 'EL TORO · DE CHOQUE A CHEQUE · ',
    },
    ticker: ['De choque a cheque', 'From crash to check', 'No fee unless we win', 'Hablamos español', 'Free consultation'],
    steps: {
      kicker: 'Just had an accident?',
      title: ['Do this', 'before you sign anything.'],
      items: [
        { n: '01', title: 'Get checked out', body: 'Call 911 and see a doctor the same day, even if you feel fine. Some injuries show up days later, and that visit is your first piece of evidence.' },
        { n: '02', title: 'Do not sign. Do not explain.', body: 'The adjuster calls fast and sounds friendly. That first offer is almost always the lowest. Take photos, get the police report and keep every receipt.' },
        { n: '03', title: 'Call El Toro', body: 'One call and we take it from there: the insurance company, the paperwork and your medical bills. You only focus on healing.' },
      ],
      cta: 'Talk to Mario now',
    },
    videos: {
      kicker: 'El Toro explains',
      title: ['Straight answers.', 'No legal mumbo jumbo.'],
      sub: 'Short videos where Mario explains what the insurance company does not want you to know.',
      play: 'Play',
    },
    cases: {
      kicker: 'Accidents we take',
      title: ['If someone else hit you,', 'El Toro hits back.'],
      items: [
        { key: 'car', title: 'Car accidents', body: 'Rear-end, T-bone, intersections, hit and run.' },
        { key: 'truck', title: '18-wheelers & trucks', body: 'I-10 is one of the busiest trucking routes in the country.' },
        { key: 'moto', title: 'Motorcycles', body: 'Riders get blamed first. We prove what really happened.' },
        { key: 'walk', title: 'Pedestrians', body: 'Hit while walking or crossing? You have rights.' },
        { key: 'ride', title: 'Uber & Lyft', body: 'Driver or passenger, there is usually more coverage than you think.' },
      ],
      more: 'See personal injury',
      other: 'Mario also handles',
    },
    vs: {
      kicker: 'Their playbook vs. ours',
      title: ['They have a strategy.', 'So do we.'],
      them: 'The insurance company',
      us: 'El Toro',
      rows: [
        ['Calls you fast and acts like your friend', 'Tells you not to sign anything until we review it'],
        ['Offers a low amount before you know your injuries', 'Counts medical bills, lost wages, your car and your pain'],
        ['Uses what you say against you', 'Talks to them for you, so you never have to'],
        ['Hopes you give up', 'Never gives up. That is why they call him El Toro'],
      ],
    },
    testimonials: {
      kicker: 'From our clients',
      title: ['Real people.', 'Real stories.'],
      disclaimer: 'Past results do not guarantee future outcomes.',
    },
    mario: {
      kicker: 'Meet El Toro',
      name: 'Mario Yague',
      role: 'Founding attorney · Mario Yague Law',
      quote: 'Recover. I will take care of the rest.',
      body: [
        'Mario grew up in this community and built his firm on one idea: the people of El Paso deserve a lawyer who fights as hard as the insurance companies do.',
        'He handles your case personally, in English or Spanish, and he tells you the truth about it from day one.',
      ],
      creds: [
        ['J.D.', "St. Mary's University School of Law, 2021"],
        ['Texas Bar', 'Licensed since 2021 · Bar #24122235'],
        ['Top 40 Under 40', 'Civil Plaintiff Attorneys, NTLA 2024'],
        ['Bilingual', 'English y español'],
      ],
    },
    faq: {
      kicker: 'Questions',
      title: ['What people', 'ask El Toro.'],
      all: 'See all questions',
    },
    contact: {
      kicker: 'Free case review',
      title: ['Tell us', 'what happened.'],
      sub: 'Free, confidential and with no obligation. If we do not win, you do not pay.',
    },
    mobileBar: { call: 'Call', whatsapp: 'WhatsApp', form: 'Free review' },
  },
  es: {
    hero: {
      kicker: 'Abogado de accidentes en El Paso · Mario Yague',
      line1: 'De choque',
      line2: 'a cheque.',
      sub: 'El seguro tiene un equipo de abogados. Tú tienes al Toro.',
      body: '¿Te chocaron en Texas o Nuevo México? Auto, tráiler, moto o peatón: Mario Yague pelea con el seguro mientras tú te recuperas.',
      call: `Llama al ${PHONE}`,
      form: 'Revisión gratis de tu caso',
      proof: ['Consulta gratis', 'Si no ganamos, no pagas', 'We speak English'],
      stamp: 'EL TORO · DE CHOQUE A CHEQUE · ',
    },
    ticker: ['De choque a cheque', 'From crash to check', 'Si no ganamos, no pagas', 'Consulta gratis', 'Hablamos español'],
    steps: {
      kicker: '¿Acabas de chocar?',
      title: ['Haz esto', 'antes de firmar nada.'],
      items: [
        { n: '01', title: 'Que te revisen', body: 'Llama al 911 y ve al doctor ese mismo día, aunque te sientas bien. Hay lesiones que salen días después, y esa visita es tu primera prueba.' },
        { n: '02', title: 'No firmes. No expliques.', body: 'El del seguro te marca rápido y es muy amable. Esa primera oferta casi siempre es la más baja. Toma fotos, pide el reporte de policía y guarda cada recibo.' },
        { n: '03', title: 'Márcale al Toro', body: 'Una llamada y nosotros nos encargamos: el seguro, el papeleo y tus gastos médicos. Tú solo te recuperas.' },
      ],
      cta: 'Habla con Mario ahora',
    },
    videos: {
      kicker: 'El Toro te explica',
      title: ['Respuestas directas.', 'Sin rollo de abogado.'],
      sub: 'Videos cortos donde Mario te dice lo que el seguro no quiere que sepas.',
      play: 'Ver',
    },
    cases: {
      kicker: 'Accidentes que tomamos',
      title: ['Si alguien más te pegó,', 'el Toro responde.'],
      items: [
        { key: 'car', title: 'Choques de auto', body: 'Por alcance, de lado, en cruceros, o te chocaron y se fueron.' },
        { key: 'truck', title: 'Tráileres y camiones', body: 'La I-10 es una de las rutas de tráileres más transitadas del país.' },
        { key: 'moto', title: 'Motocicletas', body: 'Al motociclista lo culpan primero. Probamos lo que de verdad pasó.' },
        { key: 'walk', title: 'Peatones', body: '¿Te atropellaron caminando o cruzando? Tienes derechos.' },
        { key: 'ride', title: 'Uber y Lyft', body: 'Seas chofer o pasajero, casi siempre hay más cobertura de la que crees.' },
      ],
      more: 'Ver lesiones personales',
      other: 'Mario también lleva',
    },
    vs: {
      kicker: 'Su estrategia contra la nuestra',
      title: ['Ellos tienen un plan.', 'Nosotros también.'],
      them: 'La aseguradora',
      us: 'El Toro',
      rows: [
        ['Te marca rápido y se hace tu amigo', 'Te dice que no firmes nada hasta que lo revisemos'],
        ['Te ofrece poco antes de que sepas qué tienes', 'Cuenta gastos médicos, días sin trabajar, tu carro y tu dolor'],
        ['Usa lo que dices en tu contra', 'Habla con ellos por ti, para que tú no tengas que hacerlo'],
        ['Espera que te rindas', 'Nunca se rinde. Por algo le dicen el Toro'],
      ],
    },
    testimonials: {
      kicker: 'Nuestros clientes',
      title: ['Gente real.', 'Historias reales.'],
      disclaimer: 'Resultados anteriores no garantizan resultados futuros.',
    },
    mario: {
      kicker: 'Conoce al Toro',
      name: 'Mario Yague',
      role: 'Abogado fundador · Mario Yague Law',
      quote: 'Tú recupérate. Del resto me encargo yo.',
      body: [
        'Mario creció en esta comunidad y fundó su despacho con una idea: la gente de El Paso merece un abogado que pelee tan duro como pelean las aseguradoras.',
        'Lleva tu caso personalmente, en español o en inglés, y te dice la verdad sobre él desde el primer día.',
      ],
      creds: [
        ['J.D.', "St. Mary's University School of Law, 2021"],
        ['Barra de Texas', 'Con licencia desde 2021 · #24122235'],
        ['Top 40 Under 40', 'Abogados de demandantes civiles, NTLA 2024'],
        ['Bilingüe', 'Español and English'],
      ],
    },
    faq: {
      kicker: 'Preguntas',
      title: ['Lo que la gente', 'le pregunta al Toro.'],
      all: 'Ver todas las preguntas',
    },
    contact: {
      kicker: 'Revisión gratis',
      title: ['Cuéntanos', 'qué pasó.'],
      sub: 'Gratis, confidencial y sin compromiso. Si no ganamos, no pagas.',
    },
    mobileBar: { call: 'Llamar', whatsapp: 'WhatsApp', form: 'Consulta' },
  },
} as const;

export type HomeCopy = (typeof home)['en'];
