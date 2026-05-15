import { useEffect } from 'react';
import type { LocalizedQA, PracticeAreaContent, Lang } from './pageContent';

interface SeoOpts {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object | object[];
}

const RUNTIME_META_DESC_ID = 'page-meta-desc-runtime';
const RUNTIME_CANONICAL_ID = 'page-canonical-runtime';
const RUNTIME_SCHEMA_PREFIX = 'page-jsonld-runtime-';

function getExistingSchemaTypes(): Set<string> {
  const types = new Set<string>();
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
    if (el.id.startsWith(RUNTIME_SCHEMA_PREFIX)) return; // ignore our own previous runtime injections
    try {
      const parsed = JSON.parse(el.textContent || '');
      if (parsed && typeof parsed['@type'] === 'string') {
        types.add(parsed['@type']);
      }
    } catch {
      // ignore non-JSON scripts
    }
  });
  return types;
}

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

    // Remove any runtime-injected schemas from a previous route render
    document
      .querySelectorAll(`script[id^="${RUNTIME_SCHEMA_PREFIX}"]`)
      .forEach((el) => el.remove());

    // If this page already has equivalent schemas in the static HTML
    // (from the prerender postbuild script), skip injecting duplicates.
    const injected: HTMLScriptElement[] = [];
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      const existingTypes = getExistingSchemaTypes();

      schemas.forEach((schema, idx) => {
        const type =
          schema && typeof (schema as Record<string, unknown>)['@type'] === 'string'
            ? ((schema as Record<string, unknown>)['@type'] as string)
            : undefined;

        if (type && existingTypes.has(type)) {
          // Already present from prerender — leave the static one alone.
          return;
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `${RUNTIME_SCHEMA_PREFIX}${idx}`;
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
        injected.push(script);
      });
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
      if (canonicalEl && prevCanonical) canonicalEl.setAttribute('href', prevCanonical);
      injected.forEach((s) => s.remove());
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
