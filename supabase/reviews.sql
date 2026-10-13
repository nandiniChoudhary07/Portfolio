-- Reviews table for the portfolio site.
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

create table public.reviews (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  business text check (business is null or char_length(business) <= 80),
  rating smallint not null check (rating between 1 and 5),
  review text not null check (char_length(btrim(review)) between 1 and 1000),
  -- At most 50 words, matching the form.
  constraint reviews_review_words_check
    check (array_length(regexp_split_to_array(btrim(review), '\s+'), 1) <= 50),
  -- Tick this in the Table Editor to take a review off the site without deleting it.
  hidden boolean not null default false
);

-- Row Level Security: visitors can only do what the policies below allow.
alter table public.reviews enable row level security;

create policy "Anyone can read visible reviews"
  on public.reviews for select
  to anon
  using (hidden = false);

create policy "Anyone can add a review"
  on public.reviews for insert
  to anon
  with check (hidden = false);

-- Visitors may read these columns and fill in these four. They cannot set the id,
-- the date or `hidden`, and they cannot edit or delete any review.
revoke all on public.reviews from anon;
grant select (id, created_at, name, business, rating, review) on public.reviews to anon;
grant insert (name, business, rating, review) on public.reviews to anon;
