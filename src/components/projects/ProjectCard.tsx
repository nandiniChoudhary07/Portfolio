import { useState } from 'react'
import { isSet } from '../../lib/content'
import type { Project } from '../../types'
import { Badge, ButtonLink, Chip } from '../ui/Button'
import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon } from '../ui/Icons'
import { CaseStudy } from './CaseStudy'
import { Screens } from './Screens'

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-2.5 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-fg-muted">
            <span aria-hidden="true" className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const toggleButton =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-[0.95rem] font-medium whitespace-nowrap transition-[background-color,border-color,transform] duration-200 hover:border-fg/25 hover:bg-muted active:scale-[0.98]'

interface ProjectCardProps {
  project: Project
  /** Heading level of the card title, so each page keeps a correct outline. */
  heading?: 'h2' | 'h3'
}

/**
 * A project told for a business owner: what it does first, then links.
 * The technical details and the case study stay folded away until asked for.
 */
export function ProjectCard({ project, heading: Heading = 'h2' }: ProjectCardProps) {
  const [showCaseStudy, setShowCaseStudy] = useState(false)
  const [showTechnical, setShowTechnical] = useState(false)
  const featured = !!project.featured
  const caseStudyId = `${project.id}-case-study`
  const technicalId = `${project.id}-technical`

  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className={`card flex h-full flex-col overflow-hidden ${
        featured ? 'border-accent/30 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)]' : ''
      }`}
    >
      <div className={`grid gap-8 p-5 sm:p-8 ${featured ? 'lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:p-10' : ''}`}>
        <div className={featured ? 'lg:order-2' : undefined}>
          <Screens project={project} />
        </div>

        <div className="flex flex-col lg:order-1">
          <div>
            <Badge tone={featured ? 'accent' : 'default'}>{project.label}</Badge>
          </div>
          <Heading
            id={`${project.id}-title`}
            className={`mt-4 font-semibold tracking-tight text-balance ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}
          >
            {project.title}
          </Heading>
          <p className={`mt-4 leading-relaxed text-fg-muted ${featured ? 'text-base sm:text-lg' : ''}`}>
            {project.description}
          </p>

          {project.highlights && (
            <ul className="mt-5 space-y-2">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed">
                  <CheckIcon className="mt-1 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* A link set to '' is hidden; one still holding a [PLACEHOLDER] shows as "coming soon". */}
          {(project.liveUrl || project.caseStudy) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} variant={featured ? 'accent' : 'secondary'}>
                  {isSet(project.liveUrl) ? (
                    <>
                      {project.liveLabel}
                      <ArrowUpRightIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  ) : (
                    'Demo coming soon'
                  )}
                </ButtonLink>
              )}
              {project.caseStudy && (
                <button
                  type="button"
                  onClick={() => setShowCaseStudy((v) => !v)}
                  aria-expanded={showCaseStudy}
                  aria-controls={caseStudyId}
                  className={toggleButton}
                >
                  {showCaseStudy ? 'Hide the case study' : 'Read the case study'}
                  <ChevronDownIcon className={`transition-transform duration-300 ${showCaseStudy ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {project.caseStudy && showCaseStudy && (
        <div id={caseStudyId} className="animate-fade-in border-t border-border p-5 sm:p-8 lg:px-10">
          <CaseStudy data={project.caseStudy} />
        </div>
      )}

      {project.technical && (
        <div className="mt-auto border-t border-border bg-muted/50">
          <button
            type="button"
            onClick={() => setShowTechnical((v) => !v)}
            aria-expanded={showTechnical}
            aria-controls={technicalId}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted sm:px-8 lg:px-10"
          >
            <span>
              <span className="block font-semibold">Technical details</span>
              <span className="block text-sm text-fg-muted">Tech stack, features and what I built</span>
            </span>
            <ChevronDownIcon
              className={`shrink-0 text-xl text-fg-muted transition-transform duration-300 ${showTechnical ? 'rotate-180' : ''}`}
            />
          </button>
          {showTechnical && (
            <div id={technicalId} className="animate-fade-in space-y-8 px-5 pt-2 pb-8 sm:px-8 lg:px-10">
              <div>
                <p className="text-sm text-fg-muted">
                  <span className="font-semibold text-fg">My role:</span> {project.technical.role}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                  {project.technical.technologies.map((tech) => (
                    <li key={tech}>
                      <Chip>{tech}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                <BulletList title="Major features" items={project.technical.features} />
                <BulletList title="What I did" items={project.technical.contributions} />
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
