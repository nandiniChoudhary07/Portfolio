import { projects } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="A live online store I designed, built and deployed on my own."
    >
      <Reveal>
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <h2 className="text-xl font-semibold tracking-tight">Personal / Independent Projects</h2>
          <p className="text-sm text-fg-muted">Designed, built, and shipped by me.</p>
        </div>
      </Reveal>
      <div className="space-y-6">
        {projects.map((project) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
