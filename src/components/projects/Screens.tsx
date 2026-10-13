import type { Project } from '../../types'
import { ImageIcon, MobileIcon } from '../ui/Icons'
import { Photo } from '../ui/Photo'

/** Desktop and phone screenshots of a project. Each slot shows a placeholder until its image is added. */
export function Screens({ project }: { project: Project }) {
  return (
    <div className="relative pr-5 pb-6 sm:pr-8">
      <div className="overflow-hidden rounded-2xl border border-border bg-muted">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-muted" />
        </div>
        <Photo
          src={project.screenshots.desktop}
          alt={`${project.name} on a computer`}
          fallback={<ImageIcon />}
          className="block h-auto w-full"
          fallbackClassName="aspect-[16/10] text-3xl"
        />
      </div>

      <div className="absolute right-0 bottom-0 w-[24%] min-w-20 overflow-hidden rounded-[1.15rem] border-[5px] border-stone-900 bg-surface shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)] dark:border-stone-700">
        <Photo
          src={project.screenshots.phone}
          alt={`${project.name} on a phone`}
          fallback={<MobileIcon />}
          className="block aspect-[9/19] w-full object-top text-2xl"
        />
      </div>
    </div>
  )
}
