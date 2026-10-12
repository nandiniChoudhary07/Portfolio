/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — the only file you need to edit.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  • Anything in [SQUARE_BRACKETS] is a placeholder. Replace it with real info.
 *    `npm run build` prints every placeholder that's still left.
 *  • Links that still hold a placeholder render as disabled buttons, so the
 *    live site never contains a broken link.
 *  • Set an optional link to '' to hide its button completely.
 *  • Images live in /public (e.g. /public/projects/phoolo-home.webp) and are
 *    referenced here as '/projects/phoolo-home.webp'.
 *  • Only write what is true. Remove any bullet that doesn't apply to you.
 */
import type {
  Deliverable,
  Highlight,
  NavItem,
  ProcessStep,
  Profile,
  Project,
  Service,
  ServiceExample,
  SocialLinks,
} from '../types.ts'

export const profile: Profile = {
  name: 'Nandini Choudhary',
  role: 'Freelance Web Developer',
  roleLong: 'Freelance Web Developer',
  heroTitle: 'Websites that help your business grow.',
  headline:
    'I build modern, mobile-friendly websites and online stores for local businesses, including bakeries, clothing boutiques, and small shops. Help your customers discover your business, explore your products, and contact you easily.',
  badge: 'Available for freelance projects',
  location: 'Muzaffarnagar, Uttar Pradesh',
  photo: '',
  siteUrl: '[SITE_URL]',
  seoDescription:
    'Nandini Choudhary builds mobile-friendly websites and online stores for businesses. Based in Muzaffarnagar, Uttar Pradesh.',
  ogImage: '',
}

export const social: SocialLinks = {
  email: 'nandinipanwar770@gmail.com',
  phone: '+91 74170 02360',
  whatsapp: '917417002360',
  whatsappMessage: 'Hi Nandini, I would like to discuss a website for my business.',
  // Hidden while empty. Paste the full URL (https://...) to show the link everywhere.
  linkedin: '',
  github: '',
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

// What you offer clients. Keep it true: only list work you are ready to take on.
// No prices here on purpose. Add them to `description` if you decide on fixed packages.
export const services: Service[] = [
  {
    title: 'Business Website',
    description:
      'A professional website for your shop, clinic, institute or company, so customers can find you online and contact you easily.',
    includes: [
      'Works properly on phones, tablets and computers',
      'Your services, photos, timings and location in one place',
      'Call, WhatsApp and enquiry buttons',
      'Set up so search engines can read it',
    ],
    icon: 'site',
  },
  {
    title: 'Online Store',
    description:
      'Sell your products online with a catalogue your customers can browse and an admin panel you manage yourself.',
    includes: [
      'Product catalogue with search and categories',
      'Cart, checkout and order history for customers',
      'Online payments and cash on delivery',
      'Admin panel for orders, stock and products',
    ],
    icon: 'store',
    exampleProjectId: 'phoolo-ki-ghati',
  },
  {
    title: 'Website Redesign',
    description:
      'Already have a website that looks dated or breaks on mobile? I rebuild it with a clean, modern design.',
    includes: [
      'Modern look that matches your brand',
      'Mobile-friendly layout',
      'Faster loading pages',
      'Your existing content carried over',
    ],
    icon: 'redesign',
  },
  {
    title: 'Updates & Maintenance',
    description: 'Ongoing help after launch, so your website stays correct and keeps working.',
    includes: ['Content and photo updates', 'New pages and sections', 'Bug fixes', 'Small improvements over time'],
    icon: 'support',
  },
]

export const deliverables: Deliverable[] = [
  {
    title: 'Mobile-friendly design',
    description: 'Your site looks right and is easy to use on any phone, tablet or computer.',
    icon: 'mobile',
  },
  {
    title: 'Product galleries',
    description: 'Clear photos of your products or work, organised so customers can browse.',
    icon: 'gallery',
  },
  {
    title: 'WhatsApp contact',
    description: 'A button that opens a chat with you, with the customer’s message already started.',
    icon: 'whatsapp',
  },
  {
    title: 'Maps and location',
    description: 'Your address, timings and a Google Maps link so customers can reach your shop.',
    icon: 'map',
  },
  {
    title: 'Enquiry forms',
    description: 'A simple form for orders, bookings or questions, so you never miss a lead.',
    icon: 'form',
  },
]

// Examples of what you would build for a type of business. These are NOT past clients,
// and the page says so. Replace them with real client work once you have it.
export const serviceExamples: ServiceExample[] = [
  {
    business: 'Bakery',
    title: 'Bakery website',
    description: 'Show your cakes and menu, and let customers order ahead instead of calling to ask what you make.',
    includes: [
      'Menu with photos and prices',
      'Cake gallery by occasion',
      'Order or enquire on WhatsApp',
      'Shop timings and Google Maps location',
    ],
    sample: { brand: 'Your Bakery', headline: 'Fresh cakes, baked daily', tiles: ['Cakes', 'Pastries', 'Breads'] },
    theme: 'warm',
  },
  {
    business: 'Clothing boutique',
    title: 'Clothing boutique website',
    description: 'Put your collection online so customers can see new arrivals and ask about a piece before they visit.',
    includes: [
      'Collection gallery by category',
      'New arrivals section',
      'Size and price details for each item',
      'WhatsApp enquiry on every product',
    ],
    sample: { brand: 'Your Boutique', headline: 'New season collection', tiles: ['Kurtas', 'Sarees', 'Dresses'] },
    theme: 'rose',
  },
]

export const processSteps: ProcessStep[] = [
  { title: 'We talk', description: 'You tell me about your business, your customers and what you want the website to do.' },
  { title: 'Plan and quote', description: 'I suggest the pages and features you need and share a clear quote and timeline.' },
  { title: 'Design and build', description: 'I build the site and share progress with you, so you can see it taking shape.' },
  { title: 'Review', description: 'You check everything on your phone and computer, and I make the changes you ask for.' },
  { title: 'Launch and support', description: 'The site goes live, and I stay available for updates and fixes.' },
]

export const about: { paragraphs: string[]; highlights: Highlight[] } = {
  paragraphs: [
    "I build websites and online stores for businesses. If your customers still have to call or message you to find out what you offer, I can give you a site that shows your work, answers the common questions, and makes it easy to get in touch or place an order.",
    "I'm a frontend developer who builds web and mobile interfaces for client projects using React.js, React Native, JavaScript, and Tailwind CSS. That means the sites I build for you get the same care as professional products: responsive, user-friendly, and consistent across browsers and devices.",
    'I also built Phoolo ki ghati on my own, from the first idea to a live online store with payments, customer accounts and an admin panel. Owning a project end to end taught me to think about the whole business, not just the screen in front of me.',
    'I keep things simple: plain language instead of jargon, regular updates while your site is being built, and clean, well-organised code so the site stays easy to change later.',
  ],
  // Leave `value` as '' unless you want to show an accurate figure (e.g. '2+').
  highlights: [
    {
      label: 'Real-world projects',
      description: 'Contributing to live client products as part of a development team.',
      value: '',
    },
    {
      label: 'Production experience',
      description: 'Shipping features and fixing issues in codebases that are already in use.',
      value: '',
    },
    {
      label: 'Web & mobile',
      description: 'React.js for the web and React Native for cross-platform mobile apps.',
      value: '',
    },
    {
      label: 'Independent builder',
      description: 'Designed, built, and deployed Phoolo ki ghati on my own.',
      value: '',
    },
  ],
}

// Technology chips on the "Frontend Focused" card. Only list what you actually use.
export const frontendFocus = ['React', 'JavaScript', 'HTML', 'CSS']

export const projects: Project[] = [
  {
    id: 'phoolo-ki-ghati',
    title: 'Phoolo ki ghati',
    type: 'Independent Project',
    status: 'Live',
    description:
      'A full-stack e-commerce store for plants, seeds, grow bags and gardening tools that I built on my own — a customer storefront with online payments, plus an admin dashboard the owner uses to run the business.',
    role: 'Developer / Creator (solo, full-stack)',
    technologies: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'Nunjucks',
      'JavaScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'Razorpay',
      'Fast2SMS',
      'Render',
    ],
    features: [
      'Product discovery with search, filters and pagination over a 278-product catalogue',
      'Category browsing with stock status (in stock, out of stock, low stock)',
      'Cart, checkout, COD and Razorpay online payments',
      'Passwordless OTP login by mobile number, plus email/password accounts',
      'Customer accounts with order history, order cancellation and address updates',
      'Admin dashboard for orders, customer messages, quote requests and inventory',
      'Reviews, and a quote request form for bulk buyers',
      'Responsive UI across mobile, tablet and desktop',
    ],
    contributions: [
      'Planned, designed, built and deployed the whole project on my own.',
      'Designed the PostgreSQL schema and built the Express backend — about 50 routes across the storefront, account and admin areas.',
      'Designed and built the storefront and admin UI, including a split-screen login and a fully responsive layout.',
      'Integrated Razorpay with server-side HMAC signature verification, and Fast2SMS for OTP delivery.',
      'Built admin tools for CSV product import/export, bulk image upload, stock editing and order status management.',
      'Deployed the app and the database on Render.',
    ],
    // Add more screenshots to /public/projects and list them here.
    images: [
      {
        src: '/projects/phoolo-home.png',
        alt: 'Phoolo ki ghati home page with category cards for garden plants, seeds, grow bags and gardening tools',
      },
    ],
    liveUrl: 'https://apna-bagicha.onrender.com/',
    githubUrl: '', // hidden while empty; paste the repo URL to show a GitHub button
    featured: true,
    caseStudy: {
      problem:
        "Small plant and gardening sellers often depend on WhatsApp and phone calls to take orders. Customers can't browse a catalogue or see what's in stock, and the seller has to track orders by hand. This project gives one such business a proper online store and a back office to run it.",
      solution:
        'A storefront where customers browse products by category, search, check stock, and order with COD or online payment. Behind it, an admin dashboard lets the owner manage orders, inventory, messages and quote requests without touching code or the database.',
      role: 'I built it solo, covering UI design, frontend, backend, database design, payment and SMS integration, and deployment.',
      development: [
        { title: 'Backend:', text: 'Node.js, Express, express-session, bcrypt-hashed passwords, and Multer for uploads.' },
        { title: 'Database:', text: 'PostgreSQL, with tables created and seeded automatically on startup.' },
        {
          title: 'Frontend:',
          text: "server-rendered Nunjucks pages with API-driven client rendering, and a React 18 + Vite + Tailwind client that I'm migrating to incrementally.",
        },
        { title: 'Integrations:', text: 'Razorpay for payments and Fast2SMS for OTP.' },
        { title: 'Deployment:', text: 'Render web service plus managed Postgres.' },
      ],
      features: [
        'Search, filters and pagination across 189 seeds, 44 grow bags, 37 tools and 8 garden plants',
        'Live stock status on every product',
        'COD and Razorpay checkout',
        'OTP and email/password login',
        'Customer order history and address management',
        'Admin dashboard with CSV import/export and bulk image upload',
      ],
      challenges: [
        {
          title: 'Changing databases mid-project.',
          text: 'I started on Flask + SQLite and moved to Node + PostgreSQL. I made the schema setup idempotent (CREATE TABLE IF NOT EXISTS, ADD COLUMN IF NOT EXISTS) and used flags for one-time data migrations, so any fresh database builds itself on first boot.',
        },
        {
          title: 'Moving to API-driven pages.',
          text: "I refactored the reviews, checkout, account and admin pages from server-rendered HTML to client-rendered pages backed by JSON APIs. I'm now porting pages to React one at a time, with Vite proxying to Express so the site keeps working while the migration is in progress.",
        },
        {
          title: 'Managing a large catalogue.',
          text: "Editing 278 products by hand wasn't practical, so I built CSV import/export with a proper quoted-field parser, admin search, filters and pagination, and per-product stock tracking.",
        },
        {
          title: 'Production deployment.',
          text: "I debugged a Render outage caused by conflicting DATABASE_URL and DB_HOST settings, and found that Render's free-tier database had expired. This taught me how internal hostnames and regions work on Render.",
        },
      ],
      outcome:
        'A working, deployed store with a real catalogue, customer accounts, two payment options and an admin panel the owner can use daily.',
      learning: [
        'Designing for incremental migration (SQLite to Postgres, templates to API to React) keeps a project shipping while it changes.',
        'Payment and auth flows need server-side verification, so I check the Razorpay signature on the server and never trust the client.',
        'Deployment problems are mostly configuration and infrastructure issues, so I now read the logs and check the env vars first.',
      ],
    },
  },
]
