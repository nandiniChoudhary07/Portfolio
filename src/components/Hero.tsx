import { profile, projects, services, social } from '../data/portfolio'
import { asset, initials, isSet, whatsappHref } from '../lib/content'
import { pageHref } from '../hooks/useRoute'
import { SocialLinks } from './SocialLinks'
import { ButtonLink } from './ui/Button'
import { ArrowRightIcon, ArrowUpRightIcon, MapPinIcon, WhatsAppIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'

export function Hero() {
  const example = projects.find((p) => p.featured)

  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem]" />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <Reveal>
          {profile.badge && (
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-muted shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {profile.badge}
            </p>
          )}

          <p className="mt-6 text-base font-medium text-fg-muted sm:text-lg">
            Hi, I’m {profile.name} <span className="text-fg-subtle">— {profile.role}</span>
          </p>
          <h1 id="home-title" className="mt-3 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {profile.heroTitle}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">{profile.headline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={pageHref('contact')} variant="accent">
              Get a Free Quote
              <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            {social.whatsapp && (
              <ButtonLink href={whatsappHref(social.whatsapp, social.whatsappMessage)} variant="secondary">
                <WhatsAppIcon />
                Chat on WhatsApp
              </ButtonLink>
            )}
            <ButtonLink href={pageHref('projects')} variant="ghost">
              View My Work
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <SocialLinks className="-ml-2.5" />
            {isSet(profile.location) && (
              <p className="flex items-center gap-1.5 text-sm text-fg-subtle">
                <MapPinIcon />
                {profile.location}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <aside aria-label="Services at a glance" className="card relative p-5 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.25)] sm:p-6">
            <div className="flex items-center gap-4 border-b border-border pb-5">
              {profile.photo ? (
                <img
                  src={asset(profile.photo)}
                  alt={`Portrait of ${profile.name}`}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft font-mono text-lg font-semibold text-accent">
                  {initials(profile.name)}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate font-semibold">{profile.name}</p>
                <p className="text-sm text-fg-muted">{profile.role}</p>
              </div>
            </div>

            {services.length > 0 && (
              <div className="pt-5">
                <p className="eyebrow text-fg-subtle">What I can build for you</p>
                <ul className="mt-3 space-y-2">
                  {services.map((service) => (
                    <li key={service.title}>
                      <a
                        href={pageHref('services')}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-border px-3.5 py-3 transition-colors hover:border-fg/20 hover:bg-muted"
                      >
                        <span className="text-sm font-medium">{service.title}</span>
                        <ArrowRightIcon className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {example && isSet(example.liveUrl) && (
              <div className="pt-5">
                <p className="eyebrow text-fg-subtle">Featured project</p>
                <a
                  href={example.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent-soft px-3.5 py-3 transition-colors hover:border-accent/60"
                >
                  <span className="text-sm font-medium">{example.title}</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-accent">
                    View live site <ArrowUpRightIcon />
                  </span>
                </a>
              </div>
            )}
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
