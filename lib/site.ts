/**
 * Site-wide content and contact details.
 * Values marked PLACEHOLDER are still to be supplied — swap them here and they
 * update everywhere (nav menu, footer, contact page).
 */

export const site = {
  name: 'VELTRIX',
  tagline: 'Software. Engineered for Possibility.',
  email: 'charlie.littler1102@gmail.com',
  // PLACEHOLDER — real phone number to be added
  phone: { label: '+44 0000 000000', href: null as string | null, placeholder: true },
  socials: {
    // PLACEHOLDER — real profile URLs to be added
    linkedin: { label: 'LinkedIn', href: '#', placeholder: true },
    github: { label: 'GitHub', href: '#', placeholder: true },
    x: { label: 'X', href: '#', placeholder: true },
  },
  // Globe marker: VELTRIX is based in the United Kingdom (lat, lon)
  homeBase: [54.0, -2.5] as [number, number],
  // PLACEHOLDER — reply time on the success message is still to be confirmed
  replyTime: 'within two working days',
}

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Get in touch', href: '/contact' },
] as const

export type DivisionSlug = 'software' | 'solutions' | 'intelligence'

export const divisions: Record<
  DivisionSlug,
  { name: string; short: string; color: string; tint: string; text: string }
> = {
  software: {
    name: 'VELTRIX Software',
    short: 'Software',
    color: '#02b8cc',
    tint: 'rgba(2, 184, 204, 0.15)',
    text: '#d0d6e0',
  },
  solutions: {
    name: 'VELTRIX Solutions',
    short: 'Solutions',
    color: '#27a644',
    tint: 'rgba(39, 166, 68, 0.15)',
    text: '#d0d6e0',
  },
  intelligence: {
    name: 'VELTRIX Intelligence',
    short: 'Intelligence',
    color: '#6366f1',
    tint: 'rgba(99, 102, 241, 0.15)',
    text: '#d0d6e0',
  },
}
