import { useEffect } from 'react';

interface NoIndexSeoOpts {
  title: string;
  /** Optional image URL to preload for LCP. */
  preloadImage?: string;
}

/**
 * SEO handling for hidden funnel/ad landing pages.
 *
 * Deliberately the inverse of `useSeo`: it sets robots noindex/nofollow and
 * strips the canonical + Open Graph tags that index.html ships globally, so a
 * JS-executing crawler or link scraper sees nothing indexable. Everything is
 * restored on unmount so the rest of the SPA keeps its normal metadata.
 *
 * Note: crawlers that do NOT execute JS still receive the static index.html
 * head. robots.txt Disallow is the authoritative block for those.
 */
export function useNoIndexSeo({ title, preloadImage }: NoIndexSeoOpts) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const injected: HTMLElement[] = [];
    // [element, attribute, previousValue] for tags we neutralize and restore
    const suppressed: Array<[HTMLElement, string, string | null]> = [];

    const addMeta = (attr: 'name' | 'property', key: string, content: string) => {
      const el = document.createElement('meta');
      el.setAttribute(attr, key);
      el.setAttribute('content', content);
      el.dataset.funnelSeo = 'true';
      document.head.appendChild(el);
      injected.push(el);
    };

    addMeta('name', 'robots', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
    addMeta('name', 'googlebot', 'noindex, nofollow, noarchive');
    addMeta('name', 'bingbot', 'noindex, nofollow');

    // Neutralize canonical so this URL never claims to be a canonical target
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      suppressed.push([canonical, 'rel', canonical.getAttribute('rel')]);
      canonical.setAttribute('rel', 'funnel-suppressed-canonical');
    }

    // Strip social preview tags so an accidental share shows no rich card
    document
      .querySelectorAll<HTMLMetaElement>('meta[property^="og:"], meta[name^="twitter:"]')
      .forEach((el) => {
        suppressed.push([el, 'content', el.getAttribute('content')]);
        el.setAttribute('content', '');
      });

    if (preloadImage) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = preloadImage;
      link.setAttribute('fetchpriority', 'high');
      link.dataset.funnelSeo = 'true';
      document.head.appendChild(link);
      injected.push(link);
    }

    return () => {
      document.title = prevTitle;
      injected.forEach((el) => el.remove());
      suppressed.forEach(([el, attr, value]) => {
        if (value === null) el.removeAttribute(attr);
        else el.setAttribute(attr, value);
      });
    };
  }, [title, preloadImage]);
}
