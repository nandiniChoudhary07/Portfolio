import type { ReactNode } from 'react'
import { isExternal, isSet } from '../../lib/content'

type Variant = 'accent' | 'secondary' | 'ghost'

const base =
  'group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:scale-[0.98]'

const variants: Record<Variant, string> = {
  accent: 'bg-accent text-accent-fg hover:bg-accent/90 shadow-sm shadow-accent/20',
  secondary: 'border border-border bg-surface text-fg hover:border-fg/25 hover:bg-muted',
  ghost: 'text-fg-muted hover:text-fg hover:bg-muted',
}

interface ButtonLinkProps {
  href: string | undefined
  children: ReactNode
  variant?: Variant
  /** Stretch to the full width of the container. */
  block?: boolean
  /** Open in a new tab even though it is a page of this site. */
  newTab?: boolean
}

/**
 * A link styled as a button. If `href` is empty or still a [PLACEHOLDER],
 * it renders as a disabled element instead of a broken link.
 * External (http) links open in a new tab.
 */
export function ButtonLink({ href, children, variant = 'accent', block = false, newTab = false }: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${block ? 'w-full' : ''}`

  if (!isSet(href)) {
    return (
      <span className={`${cls} pointer-events-none opacity-45`} aria-disabled="true">
        {children}
      </span>
    )
  }

  return (
    <a href={href} className={cls} {...((newTab || isExternal(href)) && { target: '_blank', rel: 'noopener noreferrer' })}>
      {children}
    </a>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-fg-muted">
      {children}
    </span>
  )
}

export function Badge({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  const styles = tone === 'accent' ? 'border-accent/30 text-accent bg-accent-soft' : 'border-border text-fg-muted bg-surface'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[0.7rem] font-medium tracking-wide uppercase ${styles}`}
    >
      {children}
    </span>
  )
}
