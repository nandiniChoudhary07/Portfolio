import { useEffect, useState } from 'react'
import { fetchReviews, reviewsEnabled, type Review } from '../lib/reviewsApi'

type Status = 'off' | 'loading' | 'ready' | 'error'

// One request per visit, shared by the Home section and the Reviews page.
let request: Promise<Review[]> | null = null

/** Loads reviews from the database. `status` is 'off' while the database isn't set up. */
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [status, setStatus] = useState<Status>(reviewsEnabled ? 'loading' : 'off')

  useEffect(() => {
    if (!reviewsEnabled) return
    let active = true
    request ??= fetchReviews()
    request
      .then((list) => {
        if (!active) return
        setReviews(list)
        setStatus('ready')
      })
      .catch(() => {
        request = null // let the next visit to the page try again
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  /** Show a just-posted review straight away, and keep it for the rest of the visit. */
  const add = (review: Review) => {
    setReviews((list) => {
      const next = [review, ...list]
      request = Promise.resolve(next)
      return next
    })
  }

  return { reviews, status, add }
}
