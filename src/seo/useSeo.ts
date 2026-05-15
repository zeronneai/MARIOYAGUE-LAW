import { useEffect } from 'react';
import type { LocalizedQA, PracticeAreaContent, Lang } from './pageContent';

interface SeoOpts {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object | object[];
}

const RUNTIME_SCHEMA_ID = 'page-jsonld-runtime';
const RUNTIME_META_DESC_ID = 'page-meta-desc-runtime';
const RUNTIME_CANONICAL_ID = 'page-canonical-runtime';

export function useSeo({ title, description, canonical, jsonLd }: SeoOpts) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let metaDesc = document.querySelector<HTMLMetaElement>(`meta[name="description"]`);
    const prevDesc = metaDesc?.getAttribute('content') ?? '';
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.id = RUNTIME_META_DESC_ID;
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonicalEl?.getAttribute('href') ?? '';
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      canonicalEl.id = RUNTIME_CANONICAL_ID;
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);

    const previousScript = document.getElementById(RUNTIME_SCHEMA_ID);
    if (previousScript) previousScript.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = RUNTIME_SCHEMA_ID;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
      if (canonicalEl && prevCanonical) canonicalEl.setAttribute('href', prevCanonical);
      const script = document.getElementById(RUNTIME_SCHEMA_ID);
      if (script) script.remove();
    };
  }, [title, description, canonical, jsonLd]);
}

export function buildFaqJsonLd(items: LocalizedQA[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item[lang].q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item[lang].a,
      },
    })),
  };
}

export function buildPracticeAreaJsonLd(page: PracticeAreaContent, lang: Lang) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: page.seo[lang].title.split(' | ')[0],
    description: page.overview[lang],
    serviceType: page.serviceType,
    url: `https://www.marioyaguelaw.com/${page.slug}`,
    provider: {
      '@type': 'LegalService',
      name: 'Mario Yague Law',
      url: 'https://www.marioyaguelaw.com',
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

  const faq = buildFaqJsonLd(page.miniFaq, lang);
  return [service, faq];
}
