'use client'

import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react'

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }
}

/** SSR-safe media query. Returns `serverValue` during prerender. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useHasFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

/** True once the element has come within `rootMargin` of the viewport. */
export function useNearViewport(ref: RefObject<Element | null>, rootMargin = '200px', once = true) {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          if (once) io.disconnect()
        } else if (!once) {
          setNear(false)
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, once])
  return near
}

/** Slow connection or data-saver: show still visuals instead of live 3D. */
export function useSlowConnection() {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
        .connection
      return !!c && (!!c.saveData || /(^|-)2g|3g/.test(c.effectiveType ?? ''))
    },
    () => false,
  )
}

const noopSubscribe = () => () => {}

/** Current year on the client; the launch year during prerender. */
export function useCurrentYear(fallback = 2026) {
  return useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => fallback)
}
