import { social } from '../data/portfolio'
import { isSet } from '../lib/content'
import { GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon } from './ui/Icons'

const socialItems = [
  { label: 'GitHub', href: social.github, icon: GitHubIcon, set: isSet(social.github) },
  { label: 'LinkedIn', href: social.linkedin, icon: LinkedInIcon, set: isSet(social.linkedin) },
  { label: 'Instagram', href: social.instagram, icon: InstagramIcon, set: isSet(social.instagram) },
  { label: 'Email', href: `mailto:${social.email}`, icon: MailIcon, set: isSet(social.email) },
].filter((item) => item.href !== '') // a link left as '' in portfolio.ts is hidden

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {socialItems.map(({ label, href, icon: Icon, set }) => (
        <li key={label}>
          {set ? (
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="inline-flex size-10 items-center justify-center rounded-full text-lg text-fg-muted transition-colors hover:bg-muted hover:text-fg"
            >
              <Icon />
            </a>
          ) : (
            <span
              aria-label={`${label} (link not added yet)`}
              className="inline-flex size-10 items-center justify-center rounded-full text-lg text-fg-subtle opacity-45"
            >
              <Icon />
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
