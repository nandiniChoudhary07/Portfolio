import { useState } from 'react'
import { faqs, SHOW_PRICES } from '../data/portfolio'
import { pageHref } from '../hooks/useRoute'
import { ArrowRightIcon, ChevronDownIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { SubSection } from './ui/Section'

/** Accordion of common questions. Each question is a real button, so it works with keyboard and screen readers. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <SubSection id="faq" title="Common questions" text="Straight answers to what most business owners ask first.">
      <Reveal>
        <div className="card mt-8 divide-y divide-border overflow-hidden">
          {faqs.map((item, i) => {
            const faq = SHOW_PRICES && item.priced ? { ...item, ...item.priced } : item
            const isOpen = open === i
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors hover:bg-muted sm:px-7 sm:py-5"
                  >
                    {faq.question}
                    <ChevronDownIcon
                      className={`shrink-0 text-xl text-fg-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!isOpen}
                  className="animate-fade-in px-5 pb-5 leading-relaxed text-fg-muted sm:px-7 sm:pb-6"
                >
                  <p className="max-w-3xl">{faq.answer}</p>
                  {faq.link && (
                    <a
                      href={pageHref(faq.link.page, faq.link.section)}
                      className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                    >
                      {faq.link.label}
                      <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </SubSection>
  )
}
