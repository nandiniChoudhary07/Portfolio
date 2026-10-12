import { useState } from 'react'
import type { Project } from '../../types'
import { asset, initials } from '../../lib/content'

/** Screenshot viewer with thumbnails. Falls back to a neutral browser frame when there are no images. */
export function ProjectGallery({ project }: { project: Project }) {
  const [index, setIndex] = useState(0)
  const images = project.images
  const current = images[index]

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-border bg-muted">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-muted" />
        </div>
        <div className={`group/img relative overflow-hidden ${current ? '' : 'aspect-[16/10]'}`}>
          {current ? (
            <img
              key={current.src}
              src={asset(current.src)}
              alt={current.alt}
              loading="lazy"
              decoding="async"
              className="animate-fade-in block h-auto w-full transition-transform duration-700 group-hover/img:scale-[1.02]"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_60%)]">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-surface font-mono text-xl font-semibold text-accent shadow-sm">
                {initials(project.title)}
              </span>
              <span className="text-sm font-medium text-fg-muted">{project.title}</span>
            </div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label={`${project.title} screenshots`}>
          {images.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screenshot ${i + 1}: ${img.alt}`}
                aria-pressed={i === index}
                className={`block overflow-hidden rounded-lg border-2 transition-colors ${
                  i === index ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={asset(img.src)} alt="" loading="lazy" decoding="async" className="h-14 w-22 object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
