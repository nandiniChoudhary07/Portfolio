import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as content from './src/data/portfolio.ts'
import { isSet, pagePath } from './src/lib/content.ts'

const { navItems, packages, pageMeta, profile, SHOW_PRICES, social } = content

// For GitHub Pages project sites (username.github.io/repo) build with BASE_PATH=/repo/
const base = process.env.BASE_PATH ?? '/'

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

/**
 * Builds SEO metadata, robots.txt and sitemap.xml from src/data/portfolio.ts,
 * so personal details only ever live in one place. It also writes one HTML file
 * per page (dist/services/index.html, …) carrying that page's own title and
 * description, because link previews and some crawlers don't run JavaScript.
 */
function portfolioSeo(): Plugin {
  const siteUrl = isSet(profile.siteUrl) ? profile.siteUrl.replace(/\/$/, '') : ''
  const home = pageMeta.home!
  const ogImage = isSet(profile.ogImage) && siteUrl ? siteUrl + profile.ogImage : ''
  const pageUrl = (id: string) => siteUrl + pagePath(id)
  let outDir = 'dist'
  let isBuild = false

  // Tags marked `data-static-seo` are per-page. They are in the HTML for crawlers that don't run
  // JavaScript; in the browser src/main.tsx removes them and <Seo> (react-helmet-async) takes over.
  const meta = (attrs: Record<string, string>, managed = false): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs: managed ? { ...attrs, 'data-static-seo': '' } : attrs,
    injectTo: 'head',
  })

  const [city = '', region = ''] = profile.location.split(',').map((part) => part.trim())
  const address = { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: 'IN' }
  const sameAs = [social.instagram, social.linkedin, social.github].filter(isSet)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        ...(siteUrl && { '@id': `${siteUrl}/#person`, url: `${siteUrl}/` }),
        name: profile.name,
        jobTitle: profile.role,
        email: social.email,
        telephone: social.phone,
        address,
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        '@type': 'ProfessionalService',
        ...(siteUrl && { '@id': `${siteUrl}/#business`, url: `${siteUrl}/`, founder: { '@id': `${siteUrl}/#person` } }),
        name: `${profile.name} · ${profile.tagline}`,
        description: home.description,
        ...(ogImage && { image: ogImage }),
        email: social.email,
        telephone: social.phone,
        address,
        areaServed: 'India',
        ...(SHOW_PRICES && packages[0] && { priceRange: `From ${packages[0].price}` }),
        ...(sameAs.length > 0 && { sameAs }),
      },
    ],
  }

  return {
    name: 'portfolio-seo',

    configResolved(config) {
      outDir = config.build.outDir
      isBuild = config.command === 'build'
    },

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
        meta({ name: 'description', content: home.description }, true),
        meta({ name: 'author', content: profile.name }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: profile.name }),
        meta({ property: 'og:locale', content: 'en_IN' }),
        meta({ property: 'og:title', content: home.title }, true),
        meta({ property: 'og:description', content: home.description }, true),
        meta({ name: 'twitter:card', content: ogImage ? 'summary_large_image' : 'summary' }),
        meta({ name: 'twitter:title', content: home.title }, true),
        meta({ name: 'twitter:description', content: home.description }, true),
      ]
      if (siteUrl) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: pageUrl('home'), 'data-static-seo': '' }, injectTo: 'head' },
          meta({ property: 'og:url', content: pageUrl('home') }, true),
        )
      }
      if (ogImage) {
        tags.push(
          meta({ property: 'og:image', content: ogImage }),
          meta({ property: 'og:image:width', content: '1200' }),
          meta({ property: 'og:image:height', content: '630' }),
          meta({ property: 'og:image:alt', content: `${profile.name} · ${profile.tagline}` }),
          meta({ name: 'twitter:image', content: ogImage }),
        )
      }
      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(structuredData),
        injectTo: 'head',
      })

      return { html: html.replace('%PORTFOLIO_TITLE%', escapeHtml(home.title)), tags }
    },

    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', siteUrl && `Sitemap: ${siteUrl}/sitemap.xml`]
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.filter(Boolean).join('\n') + '\n' })

      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10)
        const urls = navItems.map(
          (item) => `  <url><loc>${pageUrl(item.id)}</loc><lastmod>${today}</lastmod></url>`,
        )
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source:
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            urls.join('\n') +
            '\n</urlset>\n',
        })
      }
    },

    // After the build: copy index.html to each page's folder with that page's title, description and URL.
    closeBundle() {
      if (!isBuild) return
      let html: string
      try {
        html = readFileSync(join(outDir, 'index.html'), 'utf8')
      } catch {
        return // the build failed earlier; nothing to copy
      }

      for (const item of navItems) {
        const page = pageMeta[item.id]
        if (item.id === 'home' || !page) continue
        let pageHtml = html
          .split(escapeHtml(home.title))
          .join(escapeHtml(page.title))
          .split(escapeHtml(home.description))
          .join(escapeHtml(page.description))
        if (siteUrl) {
          pageHtml = pageHtml
            .split(`href="${pageUrl('home')}"`)
            .join(`href="${pageUrl(item.id)}"`)
            .split(`property="og:url" content="${pageUrl('home')}"`)
            .join(`property="og:url" content="${pageUrl(item.id)}"`)
        }
        mkdirSync(join(outDir, item.id), { recursive: true })
        writeFileSync(join(outDir, item.id, 'index.html'), pageHtml)
      }

      // Hosts such as GitHub Pages serve 404.html for unknown paths; the app then shows the right page.
      copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), portfolioSeo()],
})
