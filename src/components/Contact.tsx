import { useState, type FormEvent } from 'react'
import { contactSteps, enquiryOptions, profile, SHOW_PRICES, social } from '../data/portfolio'
import { displayUrl, isSet, whatsappHref } from '../lib/content'
import { ButtonLink } from './ui/Button'
import {
  ArrowUpRightIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { canSend, fieldClass, SendButtons, sendMessage } from './ui/SendForm'

/**
 * Enquiry form with no backend: it opens WhatsApp or the visitor's email app
 * with their message already written, and they press send there.
 */
function EnquiryForm() {
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [need, setNeed] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Three short blocks: who they are, what they picked, and anything they typed.
    const text = [
      `Hi ${profile.name.split(' ')[0]}, I am ${name.trim()}${business.trim() ? ` from ${business.trim()}` : ''}.`,
      [`What I need: ${need}`, budget && `Budget: ${budget}`].filter(Boolean).join('\n'),
      message.trim(),
    ]
      .filter(Boolean)
      .join('\n\n')

    sendMessage(event, `Website enquiry: ${need}${business.trim() ? ` - ${business.trim()}` : ''}`, text)
  }

  if (!canSend) return null

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
            className={fieldClass}
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
            className={fieldClass}
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
          <select className={fieldClass} name="need" required value={need} onChange={(e) => setNeed(e.target.value)}>
            <option value="" disabled>
              Choose one
            </option>
            {enquiryOptions.needs.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        {SHOW_PRICES && (
          <label className="block text-sm font-medium">
            Budget <span className="font-normal text-fg-subtle">(optional)</span>
            <select className={fieldClass} name="budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Prefer not to say</option>
              {enquiryOptions.budgets.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        )}
        <label className="block text-sm font-medium">
          Tell me more <span className="font-normal text-fg-subtle">(optional)</span>
          <textarea
            className={`${fieldClass} min-h-24 resize-y`}
            name="message"
            placeholder="e.g. I want to show my products and take orders on WhatsApp"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </div>

      <SendButtons note="This opens WhatsApp or your email app with your message ready. Nothing is sent until you press send there." />
    </form>
  )
}

export function Contact() {
  const tel = `tel:${social.phone.replace(/[^\d+]/g, '')}`
  const channels = [
    { label: 'Email', value: social.email, href: `mailto:${social.email}`, icon: MailIcon, set: isSet(social.email) },
    { label: 'Phone', value: social.phone, href: tel, icon: PhoneIcon, set: isSet(social.phone) },
    { label: 'Instagram', value: displayUrl(social.instagram), href: social.instagram, icon: InstagramIcon, set: isSet(social.instagram) },
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
            {profile.replyTime && (
              <p className="mt-4 flex items-center gap-2 text-sm text-fg-muted">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-emerald-500" />
                {profile.replyTime}
              </p>
            )}
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
                    <span className="block text-[0.9rem] font-medium wrap-anywhere sm:text-base">{value}</span>
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

          <Reveal>
            <section
              aria-labelledby="next-steps-title"
              className="relative mt-6 overflow-hidden rounded-[1.25rem] border border-accent/30 bg-accent-soft p-6 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-accent/15 blur-3xl"
              />
              <p className="eyebrow relative">No obligation</p>
              <h2 id="next-steps-title" className="relative mt-2 text-xl font-semibold tracking-tight">
                What happens next
              </h2>
              <ol className="relative mt-5 space-y-5">
                {contactSteps.map((step, i) => (
                  <li key={step.title} className="relative flex gap-4">
                    {/* The line joining one step to the next. */}
                    {i < contactSteps.length - 1 && (
                      <span aria-hidden="true" className="absolute top-9 bottom-[-1.25rem] left-4 w-px bg-accent/30" />
                    )}
                    <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold text-accent-fg">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{step.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">{step.description}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
        </div>

        <Reveal delay={100} className="min-w-0">
          <EnquiryForm />
        </Reveal>
      </div>
    </Section>
  )
}
