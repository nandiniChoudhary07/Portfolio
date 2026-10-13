import type { ReactNode } from 'react'
import type { CaseStudy as CaseStudyData, CaseStudyItem } from '../../types'

function Block({ title, children, wide = false }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? 'md:col-span-2' : undefined}>
      <h3 className="font-mono text-xs tracking-wide text-accent uppercase">{title}</h3>
      <div className="mt-2 leading-relaxed text-fg-muted">{children}</div>
    </div>
  )
}

function List({ items }: { items: CaseStudyItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-2.5 h-px w-2.5 shrink-0 bg-accent" />
          {typeof item === 'string' ? (
            <span>{item}</span>
          ) : (
            <span>
              <strong className="font-semibold text-fg">{item.title}</strong> {item.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function CaseStudy({ data }: { data: CaseStudyData }) {
  return (
    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
      <Block title="The Problem">
        <p>{data.problem}</p>
      </Block>
      <Block title="The Solution">
        <p>{data.solution}</p>
      </Block>
      <Block title="My Role">
        <p>{data.role}</p>
      </Block>
      <Block title="Outcome">
        <p>{data.outcome}</p>
      </Block>
      <Block title="Development" wide>
        <List items={data.development} />
      </Block>
      <Block title="Key Features">
        <List items={data.features} />
      </Block>
      <Block title="Key Learning">
        <List items={data.learning} />
      </Block>
      <Block title="Challenges" wide>
        <List items={data.challenges} />
      </Block>
    </div>
  )
}
