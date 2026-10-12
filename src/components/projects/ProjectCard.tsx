import { useState } from 'react'
import type { Project } from '../../types'
import { Badge, ButtonLink, Chip } from '../ui/Button'
import { ArrowUpRightIcon, ChevronDownIcon, GitHubIcon } from '../ui/Icons'
import { CaseStudy } from './CaseStudy'
import { ProjectGallery } from './ProjectGallery'

function BulletList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-2.5 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-fg-muted">
            <span aria-hidden="true" className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Case-study style card: summary beside the screenshots, then features, then an expandable case study. */
export function ProjectCard({ project }: { project: Project }) {
  const [showCaseStudy, setShowCaseStudy] = useState(false)
  const caseStudyId = `${project.id}-case-study`

  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="card overflow-hidden border-accent/30 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
    >
      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10">
        <div className="lg:order-2">
          <ProjectGallery project={project} />
        </div>

        <div className="flex flex-col lg:order-1">
          <div className="flex flex-wrap items-center gap-2">
            {project.type && <Badge tone="accent">{project.type}</Badge>}
            {project.status && (
              <Badge tone={project.status === 'Live' ? 'accent' : 'default'}>
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${project.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                />
                {project.status}
              </Badge>
            )}
          </div>
          <h3 id={`${project.id}-title`} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{project.description}</p>

          <dl className="mt-6 text-sm">
            <dt className="font-mono text-[0.7rem] tracking-wide text-fg-subtle uppercase">My role</dt>
            <dd className="mt-1 font-medium">{project.role}</dd>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>

          {/* A link set to '' is hidden; one still holding a [PLACEHOLDER] shows as disabled. */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl}>
                  View Live Project
                  <ArrowUpRightIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </ButtonLink>
              )}
              {project.githubUrl && (
                <ButtonLink href={project.githubUrl} variant="secondary">
                  <GitHubIcon />
                  GitHub
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-8 border-t border-border p-5 sm:p-8 md:grid-cols-2 lg:gap-12 lg:px-10">
        <BulletList title="Major features" items={project.features} />
        <BulletList title="What I did" items={project.contributions} />
      </div>

      {project.caseStudy && (
        <div className="border-t border-border bg-muted/50">
          <button
            type="button"
            onClick={() => setShowCaseStudy((v) => !v)}
            aria-expanded={showCaseStudy}
            aria-controls={caseStudyId}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-muted sm:px-8 lg:px-10"
          >
            <span>
              <span className="block font-semibold">{showCaseStudy ? 'Hide case study' : 'Read the case study'}</span>
              <span className="block text-sm text-fg-muted">Problem, approach, development, challenges, and outcome</span>
            </span>
            <ChevronDownIcon
              className={`shrink-0 text-xl text-fg-muted transition-transform duration-300 ${showCaseStudy ? 'rotate-180' : ''}`}
            />
          </button>
          {showCaseStudy && (
            <div id={caseStudyId} className="animate-fade-in px-5 pt-2 pb-10 sm:px-8 lg:px-10">
              <CaseStudy data={project.caseStudy} />
            </div>
          )}
        </div>
      )}
    </article>
  )
}
