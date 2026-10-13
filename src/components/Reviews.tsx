import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import { pageHref } from '../hooks/useRoute'
import { useReviews } from '../hooks/useReviews'
import { initials } from '../lib/content'
import { postReview, reviewLimits, reviewsEnabled, type Review } from '../lib/reviewsApi'
import { ButtonLink } from './ui/Button'
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, CloseIcon, StarIcon } from './ui/Icons'
import { Reveal } from './ui/Reveal'
import { PageHeader, pagePadding, Section, SubSection } from './ui/Section'
import { canSend, fieldClass, SendButtons, sendMessage } from './ui/SendForm'

const ratings = [1, 2, 3, 4, 5]
const ratingWords = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']

/** How long the thank-you panel stays before the empty form comes back. */
const THANK_YOU_MS = 15_000

/** Reviews shown on the Reviews page before the "View all reviews" button. */
const PREVIEW_COUNT = 4

/** Reviews per page in the "All reviews" tab. */
const PAGE_SIZE = 6

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

/** Cuts text off after `max` words, so typing or pasting can't go past the limit. */
function limitWords(text: string, max: number): string {
  const words = text.match(/\s*\S+/g) ?? []
  return words.length <= max ? text : words.slice(0, max).join('')
}

function Stars({ rating, className = 'text-lg' }: { rating: number; className?: string }) {
  return (
    <p className={`flex gap-0.5 text-amber-500 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {ratings.map((n) => (
        <StarIcon key={n} filled={n <= rating} className={n <= rating ? undefined : 'text-fg-subtle/40'} />
      ))}
    </p>
  )
}

/** Animates a number towards `target`, for the average rating. Jumps straight there with reduced motion. */
function useCountUp(target: number, duration = 800): number {
  const [value, setValue] = useState(0)
  const current = useRef(0)

  useEffect(() => {
    const show = (next: number) => {
      current.current = next
      setValue(next)
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show(target)
      return
    }
    // Start from the number on screen, so a new review nudges the average instead of restarting from 0.
    const from = current.current
    const start = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      const progress = Math.min(1, (now - start) / duration)
      show(from + (target - from) * (1 - (1 - progress) ** 3))
      if (progress < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

/** Average rating and how many reviews gave each number of stars. Everything is worked out from the real reviews. */
function Summary({ reviews }: { reviews: Review[] }) {
  const count = reviews.length
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / count
  const shown = useCountUp(average)
  const [grown, setGrown] = useState(false)

  // Bars start empty and grow to their width a moment after they appear. A timer is used
  // (not an animation frame) so they still fill in a background tab or a paused page.
  useEffect(() => {
    const timer = setTimeout(() => setGrown(true), 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="card relative grid gap-6 overflow-hidden p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 size-64 rounded-full bg-amber-400/15 blur-3xl"
      />
      <div className="relative text-center sm:text-left">
        <p className="text-6xl leading-none font-semibold tracking-tight tabular-nums">{shown.toFixed(1)}</p>
        <div className="mt-3 flex justify-center sm:justify-start">
          <Stars rating={Math.round(average)} className="text-xl" />
        </div>
        <p className="mt-2 text-sm text-fg-muted">
          Based on {count} {count === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      <ul className="relative space-y-2.5">
        {[5, 4, 3, 2, 1].map((stars, i) => {
          const matching = reviews.filter((review) => review.rating === stars).length
          return (
            <li key={stars} className="flex items-center gap-3 text-sm">
              <span className="flex w-9 shrink-0 items-center gap-1 text-fg-muted tabular-nums">
                {stars} <StarIcon filled className="text-amber-500" />
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <span
                  className="block h-full rounded-full bg-amber-500 transition-[width] duration-700 ease-out"
                  style={{ width: grown ? `${(matching / count) * 100}%` : '0%', transitionDelay: `${i * 90}ms` }}
                />
              </span>
              <span className="w-6 shrink-0 text-right text-fg-muted tabular-nums">{matching}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ReviewCard({ review, fresh = false }: { review: Review; fresh?: boolean }) {
  const date = new Date(review.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  return (
    <figure
      className={`card group relative flex h-full flex-col overflow-hidden p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_45px_-30px_rgb(0_0_0/0.4)] ${
        fresh ? 'animate-review-in border-accent/60 ring-2 ring-accent/25' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 right-4 font-serif text-[7rem] leading-none text-accent/10 transition-colors duration-300 select-none group-hover:text-accent/20"
      >
        ”
      </span>
      <Stars rating={review.rating} />
      <blockquote className="relative mt-4 leading-relaxed whitespace-pre-line text-fg-muted wrap-anywhere">
        {review.review}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent"
        >
          {initials(review.name)}
        </span>
        <span className="min-w-0 text-sm">
          <span className="block truncate font-semibold">{review.name}</span>
          <span className="block truncate text-xs text-fg-subtle">
            {review.business ? `${review.business} · ${date}` : date}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

/** Grey placeholder cards shown while reviews load. */
function LoadingCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
      {[0, 1, 2, 3].map((n) => (
        <li key={n} className="card animate-pulse p-6">
          <div className="h-4 w-28 rounded-full bg-muted" />
          <div className="mt-5 space-y-2.5">
            <div className="h-3 rounded-full bg-muted" />
            <div className="h-3 rounded-full bg-muted" />
            <div className="h-3 w-2/3 rounded-full bg-muted" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="size-10 rounded-full bg-muted" />
            <div className="h-3 w-32 rounded-full bg-muted" />
          </div>
        </li>
      ))}
    </ul>
  )
}

function EmptyState() {
  return (
    <div className="card relative overflow-hidden px-6 py-12 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto size-64 rounded-full bg-amber-400/15 blur-3xl"
      />
      <span className="animate-float relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-amber-500/10 text-3xl text-amber-500">
        <StarIcon filled />
      </span>
      <h2 className="relative mt-5 text-xl font-semibold tracking-tight">No reviews yet</h2>
      <p className="relative mx-auto mt-2 max-w-sm leading-relaxed text-fg-muted">
        If we have worked together, yours can be the first. It takes about a minute.
      </p>
    </div>
  )
}

// Confetti pieces for the thank-you panel: where each one flies to, and its colour.
const confetti = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2
  const distance = 70 + (i % 4) * 22
  return {
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance) - 20,
    colour: ['bg-accent', 'bg-amber-400', 'bg-emerald-400', 'bg-rose-400'][i % 4],
    delay: (i % 5) * 35,
  }
})

/** Shown in place of the form after a review is posted. It keeps the form's height so the page doesn't jump. */
function ThankYou({ name, rating, minHeight }: { name: string; rating: number; minHeight: number }) {
  const firstName = name.trim().split(/\s+/)[0]

  return (
    <div
      role="status"
      style={{ minHeight: minHeight || undefined }}
      className="card animate-fade-in relative flex flex-col items-center justify-center overflow-hidden p-6 text-center sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto size-72 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative flex size-20 items-center justify-center">
        <span aria-hidden="true" className="animate-ring absolute inset-0 rounded-full bg-accent/40" />
        <span aria-hidden="true">
          {confetti.map((piece, i) => (
            <span
              key={i}
              className={`animate-confetti absolute top-1/2 left-1/2 size-2 rounded-[2px] ${piece.colour}`}
              style={{ '--x': `${piece.x}px`, '--y': `${piece.y}px`, animationDelay: `${piece.delay}ms` } as CSSProperties}
            />
          ))}
        </span>
        <span className="animate-pop relative flex size-20 items-center justify-center rounded-full bg-accent text-4xl text-accent-fg shadow-[0_18px_40px_-14px_color-mix(in_srgb,var(--accent)_80%,transparent)]">
          <CheckIcon />
        </span>
      </div>

      <h2
        className="animate-rise relative mt-7 text-2xl font-semibold tracking-tight text-balance"
        style={{ animationDelay: '200ms' }}
      >
        Thank you{firstName ? `, ${firstName}` : ''}!
      </h2>

      <p
        className="relative mt-4 flex gap-1 text-3xl text-amber-500"
        role="img"
        aria-label={`You gave ${rating} out of 5 stars`}
      >
        {ratings.map((n) => (
          <StarIcon
            key={n}
            filled={n <= rating}
            className={`animate-pop ${n <= rating ? '' : 'text-fg-subtle/40'}`}
            style={{ animationDelay: `${350 + n * 90}ms` }}
          />
        ))}
      </p>

      <p
        className="animate-rise relative mt-5 max-w-xs leading-relaxed text-fg-muted"
        style={{ animationDelay: '550ms' }}
      >
        I really appreciate you taking the time to share this. It means a lot, and it helps other business owners
        choose with confidence.
      </p>
      <p className="animate-rise relative mt-5 text-sm font-medium text-accent" style={{ animationDelay: '750ms' }}>
        With thanks, {profile.name.split(' ')[0]}
      </p>
    </div>
  )
}

/**
 * With the database set up, a review is saved and shown straight away.
 * Without it, the form opens WhatsApp or email with the review written out.
 */
function ReviewForm({ onPosted }: { onPosted: (review: Review) => void }) {
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [text, setText] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
  const form = useRef<HTMLFormElement>(null)
  const [formHeight, setFormHeight] = useState(0)
  const lit = hovered || rating
  const words = countWords(text)

  // After a review is posted, show the thank-you panel for a while, then bring back a clean form.
  useEffect(() => {
    if (state !== 'done') return
    const timer = setTimeout(() => {
      setName('')
      setBusiness('')
      setRating(0)
      setHovered(0)
      setText('')
      setState('idle')
    }, THANK_YOU_MS)
    return () => clearTimeout(timer)
  }, [state])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const who = `${name.trim()}${business.trim() ? ` (${business.trim()})` : ''}`

    if (!reviewsEnabled) {
      const message = [
        `Hi ${profile.name.split(' ')[0]}, here is my review of your work.`,
        [`Name: ${who}`, `Rating: ${rating}/5`].join('\n'),
        text.trim(),
      ].join('\n\n')
      sendMessage(event, `Review from ${who}`, message)
      return
    }

    event.preventDefault()
    // Bots fill in every field, including this hidden one; people never see it.
    if (new FormData(event.currentTarget).get('website')) return

    const review = { name: name.trim(), business: business.trim() || null, rating, review: text.trim() }
    setState('sending')
    try {
      await postReview(review)
      onPosted({ ...review, id: -Date.now(), created_at: new Date().toISOString() })
      setFormHeight(form.current?.offsetHeight ?? 0) // the thank-you panel keeps the form's size
      setState('done')
    } catch {
      setState('failed')
    }
  }

  if (state === 'done') {
    return <ThankYou name={name} rating={rating} minHeight={formHeight} />
  }

  return (
    <form
      ref={form}
      onSubmit={onSubmit}
      aria-labelledby="review-form-title"
      className="card animate-fade-in p-6 sm:p-7"
    >
      <h2 id="review-form-title" className="text-xl font-semibold tracking-tight">
        Leave a review
      </h2>
      <p className="mt-1.5 text-sm text-fg-muted">Worked with me? Tell others how it went.</p>

      <div className="mt-4 space-y-3.5">
        <fieldset>
          <legend className="text-sm font-medium">Your rating</legend>
          <div className="mt-1.5 flex items-center gap-3">
            <div className="flex gap-1 text-[2rem]" onMouseLeave={() => setHovered(0)}>
              {ratings.map((n) => (
                <label
                  key={n}
                  className="cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95"
                  onMouseEnter={() => setHovered(n)}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={n}
                    required
                    checked={rating === n}
                    onChange={() => setRating(n)}
                    className="peer sr-only"
                  />
                  {/* The key changes when a rating is picked, which replays the pop on the chosen stars. */}
                  <StarIcon
                    key={n <= rating ? `on-${rating}` : 'off'}
                    filled={n <= lit}
                    className={`rounded-md transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                      n <= lit ? 'text-amber-500' : 'text-fg-subtle/50'
                    } ${n <= rating ? 'animate-pop' : ''}`}
                    style={n <= rating ? { animationDelay: `${(n - 1) * 45}ms` } : undefined}
                  />
                  <span className="sr-only">
                    {n} {n === 1 ? 'star' : 'stars'}: {ratingWords[n]}
                  </span>
                </label>
              ))}
            </div>
            <span aria-hidden="true" className="text-sm font-medium text-fg-muted">
              {ratingWords[lit]}
            </span>
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            Your name
            <input
              className={fieldClass}
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={reviewLimits.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium">
            Business <span className="font-normal text-fg-subtle">(optional)</span>
            <input
              className={fieldClass}
              type="text"
              name="business"
              autoComplete="organization"
              maxLength={reviewLimits.business}
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          <span className="flex items-baseline justify-between gap-3">
            <span>
              Your review <span className="font-normal text-fg-subtle">(up to {reviewLimits.words} words)</span>
            </span>
            <span
              className={`text-xs font-normal tabular-nums ${words >= reviewLimits.words ? 'font-medium text-amber-600 dark:text-amber-400' : 'text-fg-subtle'}`}
              aria-live="polite"
            >
              {words}/{reviewLimits.words} words
            </span>
          </span>
          <textarea
            className={`${fieldClass} min-h-24 resize-y`}
            name="review"
            required
            maxLength={reviewLimits.review}
            placeholder="What did I build for you, and how was working together?"
            value={text}
            onChange={(e) => setText(limitWords(e.target.value, reviewLimits.words))}
          />
        </label>
        {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>

      {reviewsEnabled ? (
        <>
          <button
            type="submit"
            disabled={state === 'sending'}
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-fg shadow-sm transition-[background-color,transform] hover:bg-accent/90 active:scale-[0.98] disabled:opacity-60"
          >
            {state === 'sending' && (
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-accent-fg/40 border-t-accent-fg"
              />
            )}
            {state === 'sending' ? 'Posting…' : 'Post review'}
          </button>
          {state === 'failed' && (
            <p role="alert" className="animate-fade-in mt-3 text-sm leading-relaxed text-red-600 dark:text-red-400">
              Your review could not be posted. Please check your connection and try again.
            </p>
          )}
          <p className="mt-3 text-xs leading-relaxed text-fg-subtle">Your review will be shown publicly on this site.</p>
        </>
      ) : (
        <SendButtons note="This opens WhatsApp or your email app with your review ready to send." />
      )}
    </form>
  )
}

const intro = 'If we have worked together, I would be glad to hear how it went.'

/** What to show in place of the list while reviews load, fail to load, or there are none. */
function ReviewStates({ status, count }: { status: string; count: number }) {
  if (status === 'loading') return <LoadingCards />
  if (status === 'error') {
    return (
      <p className="card p-6 leading-relaxed text-fg-muted">
        Reviews could not be loaded right now. Please try again later.
      </p>
    )
  }
  if (count === 0) {
    return (
      <Reveal>
        <EmptyState />
      </Reveal>
    )
  }
  return null
}

function ReviewGrid({ reviews, freshId, columns }: { reviews: Review[]; freshId: number | null; columns: string }) {
  return (
    <ul className={`grid gap-4 ${columns}`}>
      {reviews.map((review, i) => (
        <li key={review.id}>
          {review.id === freshId ? (
            <ReviewCard review={review} fresh />
          ) : (
            <Reveal delay={Math.min(i, 5) * 70} className="h-full">
              <ReviewCard review={review} />
            </Reveal>
          )}
        </li>
      ))}
    </ul>
  )
}

/** The Reviews page (/reviews): rating summary, the newest reviews, and the form to add one. */
export function ReviewsPage() {
  const { reviews, status, add } = useReviews()
  const [freshId, setFreshId] = useState<number | null>(null)
  const newest = reviews.slice(0, PREVIEW_COUNT)

  const onPosted = (review: Review) => {
    add(review)
    setFreshId(review.id)
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className={pagePadding}>
      {/* Two columns from the very top, so the form sits beside the heading and fits on screen.
          On phones the heading and reviews come first, then the form. */}
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_25rem] lg:items-start lg:gap-10">
        <div className="space-y-6">
          <PageHeader id="reviews" eyebrow="Reviews" title="What clients say" description={intro} />
          <div className="space-y-6 pt-2" aria-live="polite" aria-busy={status === 'loading'}>
            <ReviewStates status={status} count={reviews.length} />
            {reviews.length > 0 && (
              <>
                <Reveal>
                  <Summary reviews={reviews} />
                </Reveal>
                <ReviewGrid reviews={newest} freshId={freshId} columns="sm:grid-cols-2" />
                <Reveal>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-fg-muted">
                      Showing {newest.length} of {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </p>
                    <ButtonLink href={pageHref('all-reviews')} variant="secondary" newTab>
                      View all reviews
                      <ArrowUpRightIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </ButtonLink>
                  </div>
                </Reveal>
              </>
            )}
          </div>
        </div>
        <div className="lg:sticky lg:top-20">
          {(reviewsEnabled || canSend) && (
            <Reveal delay={120}>
              <ReviewForm onPosted={onPosted} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

/** Page numbers to show: all of them when there are few, otherwise the ends and the ones around the current page. */
function pageNumbers(current: number, count: number): (number | '…')[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1)
  const near = [1, count, current - 1, current, current + 1].filter((n) => n >= 1 && n <= count)
  const sorted = [...new Set(near)].sort((a, b) => a - b)
  return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1]! > 1 ? ['…' as const, n] : [n]))
}

const pageButton =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3.5 text-sm font-medium transition-colors'
const pageButtonIdle = `${pageButton} border-border bg-surface hover:border-fg/25 hover:bg-muted disabled:pointer-events-none disabled:opacity-40`
const pageButtonCurrent = `${pageButton} border-accent bg-accent text-accent-fg`

function Pagination({ page, count, onChange }: { page: number; count: number; onChange: (page: number) => void }) {
  if (count <= 1) return null
  return (
    <nav aria-label="Review pages" className="flex flex-wrap items-center justify-center gap-2">
      <button type="button" className={pageButtonIdle} disabled={page === 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      {pageNumbers(page, count).map((n, i) =>
        n === '…' ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-fg-subtle">
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            aria-label={`Page ${n}`}
            aria-current={n === page ? 'page' : undefined}
            className={n === page ? pageButtonCurrent : pageButtonIdle}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ),
      )}
      <button type="button" className={pageButtonIdle} disabled={page === count} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </nav>
  )
}

/** The "All reviews" page (/all-reviews), opened in a new tab: every review in pages, and a button to add one. */
export function AllReviewsPage() {
  const { reviews, status, add } = useReviews()
  const [requestedPage, setRequestedPage] = useState(1)
  const [writing, setWriting] = useState(false)
  const [freshId, setFreshId] = useState<number | null>(null)
  const list = useRef<HTMLDivElement>(null)

  const pageCount = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE))
  const page = Math.min(requestedPage, pageCount)
  const first = (page - 1) * PAGE_SIZE
  const visible = reviews.slice(first, first + PAGE_SIZE)
  const canWrite = reviewsEnabled || canSend

  const goTo = (next: number) => {
    setRequestedPage(next)
    list.current?.scrollIntoView({ block: 'start' })
  }

  const onPosted = (review: Review) => {
    add(review)
    setFreshId(review.id)
    setRequestedPage(1) // the new review is on the first page
  }

  return (
    <Section id="all-reviews" eyebrow="Reviews" title="All reviews" description="Every review, newest first.">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={pageHref('reviews')}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowRightIcon className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
          Back to Reviews
        </a>
        {canWrite && (
          <button
            type="button"
            onClick={() => setWriting((open) => !open)}
            aria-expanded={writing}
            aria-controls="add-review"
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] ${
              writing
                ? 'border border-border bg-surface hover:border-fg/25 hover:bg-muted'
                : 'bg-accent text-accent-fg shadow-sm shadow-accent/20 hover:bg-accent/90'
            }`}
          >
            {writing ? <CloseIcon /> : <StarIcon filled />}
            {writing ? 'Close' : 'Add a review'}
          </button>
        )}
      </div>

      <div className={`grid gap-8 lg:gap-10 ${writing ? 'lg:grid-cols-[1fr_25rem] lg:items-start' : ''}`}>
        {writing && (
          <div id="add-review" className="animate-fade-in lg:sticky lg:top-24 lg:order-2">
            <ReviewForm onPosted={onPosted} />
          </div>
        )}

        <div className="space-y-6" aria-live="polite" aria-busy={status === 'loading'}>
          <ReviewStates status={status} count={reviews.length} />
          {reviews.length > 0 && (
            <>
              <Reveal>
                <Summary reviews={reviews} />
              </Reveal>
              <div ref={list} className="scroll-mt-24 space-y-4">
                <p className="text-sm text-fg-muted">
                  Showing {first + 1}–{first + visible.length} of {reviews.length}{' '}
                  {reviews.length === 1 ? 'review' : 'reviews'}
                </p>
                {/* The key restarts the fade-in each time the page number changes. */}
                <ReviewGrid
                  key={page}
                  reviews={visible}
                  freshId={freshId}
                  columns={writing ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}
                />
              </div>
              <Pagination page={page} count={pageCount} onChange={goTo} />
            </>
          )}
        </div>
      </div>
    </Section>
  )
}

/** The Reviews section on Home: the three newest reviews and a link to the Reviews page. */
export function ReviewsPreview() {
  const { reviews } = useReviews()
  const latest = reviews.slice(0, 3)

  return (
    <SubSection id="reviews" title="Reviews" text={latest.length > 0 ? 'What people I have worked with say.' : intro}>
      {latest.length > 0 && (
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {latest.map((review, i) => (
            <li key={review.id}>
              <Reveal delay={i * 70} className="h-full">
                <ReviewCard review={review} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
      <Reveal>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={pageHref('reviews')} variant={latest.length > 0 ? 'secondary' : 'accent'}>
            <StarIcon filled />
            Leave a review
          </ButtonLink>
          {reviews.length > latest.length && (
            <ButtonLink href={pageHref('reviews')} variant="ghost">
              Read all {reviews.length} reviews
              <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </SubSection>
  )
}
