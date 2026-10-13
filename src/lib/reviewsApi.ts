/**
 * Reviews are stored in a Supabase database and read/written through its REST API,
 * so the site still has no server of its own. Set the two values in the `.env` file.
 * Database setup: see supabase/reviews.sql.
 */
const url = (import.meta.env.VITE_SUPABASE_URL ?? '').trim().replace(/\/$/, '')
const key = (import.meta.env.VITE_SUPABASE_KEY ?? '').trim()

/** False until both values are filled in; the review form then falls back to WhatsApp/email. */
export const reviewsEnabled = url !== '' && key !== ''

const endpoint = `${url}/rest/v1/reviews`
const headers = { apikey: key, Authorization: `Bearer ${key}` }

export interface Review {
  id: number
  created_at: string
  name: string
  business: string | null
  rating: number
  review: string
}

type NewReview = Pick<Review, 'name' | 'business' | 'rating' | 'review'>

/** Limits enforced by the database too (see supabase/reviews.sql). */
export const reviewLimits = { name: 80, business: 80, review: 1000, words: 50 }

/** Newest first. Reviews you have marked `hidden` in Supabase are not returned. */
export async function fetchReviews(): Promise<Review[]> {
  const query = 'select=id,created_at,name,business,rating,review&order=created_at.desc&limit=300'
  const response = await fetch(`${endpoint}?${query}`, { headers })
  if (!response.ok) throw new Error(`Could not load reviews (${response.status})`)
  return response.json()
}

export async function postReview(review: NewReview): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(review),
  })
  if (!response.ok) throw new Error(`Could not save the review (${response.status})`)
}
