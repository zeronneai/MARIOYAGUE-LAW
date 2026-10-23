import { Plus } from 'lucide-react';
import type { LocalizedQA, Lang } from '../seo/pageContent';

interface FAQAccordionProps {
  items: LocalizedQA[];
  lang: Lang;
}

/**
 * Preguntas con <details>: las respuestas están en el HTML aunque estén cerradas,
 * así Google y las IAs las leen completas. Funciona sin JavaScript.
 */
export const FAQAccordion = ({ items, lang }: FAQAccordionProps) => (
  <div className="mx-auto max-w-3xl space-y-3">
    {items.map((item, i) => (
      <details key={i} open={i === 0} className="group rounded-[18px] border-2 border-ink bg-white transition-shadow open:shadow-[5px_5px_0_var(--color-ink)]">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
          <span className="text-[17px] font-bold leading-snug text-ink">{item[lang].q}</span>
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-toro text-white transition-transform group-open:rotate-45">
            <Plus className="h-4 w-4" />
          </span>
        </summary>
        <p className="px-5 pb-5 leading-relaxed text-ink/75">{item[lang].a}</p>
      </details>
    ))}
  </div>
);
