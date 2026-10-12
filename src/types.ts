export interface Profile {
  name: string
  /** Short role used in the page title and navbar, e.g. "Frontend Developer". */
  role: string
  /** Longer role line shown in the hero and footer. */
  roleLong: string
  /** Big line on the Home page: what you do for a client, in plain words. */
  heroTitle: string
  headline: string
  /** Small pill above the hero heading. Set to '' to hide it. */
  badge: string
  /** Optional. Set to '' to hide. */
  location: string
  /** Optional path to a photo in /public, e.g. '/profile.webp'. Initials are shown when empty. */
  photo: string
  /** Full public URL of the deployed site, e.g. 'https://yourname.vercel.app'. Used for SEO + sitemap. */
  siteUrl: string
  seoDescription: string
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
}

export interface Highlight {
  label: string
  description: string
  /** Optional short value such as "2+". Leave '' unless it is accurate. */
  value?: string
}

interface ProjectImage {
  /** Path in /public, e.g. '/projects/phoolo-home.webp'. */
  src: string
  alt: string
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
  title: string
  /** Short label shown as a badge, e.g. "Independent Project". */
  type: string
  /** e.g. "Live". Leave '' to hide. */
  status?: string
  description: string
  role: string
  technologies: string[]
  features?: string[]
  contributions: string[]
  images: ProjectImage[]
  /** Set to '' to hide the button. */
  liveUrl?: string
  githubUrl?: string
  /** Highlighted on the Home page and linked from the Services page. */
  featured?: boolean
  caseStudy?: CaseStudy
}

export interface Service {
  title: string
  description: string
  includes: string[]
  icon: 'site' | 'store' | 'redesign' | 'support'
  /** Optional: id of a project that proves this service. Its live link is shown on the card. */
  exampleProjectId?: string
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

export interface ProcessStep {
  title: string
  description: string
}

export interface NavItem {
  id: string
  label: string
}
