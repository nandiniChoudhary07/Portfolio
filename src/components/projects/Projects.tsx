import { projects } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { Section, SubSection } from '../ui/Section'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const live = projects.filter((p) => p.featured)
  const concepts = projects.filter((p) => !p.featured)

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="A live online store I designed, built and deployed on my own, plus concepts for other kinds of business."
    >
      <div className="space-y-6">
        {live.map((project) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {concepts.length > 0 && (
        <SubSection
          id="concepts"
          className="mt-16 sm:mt-20"
          title="Concepts"
          text="Designs for a type of business, to show what I would build for you. They are not client projects."
        >
          <ul className="mt-8 grid gap-6 lg:grid-cols-2">
            {concepts.map((project, i) => (
              <li key={project.id}>
                <Reveal delay={i * 70} className="h-full">
                  <ProjectCard project={project} heading="h3" />
                </Reveal>
              </li>
            ))}
          </ul>
        </SubSection>
      )}
    </Section>
  )
}
