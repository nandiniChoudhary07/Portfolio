import { Helmet } from 'react-helmet-async'
import { pageMeta, profile } from '../data/portfolio'
import { isSet, pagePath } from '../lib/content'

/**
 * Sets the title, description and share tags for the current page.
 * The build also writes these into each page's HTML file (see vite.config.ts),
 * so link previews on WhatsApp and search engines get them without running JavaScript.
 */
export function Seo({ page }: { page: string }) {
  const meta = pageMeta[page] ?? pageMeta.home!
  const url = isSet(profile.siteUrl) ? profile.siteUrl.replace(/\/$/, '') + pagePath(page) : ''

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {url && <link rel="canonical" href={url} />}
      {url && <meta property="og:url" content={url} />}
    </Helmet>
  )
}
