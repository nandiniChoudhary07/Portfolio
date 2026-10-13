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
 *  • Images live in /public/images and are referenced here with a leading slash,
 *    e.g. '/images/projects/phoolo-desktop.png'.
 *  • Only write what is true. Remove any bullet that doesn't apply to you.
 */
import type {
  Deliverable,
  Faq,
  NavItem,
  PageMeta,
  PricingPackage,
  ProcessStep,
  Profile,
  Project,
  Service,
  ServiceExample,
  SocialLinks,
} from '../types.ts'

// Paste your Instagram profile link here, e.g. 'https://www.instagram.com/yourname'.
// The Instagram links stay hidden while this is empty.
export const INSTAGRAM_URL = ''

// Prices are hidden for now; the package cards still show, without amounts.
// Set this to true to show the prices again: on the package cards, the service cards,
// the notes under the packages, the budget field on Contact, the FAQ and search descriptions.
export const SHOW_PRICES: boolean = false

export const profile: Profile = {
  name: 'Nandini Choudhary',
  role: 'Freelance Web Developer',
  tagline: 'Websites for local businesses',
  heroTitle: 'Websites that help your business grow.',
  headline:
    'I build modern, mobile-friendly websites and online stores for local businesses, including bakeries, clothing boutiques, and small shops. Help your customers discover your business, explore your products, and contact you easily.',
  trustPoints: ['Ready in 2–3 weeks', 'Mobile-friendly', 'Support after launch'],
  badge: 'Available for freelance projects',
  location: 'Muzaffarnagar, Uttar Pradesh',
  serviceArea: 'Working with clients across India',
  replyTime: 'I usually reply within a few hours, Monday to Saturday.',
  // Add your photo as /public/images/nandini.jpg. Your initials show until the file exists.
  photo: '/images/nandini.jpg',
  siteUrl: 'https://nandini-choudhary-portfolio.onrender.com',
  // Social preview image (1200×630) in /public. Edit public/og-image.svg, then re-export the PNG.
  ogImage: '/og-image.png',
}

export const social: SocialLinks = {
  email: 'nandinipanwar770@gmail.com',
  phone: '+91 74170 02360',
  whatsapp: '917417002360',
  whatsappMessage: 'Hi Nandini, I would like to discuss a website for my business.',
  // Hidden while empty. Paste the full URL (https://...) to show the link everywhere.
  linkedin: '',
  github: '',
  instagram: INSTAGRAM_URL,
}

// What Google and link previews (WhatsApp, Instagram) show for each page.
// Keep titles under about 60 characters and descriptions under about 155.
export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: 'Nandini Choudhary | Website Developer in Muzaffarnagar',
    description:
      'Mobile-friendly websites and online stores for bakeries, boutiques, clinics and shops in Muzaffarnagar and across India.' +
      (SHOW_PRICES ? ' Packages start at ₹4,999.' : ''),
  },
  services: {
    title: SHOW_PRICES
      ? 'Website Packages & Pricing for Small Businesses | Nandini Choudhary'
      : 'Website Packages for Small Businesses | Nandini Choudhary',
    description: SHOW_PRICES
      ? 'Business websites from ₹4,999 and online stores from ₹24,999. See what each package includes, delivery times and answers to common questions.'
      : 'Website packages for small businesses: business websites, online stores, redesigns and maintenance. See what each includes and how long it takes.',
  },
  projects: {
    title: 'Website Projects & Concepts | Nandini Choudhary',
    description:
      'A live online plant store with payments and an admin dashboard, plus website concepts for a bakery and a clothing boutique.',
  },
  about: {
    title: 'About Nandini Choudhary | Web Developer in Muzaffarnagar',
    description:
      'Nandini Choudhary is a web developer in Muzaffarnagar, Uttar Pradesh, building websites and online stores for local businesses.',
  },
  reviews: {
    title: 'Reviews | Nandini Choudhary, Website Developer',
    description:
      'Reviews of websites and online stores built by Nandini Choudhary. Worked with her? Leave a review of your own.',
  },
  'all-reviews': {
    title: 'All Reviews | Nandini Choudhary, Website Developer',
    description: 'Every review of websites and online stores built by Nandini Choudhary, newest first.',
  },
  contact: {
    title: 'Contact Nandini Choudhary | Get a Website Quote',
    description:
      'Message Nandini on WhatsApp, call or email for a quote on your business website. Replies within a few hours, Monday to Saturday.',
  },
}

// The "Who I build for" row on Home.
export const audiences = ['Bakeries', 'Boutiques', 'Clinics', 'Coaching institutes', 'Shops']

// The "What happens next" card on the Contact page.
export const contactSteps: ProcessStep[] = [
  { title: 'You send a message', description: 'On WhatsApp, by email or with the form. A few lines is enough.' },
  { title: 'I reply with a few questions', description: 'Usually within a few hours, Monday to Saturday.' },
  { title: 'You get a plan and a quote', description: 'What I will build, how long it takes and what it costs, before any work starts.' },
]

// Choices in the Contact page enquiry form. Both are included in the WhatsApp/email message.
export const enquiryOptions = {
  needs: ['Business website', 'Online store', 'Redesign', 'Updates', 'Not sure yet'],
  budgets: ['Under ₹5,000', '₹5,000–10,000', '₹10,000–25,000', '₹25,000+'],
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'all-reviews', label: 'All reviews', hidden: true }, // opened from the Reviews page
  { id: 'contact', label: 'Contact' },
]

// What you offer clients. Keep it true: only list work you are ready to take on.
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
    price: 'Starting from ₹4,999',
    delivery: '1–3 weeks',
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
    price: 'Starting from ₹24,999',
    delivery: '6–8 weeks',
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
    price: 'Starting from ₹6,999',
    delivery: '2–3 weeks',
  },
  {
    title: 'Updates & Maintenance',
    description: 'Ongoing help after launch, so your website stays correct and keeps working.',
    includes: ['Content and photo updates', 'New pages and sections', 'Bug fixes', 'Small improvements over time'],
    icon: 'support',
    price: '₹999/month',
    delivery: 'Ongoing, month to month',
  },
]

// Packages shown on the Services page (#pricing) and previewed on Home.
// Change a price here and it updates everywhere, including the WhatsApp message.
export const packages: PricingPackage[] = [
  {
    name: 'Starter',
    price: '₹4,999',
    summary: 'A simple one-page site that gets your business online.',
    features: [
      '1-page site',
      'WhatsApp + Call buttons',
      'Google Maps + timings',
      'Basic SEO',
      '15 days of free updates',
    ],
    delivery: 'Ready in 7–10 days',
  },
  {
    name: 'Business',
    price: '₹9,999',
    summary: 'A complete website for an established shop or service.',
    features: ['Up to 5 pages', 'Everything in Starter', 'Photo gallery', 'Enquiry form', '1 month of free updates'],
    delivery: 'Ready in 2–3 weeks',
    popular: true,
  },
  {
    name: 'Online Store',
    price: '₹24,999',
    summary: 'Sell your products online and manage orders yourself.',
    features: [
      'Product catalogue',
      'Cart',
      'Razorpay + cash on delivery',
      'Admin panel for orders and stock',
      '2 months of free updates',
    ],
    delivery: 'Ready in 6–8 weeks',
  },
]

export const pricingNotes = {
  addOns: ['Domain setup', 'Google Business Profile setup', 'Logo', 'Extra pages'],
  maintenance: 'A monthly plan for content updates, small changes and fixes.',
  maintenancePriced: '₹999/month for content updates, small changes and fixes.',
  hosting: 'Domain and hosting are paid separately. I help you set them up, and the site is fully yours.',
  hostingPriced:
    'Domain and hosting are paid separately (usually ₹800–1,500 a year). I help you set them up, and the site is fully yours.',
}

export const faqs: Faq[] = [
  {
    question: 'How much does a website cost?',
    answer: 'It depends on what you need. Tell me a little about your business and I’ll send you an exact quote.',
    link: { label: 'Get a quote', page: 'contact' },
    priced: {
      answer: 'Starts at ₹4,999. See the packages, or message me for an exact quote.',
      link: { label: 'See the packages', page: 'services', section: 'pricing' },
    },
  },
  {
    question: 'How long does it take?',
    answer: '1–3 weeks for most business sites, 6–8 weeks for an online store.',
  },
  {
    question: 'Do I need to buy a domain and hosting?',
    answer: 'Yes. They are paid separately each year, and I’ll set it all up for you.',
    priced: { answer: 'Yes, about ₹800–1,500 a year. I’ll set it all up for you.' },
  },
  {
    question: 'Will the website be mine?',
    answer: 'Yes. The domain, content and site belong to you.',
  },
  {
    question: 'Can I update it myself?',
    answer: 'Online stores come with an admin panel. For other sites, I make updates for you.',
  },
  {
    question: 'What happens after launch?',
    answer: 'Free updates for a period after launch, then an optional monthly maintenance plan.',
    priced: { answer: 'Free updates for the period in your package, then an optional ₹999/month plan.' },
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

export const about = {
  intro:
    "I build websites and online stores for businesses. If your customers still have to call or message you to find out what you offer, I can give you a site that shows your work, answers the common questions, and makes it easy to get in touch or place an order.",
  bio: "I'm Nandini, a web developer based in Muzaffarnagar. I've built a full online store on my own and work on live client projects as part of a development team, so your site gets the same care as a professional product.",
  reasons: ['Quick replies on WhatsApp', 'Plain language, no jargon', 'Progress updates while I build', 'Help after launch'],
  tools: ['React', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
}

export const projects: Project[] = [
  {
    id: 'phoolo-ki-ghati',
    name: 'Phoolo ki ghati',
    title: 'Phoolo ki ghati: an online plant store',
    label: 'Live project',
    description:
      'Customers browse 278 plants and gardening products, pay online or by cash on delivery, and log in with an OTP on their phone. The owner manages orders, stock and messages from one dashboard.',
    // Add the files to /public/images/projects. A placeholder shows until each one exists.
    screenshots: {
      desktop: '/images/projects/phoolo-desktop.png',
      phone: '/images/projects/phoolo-phone.png',
    },
    liveUrl: 'https://apna-bagicha.onrender.com/',
    liveLabel: 'View live store',
    featured: true,
    technical: {
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
    },
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
  // Concepts: designs for a type of business, not client work. The page says so.
  // Replace each [PLACEHOLDER] link with the demo URL once it is online.
  {
    id: 'sweet-crumbs-bakery',
    name: 'Sweet Crumbs Bakery',
    title: 'Sweet Crumbs Bakery',
    label: 'Concept',
    description:
      'A bakery website where customers see the menu and the cakes, then order on WhatsApp instead of calling to ask what is available.',
    highlights: ['Menu with photos and prices', 'Cake gallery', 'Order on WhatsApp'],
    screenshots: {
      desktop: '/images/projects/bakery-desktop.png',
      phone: '/images/projects/bakery-phone.png',
    },
    liveUrl: '[BAKERY_DEMO_URL]',
    liveLabel: 'View demo',
  },
  {
    id: 'clothing-boutique',
    name: 'Clothing boutique',
    title: 'Clothing boutique',
    label: 'Concept',
    description:
      'A boutique website that puts the collection online, so customers can ask about a piece before they visit the shop.',
    highlights: ['Collection gallery', 'WhatsApp enquiry on every item'],
    screenshots: {
      desktop: '/images/projects/boutique-desktop.png',
      phone: '/images/projects/boutique-phone.png',
    },
    liveUrl: '[BOUTIQUE_DEMO_URL]',
    liveLabel: 'View demo',
  },
]
