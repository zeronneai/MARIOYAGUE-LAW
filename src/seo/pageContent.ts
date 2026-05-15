export type Lang = 'en' | 'es';

export interface QA {
  q: string;
  a: string;
}

export interface LocalizedQA {
  en: QA;
  es: QA;
}

export interface PageSeo {
  title: string;
  description: string;
}

export const faqQuestions: LocalizedQA[] = [
  {
    en: {
      q: 'How much does a personal injury lawyer cost in El Paso, Texas?',
      a: "At Mario Yague Law, personal injury cases work on a contingency fee basis — you pay nothing upfront. We only get paid if we win your case, typically taking 33-40% of the settlement. The initial consultation is completely free. This means injured clients can access top-tier legal representation without financial risk. Mario Yague Law has handled cases across El Paso and the surrounding Borderplex region since 2021.",
    },
    es: {
      q: '¿Cuánto cuesta un abogado de lesiones personales en El Paso, Texas?',
      a: 'En Mario Yague Law, los casos de lesiones personales funcionan con honorarios de contingencia — no pagas nada por adelantado. Solo cobramos si ganamos tu caso, típicamente tomando entre 33-40% del acuerdo. La consulta inicial es completamente gratis. Esto significa que los clientes lesionados pueden acceder a representación legal de primer nivel sin riesgo financiero. Mario Yague Law ha manejado casos en El Paso y la región Borderplex desde 2021.',
    },
  },
  {
    en: {
      q: 'What should I do immediately after a car accident in Texas?',
      a: "After a car accident in Texas, take these critical steps: 1) Call 911 immediately to report the accident and get medical attention if needed. 2) Move to safety if possible without leaving the scene. 3) Document everything: take photos of vehicles, damage, license plates, road conditions, and your injuries. 4) Exchange information with other drivers — names, insurance, license numbers. 5) Get contact information from witnesses. 6) Do NOT admit fault or apologize. 7) Seek medical attention even if you feel fine — some injuries appear hours or days later. 8) Contact a personal injury attorney before talking to insurance companies. Texas has a 2-year statute of limitations for personal injury claims, so don't delay.",
    },
    es: {
      q: '¿Qué debo hacer inmediatamente después de un accidente de auto en Texas?',
      a: 'Después de un accidente de auto en Texas, sigue estos pasos críticos: 1) Llama al 911 inmediatamente para reportar el accidente y obtener atención médica si es necesario. 2) Muévete a un lugar seguro si es posible sin abandonar la escena. 3) Documenta todo: toma fotos de los vehículos, daños, placas, condiciones del camino y tus lesiones. 4) Intercambia información con los otros conductores — nombres, seguros, números de licencia. 5) Obtén información de contacto de los testigos. 6) NO admitas culpa ni te disculpes. 7) Busca atención médica aunque te sientas bien — algunas lesiones aparecen horas o días después. 8) Contacta a un abogado de lesiones personales antes de hablar con compañías de seguros. Texas tiene un plazo de 2 años para demandar por lesiones personales, así que no demores.',
    },
  },
  {
    en: {
      q: 'How long do I have to file a personal injury lawsuit in Texas?',
      a: 'In Texas, you have 2 years from the date of the accident to file a personal injury lawsuit, according to Texas Civil Practice and Remedies Code Section 16.003. After 2 years, you typically lose the right to pursue compensation forever. There are limited exceptions for minors and cases involving government entities (which require notice within 6 months). Don’t wait until the deadline — important evidence can disappear and witnesses’ memories fade. Contact Mario Yague Law at (915) 400-1099 for a free consultation about your case.',
    },
    es: {
      q: '¿Cuánto tiempo tengo para presentar una demanda por lesiones personales en Texas?',
      a: 'En Texas, tienes 2 años desde la fecha del accidente para presentar una demanda por lesiones personales, según el Código de Práctica Civil y Remedios de Texas, Sección 16.003. Después de 2 años, típicamente pierdes el derecho a buscar compensación para siempre. Hay excepciones limitadas para menores de edad y casos que involucran entidades gubernamentales (que requieren notificación dentro de 6 meses). No esperes hasta la fecha límite — evidencia importante puede desaparecer y los recuerdos de testigos se desvanecen. Contacta a Mario Yague Law al (915) 400-1099 para una consulta gratuita sobre tu caso.',
    },
  },
  {
    en: {
      q: "What if the person who hit me doesn't have insurance in Texas?",
      a: "Even though Texas requires drivers to carry liability insurance, approximately 13% of drivers are uninsured. If you're hit by an uninsured driver, you have options: 1) File a claim with your own Uninsured/Underinsured Motorist (UM/UIM) coverage if you have it. 2) Sue the at-fault driver personally — though collecting may be difficult. 3) Make a claim through Personal Injury Protection (PIP) coverage on your policy if available. 4) If the driver fled, you may also pursue hit-and-run claims. Texas insurance law is complex; an experienced attorney can identify all available compensation sources. Mario Yague Law specializes in helping victims of uninsured driver accidents — call (915) 400-1099.",
    },
    es: {
      q: '¿Qué pasa si la persona que me chocó no tiene seguro en Texas?',
      a: 'Aunque Texas requiere que los conductores tengan seguro de responsabilidad, aproximadamente 13% de los conductores no están asegurados. Si te choca un conductor sin seguro, tienes opciones: 1) Presentar un reclamo con tu propia cobertura de Motorista No Asegurado/Sub-asegurado (UM/UIM) si la tienes. 2) Demandar personalmente al conductor culpable — aunque cobrar puede ser difícil. 3) Hacer un reclamo a través de la cobertura de Protección Contra Lesiones Personales (PIP) en tu póliza si está disponible. 4) Si el conductor huyó, también puedes perseguir reclamos por accidente con fuga. La ley de seguros de Texas es compleja; un abogado experimentado puede identificar todas las fuentes de compensación disponibles. Mario Yague Law se especializa en ayudar a víctimas de accidentes con conductores sin seguro — llama al (915) 400-1099.',
    },
  },
  {
    en: {
      q: 'Do I really need a lawyer for a criminal charge in El Paso?',
      a: 'Yes — in nearly every criminal case in Texas, having an attorney is critical. Even seemingly minor charges (misdemeanors) can result in jail time, fines, permanent criminal records, loss of professional licenses, immigration consequences, and impact on employment and housing. A criminal defense attorney protects your constitutional rights, negotiates with prosecutors, challenges evidence, and represents you in court. Mario Yague Law provides aggressive criminal defense for felonies, misdemeanors, DWI, drug charges, assault, theft, and other charges in El Paso County. Free initial consultation: (915) 400-1099.',
    },
    es: {
      q: '¿Realmente necesito un abogado para un cargo criminal en El Paso?',
      a: 'Sí — en casi todos los casos criminales en Texas, tener un abogado es crítico. Incluso cargos aparentemente menores (faltas) pueden resultar en tiempo en prisión, multas, antecedentes penales permanentes, pérdida de licencias profesionales, consecuencias migratorias, e impacto en el empleo y vivienda. Un abogado de defensa criminal protege tus derechos constitucionales, negocia con fiscales, desafía evidencia y te representa en la corte. Mario Yague Law proporciona defensa criminal agresiva para delitos graves, faltas, DWI, cargos de drogas, asalto, robo y otros cargos en el Condado de El Paso. Consulta inicial gratuita: (915) 400-1099.',
    },
  },
  {
    en: {
      q: "What happens if I'm arrested for DWI in Texas?",
      a: 'A DWI arrest in Texas triggers two separate legal processes: a criminal case AND an administrative driver’s license suspension. You have only 15 days from arrest to request a hearing to fight the license suspension — miss this deadline and your license is automatically suspended. Penalties for first-offense DWI include up to 180 days in jail, fines up to $2,000, license suspension up to 2 years, and mandatory installation of an ignition interlock device. Repeat offenders face felony charges. The breathalyzer or blood test can be challenged. Time is critical — contact Mario Yague Law at (915) 400-1099 immediately after a DWI arrest.',
    },
    es: {
      q: '¿Qué pasa si me arrestan por DWI en Texas?',
      a: 'Un arresto por DWI en Texas activa dos procesos legales separados: un caso criminal Y una suspensión administrativa de licencia de conducir. Solo tienes 15 días desde el arresto para solicitar una audiencia para pelear la suspensión de la licencia — pierde esta fecha límite y tu licencia se suspende automáticamente. Las penalidades para DWI de primera ofensa incluyen hasta 180 días en prisión, multas de hasta $2,000, suspensión de licencia de hasta 2 años, e instalación obligatoria de un dispositivo de bloqueo de encendido. Los reincidentes enfrentan cargos de delito grave. El alcoholímetro o prueba de sangre puede ser desafiada. El tiempo es crítico — contacta a Mario Yague Law al (915) 400-1099 inmediatamente después de un arresto por DWI.',
    },
  },
  {
    en: {
      q: 'How is child custody decided in a Texas divorce?',
      a: "Texas uses the legal term 'conservatorship' instead of 'custody.' Courts presume both parents should be Joint Managing Conservators unless evidence shows one parent shouldn't have decision-making rights (history of abuse, neglect, etc.). The court determines: 1) Who has the right to designate the child's primary residence. 2) Decision-making rights (education, healthcare, religion). 3) Possession and access schedule (when each parent has the child). Texas has a Standard Possession Order, but parents can negotiate custom schedules. Courts always rule based on 'the best interest of the child.' Mario Yague Law represents parents in custody, divorce, and family law matters in El Paso County: (915) 400-1099.",
    },
    es: {
      q: '¿Cómo se decide la custodia de los hijos en un divorcio en Texas?',
      a: "Texas usa el término legal 'conservatoría' en lugar de 'custodia.' Las cortes presumen que ambos padres deben ser Conservadores Conjuntos Administrativos a menos que la evidencia muestre que un padre no debería tener derechos de toma de decisiones (historial de abuso, negligencia, etc.). La corte determina: 1) Quién tiene el derecho de designar la residencia principal del niño. 2) Derechos de toma de decisiones (educación, salud, religión). 3) Horario de posesión y acceso (cuándo cada padre tiene al niño). Texas tiene una Orden de Posesión Estándar, pero los padres pueden negociar horarios personalizados. Las cortes siempre fallan basadas en 'el mejor interés del niño.' Mario Yague Law representa a padres en asuntos de custodia, divorcio y derecho familiar en el Condado de El Paso: (915) 400-1099.",
    },
  },
  {
    en: {
      q: 'What types of compensation can I receive for a personal injury in Texas?',
      a: 'Texas personal injury law allows recovery of several types of damages: 1) Economic damages: medical bills (past and future), lost wages, lost earning capacity, property damage, rehabilitation costs. 2) Non-economic damages: pain and suffering, mental anguish, loss of enjoyment of life, disfigurement, loss of consortium. 3) Punitive damages (rare): awarded in cases of gross negligence or malice. Texas has caps on certain damages — medical malpractice non-economic damages are capped at $250,000 per provider. There is no cap on most other personal injury cases. The value of your case depends on injury severity, fault percentage, insurance coverage, and other factors. Mario Yague Law evaluates cases for free: (915) 400-1099.',
    },
    es: {
      q: '¿Qué tipos de compensación puedo recibir por una lesión personal en Texas?',
      a: 'La ley de lesiones personales de Texas permite la recuperación de varios tipos de daños: 1) Daños económicos: facturas médicas (pasadas y futuras), salarios perdidos, capacidad de ingresos perdida, daño a la propiedad, costos de rehabilitación. 2) Daños no económicos: dolor y sufrimiento, angustia mental, pérdida del disfrute de la vida, desfiguración, pérdida de consorcio. 3) Daños punitivos (raros): otorgados en casos de negligencia grave o malicia. Texas tiene límites en ciertos daños — los daños no económicos por mala práctica médica están limitados a $250,000 por proveedor. No hay límite en la mayoría de los otros casos de lesiones personales. El valor de tu caso depende de la severidad de la lesión, porcentaje de culpa, cobertura de seguro y otros factores. Mario Yague Law evalúa casos gratis: (915) 400-1099.',
    },
  },
  {
    en: {
      q: 'How long does a personal injury case take in El Paso?',
      a: 'Personal injury cases in El Paso typically take 6 months to 3 years to resolve. The timeline depends on: 1) Severity of injuries — settlements happen after maximum medical improvement. 2) Insurance company responsiveness. 3) Whether liability is disputed. 4) Whether the case settles or goes to trial. Most cases settle without trial (95%+ in Texas). Simple cases with clear liability and minor injuries may settle in 4-6 months. Complex cases with serious injuries, multiple parties, or disputed liability can take 1-3 years. Mario Yague Law works to resolve cases efficiently while maximizing client compensation. Free case evaluation: (915) 400-1099.',
    },
    es: {
      q: '¿Cuánto tiempo dura un caso de lesiones personales en El Paso?',
      a: 'Los casos de lesiones personales en El Paso típicamente duran de 6 meses a 3 años para resolverse. El tiempo depende de: 1) Severidad de las lesiones — los acuerdos ocurren después de la máxima mejora médica. 2) Capacidad de respuesta de la compañía de seguros. 3) Si la responsabilidad está en disputa. 4) Si el caso se acuerda o va a juicio. La mayoría de los casos se resuelven sin juicio (95%+ en Texas). Casos simples con responsabilidad clara y lesiones menores pueden resolverse en 4-6 meses. Casos complejos con lesiones graves, múltiples partes o responsabilidad en disputa pueden tomar de 1 a 3 años. Mario Yague Law trabaja para resolver casos eficientemente mientras maximiza la compensación del cliente. Evaluación gratuita: (915) 400-1099.',
    },
  },
  {
    en: {
      q: 'Does Mario Yague Law speak Spanish?',
      a: "Yes — Mario Yague Law provides fully bilingual legal services in English and Spanish. Mario Yague himself is bilingual, and his team conducts consultations, court representation, legal document review, and client communication in both languages. Given El Paso's location on the U.S.-Mexico border and the large Spanish-speaking population in the Borderplex region, bilingual representation is essential for clear understanding of complex legal matters. Llámanos en español o inglés al (915) 400-1099.",
    },
    es: {
      q: '¿Mario Yague Law atiende en español?',
      a: 'Sí — Mario Yague Law proporciona servicios legales completamente bilingües en inglés y español. Mario Yague mismo es bilingüe, y su equipo realiza consultas, representación en corte, revisión de documentos legales y comunicación con clientes en ambos idiomas. Dada la ubicación de El Paso en la frontera EE.UU.-México y la gran población hispanohablante en la región Borderplex, la representación bilingüe es esencial para una comprensión clara de asuntos legales complejos. Call us in Spanish or English at (915) 400-1099.',
    },
  },
];

export interface PracticeAreaContent {
  slug: string;
  iconName: 'Stethoscope' | 'Scale' | 'Heart' | 'Car';
  seo: { en: PageSeo; es: PageSeo };
  hero: {
    en: { title: string; subtitle: string };
    es: { title: string; subtitle: string };
  };
  overview: { en: string; es: string };
  cases: {
    en: string[];
    es: string[];
  };
  whyUs: {
    en: string[];
    es: string[];
  };
  miniFaq: LocalizedQA[];
  serviceType: string;
}

export const personalInjuryPage: PracticeAreaContent = {
  slug: 'personal-injury',
  iconName: 'Stethoscope',
  serviceType: 'Personal Injury Legal Service',
  seo: {
    en: {
      title: 'Personal Injury Lawyer in El Paso, TX | Mario Yague Law',
      description: 'Bilingual personal injury attorney in El Paso, Texas. Car accidents, slip and fall, wrongful death. No fees unless we win. Free consultation: (915) 400-1099.',
    },
    es: {
      title: 'Abogado de Lesiones Personales en El Paso, TX | Mario Yague Law',
      description: 'Abogado bilingüe de lesiones personales en El Paso, Texas. Accidentes de auto, resbalones, muerte injusta. Sin honorarios a menos que ganemos. Consulta gratuita: (915) 400-1099.',
    },
  },
  hero: {
    en: {
      title: 'Personal Injury Representation',
      subtitle: 'Aggressive representation for accident victims in El Paso and the Borderplex region',
    },
    es: {
      title: 'Representación en Lesiones Personales',
      subtitle: 'Representación agresiva para víctimas de accidentes en El Paso y la región Borderplex',
    },
  },
  overview: {
    en: "Personal injury law allows people injured by another's negligence to recover compensation for their losses. At Mario Yague Law, we represent clients across El Paso who have been injured in car accidents, truck accidents, motorcycle accidents, pedestrian accidents, slip and falls, and other incidents where someone else's carelessness caused harm. Our firm operates on contingency fees — you pay nothing unless we win your case.",
    es: 'La ley de lesiones personales permite a las personas heridas por la negligencia de otro recuperar compensación por sus pérdidas. En Mario Yague Law, representamos a clientes en El Paso que han resultado heridos en accidentes de auto, accidentes de camiones, accidentes de motocicleta, accidentes peatonales, resbalones y otros incidentes donde el descuido de alguien más causó daño. Nuestra firma opera con honorarios de contingencia — no pagas nada a menos que ganemos tu caso.',
  },
  cases: {
    en: [
      'Car accidents',
      'Truck and 18-wheeler accidents',
      'Motorcycle accidents',
      'Pedestrian and bicycle accidents',
      'Slip and fall injuries',
      'Premises liability',
      'Dog bites',
      'Wrongful death',
      'Product liability',
      'Workplace injuries',
    ],
    es: [
      'Accidentes de auto',
      'Accidentes de camión y 18 ruedas',
      'Accidentes de motocicleta',
      'Accidentes peatonales y de bicicleta',
      'Lesiones por resbalón y caída',
      'Responsabilidad de locales',
      'Mordeduras de perro',
      'Muerte injusta',
      'Responsabilidad de productos',
      'Lesiones en el trabajo',
    ],
  },
  whyUs: {
    en: [
      'Bilingual representation (English/Spanish)',
      'Contingency fee — no risk to you',
      'Top 40 Under 40 Civil Plaintiff Attorneys recognition (NTLA 2024)',
      'Local El Paso firm with deep community ties',
      'Free consultations 24/7',
    ],
    es: [
      'Representación bilingüe (Inglés/Español)',
      'Honorarios de contingencia — sin riesgo para ti',
      'Reconocimiento Top 40 Under 40 Civil Plaintiff Attorneys (NTLA 2024)',
      'Firma local de El Paso con profundos lazos comunitarios',
      'Consultas gratuitas 24/7',
    ],
  },
  miniFaq: [
    {
      en: {
        q: 'What is my car accident case worth?',
        a: 'Case value depends on several factors: severity of injuries, medical expenses (past and future), lost wages, impact on earning capacity, pain and suffering, and the at-fault driver’s insurance coverage. Minor injury cases with clear liability may settle for $5,000-$25,000, while cases with serious injuries, surgery, or permanent disability can reach six or seven figures. There is no reliable online calculator — every case is unique. Mario Yague Law evaluates your case for free and gives you a realistic range based on Texas case law and local jury verdicts.',
      },
      es: {
        q: '¿Cuánto vale mi caso de accidente de auto?',
        a: 'El valor del caso depende de varios factores: severidad de las lesiones, gastos médicos (pasados y futuros), salarios perdidos, impacto en la capacidad de ingresos, dolor y sufrimiento, y la cobertura de seguro del conductor culpable. Casos de lesiones menores con responsabilidad clara pueden resolverse por $5,000-$25,000, mientras que casos con lesiones graves, cirugía o discapacidad permanente pueden alcanzar seis o siete cifras. No existe una calculadora confiable en línea — cada caso es único. Mario Yague Law evalúa tu caso gratis y te da un rango realista basado en la jurisprudencia de Texas y veredictos locales.',
      },
    },
    {
      en: {
        q: 'How do I prove the other driver was at fault?',
        a: 'Fault in Texas auto accidents is proven through: 1) The police report (responding officer’s assessment), 2) Photos and video of the scene, 3) Witness statements, 4) Traffic camera or dashcam footage, 5) Cell phone records (showing distracted driving), 6) Vehicle damage analysis, and 7) Accident reconstruction experts in serious cases. Texas follows a modified comparative fault rule — you can recover damages as long as you are 50% or less at fault. Mario Yague Law works with investigators and experts to build the strongest liability case possible.',
      },
      es: {
        q: '¿Cómo pruebo que el otro conductor tuvo la culpa?',
        a: 'La culpa en accidentes de auto en Texas se prueba mediante: 1) El reporte policial (evaluación del oficial que respondió), 2) Fotos y video de la escena, 3) Declaraciones de testigos, 4) Grabaciones de cámaras de tráfico o dashcam, 5) Registros del celular (mostrando manejo distraído), 6) Análisis de daños a los vehículos, y 7) Expertos en reconstrucción de accidentes en casos serios. Texas sigue la regla de culpa comparativa modificada — puedes recuperar daños mientras tengas 50% o menos de culpa. Mario Yague Law trabaja con investigadores y expertos para construir el caso de responsabilidad más fuerte posible.',
      },
    },
    {
      en: {
        q: "What if I'm partially at fault for the accident?",
        a: 'Texas uses modified comparative fault under Texas Civil Practice & Remedies Code Section 33.001. If you are 50% or less at fault, you can still recover damages — but your award is reduced by your fault percentage. Example: if your damages total $100,000 and you are found 20% at fault, you recover $80,000. If you are 51% or more at fault, you recover nothing. Insurance adjusters often try to assign more fault to victims to reduce payouts. An attorney protects you from unfair fault allocation. Mario Yague Law fights aggressively to minimize fault attributed to clients.',
      },
      es: {
        q: '¿Qué pasa si tengo parte de la culpa del accidente?',
        a: 'Texas usa la culpa comparativa modificada bajo el Código de Práctica Civil y Remedios de Texas Sección 33.001. Si tienes 50% o menos de culpa, todavía puedes recuperar daños — pero tu compensación se reduce por tu porcentaje de culpa. Ejemplo: si tus daños totalizan $100,000 y eres encontrado 20% culpable, recuperas $80,000. Si tienes 51% o más de culpa, no recuperas nada. Los ajustadores de seguros a menudo intentan asignar más culpa a las víctimas para reducir pagos. Un abogado te protege de asignación injusta de culpa. Mario Yague Law pelea agresivamente para minimizar la culpa atribuida a clientes.',
      },
    },
  ],
};

export const criminalDefensePage: PracticeAreaContent = {
  slug: 'criminal-defense',
  iconName: 'Scale',
  serviceType: 'Criminal Defense Legal Service',
  seo: {
    en: {
      title: 'Criminal Defense Attorney in El Paso, TX | Mario Yague Law',
      description: 'Bilingual criminal defense attorney in El Paso. Felonies, misdemeanors, drug charges, assault. Aggressive defense. Free consultation: (915) 400-1099.',
    },
    es: {
      title: 'Abogado de Defensa Criminal en El Paso, TX | Mario Yague Law',
      description: 'Abogado bilingüe de defensa criminal en El Paso. Delitos graves, faltas, cargos de drogas, asalto. Defensa agresiva. Consulta gratuita: (915) 400-1099.',
    },
  },
  hero: {
    en: {
      title: 'Criminal Defense Representation',
      subtitle: 'Aggressive defense for those facing criminal charges in El Paso County',
    },
    es: {
      title: 'Representación en Defensa Criminal',
      subtitle: 'Defensa agresiva para quienes enfrentan cargos criminales en el Condado de El Paso',
    },
  },
  overview: {
    en: 'Criminal charges in Texas carry severe consequences — from probation and fines to years in prison, a permanent criminal record, and lasting damage to your career, immigration status, and reputation. Whether you face a misdemeanor or a felony in El Paso County or surrounding jurisdictions, you need experienced defense from the moment of arrest. Mario Yague Law protects your constitutional rights, challenges weak evidence, negotiates with prosecutors, and defends you in court. Every case gets a strategic defense plan tailored to the facts.',
    es: 'Los cargos criminales en Texas conllevan consecuencias severas — desde libertad condicional y multas hasta años en prisión, antecedentes penales permanentes, y daño duradero a tu carrera, estatus migratorio y reputación. Ya sea que enfrentes una falta o un delito grave en el Condado de El Paso o jurisdicciones cercanas, necesitas defensa experimentada desde el momento del arresto. Mario Yague Law protege tus derechos constitucionales, desafía evidencia débil, negocia con fiscales y te defiende en la corte. Cada caso recibe un plan estratégico de defensa adaptado a los hechos.',
  },
  cases: {
    en: [
      'Felony charges',
      'Misdemeanor charges',
      'DWI/DUI',
      'Drug possession and distribution',
      'Assault and battery',
      'Theft and burglary',
      'Domestic violence',
      'Probation violations',
      'Juvenile offenses',
      'White collar crime',
    ],
    es: [
      'Delitos graves (felony)',
      'Faltas (misdemeanor)',
      'DWI/DUI',
      'Posesión y distribución de drogas',
      'Asalto y agresión',
      'Robo y allanamiento',
      'Violencia doméstica',
      'Violaciones de libertad condicional',
      'Ofensas juveniles',
      'Crímenes de cuello blanco',
    ],
  },
  whyUs: {
    en: [
      'Bilingual representation (English/Spanish)',
      'Aggressive trial-ready defense',
      'Direct attorney access — not a paralegal',
      'Deep familiarity with El Paso County courts and prosecutors',
      '24/7 emergency response after arrest',
    ],
    es: [
      'Representación bilingüe (Inglés/Español)',
      'Defensa agresiva lista para juicio',
      'Acceso directo al abogado — no a un asistente',
      'Profundo conocimiento de cortes y fiscales del Condado de El Paso',
      'Respuesta de emergencia 24/7 después del arresto',
    ],
  },
  miniFaq: [
    {
      en: {
        q: 'Should I talk to police without a lawyer?',
        a: 'No. The Fifth Amendment gives you the right to remain silent, and the Sixth Amendment gives you the right to an attorney — use both. Politely tell officers: "I am invoking my right to remain silent and I want a lawyer." Anything you say, including statements meant to explain or defend yourself, can be used against you. Police are trained to elicit incriminating statements. Even innocent people regularly hurt their cases by talking. Call Mario Yague Law at (915) 400-1099 before any interview.',
      },
      es: {
        q: '¿Debo hablar con la policía sin un abogado?',
        a: 'No. La Quinta Enmienda te da el derecho de permanecer en silencio, y la Sexta Enmienda te da el derecho a un abogado — usa ambos. Diles educadamente a los oficiales: "Estoy invocando mi derecho a permanecer en silencio y quiero un abogado." Cualquier cosa que digas, incluyendo declaraciones para explicarte o defenderte, puede usarse en tu contra. La policía está entrenada para obtener declaraciones incriminatorias. Incluso personas inocentes regularmente dañan sus casos al hablar. Llama a Mario Yague Law al (915) 400-1099 antes de cualquier entrevista.',
      },
    },
    {
      en: {
        q: "What's the difference between a felony and misdemeanor in Texas?",
        a: 'Misdemeanors are less serious offenses with maximum penalties of up to 1 year in county jail and fines up to $4,000 (Class A misdemeanor). Felonies are more serious with potential state prison sentences from 180 days to life, and fines up to $10,000+. Texas classifies felonies as State Jail, Third Degree, Second Degree, First Degree, and Capital. A felony conviction creates a permanent record with lifelong consequences: loss of voting rights, firearm rights, professional licenses, employment difficulties, and immigration consequences. Both deserve serious defense.',
      },
      es: {
        q: '¿Cuál es la diferencia entre un delito grave y una falta en Texas?',
        a: 'Las faltas (misdemeanors) son ofensas menos serias con penalidades máximas de hasta 1 año en cárcel del condado y multas hasta $4,000 (Clase A). Los delitos graves (felonies) son más serios con potenciales sentencias en prisión estatal desde 180 días hasta cadena perpetua, y multas hasta $10,000+. Texas clasifica los felonies como State Jail, Tercer Grado, Segundo Grado, Primer Grado, y Capital. Una condena de felony crea un registro permanente con consecuencias de por vida: pérdida de derechos de voto, derechos a armas, licencias profesionales, dificultades de empleo y consecuencias migratorias. Ambos merecen una defensa seria.',
      },
    },
    {
      en: {
        q: 'Can charges be dropped?',
        a: "Yes — charges can be dismissed or reduced at multiple stages. Common paths to dismissal: 1) Prosecution declines to file charges after review. 2) Pretrial motions suppress key evidence (illegal search, Miranda violations). 3) Plea negotiations result in reduced charges or pretrial diversion. 4) Insufficient evidence at preliminary hearing. 5) Grand jury declines to indict (in felony cases). 6) Witnesses become unavailable or uncooperative. 7) Successful completion of a deferred adjudication program. The earlier an experienced attorney intervenes, the better the chance of a favorable outcome. Mario Yague Law fights for dismissal at every opportunity.",
      },
      es: {
        q: '¿Pueden retirarse los cargos?',
        a: 'Sí — los cargos pueden ser desestimados o reducidos en múltiples etapas. Caminos comunes para el sobreseimiento: 1) La fiscalía declina presentar cargos después de revisión. 2) Mociones pre-juicio suprimen evidencia clave (registro ilegal, violaciones de Miranda). 3) Negociaciones de declaración resultan en cargos reducidos o diversión. 4) Evidencia insuficiente en audiencia preliminar. 5) El gran jurado declina acusar (en casos de felony). 6) Los testigos se vuelven no disponibles o no cooperativos. 7) Completación exitosa de un programa de adjudicación diferida. Mientras más pronto intervenga un abogado experimentado, mejor la oportunidad de un resultado favorable. Mario Yague Law pelea por sobreseimiento en cada oportunidad.',
      },
    },
  ],
};

export const familyLawPage: PracticeAreaContent = {
  slug: 'family-law',
  iconName: 'Heart',
  serviceType: 'Family Law Legal Service',
  seo: {
    en: {
      title: 'Family Law Attorney in El Paso, TX | Mario Yague Law',
      description: 'Bilingual family law attorney in El Paso. Divorce, child custody, child support, adoption. Compassionate representation. Free consultation: (915) 400-1099.',
    },
    es: {
      title: 'Abogado de Derecho Familiar en El Paso, TX | Mario Yague Law',
      description: 'Abogado bilingüe de derecho familiar en El Paso. Divorcio, custodia, manutención, adopción. Representación compasiva. Consulta gratuita: (915) 400-1099.',
    },
  },
  hero: {
    en: {
      title: 'Family Law Representation',
      subtitle: 'Compassionate, bilingual representation for family matters in El Paso',
    },
    es: {
      title: 'Representación en Derecho Familiar',
      subtitle: 'Representación compasiva y bilingüe para asuntos familiares en El Paso',
    },
  },
  overview: {
    en: 'Family law cases shape the most important parts of your life — your children, your home, your finances, your future. Whether you are facing divorce, fighting for custody, navigating adoption, or seeking protection from domestic violence, you deserve an attorney who combines legal skill with compassion. Mario Yague Law represents families across El Paso County in both contested and uncontested matters. We listen first, explain your options clearly, and pursue outcomes that protect what matters most.',
    es: 'Los casos de derecho familiar dan forma a las partes más importantes de tu vida — tus hijos, tu hogar, tus finanzas, tu futuro. Ya sea que enfrentes un divorcio, luches por la custodia, navegues una adopción o busques protección contra violencia doméstica, mereces un abogado que combine habilidad legal con compasión. Mario Yague Law representa a familias en todo el Condado de El Paso en asuntos disputados y no disputados. Escuchamos primero, explicamos tus opciones claramente, y buscamos resultados que protejan lo más importante.',
  },
  cases: {
    en: [
      'Divorce (contested and uncontested)',
      'Child custody (conservatorship)',
      'Child support',
      'Spousal support / alimony',
      'Property division',
      'Adoption',
      'Paternity',
      'Prenuptial agreements',
      'Modifications of existing orders',
      'Domestic violence protective orders',
    ],
    es: [
      'Divorcio (disputado y no disputado)',
      'Custodia de hijos (conservatoría)',
      'Manutención de hijos',
      'Manutención conyugal / pensión alimenticia',
      'División de bienes',
      'Adopción',
      'Paternidad',
      'Acuerdos prenupciales',
      'Modificaciones de órdenes existentes',
      'Ordenes de protección por violencia doméstica',
    ],
  },
  whyUs: {
    en: [
      'Bilingual, culturally aware representation',
      'Calm, strategic counsel during emotional moments',
      'Strong negotiator AND skilled litigator',
      'Deep experience with El Paso family courts',
      'Free initial consultation',
    ],
    es: [
      'Representación bilingüe y culturalmente consciente',
      'Asesoría tranquila y estratégica durante momentos emocionales',
      'Negociador fuerte Y litigante hábil',
      'Profunda experiencia con cortes familiares de El Paso',
      'Consulta inicial gratuita',
    ],
  },
  miniFaq: [
    {
      en: {
        q: 'How long does a divorce take in Texas?',
        a: 'Texas has a mandatory 60-day waiting period from the date a divorce petition is filed to the date a divorce can be finalized (Texas Family Code Section 6.702). Uncontested divorces where both spouses agree on all issues typically take 60-90 days. Contested divorces involving disputes over property, custody, or support commonly take 6-12 months, and complex cases can take 18+ months. Factors that lengthen timeline: contested custody, business valuations, hidden assets, or one spouse refusing to cooperate. Mario Yague Law works to resolve cases efficiently while protecting your rights.',
      },
      es: {
        q: '¿Cuánto dura un divorcio en Texas?',
        a: 'Texas tiene un período obligatorio de espera de 60 días desde la fecha en que se presenta la petición de divorcio hasta la fecha en que puede finalizarse (Código de Familia de Texas Sección 6.702). Los divorcios no disputados donde ambos cónyuges acuerdan en todos los asuntos típicamente toman 60-90 días. Los divorcios disputados con conflictos sobre propiedad, custodia o manutención comúnmente toman 6-12 meses, y casos complejos pueden tomar 18+ meses. Factores que alargan el tiempo: custodia disputada, valuaciones de negocios, bienes ocultos, o un cónyuge que se niega a cooperar. Mario Yague Law trabaja para resolver casos eficientemente mientras protege tus derechos.',
      },
    },
    {
      en: {
        q: 'How is property divided in a Texas divorce?',
        a: 'Texas is a community property state. Assets and debts acquired during marriage are presumed to belong equally to both spouses, regardless of whose name is on the title. Separate property — owned before marriage or received during marriage by gift or inheritance — stays with the original owner. Courts divide community property in a "just and right" manner, which is usually 50/50 but can be unequal if factors like fault in the breakup, earning capacity, or fraud justify it. Identifying and valuing all assets (including retirement accounts, businesses, and hidden assets) is critical. Mario Yague Law works with forensic accountants when needed.',
      },
      es: {
        q: '¿Cómo se divide la propiedad en un divorcio en Texas?',
        a: 'Texas es un estado de bienes mancomunados (community property). Los activos y deudas adquiridos durante el matrimonio se presumen pertenecer equitativamente a ambos cónyuges, sin importar a nombre de quién esté el título. La propiedad separada — poseída antes del matrimonio o recibida durante el matrimonio por regalo o herencia — permanece con el dueño original. Las cortes dividen los bienes mancomunados de manera "justa y correcta," lo que usualmente es 50/50 pero puede ser desigual si factores como culpa en la ruptura, capacidad de ingresos o fraude lo justifican. Identificar y valuar todos los activos (incluyendo cuentas de retiro, negocios y bienes ocultos) es crítico. Mario Yague Law trabaja con contadores forenses cuando es necesario.',
      },
    },
    {
      en: {
        q: 'Can I modify child support?',
        a: 'Yes — Texas allows modification of existing child support orders when there has been a "material and substantial change in circumstances" or when 3+ years have passed since the last order AND the new calculation would change the amount by 20% or $100, whichever is less. Examples of qualifying changes: significant income increase or decrease, job loss, change in custody arrangement, child’s needs change (medical, educational), or paying parent has additional children. Modifications require a formal motion in court — informal agreements between parents are NOT enforceable. Mario Yague Law handles support modifications for both paying and receiving parents.',
      },
      es: {
        q: '¿Puedo modificar la manutención de hijos?',
        a: 'Sí — Texas permite la modificación de órdenes existentes de manutención cuando ha habido un "cambio material y substancial de circunstancias" o cuando han pasado 3+ años desde la última orden Y el nuevo cálculo cambiaría el monto en 20% o $100, lo que sea menor. Ejemplos de cambios calificativos: aumento o disminución significativa de ingresos, pérdida de empleo, cambio en arreglo de custodia, cambio en necesidades del niño (médicas, educativas), o el padre que paga tiene hijos adicionales. Las modificaciones requieren una moción formal en la corte — acuerdos informales entre padres NO son ejecutables. Mario Yague Law maneja modificaciones de manutención para ambos padres, pagadores y receptores.',
      },
    },
  ],
};

export const dwiDefensePage: PracticeAreaContent = {
  slug: 'dwi-defense',
  iconName: 'Car',
  serviceType: 'DWI Defense Legal Service',
  seo: {
    en: {
      title: 'DWI / DUI Defense Attorney in El Paso, TX | Mario Yague Law',
      description: 'DWI/DUI defense attorney in El Paso, Texas. Protect your license. Aggressive defense. Bilingual. Free consultation: (915) 400-1099.',
    },
    es: {
      title: 'Abogado de Defensa DWI / DUI en El Paso, TX | Mario Yague Law',
      description: 'Abogado de defensa DWI/DUI en El Paso, Texas. Protege tu licencia. Defensa agresiva. Bilingüe. Consulta gratuita: (915) 400-1099.',
    },
  },
  hero: {
    en: {
      title: 'DWI / DUI Defense',
      subtitle: "Don't lose your license — aggressive DWI defense in El Paso",
    },
    es: {
      title: 'Defensa DWI / DUI',
      subtitle: 'No pierdas tu licencia — defensa agresiva de DWI en El Paso',
    },
  },
  overview: {
    en: 'A DWI arrest in Texas triggers TWO separate legal proceedings: a criminal case in court AND an Administrative License Revocation (ALR) hearing to suspend your driver’s license. The ALR clock starts immediately — you have just 15 days from arrest to request a hearing or your license is automatically suspended for 90 days to 2 years. Missing this deadline is one of the most common mistakes DWI defendants make. Penalties for a first DWI include up to 180 days in jail, $2,000 in fines, license suspension, and mandatory ignition interlock. Repeat offenses become felonies. Mario Yague Law moves immediately to protect both your freedom and your driving privileges.',
    es: 'Un arresto por DWI en Texas activa DOS procedimientos legales separados: un caso criminal en la corte Y una audiencia de Revocación Administrativa de Licencia (ALR) para suspender tu licencia de conducir. El reloj de ALR comienza inmediatamente — solo tienes 15 días desde el arresto para solicitar una audiencia o tu licencia se suspende automáticamente por 90 días a 2 años. Perder esta fecha límite es uno de los errores más comunes que cometen los acusados de DWI. Las penalidades por un primer DWI incluyen hasta 180 días en cárcel, $2,000 en multas, suspensión de licencia y bloqueo de encendido obligatorio. Las reincidencias se vuelven delitos graves. Mario Yague Law actúa inmediatamente para proteger tu libertad y tus privilegios de conducir.',
  },
  cases: {
    en: [
      'First-time DWI',
      'Repeat DWI offenses',
      'Felony DWI (third offense or with injury)',
      'DWI with child passenger',
      'Boating While Intoxicated (BWI)',
      'Refused breathalyzer cases',
      'Underage DUI',
    ],
    es: [
      'DWI por primera vez',
      'Reincidencias de DWI',
      'DWI grave (tercera ofensa o con lesión)',
      'DWI con menor de edad como pasajero',
      'Navegación bajo influencia (BWI)',
      'Casos de rechazo de alcoholímetro',
      'DUI de menores de edad',
    ],
  },
  whyUs: {
    en: [
      '15-day ALR deadline tracked — we file immediately',
      'Challenges to breathalyzer calibration and blood draw procedures',
      'Bilingual representation (English/Spanish)',
      'Fight for license restrictions instead of full suspension when possible',
      'Free consultation — call before talking to anyone',
    ],
    es: [
      'Plazo de 15 días ALR monitoreado — presentamos inmediatamente',
      'Desafíos a calibración del alcoholímetro y procedimientos de extracción de sangre',
      'Representación bilingüe (Inglés/Español)',
      'Pelear por restricciones de licencia en lugar de suspensión total cuando es posible',
      'Consulta gratuita — llama antes de hablar con nadie',
    ],
  },
  miniFaq: [
    {
      en: {
        q: 'What is the legal blood alcohol limit in Texas?',
        a: 'Texas has three BAC (blood alcohol content) thresholds: 0.08% for drivers 21 and older, 0.04% for commercial drivers, and ANY detectable amount for drivers under 21 (zero tolerance). However, you can be arrested for DWI below 0.08% if an officer believes you have lost normal use of your mental or physical faculties due to alcohol or drugs — Texas Penal Code Section 49.04. Field sobriety tests, officer observations, and even prescription medications can lead to DWI arrests at lower BACs. The legal limit is not a safe limit.',
      },
      es: {
        q: '¿Cuál es el límite legal de alcohol en sangre en Texas?',
        a: 'Texas tiene tres umbrales de BAC (concentración de alcohol en sangre): 0.08% para conductores de 21 años o más, 0.04% para conductores comerciales, y CUALQUIER cantidad detectable para conductores menores de 21 (tolerancia cero). Sin embargo, puedes ser arrestado por DWI bajo 0.08% si un oficial cree que has perdido el uso normal de tus facultades mentales o físicas debido al alcohol o drogas — Código Penal de Texas Sección 49.04. Pruebas de sobriedad en campo, observaciones del oficial, e incluso medicamentos recetados pueden llevar a arrestos por DWI con BACs más bajos. El límite legal no es un límite seguro.',
      },
    },
    {
      en: {
        q: 'Should I refuse the breathalyzer?',
        a: "Texas operates under 'implied consent' — by driving in Texas you have consented to BAC testing. Refusing leads to automatic license suspension for 180 days (first refusal) or 2 years (subsequent), and your refusal can be used as evidence against you in court. However, refusing also means police lose a key piece of evidence. Officers may seek a warrant for a blood draw if you refuse. Each situation is different; there is no universally correct answer. What IS universally correct: politely decline to answer questions and ask for an attorney immediately. Call Mario Yague Law: (915) 400-1099.",
      },
      es: {
        q: '¿Debo rechazar el alcoholímetro?',
        a: "Texas opera bajo 'consentimiento implícito' — al manejar en Texas has consentido a pruebas de BAC. Rechazar lleva a suspensión automática de licencia por 180 días (primer rechazo) o 2 años (siguientes), y tu rechazo puede usarse como evidencia contra ti en la corte. Sin embargo, rechazar también significa que la policía pierde una pieza clave de evidencia. Los oficiales pueden buscar una orden judicial para extracción de sangre si rechazas. Cada situación es diferente; no hay una respuesta universalmente correcta. Lo que SÍ es universalmente correcto: declina educadamente responder preguntas y pide un abogado inmediatamente. Llama a Mario Yague Law: (915) 400-1099.",
      },
    },
    {
      en: {
        q: 'How long does a DWI stay on my record?',
        a: 'A DWI conviction in Texas stays on your criminal record permanently — there is no automatic expiration. Texas only allows expunction (sealing the record) in limited situations: cases dismissed without a plea, acquittals, or successful completion of certain pretrial diversion programs. A standard DWI conviction is NOT eligible for expunction. However, you may qualify for an "order of nondisclosure" that hides the record from most employers (though not from law enforcement) under specific circumstances. The best protection is to fight the charges aggressively from day one. Mario Yague Law evaluates every available defense.',
      },
      es: {
        q: '¿Por cuánto tiempo permanece un DWI en mi expediente?',
        a: 'Una condena de DWI en Texas permanece en tu registro criminal permanentemente — no hay expiración automática. Texas solo permite la expulsión (sellar el registro) en situaciones limitadas: casos desestimados sin declaración de culpabilidad, absoluciones, o completación exitosa de ciertos programas de diversión. Una condena estándar de DWI NO es elegible para expulsión. Sin embargo, puedes calificar para una "orden de no divulgación" que oculta el registro de la mayoría de empleadores (aunque no de las fuerzas del orden) bajo circunstancias específicas. La mejor protección es pelear los cargos agresivamente desde el primer día. Mario Yague Law evalúa cada defensa disponible.',
      },
    },
  ],
};

export const allPracticeAreas: PracticeAreaContent[] = [
  personalInjuryPage,
  criminalDefensePage,
  familyLawPage,
  dwiDefensePage,
];

export const faqPageSeo: { en: PageSeo; es: PageSeo } = {
  en: {
    title: 'Frequently Asked Questions | Mario Yague Law — El Paso, TX',
    description: 'Answers to the most common questions about personal injury, criminal defense, family law, and DWI cases in El Paso, Texas. Bilingual answers. Call (915) 400-1099.',
  },
  es: {
    title: 'Preguntas Frecuentes | Mario Yague Law — El Paso, TX',
    description: 'Respuestas a las preguntas más comunes sobre lesiones personales, defensa criminal, derecho familiar y DWI en El Paso, Texas. Respuestas bilingües. Llama al (915) 400-1099.',
  },
};
