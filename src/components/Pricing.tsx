import { packages, pricingNotes, profile, SHOW_PRICES, social } from '../data/portfolio'
import { pageHref } from '../hooks/useRoute'
import { whatsappHref } from '../lib/content'
import type { PricingPackage } from '../types'
import { ButtonLink } from './ui/Button'
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { SubSection } from './ui/Section'

function packageMessage(pkg: PricingPackage): string {
  return `Hi ${profile.name.split(' ')[0]}, I'm interested in the ${pkg.name} package.`
}

/** The starting price. Renders nothing while prices are hidden. */
function Price({ pkg }: { pkg: PricingPackage }) {
  if (!SHOW_PRICES) return null
  return (
    <p className="flex items-baseline gap-1.5">
      <span className="text-sm text-fg-muted">from</span>
      <span className="text-3xl font-semibold tracking-tight">{pkg.price}</span>
    </p>
  )
}

const popularCard =
  'border-accent/50 shadow-[0_24px_60px_-34px_color-mix(in_srgb,var(--accent)_70%,transparent)] hover:border-accent'
const plainCard = 'hover:border-accent/40 hover:shadow-[0_20px_40px_-30px_rgb(0_0_0/0.35)]'

function PopularBadge() {
  return (
    <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg shadow-sm">
      Most popular
    </span>
  )
}

/** Full pricing section for the Services page. */
export function Pricing() {
  return (
    <SubSection
      id="pricing"
      title={SHOW_PRICES ? 'Packages and pricing' : 'Packages'}
      text={
        SHOW_PRICES
          ? 'Clear starting prices, so you know what to expect before we talk. Every package is built for phones first.'
          : 'Three ways to get started. Every package is built for phones first, and I confirm the exact quote once I know what you need.'
      }
    >
      <ul className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-4">
        {packages.map((pkg, i) => (
          <li key={pkg.name}>
            <Reveal delay={i * 70} className="h-full">
              <article
                className={`card relative flex h-full flex-col p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 sm:p-7 ${
                  pkg.popular ? popularCard : plainCard
                }`}
              >
                {pkg.popular && <PopularBadge />}
                <h3 className="text-lg font-semibold tracking-tight">{pkg.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{pkg.summary}</p>
                <div className="mt-5">
                  <Price pkg={pkg} />
                  <p className="mt-1 text-sm font-medium text-accent">{pkg.delivery}</p>
                </div>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[0.95rem] leading-relaxed">
                      <CheckIcon className="mt-1 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  {social.whatsapp ? (
                    <ButtonLink
                      href={whatsappHref(social.whatsapp, packageMessage(pkg))}
                      variant={pkg.popular ? 'accent' : 'secondary'}
                      block
                    >
                      <WhatsAppIcon />
                      Get this package
                    </ButtonLink>
                  ) : (
                    <ButtonLink href={pageHref('contact')} variant={pkg.popular ? 'accent' : 'secondary'} block>
                      Get this package
                    </ButtonLink>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <dl className="mt-6 grid gap-x-8 gap-y-5 rounded-[1.25rem] border border-border bg-muted/60 p-6 text-[0.95rem] leading-relaxed sm:p-7 md:grid-cols-2">
          <div>
            <dt className="font-semibold">Add-ons</dt>
            <dd className="mt-1 text-fg-muted">{pricingNotes.addOns.join(' · ')}</dd>
          </div>
          <div>
            <dt className="font-semibold">Maintenance</dt>
            <dd className="mt-1 text-fg-muted">
              {SHOW_PRICES ? pricingNotes.maintenancePriced : pricingNotes.maintenance}
            </dd>
          </div>
          <div className="border-t border-border pt-5 md:col-span-2">
            <dt className="sr-only">Domain and hosting</dt>
            <dd className="text-fg-muted">{SHOW_PRICES ? pricingNotes.hostingPriced : pricingNotes.hosting}</dd>
          </div>
        </dl>
      </Reveal>
    </SubSection>
  )
}

/** Short version for Home: name, delivery time and (when shown) price, linking to the full packages. */
export function PricingPreview() {
  return (
    <SubSection
      id="pricing-preview"
      title={SHOW_PRICES ? 'Simple, upfront pricing' : 'Packages to start from'}
      text={
        SHOW_PRICES
          ? 'Three packages to start from. Tell me what you need and I’ll confirm the exact price.'
          : 'Three ways to get started. Tell me what you need and I’ll send you an exact quote.'
      }
    >
      <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-4">
        {packages.map((pkg, i) => (
          <li key={pkg.name}>
            <Reveal delay={i * 70} className="h-full">
              <a
                href={pageHref('services', 'pricing')}
                className={`card group relative flex h-full flex-col p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 ${
                  pkg.popular ? popularCard : plainCard
                }`}
              >
                {pkg.popular && <PopularBadge />}
                <h3 className="text-lg font-semibold tracking-tight">{pkg.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{pkg.summary}</p>
                <div className="mt-auto pt-5">
                  <Price pkg={pkg} />
                  <p className="mt-1 text-sm font-medium text-accent">{pkg.delivery}</p>
                </div>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal>
        <p className="mt-6">
          <a
            href={pageHref('services', 'pricing')}
            className="group inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"
          >
            See what each package includes
            <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </p>
      </Reveal>
    </SubSection>
  )
}
