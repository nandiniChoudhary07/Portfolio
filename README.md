# Freelance Portfolio

A fast, static website for freelance web development work, built with **React + TypeScript + Vite + Tailwind CSS**.
No server of its own: it builds to plain HTML/CSS/JS and deploys to Render, Vercel, Netlify, or GitHub Pages.

Pages: Home (`/`), Services (`/services`, packages at `/services#pricing`), Projects (`/projects`), About (`/about`), Reviews (`/reviews`), Contact (`/contact`).

The only outside service is the optional reviews database (Supabase), which the browser talks to directly.

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

- `packages` and `pricingNotes` are the packages and prices. Prices are hidden while `SHOW_PRICES` is `false`; set it to `true` to show them everywhere.
- `services`, `deliverables`, `serviceExamples` and `processSteps` fill the rest of the Services page; `faqs` is the FAQ.
- `projects` holds the live project and the concept cards.
- `pageMeta` is the title and description of each page for Google and link previews.
- `INSTAGRAM_URL` (top of the file) is empty for now. Paste your profile link and the Instagram links appear.
- `social.whatsapp` and `social.whatsappMessage` control every WhatsApp button, including the floating one.
- Anything in `[SQUARE_BRACKETS]` is a placeholder. `npm run build` prints every placeholder that is still left, and a link holding one shows as a disabled button ("Demo coming soon" on project cards).

The enquiry form on the Contact page has no backend. It opens WhatsApp or the visitor's email app with their message already written.

### Images

Put files in `/public/images`. Each slot shows a placeholder until its file exists, so you can add them one at a time.

| What | File |
| --- | --- |
| Your photo (About page and Home card) | `public/images/nandini.jpg` |
| Phoolo ki ghati, phone screenshot | `public/images/projects/phoolo-phone.png` |
| Bakery concept | `public/images/projects/bakery-desktop.png`, `bakery-phone.png` |
| Boutique concept | `public/images/projects/boutique-desktop.png`, `boutique-phone.png` |
| Social preview (1200×630) | `public/og-image.png`, exported from `public/og-image.svg` |

Desktop screenshots look best around 1600px wide; phone screenshots should be tall (about 9:19).

## Reviews database (Supabase)

Visitors post reviews on `/reviews`; they are saved in a Supabase table and shown straight away. That page shows the four newest, and "View all reviews" opens `/all-reviews` in a new tab with every review in pages of six and an "Add a review" button. The three newest also show on Home. Reviews are limited to 50 words.

One-time setup:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of [`supabase/reviews.sql`](supabase/reviews.sql) and press **Run**.
3. In **Project Settings → API**, copy the **Project URL** and the **anon / publishable** key into [`.env`](.env) (`VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`). Never use the `service_role` / secret key.
4. Restart `npm run dev`, or push to redeploy.

While `.env` is empty, the review form sends the review to you on WhatsApp/email instead, and no reviews are listed.

Managing reviews: in Supabase open **Table Editor → reviews**. Tick `hidden` on a row to take it off the site, or delete the row. Visitors can only add reviews and read visible ones; they cannot edit or delete.

## SEO

The build writes one HTML file per page (`dist/services/index.html`, …), each with its own title, description, canonical link and share tags, so WhatsApp previews and search engines get them without running JavaScript. It also generates `robots.txt`, `sitemap.xml` and the Person / business structured data. All of it comes from `portfolio.ts` (`profile.siteUrl`, `pageMeta`), so there is nothing to edit in `index.html`.

In the browser, `react-helmet-async` (`src/components/Seo.tsx`) updates the same tags as you move between pages.

## Deploy

### Render (current host)

Static Site settings: build command `npm install && npm run build`, publish directory `dist`.

Because pages have clean URLs, add one rule under **Redirects/Rewrites** so links to sections and any unknown path still open the app:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | Rewrite |

Render serves real files first, so `/services` still gets its own HTML file and the rule only applies to paths that don't exist.

### Vercel / Netlify

Import the repo; build command `npm run build`, output directory `dist`. Add an SPA fallback to `/index.html` (Vercel: a rewrite in `vercel.json`; Netlify: `/* /index.html 200` in a `_redirects` file).

### GitHub Pages

For a project site at `username.github.io/repo-name`, build with the repo path as the base:

```bash
BASE_PATH=/repo-name/ npm run build
```

Then publish the `dist` folder. The build includes a `404.html` copy of the app, which GitHub Pages uses as the fallback.

After the first deploy on a new address, set `profile.siteUrl` in `portfolio.ts` and push again, so canonical links and the sitemap point at it.

## Project structure

```
├── index.html                  # HTML shell (SEO tags are injected at build time)
├── vite.config.ts              # Vite + Tailwind + the SEO plugin (per-page HTML, sitemap, robots)
├── .env                        # Supabase URL and public key for reviews (safe to commit)
├── supabase/reviews.sql        # one-time database setup script
├── public/
│   ├── favicon.svg
│   ├── og-image.svg / .png     # social preview image
│   └── images/                 # your photo and project screenshots
└── src/
    ├── data/portfolio.ts       # ← ALL site content, prices and page titles
    ├── types.ts                # content types
    ├── lib/content.ts          # placeholder, link and WhatsApp helpers
    ├── lib/reviewsApi.ts       # reads and saves reviews (Supabase REST API)
    ├── hooks/useReviews.ts     # loads reviews for Home and the Reviews page
    ├── hooks/useRoute.ts       # clean-URL routing (/services, /contact, …)
    ├── hooks/useScrollState.ts # navbar scroll state
    ├── index.css               # design tokens (light/dark), base styles
    ├── App.tsx
    ├── main.tsx
    └── components/
        ├── Navbar.tsx  Footer.tsx  Seo.tsx  WhatsAppButton.tsx  SocialLinks.tsx
        ├── Home.tsx  Hero.tsx  Services.tsx  Pricing.tsx  Faq.tsx  About.tsx  Reviews.tsx  Contact.tsx
        ├── projects/   Projects.tsx  ProjectCard.tsx  Screens.tsx  CaseStudy.tsx
        └── ui/         Button.tsx  Icons.tsx  Photo.tsx  Reveal.tsx  Section.tsx  SendForm.tsx  ThemeToggle.tsx
```
