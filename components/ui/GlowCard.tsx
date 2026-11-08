'use client'

/**
 * STAND-IN for the 21st.dev "Spotlight Card" (jahed / EaseMize GlowCard), built
 * from the plan's description until the original source can be downloaded.
 * A Carbon card whose 1px border and surface pick up a soft glow that follows
 * the pointer, in a single colour at low strength.
 * Touch / no hover: the glow sweeps once as the card scrolls into view.
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: ReactNode
  /** Glow colour, e.g. the division colour. */
  glowColor: string
  className?: string
}

export function GlowCard({ children, glowColor, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (fine) {
      // Track the pointer across the page so neighbouring cards share the light.
      let frame = 0
      let last: PointerEvent | null = null
      const paint = () => {
        frame = 0
        if (!last) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--gx', `${last.clientX - r.left}px`)
        el.style.setProperty('--gy', `${last.clientY - r.top}px`)
        const near =
          last.clientX > r.left - 200 &&
          last.clientX < r.right + 200 &&
          last.clientY > r.top - 200 &&
          last.clientY < r.bottom + 200
        el.style.setProperty('--glow', near ? '1' : '0')
      }
      const onMove = (e: PointerEvent) => {
        last = e
        if (!frame) frame = requestAnimationFrame(paint)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('pointermove', onMove)
      }
    }

    // Touch: play the glow once on enter.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        if (reduce) return
        el.classList.add('glowcard-once')
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'glowcard relative isolate rounded-[12px] bg-carbon shadow-[inset_0_0_0_1px_#23252a]',
        className,
      )}
      style={{ '--glow-color': glowColor } as CSSProperties}
    >
      <span aria-hidden="true" className="glowcard-surface" />
      <span aria-hidden="true" className="glowcard-border" />
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </div>
  )
}
