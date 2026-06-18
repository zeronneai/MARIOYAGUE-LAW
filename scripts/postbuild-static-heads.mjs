import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const baseIndex = join(distDir, 'index.html');

if (!existsSync(baseIndex)) {
  console.error('[postbuild] dist/index.html not found — run vite build first');
  process.exit(1);
}

const baseHtml = readFileSync(baseIndex, 'utf8');

const SITE = 'https://www.marioyaguelaw.com';

const personalInjuryFaq = [
  {
    q: 'What is my car accident case worth?',
    a: 'Case value depends on several factors: severity of injuries, medical expenses (past and future), lost wages, impact on earning capacity, pain and suffering, and the at-fault driver’s insurance coverage. Minor injury cases with clear liability may settle for $5,000-$25,000, while cases with serious injuries, surgery, or permanent disability can reach six or seven figures. There is no reliable online calculator — every case is unique. Mario Yague Law evaluates your case for free and gives you a realistic range based on Texas case law and local jury verdicts.',
  },
  {
    q: 'How do I prove the other driver was at fault?',
    a: 'Fault in Texas auto accidents is proven through: 1) The police report (responding officer’s assessment), 2) Photos and video of the scene, 3) Witness statements, 4) Traffic camera or dashcam footage, 5) Cell phone records (showing distracted driving), 6) Vehicle damage analysis, and 7) Accident reconstruction experts in serious cases. Texas follows a modified comparative fault rule — you can recover damages as long as you are 50% or less at fault. Mario Yague Law works with investigators and experts to build the strongest liability case possible.',
  },
  {
    q: "What if I'm partially at fault for the accident?",
    a: 'Texas uses modified comparative fault under Texas Civil Practice & Remedies Code Section 33.001. If you are 50% or less at fault, you can still recover damages — but your award is reduced by your fault percentage. Example: if your damages total $100,000 and you are found 20% at fault, you recover $80,000. If you are 51% or more at fault, you recover nothing. Insurance adjusters often try to assign more fault to victims to reduce payouts. An attorney protects you from unfair fault allocation. Mario Yague Law fights aggressively to minimize fault attributed to clients.',
  },
];

const criminalDefenseFaq = [
  {
    q: 'Should I talk to police without a lawyer?',
    a: 'No. The Fifth Amendment gives you the right to remain silent, and the Sixth Amendment gives you the right to an attorney — use both. Politely tell officers: "I am invoking my right to remain silent and I want a lawyer." Anything you say, including statements meant to explain or defend yourself, can be used against you. Police are trained to elicit incriminating statements. Even innocent people regularly hurt their cases by talking. Call Mario Yague Law at (915) 400-1099 before any interview.',
  },
  {
    q: "What's the difference between a felony and misdemeanor in Texas?",
    a: 'Misdemeanors are less serious offenses with maximum penalties of up to 1 year in county jail and fines up to $4,000 (Class A misdemeanor). Felonies are more serious with potential state prison sentences from 180 days to life, and fines up to $10,000+. Texas classifies felonies as State Jail, Third Degree, Second Degree, First Degree, and Capital. A felony conviction creates a permanent record with lifelong consequences: loss of voting rights, firearm rights, professional licenses, employment difficulties, and immigration consequences. Both deserve serious defense.',
  },
  {
    q: 'Can charges be dropped?',
    a: 'Yes — charges can be dismissed or reduced at multiple stages. Common paths to dismissal: 1) Prosecution declines to file charges after review. 2) Pretrial motions suppress key evidence (illegal search, Miranda violations). 3) Plea negotiations result in reduced charges or pretrial diversion. 4) Insufficient evidence at preliminary hearing. 5) Grand jury declines to indict (in felony cases). 6) Witnesses become unavailable or uncooperative. 7) Successful completion of a deferred adjudication program. The earlier an experienced attorney intervenes, the better the chance of a favorable outcome. Mario Yague Law fights for dismissal at every opportunity.',
  },
];

const familyLawFaq = [
  {
    q: 'How long does a divorce take in Texas?',
    a: 'Texas has a mandatory 60-day waiting period from the date a divorce petition is filed to the date a divorce can be finalized (Texas Family Code Section 6.702). Uncontested divorces where both spouses agree on all issues typically take 60-90 days. Contested divorces involving disputes over property, custody, or support commonly take 6-12 months, and complex cases can take 18+ months. Factors that lengthen timeline: contested custody, business valuations, hidden assets, or one spouse refusing to cooperate. Mario Yague Law works to resolve cases efficiently while protecting your rights.',
  },
  {
    q: 'How is property divided in a Texas divorce?',
    a: 'Texas is a community property state. Assets and debts acquired during marriage are presumed to belong equally to both spouses, regardless of whose name is on the title. Separate property — owned before marriage or received during marriage by gift or inheritance — stays with the original owner. Courts divide community property in a "just and right" manner, which is usually 50/50 but can be unequal if factors like fault in the breakup, earning capacity, or fraud justify it. Identifying and valuing all assets (including retirement accounts, businesses, and hidden assets) is critical. Mario Yague Law works with forensic accountants when needed.',
  },
  {
    q: 'Can I modify child support?',
    a: 'Yes — Texas allows modification of existing child support orders when there has been a "material and substantial change in circumstances" or when 3+ years have passed since the last order AND the new calculation would change the amount by 20% or $100, whichever is less. Examples of qualifying changes: significant income increase or decrease, job loss, change in custody arrangement, child’s needs change (medical, educational), or paying parent has additional children. Modifications require a formal motion in court — informal agreements between parents are NOT enforceable. Mario Yague Law handles support modifications for both paying and receiving parents.',
  },
];

const dwiDefenseFaq = [
  {
    q: 'What is the legal blood alcohol limit in Texas?',
    a: 'Texas has three BAC (blood alcohol content) thresholds: 0.08% for drivers 21 and older, 0.04% for commercial drivers, and ANY detectable amount for drivers under 21 (zero tolerance). However, you can be arrested for DWI below 0.08% if an officer believes you have lost normal use of your mental or physical faculties due to alcohol or drugs — Texas Penal Code Section 49.04. Field sobriety tests, officer observations, and even prescription medications can lead to DWI arrests at lower BACs. The legal limit is not a safe limit.',
  },
  {
    q: 'Should I refuse the breathalyzer?',
    a: "Texas operates under 'implied consent' — by driving in Texas you have consented to BAC testing. Refusing leads to automatic license suspension for 180 days (first refusal) or 2 years (subsequent), and your refusal can be used as evidence against you in court. However, refusing also means police lose a key piece of evidence. Officers may seek a warrant for a blood draw if you refuse. Each situation is different; there is no universally correct answer. What IS universally correct: politely decline to answer questions and ask for an attorney immediately. Call Mario Yague Law: (915) 400-1099.",
  },
  {
    q: 'How long does a DWI stay on my record?',
    a: 'A DWI conviction in Texas stays on your criminal record permanently — there is no automatic expiration. Texas only allows expunction (sealing the record) in limited situations: cases dismissed without a plea, acquittals, or successful completion of certain pretrial diversion programs. A standard DWI conviction is NOT eligible for expunction. However, you may qualify for an "order of nondisclosure" that hides the record from most employers (though not from law enforcement) under specific circumstances. The best protection is to fight the charges aggressively from day one. Mario Yague Law evaluates every available defense.',
  },
];

const fullFaq = [
  { q: 'How much does a personal injury lawyer cost in El Paso, Texas?', a: 'At Mario Yague Law, personal injury cases work on a contingency fee basis — you pay nothing upfront. We only get paid if we win your case, typically taking 33-40% of the settlement. The initial consultation is completely free. This means injured clients can access top-tier legal representation without financial risk. Mario Yague Law has handled cases across El Paso and the surrounding Borderplex region since 2021.' },
  { q: 'What should I do immediately after a car accident in Texas?', a: "After a car accident in Texas, take these critical steps: 1) Call 911 immediately to report the accident and get medical attention if needed. 2) Move to safety if possible without leaving the scene. 3) Document everything: take photos of vehicles, damage, license plates, road conditions, and your injuries. 4) Exchange information with other drivers — names, insurance, license numbers. 5) Get contact information from witnesses. 6) Do NOT admit fault or apologize. 7) Seek medical attention even if you feel fine — some injuries appear hours or days later. 8) Contact a personal injury attorney before talking to insurance companies. Texas has a 2-year statute of limitations for personal injury claims, so don't delay." },
  { q: 'How long do I have to file a personal injury lawsuit in Texas?', a: 'In Texas, you have 2 years from the date of the accident to file a personal injury lawsuit, according to Texas Civil Practice and Remedies Code Section 16.003. After 2 years, you typically lose the right to pursue compensation forever. There are limited exceptions for minors and cases involving government entities (which require notice within 6 months). Don’t wait until the deadline — important evidence can disappear and witnesses’ memories fade. Contact Mario Yague Law at (915) 400-1099 for a free consultation about your case.' },
  { q: "What if the person who hit me doesn't have insurance in Texas?", a: "Even though Texas requires drivers to carry liability insurance, approximately 13% of drivers are uninsured. If you're hit by an uninsured driver, you have options: 1) File a claim with your own Uninsured/Underinsured Motorist (UM/UIM) coverage if you have it. 2) Sue the at-fault driver personally — though collecting may be difficult. 3) Make a claim through Personal Injury Protection (PIP) coverage on your policy if available. 4) If the driver fled, you may also pursue hit-and-run claims. Texas insurance law is complex; an experienced attorney can identify all available compensation sources. Mario Yague Law specializes in helping victims of uninsured driver accidents — call (915) 400-1099." },
  { q: 'Do I really need a lawyer for a criminal charge in El Paso?', a: 'Yes — in nearly every criminal case in Texas, having an attorney is critical. Even seemingly minor charges (misdemeanors) can result in jail time, fines, permanent criminal records, loss of professional licenses, immigration consequences, and impact on employment and housing. A criminal defense attorney protects your constitutional rights, negotiates with prosecutors, challenges evidence, and represents you in court. Mario Yague Law provides aggressive criminal defense for felonies, misdemeanors, DWI, drug charges, assault, theft, and other charges in El Paso County. Free initial consultation: (915) 400-1099.' },
  { q: "What happens if I'm arrested for DWI in Texas?", a: 'A DWI arrest in Texas triggers two separate legal processes: a criminal case AND an administrative driver’s license suspension. You have only 15 days from arrest to request a hearing to fight the license suspension — miss this deadline and your license is automatically suspended. Penalties for first-offense DWI include up to 180 days in jail, fines up to $2,000, license suspension up to 2 years, and mandatory installation of an ignition interlock device. Repeat offenders face felony charges. The breathalyzer or blood test can be challenged. Time is critical — contact Mario Yague Law at (915) 400-1099 immediately after a DWI arrest.' },
  { q: 'How is child custody decided in a Texas divorce?', a: "Texas uses the legal term 'conservatorship' instead of 'custody.' Courts presume both parents should be Joint Managing Conservators unless evidence shows one parent shouldn't have decision-making rights (history of abuse, neglect, etc.). The court determines: 1) Who has the right to designate the child's primary residence. 2) Decision-making rights (education, healthcare, religion). 3) Possession and access schedule (when each parent has the child). Texas has a Standard Possession Order, but parents can negotiate custom schedules. Courts always rule based on 'the best interest of the child.' Mario Yague Law represents parents in custody, divorce, and family law matters in El Paso County: (915) 400-1099." },
  { q: 'What types of compensation can I receive for a personal injury in Texas?', a: 'Texas personal injury law allows recovery of several types of damages: 1) Economic damages: medical bills (past and future), lost wages, lost earning capacity, property damage, rehabilitation costs. 2) Non-economic damages: pain and suffering, mental anguish, loss of enjoyment of life, disfigurement, loss of consortium. 3) Punitive damages (rare): awarded in cases of gross negligence or malice. Texas has caps on certain damages — medical malpractice non-economic damages are capped at $250,000 per provider. There is no cap on most other personal injury cases. The value of your case depends on injury severity, fault percentage, insurance coverage, and other factors. Mario Yague Law evaluates cases for free: (915) 400-1099.' },
  { q: 'How long does a personal injury case take in El Paso?', a: 'Personal injury cases in El Paso typically take 6 months to 3 years to resolve. The timeline depends on: 1) Severity of injuries — settlements happen after maximum medical improvement. 2) Insurance company responsiveness. 3) Whether liability is disputed. 4) Whether the case settles or goes to trial. Most cases settle without trial (95%+ in Texas). Simple cases with clear liability and minor injuries may settle in 4-6 months. Complex cases with serious injuries, multiple parties, or disputed liability can take 1-3 years. Mario Yague Law works to resolve cases efficiently while maximizing client compensation. Free case evaluation: (915) 400-1099.' },
  { q: 'Does Mario Yague Law speak Spanish?', a: "Yes — Mario Yague Law provides fully bilingual legal services in English and Spanish. Mario Yague himself is bilingual, and his team conducts consultations, court representation, legal document review, and client communication in both languages. Given El Paso's location on the U.S.-Mexico border and the large Spanish-speaking population in the Borderplex region, bilingual representation is essential for clear understanding of complex legal matters. Llámanos en español o inglés al (915) 400-1099." },
];

function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  };
}

function serviceSchema({ name, description, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name,
    description,
    url: `${SITE}/${slug}`,
    provider: {
      '@type': 'LegalService',
      name: 'Mario Yague Law',
      url: SITE,
      telephone: '+1-915-400-1099',
      email: 'mario@myr-law.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1521 E Missouri Ave',
        addressLocality: 'El Paso',
        addressRegion: 'TX',
        postalCode: '79902',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'El Paso',
      containedInPlace: { '@type': 'State', name: 'Texas' },
    },
  };
}

const routes = [
  {
    slug: 'faq',
    title: 'Frequently Asked Questions | Mario Yague Law — El Paso, TX',
    description: 'Answers to the most common questions about personal injury, criminal defense, family law, and DWI cases in El Paso, Texas. Bilingual answers. Call (915) 400-1099.',
    schemas: [faqSchema(fullFaq)],
  },
  {
    slug: 'personal-injury',
    title: 'Personal Injury Lawyer in El Paso, TX | Mario Yague Law',
    description: 'Bilingual personal injury attorney in El Paso, Texas. Car accidents, slip and fall, wrongful death. No fees unless we win. Free consultation: (915) 400-1099.',
    schemas: [
      serviceSchema({
        name: 'Personal Injury Lawyer in El Paso, TX',
        description: "Personal injury law allows people injured by another's negligence to recover compensation for their losses. Mario Yague Law represents clients across El Paso who have been injured in car accidents, truck accidents, motorcycle accidents, pedestrian accidents, slip and falls, and other incidents where someone else's carelessness caused harm.",
        slug: 'personal-injury',
      }),
      faqSchema(personalInjuryFaq),
    ],
  },
  {
    slug: 'criminal-defense',
    title: 'Criminal Defense Attorney in El Paso, TX | Mario Yague Law',
    description: 'Bilingual criminal defense attorney in El Paso. Felonies, misdemeanors, drug charges, assault. Aggressive defense. Free consultation: (915) 400-1099.',
    schemas: [
      serviceSchema({
        name: 'Criminal Defense Attorney in El Paso, TX',
        description: 'Criminal charges in Texas carry severe consequences. Mario Yague Law provides aggressive criminal defense for felonies, misdemeanors, DWI, drug charges, assault, theft, and other charges in El Paso County and surrounding jurisdictions.',
        slug: 'criminal-defense',
      }),
      faqSchema(criminalDefenseFaq),
    ],
  },
  {
    slug: 'family-law',
    title: 'Family Law Attorney in El Paso, TX | Mario Yague Law',
    description: 'Bilingual family law attorney in El Paso. Divorce, child custody, child support, adoption. Compassionate representation. Free consultation: (915) 400-1099.',
    schemas: [
      serviceSchema({
        name: 'Family Law Attorney in El Paso, TX',
        description: 'Mario Yague Law represents families across El Paso County in divorce, child custody, child support, adoption, paternity, and protective orders. Compassionate bilingual representation that protects what matters most.',
        slug: 'family-law',
      }),
      faqSchema(familyLawFaq),
    ],
  },
  {
    slug: 'dwi-defense',
    title: 'DWI / DUI Defense Attorney in El Paso, TX | Mario Yague Law',
    description: 'DWI/DUI defense attorney in El Paso, Texas. Protect your license. Aggressive defense. Bilingual. Free consultation: (915) 400-1099.',
    schemas: [
      serviceSchema({
        name: 'DWI / DUI Defense Attorney in El Paso, TX',
        description: 'A DWI arrest in Texas triggers two separate legal proceedings: a criminal case and an Administrative License Revocation (ALR) hearing. You have just 15 days to request a hearing or your license is automatically suspended. Mario Yague Law moves immediately to protect your freedom and driving privileges.',
        slug: 'dwi-defense',
      }),
      faqSchema(dwiDefenseFaq),
    ],
  },
  {
    slug: 'de-choque-a-cheque',
    title: 'De Choque a Cheque — Mario Yague Law | El Paso Accident Attorney',
    description: "De Choque a Cheque: Mario Yague turns your crash into your check. $10M+ recovered. Bilingual attorney in El Paso, TX. No fee unless we win. (915) 400-1099.",
    extraMeta: {
      keywords: 'de choque a cheque, abogado accidentes el paso, mario yague, personal injury el paso, abogado bilingüe',
      ogLocale: 'es_MX',
      ogLocaleAlternate: 'en_US',
    },
    hreflang: [
      { lang: 'en', href: `${SITE}/de-choque-a-cheque` },
      { lang: 'es', href: `${SITE}/de-choque-a-cheque` },
      { lang: 'x-default', href: `${SITE}/de-choque-a-cheque` },
    ],
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: 'De Choque a Cheque by Mario Yague Law',
        alternateName: ['De Choque a Cheque', 'From Crash to Cash', 'From Crash to Check'],
        description:
          'De Choque a Cheque is the Mario Yague Law campaign that turns your crash into your check. Bilingual personal injury attorney in El Paso, Texas. No fees unless we win. $10M+ recovered for clients.',
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
      faqSchema([
        {
          q: 'What does "De Choque a Cheque" mean?',
          a: '"De Choque a Cheque" is Spanish for "From Crash to Check." It is the campaign promise of Mario Yague Law: when you have been hurt in an accident in El Paso, we turn your crash into a check — the compensation you deserve. The phrase captures our entire process, from the moment of the accident to the moment you receive your settlement, with no fee unless we win.',
        },
        {
          q: 'How long does the De Choque a Cheque process take?',
          a: 'Most personal injury cases in El Paso resolve in 6 months to 3 years, depending on the severity of the injuries, the insurance company\'s response, and whether the case settles or goes to trial. Simple cases with clear liability and minor injuries can settle in 4–6 months. Complex cases with serious injuries or disputed liability can take 1–3 years. We move as fast as the medical and legal facts allow, and we keep you updated at every stage.',
        },
        {
          q: 'What are the attorney fees for De Choque a Cheque?',
          a: 'You pay nothing upfront. Mario Yague Law works on a contingency fee — we only get paid if we win your case, typically 33–40% of the final settlement. The initial consultation is free and confidential. If we do not recover compensation for you, you owe us nothing. No fee unless we win.',
        },
        {
          q: 'What types of accidents qualify for De Choque a Cheque?',
          a: "Car accidents, truck and 18-wheeler accidents, motorcycle accidents, pedestrian and bicycle accidents, slip and fall injuries, workplace injuries, wrongful death, and other incidents where someone else's negligence caused you harm. If you are not sure whether your situation qualifies, call us — the consultation is free and we will tell you straight.",
        },
        {
          q: 'Does Mario Yague speak Spanish?',
          a: "Yes. Mario Yague Law is fully bilingual. Mario himself is bilingual, and our entire team handles consultations, court representation, document review, and client communication in both English and Spanish. Given El Paso's location on the U.S.-Mexico border, bilingual representation is essential to make sure you understand every step of your case. Llámanos en español o inglés al (915) 400-1099.",
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'De Choque a Cheque', item: `${SITE}/de-choque-a-cheque` },
        ],
      },
    ],
  },
];

function renderRouteHtml({ slug, title, description, schemas, extraMeta, hreflang }) {
  let html = baseHtml;
  const canonical = `${SITE}/${slug}`;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description.replace(/"/g, '&quot;')}">`,
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
  );

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}">`,
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}">`,
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}">`,
  );

  // Replace twitter:title and twitter:description if present
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">`,
  );

  // Replace meta keywords if extraMeta.keywords provided
  if (extraMeta && extraMeta.keywords) {
    html = html.replace(
      /<meta name="keywords" content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${extraMeta.keywords.replace(/"/g, '&quot;')}">`,
    );
  }

  // Replace og:locale + og:locale:alternate if extraMeta provided
  if (extraMeta && extraMeta.ogLocale) {
    html = html.replace(
      /<meta property="og:locale" content="[^"]*"\s*\/?>/,
      `<meta property="og:locale" content="${extraMeta.ogLocale}">`,
    );
  }
  if (extraMeta && extraMeta.ogLocaleAlternate) {
    html = html.replace(
      /<meta property="og:locale:alternate" content="[^"]*"\s*\/?>/,
      `<meta property="og:locale:alternate" content="${extraMeta.ogLocaleAlternate}">`,
    );
  }

  // Build hreflang block
  let hreflangTags = '';
  if (Array.isArray(hreflang) && hreflang.length > 0) {
    hreflangTags = hreflang
      .map((entry) => `    <link rel="alternate" hreflang="${entry.lang}" href="${entry.href}" />`)
      .join('\n');
  }

  // Append schemas before </head>
  const schemaTags = schemas
    .map(
      (s) =>
        `    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`,
    )
    .join('\n');

  const headInjection = [hreflangTags, schemaTags].filter(Boolean).join('\n');
  html = html.replace('</head>', `${headInjection}\n  </head>`);

  return html;
}

let written = 0;
for (const route of routes) {
  const html = renderRouteHtml(route);
  const outDir = join(distDir, route.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf8');
  written += 1;
  console.log(`[postbuild] wrote dist/${route.slug}/index.html (${html.length} bytes)`);
}

console.log(`[postbuild] static heads generated for ${written} routes`);
