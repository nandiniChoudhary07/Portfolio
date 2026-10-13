import { useEffect, useRef, useState } from 'react'
import { navItems, profile } from '../data/portfolio'
import { pageHref } from '../hooks/useRoute'
import { useScrolled } from '../hooks/useScrollState'
import { initials } from '../lib/content'
import { CloseIcon, MenuIcon } from './ui/Icons'
import { ThemeToggle } from './ui/ThemeToggle'

export function Navbar({ page }: { page: string }) {
  const scrolled = useScrolled()
  const links = navItems.filter((item) => !item.hidden)
  const active = page === 'all-reviews' ? 'reviews' : page // "All reviews" belongs under Reviews
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        solid ? 'border-border bg-bg/85 shadow-[0_1px_12px_-6px_rgb(0_0_0/0.12)] backdrop-blur-lg' : 'border-transparent'
      }`}
    >
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`container-page flex items-center justify-between gap-4 transition-[height] duration-300 ${
          scrolled ? 'h-14' : 'h-18'
        }`}
      >
        <a
          href={pageHref('home')}
          className="flex items-center gap-2.5 rounded-lg"
          aria-label={`${profile.name} — home`}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-fg font-mono text-xs font-semibold text-bg">
            {initials(profile.name)}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={pageHref(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-full text-xl text-fg transition-colors hover:bg-muted lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="animate-fade-in h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-bg lg:hidden"
        >
          <ul className="container-page flex flex-col py-4">
            {links.map((item, i) => (
              <li key={item.id}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={pageHref(item.id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'page' : undefined}
                  className={`flex items-center justify-between border-b border-border py-4 text-lg font-medium ${
                    active === item.id ? 'text-accent' : 'text-fg'
                  }`}
                >
                  {item.label}
                  <span aria-hidden="true" className="font-mono text-xs text-fg-subtle">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
