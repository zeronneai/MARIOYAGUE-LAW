import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import type { LocalizedQA, Lang } from '../seo/pageContent';

interface FAQAccordionProps {
  items: LocalizedQA[];
  lang: Lang;
}

export const FAQAccordion = ({ items, lang }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="border border-burgundy/15 bg-white rounded-sm overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-beige/30 transition-colors"
            >
              <span className="font-serif text-base md:text-lg text-charcoal leading-snug">
                {item[lang].q}
              </span>
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mt-0.5">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 text-charcoal/75 leading-relaxed text-sm md:text-[15px]">
                    {item[lang].a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
