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

interface SubSectionProps {
  id: string
  title: string
  text?: string
  children: ReactNode
  className?: string
}

/** A titled block inside a page (h2). It has no container of its own, so the parent sets the width. */
export function SubSection({ id, title, text, children, className = '' }: SubSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <Reveal>
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {text && <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">{text}</p>}
      </Reveal>
      {children}
    </section>
  )
}

/** Vertical padding of a page: clears the fixed navbar at the top. */
export const pagePadding = 'pt-24 pb-16 sm:pt-28 sm:pb-20'

/** The eyebrow, h1 and intro at the top of a page. */
export function PageHeader({ id, eyebrow, title, description }: Omit<SectionProps, 'children' | 'className'>) {
  return (
    <Reveal>
      <header className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>}
      </header>
    </Reveal>
  )
}

export function Section({ id, eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${pagePadding} ${className}`}>
      <div className="container-page">
        <div className="mb-8 sm:mb-10">
          <PageHeader id={id} eyebrow={eyebrow} title={title} description={description} />
        </div>
        {children}
      </div>
    </section>
  )
}
