import type { DivisionSlug } from './site'

export type Platform = 'web' | 'ios' | 'android' | 'desktop'

export type Product = {
  name: string
  summary: string
  division: DivisionSlug
  status: 'live' | 'beta' | 'coming-soon'
  /** Leave empty until confirmed. */
  platforms: Platform[]
  /** Leave undefined until confirmed. */
  pricing?: 'Free' | 'Subscription' | 'One-time purchase'
  /** 1600 × 1000 WebP screenshot in /public. Undefined shows the line-art frame. */
  image?: string
  href?: string
}

/**
 * Honest placeholders from the plan's suggested starter set — the company
 * profile names product areas, not finished products. Replace each entry as
 * real products ship (name, one line, division, status, platforms, pricing,
 * 1600 × 1000 screenshot, link).
 */
export const products: Product[] = [
  {
    name: 'Productivity and organisation app',
    summary: 'Plan and organise everyday work, for individuals and small teams.',
    division: 'software',
    status: 'coming-soon',
    platforms: [],
  },
  {
    name: 'Business management platform',
    summary: 'Run the day-to-day operations of a small business in one place.',
    division: 'software',
    status: 'coming-soon',
    platforms: [],
  },
  {
    name: 'AI productivity assistant',
    summary: 'Takes on routine tasks and reduces unnecessary manual work.',
    division: 'intelligence',
    status: 'coming-soon',
    platforms: [],
  },
  {
    name: 'Document processing and data extraction',
    summary: 'Reads documents and pulls out the information you need.',
    division: 'intelligence',
    status: 'coming-soon',
    platforms: [],
  },
]
