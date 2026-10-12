import type { ReactNode } from 'react'
import { currentRole, frontendFocus, projects, social } from '../data/portfolio'
import { isSet, whatsappHref } from '../lib/content'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  LinkedInIcon,
  MailIcon,
  MonitorIcon,
  RocketIcon,
  ToolIcon,
  WhatsAppIcon,
} from './ui/Icons'
import { Reveal } from './ui/Reveal'

// The panel stays dark in both themes, so it uses fixed colours instead of theme tokens.
function Card({
  icon,
  title,
  children,
  highlight = false,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  highlight?: boolean
}) {
  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border p-6 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 sm:p-7 ${
        highlight
          ? 'border-teal-400/40 bg-teal-400/10 hover:border-teal-300/70 hover:shadow-[0_20px_40px_-25px_rgb(45_212_191/0.45)]'
          : 'border-white/10 bg-white/[0.04] hover:border-teal-300/40 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-25px_rgb(0_0_0/0.8)]'
      }`}
    >
      <span
        className={`flex size-10 items-center justify-center rounded-xl text-xl transition-colors ${
          highlight
            ? 'bg-teal-400 text-teal-950'
            : 'bg-white/[0.07] text-stone-300 group-hover:bg-teal-400/15 group-hover:text-teal-300'
        }`}
      >
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{title}</h3>
      {children}
    </article>
  )
}

interface WhatIBringProps {
  /** Show the four cards (full version is used on Home). */
  showCards?: boolean
  showCta?: boolean
}

export function WhatIBring({ showCards = true, showCta = true }: WhatIBringProps) {
  const personal = projects.find((p) => p.featured)

  return (
    <section aria-labelledby="what-i-bring-title" className="pt-4">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-stone-950 px-5 py-10 text-stone-50 ring-1 ring-white/10 sm:px-10 sm:py-14 lg:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-teal-400 opacity-15 blur-3xl"
            />

            <header className="relative max-w-2xl">
              <p className="font-mono text-xs tracking-[0.08em] text-teal-300 uppercase">Summary</p>
              <h2 id="what-i-bring-title" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                What I Bring
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-300 sm:text-lg">
                I don’t just build interfaces — I work on real products, solve frontend problems, and turn requirements
                into responsive, production-ready experiences.
              </p>
            </header>

            {showCards && (
            <ul className="relative mt-10 grid gap-4 md:grid-cols-2">
              <li>
                <Card icon={<BriefcaseIcon />} title="Real-World Development">
                  <p className="mt-2 leading-relaxed text-stone-400">
                    Experience working on professional products including Smart Minutes, San of Florida, and Kushals.
                  </p>
                  <p className="mt-auto pt-5 font-mono text-xs tracking-wide text-stone-500 uppercase">
                    {currentRole.role} · {currentRole.company}
                  </p>
                </Card>
              </li>

              <li>
                <Card icon={<RocketIcon />} title="Independent Builder" highlight>
                  <p className="mt-2 leading-relaxed text-stone-300">
                    Built and deployed my own project, {personal?.title ?? 'Phoolo ki ghati'}, taking it from development
                    to a live working product.
                  </p>
                  {isSet(personal?.liveUrl) && (
                    <a
                      href={personal.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-semibold text-teal-300 hover:text-teal-200 hover:underline"
                    >
                      View Project
                      <ArrowUpRightIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </Card>
              </li>

              <li>
                <Card icon={<MonitorIcon />} title="Frontend Focused">
                  <p className="mt-2 leading-relaxed text-stone-400">
                    Focused on building responsive, maintainable, and user-focused interfaces using modern frontend
                    technologies.
                  </p>
                  {frontendFocus.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label="Core technologies">
                      {frontendFocus.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-stone-200"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </li>

              <li>
                <Card icon={<ToolIcon />} title="Problem Solver">
                  <p className="mt-2 leading-relaxed text-stone-400">
                    Comfortable debugging frontend issues, improving existing features, implementing UI changes, and
                    adapting to evolving product requirements.
                  </p>
                </Card>
              </li>
            </ul>
            )}

            {showCta && (
              <div className="relative mt-8 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">Need a website for your business?</h3>
                  <p className="mt-1 text-stone-400">Tell me what you have in mind and I’ll suggest the simplest way to build it.</p>
                </div>
                <div className="flex shrink-0 items-center gap-5">
                  {isSet(social.linkedin) && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  )}
                  {isSet(social.email) && social.whatsapp && (
                    <a
                      href={`mailto:${social.email}`}
                      className="inline-flex items-center gap-1.5 text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      <MailIcon />
                      Email
                    </a>
                  )}
                  {social.whatsapp ? (
                    <a
                      href={whatsappHref(social.whatsapp, social.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-stone-950 shadow-sm transition-colors hover:bg-teal-100"
                    >
                      <WhatsAppIcon className="text-base" />
                      Chat on WhatsApp
                    </a>
                  ) : (
                    isSet(social.email) && (
                      <a
                        href={`mailto:${social.email}`}
                        className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-stone-950 shadow-sm transition-colors hover:bg-teal-100"
                      >
                        Let’s Connect
                        <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
