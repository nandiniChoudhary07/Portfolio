const PLACEHOLDER = /\[[A-Z][^\]]*\]/

/** True when a value still contains a `[PLACEHOLDER]` that hasn't been replaced. */
function isPlaceholder(value: string | undefined): boolean {
  return !!value && PLACEHOLDER.test(value)
}

/** True when a link/value has been filled in with real content. */
export function isSet(value: string | undefined): value is string {
  return !!value && value.trim() !== '' && !isPlaceholder(value)
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}

/** Resolves a /public path against Vite's base URL (needed for GitHub Pages project sites). */
export function asset(path: string): string {
  if (isExternal(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

/** Opens a WhatsApp chat with the message already typed. Works on phones and WhatsApp Web. */
export function whatsappHref(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

export function initials(name: string): string {
  return name
    .replace(/[[\]]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')
}

/** "https://www.linkedin.com/in/jane/" → "linkedin.com/in/jane" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}
