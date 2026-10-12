import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as content from './src/data/portfolio.ts'
import { isSet } from './src/lib/content.ts'

const { profile, social } = content

// For GitHub Pages project sites (username.github.io/repo) build with BASE_PATH=/repo/
const base = process.env.BASE_PATH ?? '/'

/**
 * Builds SEO metadata, robots.txt and sitemap.xml from src/data/portfolio.ts,
 * so personal details only ever live in one place.
 */
function portfolioSeo(): Plugin {
  const siteUrl = isSet(profile.siteUrl) ? profile.siteUrl.replace(/\/$/, '') : ''
  const title = `${profile.name} | ${profile.role}`
  const description = profile.seoDescription
  const ogImage = isSet(profile.ogImage) && siteUrl ? siteUrl + profile.ogImage : ''

  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs,
    injectTo: 'head',
  })

  return {
    name: 'portfolio-seo',

    buildStart() {
      const found = new Set(JSON.stringify(content).match(/\[[A-Z][^\]]*\]/g) ?? [])
      if (found.size) {
        console.warn(
          `\n⚠  ${found.size} placeholder(s) left in src/data/portfolio.ts:\n` +
            [...found].map((p) => `   • ${p}`).join('\n') +
            '\n',
        )
      }
    },

    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = [
        meta({ name: 'description', content: description }),
        meta({ name: 'author', content: profile.name }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:title', content: title }),
        meta({ property: 'og:description', content: description }),
        meta({ property: 'og:site_name', content: profile.name }),
        meta({ name: 'twitter:card', content: ogImage ? 'summary_large_image' : 'summary' }),
        meta({ name: 'twitter:title', content: title }),
        meta({ name: 'twitter:description', content: description }),
      ]
      if (siteUrl) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          meta({ property: 'og:url', content: `${siteUrl}/` }),
        )
      }
      if (ogImage) {
        tags.push(meta({ property: 'og:image', content: ogImage }), meta({ name: 'twitter:image', content: ogImage }))
      }

      const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        ...(siteUrl && { url: `${siteUrl}/` }),
        sameAs: [social.github, social.linkedin].filter(isSet),
      }
      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(person),
        injectTo: 'head',
      })

      const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      return { html: html.replace('%PORTFOLIO_TITLE%', safeTitle), tags }
    },

    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', siteUrl && `Sitemap: ${siteUrl}/sitemap.xml`]
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.filter(Boolean).join('\n') + '\n' })

      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source:
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod></url>\n` +
            '</urlset>\n',
        })
      }
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), portfolioSeo()],
})
