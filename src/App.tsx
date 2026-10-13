import { useEffect, useRef, type ReactNode } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Home } from './components/Home'
import { Navbar } from './components/Navbar'
import { Projects } from './components/projects/Projects'
import { AllReviewsPage, ReviewsPage } from './components/Reviews'
import { Seo } from './components/Seo'
import { Services } from './components/Services'
import { WhatsAppButton } from './components/WhatsAppButton'
import { useRoute } from './hooks/useRoute'

const pages: Record<string, ReactNode> = {
  home: <Home />,
  services: <Services />,
  about: <About />,
  projects: <Projects />,
  reviews: <ReviewsPage />,
  'all-reviews': <AllReviewsPage />,
  contact: <Contact />,
}

export default function App() {
  const page = useRoute()
  const firstRender = useRef(true)

  // Move keyboard/screen-reader focus to the new page (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [page])

  return (
    <>
      <Seo page={page} />
      <Navbar page={page} />
      <main id="main" tabIndex={-1} className="min-h-[75vh] outline-none">
        <div key={page}>{pages[page]}</div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
