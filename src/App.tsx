import { useEffect, useRef, type ReactNode } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/projects/Projects'
import { Services } from './components/Services'
import { WhatIBring } from './components/WhatIBring'
import { navItems, profile } from './data/portfolio'
import { useRoute } from './hooks/useRoute'

const pages: Record<string, ReactNode> = {
  home: <Hero />,
  services: <Services />,
  about: <About />,
  projects: <Projects />,
  contact: <Contact />,
}

export default function App() {
  const page = useRoute()
  const baseTitle = useRef(document.title)
  const firstRender = useRef(true)

  useEffect(() => {
    const label = navItems.find((item) => item.id === page)?.label
    document.title = page === 'home' || !label ? baseTitle.current : `${label} | ${profile.name}`

    // Move keyboard/screen-reader focus to the new page (not on first load).
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [page])

  return (
    <>
      <Navbar page={page} />
      <main id="main" tabIndex={-1} className="min-h-[75vh] pb-20 outline-none">
        <div key={page}>
          {pages[page]}
          {/* Full version on Home; other pages show just the heading and call to action.
              Contact and Services have their own call to action, so skip the duplicate row there. */}
          <WhatIBring showCards={page === 'home'} showCta={page !== 'contact' && page !== 'services'} />
        </div>
      </main>
      <Footer />
    </>
  )
}
