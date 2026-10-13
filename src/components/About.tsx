import { about, profile } from '../data/portfolio'
import { initials } from '../lib/content'
import { CheckIcon } from './ui/Icons'
import { Photo } from './ui/Photo'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="I build websites that work for real businesses.">
      <div className="grid gap-10 md:grid-cols-[16rem_1fr] lg:grid-cols-[20rem_1fr] lg:gap-16">
        <Reveal>
          <Photo
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fallback={initials(profile.name)}
            className="aspect-4/5 w-full max-w-xs rounded-3xl border border-border text-5xl"
          />
        </Reveal>

        <div>
          <Reveal>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed sm:text-[1.05rem]">
              <p>{about.intro}</p>
              <p className="text-fg-muted">{about.bio}</p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mt-10 text-xl font-semibold tracking-tight">Why work with me</h2>
            <ul className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
              {about.reasons.map((reason) => (
                <li key={reason} className="card flex items-center gap-3 px-4 py-3.5 font-medium">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <CheckIcon />
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-fg-subtle">Tools I use: {about.tools.join(', ')}.</p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
