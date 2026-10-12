import { profile } from '../data/portfolio'
import { socialItems } from './SocialLinks'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-fg-muted">{profile.roleLong}</p>
        </div>

        <nav aria-label="Social">
          <ul className="flex flex-wrap items-center gap-x-1 text-sm">
            {socialItems.map(({ label, href, set }, i) => (
              <li key={label} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="px-2 text-fg-subtle">
                    |
                  </span>
                )}
                {set ? (
                  <a
                    href={href}
                    className="text-fg-muted transition-colors hover:text-fg"
                    {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {label}
                  </a>
                ) : (
                  <span className="text-fg-subtle">{label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-fg-subtle">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  )
}
