import { useEffect, useState } from 'react'
import { navItems } from '../data/portfolio'

const pageIds = new Set(navItems.map((item) => item.id))

/** Hash-based routing (#/about) so every page works on any static host without rewrites. */
function currentPage(): string {
  const id = window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0] ?? ''
  return pageIds.has(id) ? id : 'home'
}

export function pageHref(id: string): string {
  return id === 'home' ? '#/' : `#/${id}`
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

/** Returns the current page id and opens every page at the top. */
export function useRoute(): string {
  const [page, setPage] = useState(currentPage)

  useEffect(() => {
    const onChange = () => {
      setPage(currentPage())
      scrollToTop()
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return page
}
