import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`pt-24 pb-16 sm:pt-28 sm:pb-20 ${className}`}>
      <div className="container-page">
        <Reveal>
          <header className="mb-8 max-w-2xl sm:mb-10">
            <p className="eyebrow">{eyebrow}</p>
            <h1 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {title}
            </h1>
            {description && <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
