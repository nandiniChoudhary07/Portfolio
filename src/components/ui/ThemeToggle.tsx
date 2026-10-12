import { useState } from 'react'
import { MoonIcon, SunIcon } from './Icons'

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex size-9 items-center justify-center rounded-full text-lg text-fg-muted transition-colors hover:bg-muted hover:text-fg"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
