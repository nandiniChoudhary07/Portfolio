# Freelance Portfolio

A fast, static website for freelance web development work, built with **React + TypeScript + Vite + Tailwind CSS**.
No backend, database, or server: it builds to plain HTML/CSS/JS and deploys to Vercel, Netlify, or GitHub Pages.

Pages: Home, Services, Projects, About, Contact. Each page has its own address (`/#/services`, `/#/contact`, …).

## Quick start

```bash
npm install        # install dependencies
npm run dev        # start local dev server → http://localhost:5173
npm run build      # type-check + production build into /dist
npm run preview    # serve the production build locally
```

Requires Node.js 20+. If port 5173 is busy, run `npm run dev -- --port 5174`.

## Editing content

**All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).** You never need to touch components to update the text.

- Anything in `[SQUARE_BRACKETS]` is a placeholder. `npm run build` prints every placeholder that is still left.
- A link that still holds a placeholder shows as a **disabled** button, so the site never has broken links.
- Set an optional link (`githubUrl`, `liveUrl`) to `''` to hide that button entirely.
- `services`, `deliverables`, `serviceExamples` and `processSteps` fill the Services page.
- `social.whatsapp` and `social.whatsappMessage` control every WhatsApp button. Set `whatsapp` to `''` to hide them.
- Page title, meta description, Open Graph/Twitter tags, JSON-LD, `robots.txt` and `sitemap.xml` are generated from the same file at build time.

The enquiry form on the Contact page has no backend. It opens WhatsApp or the visitor's email app with their message already written.

### Images

Put files in `/public` and reference them with a leading slash:

| What | Where | Set in `portfolio.ts` |
| --- | --- | --- |
| Profile photo (optional) | `public/profile.webp` | `profile.photo = '/profile.webp'` |
| Project screenshots | `public/projects/*.webp` | `images: [{ src: '/projects/x.webp', alt: '…' }]` |
| Social preview (optional, 1200×630) | `public/og-image.png` | `profile.ogImage = '/og-image.png'` |

Use WebP images around 1600px wide. Screenshots are lazy-loaded.

## Deploy

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`). Click **Deploy**.
4. Copy the deployed URL into `profile.siteUrl` in `portfolio.ts`, then commit and push. Vercel redeploys, and the canonical URL and sitemap now point at your domain.

Or from the terminal: `npx vercel` (preview) and then `npx vercel --prod`.

### Netlify

New site → import the repo → build command `npm run build`, publish directory `dist`.

### GitHub Pages

For a project site at `username.github.io/repo-name`, build with the repo path as the base:

```bash
BASE_PATH=/repo-name/ npm run build
```

Then publish the `dist` folder, for example with the official *Deploy static content to Pages* GitHub Action.
For a user site at `username.github.io`, a plain `npm run build` is enough.

## Project structure

```
├── index.html                  # HTML shell (SEO tags are injected at build time)
├── vite.config.ts              # Vite + Tailwind + SEO/robots/sitemap plugin
├── public/
│   ├── favicon.svg
│   └── projects/               # project screenshots go here
└── src/
    ├── data/portfolio.ts       # ← ALL site content
    ├── types.ts                # content types
    ├── lib/content.ts          # placeholder, link and WhatsApp helpers
    ├── hooks/useRoute.ts       # page routing (#/services, #/contact, …)
    ├── hooks/useScrollState.ts # navbar scroll state
    ├── index.css               # design tokens (light/dark), base styles
    ├── App.tsx
    ├── main.tsx
    └── components/
        ├── Navbar.tsx  Hero.tsx  Services.tsx  About.tsx  Contact.tsx
        ├── WhatIBring.tsx  Footer.tsx  SocialLinks.tsx
        ├── projects/   Projects.tsx  ProjectCard.tsx  ProjectGallery.tsx  CaseStudy.tsx
        └── ui/         Button.tsx  Icons.tsx  Reveal.tsx  Section.tsx  ThemeToggle.tsx
```
