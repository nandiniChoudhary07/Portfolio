import { useEffect, useState } from 'react'
import { navItems } from '../data/portfolio'
import { pagePath } from '../lib/content'

const pageIds = new Set(navItems.map((item) => item.id))

/** '' normally; '/repo-name' when the site is served from a sub-folder (GitHub Pages project sites). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

interface Route {
  page: string
  /** Optional id of a section on that page to scroll to, e.g. "pricing". */
  section: string
}

/** First part of a path, without the base: '/services/' → 'services', '/' → ''. */
function firstSegment(pathname: string): string {
  return pathname.slice(base.length).split('/').filter(Boolean)[0] ?? ''
}

function toRoute(pathname: string, hash: string): Route {
  const id = firstSegment(pathname)
  return { page: pageIds.has(id) ? id : 'home', section: hash.replace(/^#/, '') }
}

/** Link to a page, optionally to one section of it: pageHref('services', 'pricing') → '/services#pricing'. */
export function pageHref(id: string, section?: string): string {
  return `${base}${pagePath(id)}${section ? `#${section}` : ''}`
}

/** Old links looked like /#/services. Send them to the new address so shared links keep working. */
function redirectOldHashLink() {
  const match = window.location.hash.match(/^#\/([^/?]*)\/?([^/?]*)/)
  if (!match) return
  const [, id = '', section = ''] = match
  window.history.replaceState(null, '', pageHref(pageIds.has(id) ? id : 'home', section || undefined))
}

function initialRoute(): Route {
  redirectOldHashLink()
  return toRoute(window.location.pathname, window.location.hash)
}

/**
 * Clean-URL routing (/services, /contact) with no library.
 * Returns the current page id. Pages open at the top, or at the linked section.
 * The host must send unknown paths to index.html; see the README for the Render rule.
 */
export function useRoute(): string {
  const [route, setRoute] = useState(initialRoute)

  useEffect(() => {
    const onPopState = () => setRoute(toRoute(window.location.pathname, window.location.hash))

    // Internal links are ordinary <a href="/services">; this turns a click into a page change without a reload.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element).closest?.('a')
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return

      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return
      const segment = firstSegment(url.pathname)
      if (segment && !pageIds.has(segment)) return // a real file, such as an image

      event.preventDefault()
      if (url.pathname !== window.location.pathname || url.hash !== window.location.hash) {
        window.history.pushState(null, '', url.pathname + url.hash)
      }
      setRoute(toRoute(url.pathname, url.hash)) // a new object every time, so the scroll below runs again
    }

    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onClick)
    }
  }, [])

  // Runs after the new page has rendered, so the section exists to scroll to.
  useEffect(() => {
    const target = route.section ? document.getElementById(route.section) : null
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [route])

  return route.page
}
