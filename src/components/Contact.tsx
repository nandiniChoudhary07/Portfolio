import { useState, type FormEvent } from 'react'
import { profile, social } from '../data/portfolio'
import { displayUrl, isSet, whatsappHref } from '../lib/content'
import { ButtonLink } from './ui/Button'
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

const field =
  'mt-1.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-colors hover:border-fg/25'

/**
 * Enquiry form with no backend: it opens WhatsApp or the visitor's email app
 * with their message already written, and they press send there.
 */
function EnquiryForm() {
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [message, setMessage] = useState('')
  const hasWhatsapp = !!social.whatsapp
  const hasEmail = isSet(social.email)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const via = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value')
    const intro = `Hi ${profile.name.split(' ')[0]}, I am ${name.trim()}${business.trim() ? ` from ${business.trim()}` : ''}.`
    const text = `${intro}\n\n${message.trim()}`

    if (via === 'email') {
      const subject = `Website enquiry${business.trim() ? ` - ${business.trim()}` : ''}`
      window.location.href = `mailto:${social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
    } else {
      window.open(whatsappHref(social.whatsapp, text), '_blank', 'noopener')
    }
  }

  if (!hasWhatsapp && !hasEmail) return null

  return (
    <form onSubmit={onSubmit} aria-labelledby="enquiry-title" className="card p-6 sm:p-7">
      <h2 id="enquiry-title" className="text-lg font-semibold tracking-tight">
        Send an enquiry
      </h2>
      <p className="mt-1.5 text-sm text-fg-muted">A few lines about your business is enough to get started.</p>

      <div className="mt-5 space-y-4">
        <label className="block text-sm font-medium">
          Your name
          <input
            className={field}
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium">
          Your business <span className="font-normal text-fg-subtle">(optional)</span>
          <input
            className={field}
            type="text"
            name="business"
            autoComplete="organization"
            placeholder="e.g. bakery, boutique, clinic"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium">
          What do you need?
          <textarea
            className={`${field} min-h-28 resize-y`}
            name="message"
            required
            placeholder="e.g. a website to show my products and take orders on WhatsApp"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        {hasWhatsapp && (
          <button
            type="submit"
            value="whatsapp"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-fg shadow-sm transition-colors hover:bg-accent/90 active:scale-[0.98]"
          >
            <WhatsAppIcon />
            Send on WhatsApp
          </button>
        )}
        {hasEmail && (
          <button
            type="submit"
            value="email"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium transition-colors hover:border-fg/25 hover:bg-muted active:scale-[0.98]"
          >
            <MailIcon />
            Send by email
          </button>
        )}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
        This opens WhatsApp or your email app with your message ready. Nothing is sent until you press send there.
      </p>
    </form>
  )
}

export function Contact() {
  const tel = `tel:${social.phone.replace(/[^\d+]/g, '')}`
  const channels = [
    { label: 'Email', value: social.email, href: `mailto:${social.email}`, icon: MailIcon, set: isSet(social.email) },
    { label: 'Phone', value: social.phone, href: tel, icon: PhoneIcon, set: isSet(social.phone) },
    { label: 'LinkedIn', value: displayUrl(social.linkedin), href: social.linkedin, icon: LinkedInIcon, set: isSet(social.linkedin) },
    { label: 'GitHub', value: displayUrl(social.github), href: social.github, icon: GitHubIcon, set: isSet(social.github) },
    // Plain text, not a link: tells local clients where you are based.
    { label: 'Location', value: isSet(profile.location) ? profile.location : '', href: '', icon: MapPinIcon, set: true },
  ].filter((c) => c.value !== '')

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s Work Together"
      description="Tell me about your business and what you need. I’ll get back to you with ideas and a quote."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_26rem] lg:items-start lg:gap-12">
        <div className="min-w-0">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {social.whatsapp && (
                <ButtonLink href={whatsappHref(social.whatsapp, social.whatsappMessage)} variant="accent">
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </ButtonLink>
              )}
              <ButtonLink
                href={isSet(social.email) ? `mailto:${social.email}` : undefined}
                variant={social.whatsapp ? 'secondary' : 'accent'}
              >
                <MailIcon />
                Send me an email
              </ButtonLink>
              {social.phone && (
                <ButtonLink href={isSet(social.phone) ? tel : undefined} variant="secondary">
                  <PhoneIcon />
                  Call me
                </ButtonLink>
              )}
            </div>
          </Reveal>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ label, value, href, icon: Icon, set }, i) => {
              const inner = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-xl text-fg-muted transition-colors group-hover:bg-accent-soft group-hover:text-accent">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-fg-subtle">{label}</span>
                    <span className="block text-[0.9rem] font-medium [overflow-wrap:anywhere] sm:text-base">{value}</span>
                  </span>
                  {href && (
                    <ArrowUpRightIcon className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                  )}
                </>
              )
              const cls = 'card group flex items-center gap-4 p-4 sm:p-5 transition-colors'
              return (
                <li key={label} className="min-w-0">
                  <Reveal delay={i * 70}>
                    {!href ? (
                      <div className={cls}>{inner}</div>
                    ) : set ? (
                      <a
                        href={href}
                        className={`${cls} hover:border-fg/20`}
                        {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={`${cls} opacity-60`} aria-disabled="true">
                        {inner}
                      </div>
                    )}
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>

        <Reveal delay={100} className="min-w-0">
          <EnquiryForm />
        </Reveal>
      </div>
    </Section>
  )
}
