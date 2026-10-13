import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

// The build writes each page's title and share tags into the HTML for crawlers that don't run
// JavaScript. Here <Seo> manages them, so remove the static copies to avoid duplicates.
document.head.querySelectorAll('[data-static-seo]').forEach((tag) => tag.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
