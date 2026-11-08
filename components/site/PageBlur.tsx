'use client'

import { useEffect, useState } from 'react'
import GradualBlur from '@/components/ui/GradualBlur'
import { useIsMobile } from '@/lib/hooks'
import { cn } from '@/lib/utils'

/**
 * Fixed blur along the bottom edge of the viewport. Sits above content but
 * below the nav and menu (z-40), ignores clicks, and hides while the footer
 * is in view so the wordmark stays sharp.
 */
export function PageBlur() {
  const isMobile = useIsMobile()
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer) return
    const io = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), {
      rootMargin: '0px 0px -40px 0px',
    })
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'transition-opacity duration-300 ease-out-quint',
        footerVisible ? 'opacity-0' : 'opacity-100',
      )}
    >
      <GradualBlur
        target="page"
        position="bottom"
        height={isMobile ? '4rem' : '6rem'}
        strength={2}
        layers={5}
        curve="bezier"
        exponential
        tint="rgba(8, 9, 10, 0.7)"
        zIndex={40}
      />
    </div>
  )
}
