import { education } from '../data/portfolio'
import { GraduationIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education">
      <ul className="grid gap-4 md:grid-cols-2">
        {education.map((item, i) => (
          <li key={item.abbreviation}>
            <Reveal delay={i * 80} className="h-full">
              <article className="card flex h-full gap-5 p-6 sm:p-7">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl text-fg-muted">
                  <GraduationIcon />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-xs tracking-wide text-fg-subtle uppercase">{item.level}</p>
                  <h2 className="mt-1.5 text-lg font-semibold tracking-tight">
                    {item.abbreviation} <span className="font-normal text-fg-muted">— {item.degree}</span>
                  </h2>
                  <p className="mt-2 text-fg-muted">{item.institution}</p>
                  <p className="mt-1 font-mono text-sm text-fg-subtle">{item.year}</p>
                  {item.details && <p className="mt-3 text-sm text-fg-muted">{item.details}</p>}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
