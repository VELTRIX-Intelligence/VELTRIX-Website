'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef } from 'react'
import { useCurrentYear, useNearViewport } from '@/lib/hooks'
import { navItems, site } from '@/lib/site'
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/site/SocialIcons'

const HalftoneWordmark = dynamic(() => import('@/components/ui/HalftoneWordmark'), { ssr: false })

const columnTitle = 'text-label text-fog'
const linkClass =
  'inline-flex min-h-8 items-center text-sm text-mist transition-colors duration-200 hover:text-paper'

export function SiteFooter() {
  const wordRef = useRef<HTMLDivElement>(null)
  // Lazy-mount the canvas when within one screen of the viewport.
  const near = useNearViewport(wordRef, '100% 0px')
  const year = useCurrentYear()

  return (
    <footer id="site-footer" className="relative mt-16 border-t border-graphite bg-void md:mt-24">
      <div className="container-site pt-16 md:pt-20">
        <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-12 md:gap-6">
          <div className="col-span-4 md:col-span-3">
            <Link href="/" className="text-base font-[590] tracking-[0.08em] text-paper">
              VELTRIX
            </Link>
            <p className="mt-3 max-w-[24ch] text-sm text-fog">{site.tagline}</p>
          </div>

          <nav aria-label="Footer pages" className="col-span-2 md:col-span-3">
            <p className={columnTitle}>Pages</p>
            <ul className="mt-4 space-y-1">
              {navItems.map(i => (
                <li key={i.href}>
                  <Link href={i.href} className={linkClass}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Divisions" className="col-span-2 md:col-span-3">
            <p className={columnTitle}>Divisions</p>
            <ul className="mt-4 space-y-1">
              <li>
                <Link href="/products" className={linkClass}>
                  VELTRIX Software
                </Link>
              </li>
              <li>
                <Link href="/contact?type=solutions" className={linkClass}>
                  VELTRIX Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact?type=ai" className={linkClass}>
                  VELTRIX Intelligence
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-4 md:col-span-3">
            <p className={columnTitle}>Contact</p>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-3 flex gap-2" aria-label="Social links">
              {[
                { ...site.socials.linkedin, Icon: LinkedInIcon },
                { ...site.socials.github, Icon: GitHubIcon },
                { ...site.socials.x, Icon: XIcon },
              ].map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-graphite text-fog transition-colors hover:border-smoke hover:text-mist"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-graphite pt-6 font-mono text-[12px] tracking-[0.02em] text-fog">
          <span>© {year} VELTRIX</span>
          <span aria-hidden="true">·</span>
          <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-mist">
            Privacy
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-mist">
            Terms
          </Link>
        </div>
      </div>

      {/* Huge halftone wordmark, cropped by the bottom edge */}
      <div ref={wordRef} className="mt-8 w-full overflow-hidden">
        <span className="sr-only">VELTRIX</span>
        <div className="mx-auto w-full max-w-[1600px] px-2" style={{ aspectRatio: '1 / 0.24' }}>
          {near && <HalftoneWordmark word="VELTRIX" />}
        </div>
      </div>
    </footer>
  )
}
