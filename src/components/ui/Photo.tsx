import { useState, type ReactNode } from 'react'
import { asset } from '../../lib/content'

interface PhotoProps {
  /** Path in /public, e.g. '/images/nandini.jpg'. */
  src: string
  alt: string
  /** Shown until the image file exists (or if it fails to load). */
  fallback: ReactNode
  /** Classes for both the image and the placeholder (size, shape, border). */
  className?: string
  /** Extra classes for the placeholder only, e.g. an aspect ratio the real image doesn't need. */
  fallbackClassName?: string
}

/** An image slot that shows a neat placeholder until the real file is added to /public. */
export function Photo({ src, alt, fallback, className = '', fallbackClassName = '' }: PhotoProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-accent-soft font-mono font-semibold text-accent ${className} ${fallbackClassName}`}
      >
        {fallback}
      </span>
    )
  }

  return (
    <img
      src={asset(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
