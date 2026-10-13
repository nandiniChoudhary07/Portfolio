import { audiences, social } from '../data/portfolio'
import { pageHref } from '../hooks/useRoute'
import { whatsappHref } from '../lib/content'
import { Faq } from './Faq'
import { Hero } from './Hero'
import { PricingPreview } from './Pricing'
import { ReviewsPreview } from './Reviews'
import { ButtonLink } from './ui/Button'
import { WhatsAppIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'

function Audiences() {
  return (
    <section aria-labelledby="audiences-title">
      <Reveal>
        <div className="flex flex-col gap-4 rounded-[1.25rem] border border-border bg-surface px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:gap-8">
          <h2 id="audiences-title" className="eyebrow shrink-0">
            Who I build for
          </h2>
          <ul className="flex flex-wrap gap-2">
            {audiences.map((audience) => (
              <li
                key={audience}
                className="rounded-full border border-border bg-bg px-4 py-1.5 text-sm font-medium sm:text-[0.95rem]"
              >
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

function FinalCta() {
  return (
    <Reveal>
      <section
        aria-labelledby="home-cta-title"
        className="flex flex-col gap-6 rounded-3xl border border-accent/30 bg-accent-soft px-6 py-9 sm:px-10 sm:py-11 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-xl">
          <h2 id="home-cta-title" className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Want more customers to find your shop online?
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-fg-muted">Let’s talk on WhatsApp.</p>
        </div>
        <div className="shrink-0">
          {social.whatsapp ? (
            <ButtonLink href={whatsappHref(social.whatsapp, social.whatsappMessage)}>
              <WhatsAppIcon />
              Chat on WhatsApp
            </ButtonLink>
          ) : (
            <ButtonLink href={pageHref('contact')}>Get in touch</ButtonLink>
          )}
        </div>
      </section>
    </Reveal>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <div className="container-page space-y-16 pb-16 sm:space-y-20 sm:pb-20">
        <Audiences />
        <PricingPreview />
        <ReviewsPreview />
        <Faq />
        <FinalCta />
      </div>
    </>
  )
}
