export interface Profile {
  name: string
  /** Short role used in the page title and navbar, e.g. "Frontend Developer". */
  role: string
  /** One line on who you build for, shown in the footer and social preview. */
  tagline: string
  /** Big line on the Home page: what you do for a client, in plain words. */
  heroTitle: string
  headline: string
  /** Short reassurances shown under the Home buttons. */
  trustPoints: string[]
  /** Small pill above the hero heading. Set to '' to hide it. */
  badge: string
  /** Optional. Set to '' to hide. */
  location: string
  /** Shown after the location in the footer, e.g. "Working with clients across India". */
  serviceArea: string
  /** Shown on the Contact page, e.g. when you usually reply. Set to '' to hide. */
  replyTime: string
  /** Path to your photo in /public, e.g. '/images/nandini.jpg'. Initials show until the file exists. */
  photo: string
  /** Full public URL of the deployed site, e.g. 'https://yourname.vercel.app'. Used for SEO + sitemap. */
  siteUrl: string
  /** Optional 1200×630 social preview image in /public, e.g. '/og-image.png'. */
  ogImage: string
}

export interface SocialLinks {
  email: string
  /** Shown as written; the call link uses the digits. Set to '' to hide. */
  phone: string
  /** WhatsApp number with country code, digits only (e.g. '919876543210'). Set to '' to hide WhatsApp buttons. */
  whatsapp: string
  /** Message pre-filled when a visitor opens the WhatsApp chat. */
  whatsappMessage: string
  linkedin: string
  github: string
  instagram: string
}

/** A plain bullet, or one with a bold lead-in title. */
export type CaseStudyItem = string | { title: string; text: string }

export interface CaseStudy {
  problem: string
  solution: string
  role: string
  development: CaseStudyItem[]
  features: CaseStudyItem[]
  challenges: CaseStudyItem[]
  outcome: string
  learning: CaseStudyItem[]
}

export interface Project {
  id: string
  /** Short name, used on Home and in links. */
  name: string
  /** Card heading: the name plus what it is, in plain words. */
  title: string
  /** Badge on the card, e.g. "Live project" or "Concept". */
  label: string
  /** What the site does for the business and its customers. */
  description: string
  /** Optional short points shown with ticks. */
  highlights?: string[]
  /** Screenshots in /public. A placeholder shows until each file exists. */
  screenshots: { desktop: string; phone: string }
  /** Set to '' to hide the button. While it holds a [PLACEHOLDER] the button reads "Demo coming soon". */
  liveUrl?: string
  liveLabel: string
  /** The large card: highlighted on Home and linked from the Services page. */
  featured?: boolean
  /** Folded away under "Technical details". */
  technical?: { role: string; technologies: string[]; features: string[]; contributions: string[] }
  caseStudy?: CaseStudy
}

export interface Service {
  title: string
  description: string
  includes: string[]
  icon: 'site' | 'store' | 'redesign' | 'support'
  /** Shown on the card, e.g. "Starting from ₹4,999" or "₹999/month". */
  price: string
  /** Typical delivery time, e.g. "3–10 days". */
  delivery: string
  /** Optional: id of a project that proves this service. Its live link is shown on the card. */
  exampleProjectId?: string
}

export interface PricingPackage {
  name: string
  /** Starting price, e.g. "₹4,999". Shown after the word "from". */
  price: string
  summary: string
  features: string[]
  /** e.g. "Ready in 3–5 days". */
  delivery: string
  /** Highlights the card with a "Most popular" badge. */
  popular?: boolean
}

/** Something every client receives, shown in the "What you get" row. */
export interface Deliverable {
  title: string
  description: string
  icon: 'mobile' | 'gallery' | 'whatsapp' | 'map' | 'form'
}

/** An illustration of what a site for one kind of business would include. Not past client work. */
export interface ServiceExample {
  business: string
  title: string
  description: string
  includes: string[]
  /** Text shown inside the small sample layout. */
  sample: { brand: string; headline: string; tiles: string[] }
  theme: 'warm' | 'rose'
}

export interface Faq {
  question: string
  answer: string
  /** Optional link shown after the answer, e.g. to the contact page. */
  link?: { label: string; page: string; section?: string }
  /** Version of the answer that quotes prices. Used only while SHOW_PRICES is true. */
  priced?: Pick<Faq, 'answer' | 'link'>
}

export interface ProcessStep {
  title: string
  description: string
}

/** Title and description of one page, for search results and link previews. */
export interface PageMeta {
  title: string
  description: string
}

export interface NavItem {
  id: string
  label: string
  /** A real page with its own address that is left out of the menu. */
  hidden?: boolean
}
