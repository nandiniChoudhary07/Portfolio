import type { ReactNode } from 'react'
import { profile, SHOW_PRICES, social } from '../data/portfolio'
import { pageHref } from '../hooks/useRoute'
import { isSet, whatsappHref } from '../lib/content'
import { InstagramIcon, MailIcon, WhatsAppIcon } from './ui/Icons'

const quickLinks = [
  { label: 'Services', href: pageHref('services') },
  { label: SHOW_PRICES ? 'Pricing' : 'Packages', href: pageHref('services', 'pricing') },
  { label: 'Projects', href: pageHref('projects') },
  { label: 'Reviews', href: pageHref('reviews') },
  { label: 'Contact', href: pageHref('contact') },
]

const linkClass = 'inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg'

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-mono text-xs tracking-[0.08em] text-fg-subtle uppercase">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">{children}</ul>
    </nav>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="font-semibold">
            {profile.name} <span className="font-normal text-fg-muted">· {profile.tagline}</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {profile.location} · {profile.serviceArea}
          </p>
        </div>

        <Column title="Get in touch">
          {social.whatsapp && (
            <li>
              <a
                href={whatsappHref(social.whatsapp, social.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <WhatsAppIcon className="text-base" />
                WhatsApp
              </a>
            </li>
          )}
          {isSet(social.email) && (
            <li>
              <a href={`mailto:${social.email}`} className={linkClass}>
                <MailIcon className="text-base" />
                Email
              </a>
            </li>
          )}
          {isSet(social.instagram) && (
            <li>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <InstagramIcon className="text-base" />
                Instagram
              </a>
            </li>
          )}
        </Column>

        <Column title="Quick links">
          {quickLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </Column>
      </div>

      <div className="border-t border-border">
        {/* Extra space below on phones keeps the floating WhatsApp button off the footer text. */}
        <p className="container-page pt-5 pb-24 text-sm text-fg-subtle sm:pb-5">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  )
}
