import { about } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="I build websites that work for real businesses.">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-fg-muted sm:text-[1.05rem]">
            {about.paragraphs.map((text, i) => (
              <p key={i} className={i === 0 ? 'text-fg' : undefined}>
                {text}
              </p>
            ))}
          </div>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2 lg:self-start">
          {about.highlights.map((h, i) => (
            <li key={h.label}>
              <Reveal delay={i * 70} className="h-full">
                <div className="card h-full p-5 transition-colors hover:border-fg/20">
                  <span aria-hidden="true" className="mb-4 block h-1 w-8 rounded-full bg-accent" />
                  {h.value && <p className="text-3xl font-semibold tracking-tight">{h.value}</p>}
                  <p className="font-semibold">{h.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{h.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
