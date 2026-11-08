'use client'

/**
 * Staggered Menu — adapted from React Bits (StaggeredMenu-TS-TW) for VELTRIX.
 * Keeps the GSAP pre-layer sweep, panel slide, staggered items and the
 * Menu/Close text cycle. Changes from the library default:
 *  - 56px top strip with a text wordmark (no image logo)
 *  - Obsidian panel, 40px Inter 510 items, mono numbering (lime for the current page)
 *  - lime "Start a project" button, email and mono socials under the items
 *  - focus trap while open, Escape closes, tapping a link closes before navigating
 *  - durations capped at 600ms, no rotation, reduced motion respected
 */

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { cn, normalizePath } from '@/lib/utils'

export interface StaggeredMenuItem {
  label: string
  ariaLabel: string
  link: string
}
export interface StaggeredMenuSocialItem {
  label: string
  link: string
}

export interface StaggeredMenuProps {
  colors?: string[]
  items: StaggeredMenuItem[]
  socialItems?: StaggeredMenuSocialItem[]
  logo: ReactNode
  /** Extra content under the items (CTA, email). */
  footer?: ReactNode
  stripClassName?: string
  onMenuOpen?: () => void
  onMenuClose?: () => void
}

const EASE = 'power3.out'

export function StaggeredMenu({
  colors = ['#23252a', '#6366f1'],
  items,
  socialItems = [],
  logo,
  footer,
  stripClassName,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const pathname = normalizePath(usePathname())
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // Keeps the overlay hidden (not just off-screen) until first opened and after closing.
  const [shown, setShown] = useState(false)
  const openRef = useRef(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const preLayersRef = useRef<HTMLDivElement>(null)
  const plusHRef = useRef<HTMLSpanElement>(null)
  const plusVRef = useRef<HTMLSpanElement>(null)
  const textInnerRef = useRef<HTMLSpanElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close'])

  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTweenRef = useRef<gsap.core.Tween | null>(null)
  const iconTlRef = useRef<gsap.core.Timeline | null>(null)
  const textTweenRef = useRef<gsap.core.Tween | null>(null)

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const layers = preLayersRef.current
        ? (Array.from(preLayersRef.current.querySelectorAll('.sm-prelayer')) as HTMLElement[])
        : []
      if (!panel) return
      gsap.set([panel, ...layers], { xPercent: 100 })
      if (plusHRef.current) gsap.set(plusHRef.current, { rotate: 0 })
      if (plusVRef.current) gsap.set(plusVRef.current, { rotate: 90 })
    })
    return () => ctx.revert()
  }, [])

  const playOpen = useCallback(() => {
    const panel = panelRef.current
    if (!panel) return
    const layers = preLayersRef.current
      ? (Array.from(preLayersRef.current.querySelectorAll('.sm-prelayer')) as HTMLElement[])
      : []
    tlRef.current?.kill()
    closeTweenRef.current?.kill()

    const labels = Array.from(panel.querySelectorAll('.sm-label')) as HTMLElement[]
    const nums = Array.from(panel.querySelectorAll('.sm-num')) as HTMLElement[]
    const extras = Array.from(panel.querySelectorAll('.sm-extra')) as HTMLElement[]

    if (reduced()) {
      gsap.set([...layers, panel], { xPercent: 0 })
      gsap.set(labels, { yPercent: 0 })
      gsap.set([...nums, ...extras], { opacity: 1, y: 0 })
      return
    }

    gsap.set(labels, { yPercent: 110 })
    gsap.set(nums, { opacity: 0 })
    gsap.set(extras, { opacity: 0, y: 16 })

    const tl = gsap.timeline()
    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: 'power4.out' }, i * 0.07)
    })
    const panelAt = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0
    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.55, ease: 'power4.out' }, panelAt)
    const itemsAt = panelAt + 0.1
    tl.to(labels, { yPercent: 0, duration: 0.6, ease: 'power4.out', stagger: 0.08 }, itemsAt)
    tl.to(nums, { opacity: 1, duration: 0.4, ease: EASE, stagger: 0.08 }, itemsAt + 0.1)
    tl.to(extras, { opacity: 1, y: 0, duration: 0.45, ease: EASE, stagger: 0.06 }, itemsAt + 0.2)
    tlRef.current = tl
  }, [])

  const playClose = useCallback((onDone?: () => void) => {
    const panel = panelRef.current
    if (!panel) return onDone?.()
    const layers = preLayersRef.current
      ? (Array.from(preLayersRef.current.querySelectorAll('.sm-prelayer')) as HTMLElement[])
      : []
    tlRef.current?.kill()
    closeTweenRef.current?.kill()
    if (reduced()) {
      gsap.set([...layers, panel], { xPercent: 100 })
      onDone?.()
      return
    }
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => onDone?.(),
    })
  }, [])

  const animateToggle = useCallback((opening: boolean) => {
    const h = plusHRef.current
    const v = plusVRef.current
    const inner = textInnerRef.current
    const instant = reduced()
    iconTlRef.current?.kill()
    if (h && v) {
      iconTlRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out', duration: instant ? 0 : 0.45 } })
        .to(h, { rotate: opening ? 45 : 0 }, 0)
        .to(v, { rotate: opening ? -45 : 90 }, 0)
    }
    if (inner) {
      textTweenRef.current?.kill()
      const seq = opening ? ['Menu', 'Close', 'Menu', 'Close'] : ['Close', 'Menu', 'Close', 'Menu']
      setTextLines(seq)
      gsap.set(inner, { yPercent: 0 })
      textTweenRef.current = gsap.to(inner, {
        yPercent: -((seq.length - 1) / seq.length) * 100,
        duration: instant ? 0 : 0.5,
        ease: 'power4.out',
      })
    }
  }, [])

  const setMenu = useCallback(
    (next: boolean, afterClose?: () => void) => {
      if (openRef.current === next) {
        afterClose?.()
        return
      }
      openRef.current = next
      setOpen(next)
      animateToggle(next)
      if (next) {
        setShown(true)
        onMenuOpen?.()
        playOpen()
      } else {
        onMenuClose?.()
        playClose(() => {
          if (!openRef.current) setShown(false)
          afterClose?.()
        })
      }
    },
    [animateToggle, onMenuClose, onMenuOpen, playClose, playOpen],
  )

  // Close on route change (e.g. browser back).
  useEffect(() => {
    if (openRef.current) setMenu(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Lock scroll, trap focus and close on Escape while open.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const panel = panelRef.current
    const focusables = () =>
      [
        toggleRef.current,
        ...Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []),
      ].filter(Boolean) as HTMLElement[]
    requestAnimationFrame(() => focusables()[1]?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMenu(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const list = focusables()
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, setMenu])

  /** Tapping a link closes the menu before the page changes. */
  const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    const base = href.split('?')[0]
    setMenu(false, () => {
      if (base !== pathname || href.includes('?')) router.push(href)
    })
  }

  return (
    <div className="md:hidden">
      {/* 56px top strip */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-[60] flex h-14 items-center justify-between px-6 transition-[background-color,border-color] duration-300',
          open ? 'border-b border-transparent bg-transparent' : stripClassName,
        )}
      >
        <div onClickCapture={() => openRef.current && setMenu(false)}>{logo}</div>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenu(!openRef.current)}
          aria-expanded={open}
          aria-controls="mobile-menu-panel"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={cn(
            '-mr-2 inline-flex h-11 items-center gap-2 px-2 text-sm font-[510] leading-none tracking-[-0.011em] transition-colors',
            open ? 'text-paper' : 'text-mist',
          )}
        >
          <span className="relative inline-block h-[1em] overflow-hidden" aria-hidden="true">
            <span ref={textInnerRef} className="flex flex-col leading-none">
              {textLines.map((l, i) => (
                <span key={i} className="block h-[1em] leading-none">
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">
            <span ref={plusHRef} className="absolute h-[1.5px] w-full rounded-[2px] bg-current" />
            <span ref={plusVRef} className="absolute h-[1.5px] w-full rounded-[2px] bg-current" />
          </span>
        </button>
      </div>

      {/* Pre-layers + panel */}
      <div
        className={cn(
          'fixed inset-0 z-[55]',
          open ? 'pointer-events-auto' : 'pointer-events-none',
          !shown && 'invisible',
        )}
      >
        <div ref={preLayersRef} className="absolute inset-0" aria-hidden="true">
          {colors.slice(0, 3).map((c, i) => (
            <div key={i} className="sm-prelayer absolute inset-0" style={{ background: c }} />
          ))}
        </div>
        <div
          id="mobile-menu-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          inert={!open}
          className="absolute inset-0 flex flex-col overflow-y-auto bg-obsidian px-6 pb-10 pt-[104px]"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-3">
              {items.map((it, idx) => {
                const current = it.link === pathname
                return (
                  <li key={it.link} className="overflow-hidden">
                    <Link
                      href={it.link}
                      aria-label={it.ariaLabel}
                      aria-current={current ? 'page' : undefined}
                      onClick={go(it.link)}
                      className="group flex items-baseline gap-4 py-1"
                    >
                      <span
                        className={cn(
                          'sm-num w-6 shrink-0 font-mono text-[12px] tracking-[0.02em]',
                          current ? 'text-lime' : 'text-fog',
                        )}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="sm-label inline-block text-[40px] font-[510] leading-[1.1] tracking-[-0.022em] text-paper transition-colors group-hover:text-mist">
                        {it.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-10 flex flex-col gap-8">
            {footer && (
              <div className="sm-extra" onClickCapture={() => setMenu(false)}>
                {footer}
              </div>
            )}
            {socialItems.length > 0 && (
              <ul className="sm-extra flex flex-wrap gap-x-6 gap-y-2" aria-label="Social links">
                {socialItems.map(s => (
                  <li key={s.label}>
                    <a
                      href={s.link}
                      target={s.link.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-label inline-flex min-h-11 items-center text-fog transition-colors hover:text-mist"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaggeredMenu
