import {
  deliverables,
  processSteps,
  projects,
  serviceExamples,
  services,
  SHOW_PRICES,
  social,
} from '../data/portfolio'
import { pageHref } from '../hooks/useRoute'
import { isSet, whatsappHref } from '../lib/content'
import type { Deliverable, Service, ServiceExample } from '../types'
import { Faq } from './Faq'
import { Pricing } from './Pricing'
import { Badge, ButtonLink } from './ui/Button'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CartIcon,
  FileIcon,
  ImageIcon,
  MapPinIcon,
  MobileIcon,
  MonitorIcon,
  RefreshIcon,
  ToolIcon,
  WhatsAppIcon,
} from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section, SubSection } from './ui/Section'

const serviceIcons: Record<Service['icon'], typeof MonitorIcon> = {
  site: MonitorIcon,
  store: CartIcon,
  redesign: RefreshIcon,
  support: ToolIcon,
}

const deliverableIcons: Record<Deliverable['icon'], typeof MonitorIcon> = {
  mobile: MobileIcon,
  gallery: ImageIcon,
  whatsapp: WhatsAppIcon,
  map: MapPinIcon,
  form: FileIcon,
}

// The sample layouts are drawings of a website, so they keep fixed colours in both themes.
const sampleThemes: Record<ServiceExample['theme'], { page: string; hero: string; tile: string; text: string }> = {
  warm: { page: 'bg-amber-50', hero: 'bg-amber-800', tile: 'bg-amber-200/70', text: 'text-amber-950' },
  rose: { page: 'bg-rose-50', hero: 'bg-rose-900', tile: 'bg-rose-200/70', text: 'text-rose-950' },
}

/** A small schematic of a website, used to illustrate an example. */
function SampleLayout({ example }: { example: ServiceExample }) {
  const theme = sampleThemes[example.theme]
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
        <span className="size-2 rounded-full bg-fg/15" />
        <span className="size-2 rounded-full bg-fg/15" />
        <span className="size-2 rounded-full bg-fg/15" />
      </div>
      <div className={`${theme.page} ${theme.text} p-3`}>
        <div className="flex items-center justify-between text-[0.65rem] font-semibold">
          <span>{example.sample.brand}</span>
          <span className="flex gap-2 font-normal opacity-70">
            <span>Home</span>
            <span>Gallery</span>
            <span>Contact</span>
          </span>
        </div>
        <div className={`${theme.hero} mt-2.5 rounded-lg px-3 py-4 text-white`}>
          <p className="text-sm font-semibold">{example.sample.headline}</p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[0.6rem] font-medium text-stone-900">
            <WhatsAppIcon /> Order on WhatsApp
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {example.sample.tiles.map((tile) => (
            <div key={tile}>
              <div className={`${theme.tile} aspect-[4/3] rounded-md`} />
              <p className="mt-1 text-center text-[0.6rem] font-medium">{tile}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What I can build for you"
      description="Websites built around what your business actually needs, explained in plain language from the first call to launch."
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon]
          const example = projects.find((p) => p.id === service.exampleProjectId)
          return (
            <li key={service.title}>
              <Reveal delay={(i % 2) * 70} className="h-full">
                <article className="card group flex h-full flex-col p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_20px_40px_-30px_rgb(0_0_0/0.35)] sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-xl text-accent">
                      <Icon />
                    </span>
                    <h2 className="text-lg font-semibold tracking-tight">{service.title}</h2>
                  </div>
                  <p className="mt-4 leading-relaxed text-fg-muted">{service.description}</p>
                  <ul className="mt-5 space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {example && isSet(example.liveUrl) && (
                    <a
                      href={example.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent hover:underline"
                    >
                      See a store I built: {example.name}
                      <ArrowUpRightIcon />
                    </a>
                  )}
                  <div className="mt-auto pt-6">
                    <dl className="flex flex-wrap gap-x-10 gap-y-3 border-t border-border pt-5 text-sm">
                      {SHOW_PRICES && (
                        <div>
                          <dt className="text-fg-subtle">Price</dt>
                          <dd className="mt-0.5 font-semibold">{service.price}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-fg-subtle">Delivery</dt>
                        <dd className="mt-0.5 font-semibold">{service.delivery}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ul>

      <div className="mt-16 sm:mt-20">
        <Pricing />
      </div>

      {deliverables.length > 0 && (
        <SubSection
          id="deliverables"
          className="mt-16 sm:mt-20"
          title="What you get"
          text="The things customers expect from a business website, built into yours wherever they fit."
        >
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {deliverables.map((item, i) => {
              const Icon = deliverableIcons[item.icon]
              return (
                <li key={item.title}>
                  <Reveal delay={i * 60} className="h-full">
                    <div className="card h-full p-5">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-xl text-fg-muted">
                        <Icon />
                      </span>
                      <h3 className="mt-4 font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </SubSection>
      )}

      {serviceExamples.length > 0 && (
        <SubSection
          id="examples"
          className="mt-16 sm:mt-20"
          title="Examples for your kind of business"
          text="These show what I would build for a business like yours. They are examples, not past client projects."
        >
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {serviceExamples.map((example, i) => (
              <li key={example.title}>
                <Reveal delay={i * 70} className="h-full">
                  <article className="card grid h-full gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_13rem] lg:items-start">
                    <div>
                      <Badge>Example · {example.business}</Badge>
                      <h3 className="mt-3 text-lg font-semibold tracking-tight">{example.title}</h3>
                      <p className="mt-2 leading-relaxed text-fg-muted">{example.description}</p>
                      <ul className="mt-4 space-y-2">
                        {example.includes.map((item) => (
                          <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed">
                            <span aria-hidden="true" className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <SampleLayout example={example} />
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </SubSection>
      )}

      <SubSection
        id="process"
        className="mt-16 sm:mt-20"
        title="How it works"
        text="A simple process, so you always know what happens next."
      >
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 60} className="h-full">
                <div className="card h-full p-5">
                  <span className="font-mono text-xs font-medium text-accent">0{i + 1}</span>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </SubSection>

      <div className="mt-16 sm:mt-20">
        <Faq />
      </div>

      <Reveal>
        <section
          aria-labelledby="services-cta-title"
          className="mt-16 flex flex-col gap-6 rounded-3xl border border-accent/30 bg-accent-soft px-6 py-9 sm:mt-20 sm:px-10 sm:py-11 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-xl">
            <h2 id="services-cta-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Get a Website for Your Business
            </h2>
            <p className="mt-3 leading-relaxed text-fg-muted">
              Tell me what your business does and what you want customers to do on your site. I’ll reply with a plan and
              a quote.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            {social.whatsapp && (
              <ButtonLink href={whatsappHref(social.whatsapp, social.whatsappMessage)} variant="accent">
                <WhatsAppIcon />
                Chat on WhatsApp
              </ButtonLink>
            )}
            <ButtonLink href={pageHref('contact')} variant="secondary">
              Get a Quote
              <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </section>
      </Reveal>
    </Section>
  )
}
