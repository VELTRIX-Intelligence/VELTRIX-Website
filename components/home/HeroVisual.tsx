'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { SplineScene } from '@/components/ui/SplineScene'
import { useHasFinePointer, useIsMobile, usePrefersReducedMotion, useSlowConnection } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import type { RingsMode } from './RingsScene'

/**
 * Set this to the VELTRIX Spline export (e.g. "/3d/veltrix-hero.splinecode")
 * once it exists. Until then the coded rings stand-in is shown.
 */
const HERO_SPLINE_SCENE: string | null = null

const RingsScene = dynamic(() => import('./RingsScene'), { ssr: false })

export function HeroVisual() {
  const isMobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const slow = useSlowConnection()
  const fine = useHasFinePointer()
  const [ready, setReady] = useState(false)

  const mode: RingsMode = reduced || slow ? 'still' : isMobile || !fine ? 'auto' : 'interactive'
  const useSpline = HERO_SPLINE_SCENE && !reduced && !slow

  return (
    <div
      aria-hidden="true"
      className={cn(
        'h-full w-full transition-opacity duration-[600ms] ease-out-quint',
        ready || useSpline ? 'opacity-100' : 'opacity-0',
      )}
    >
      {useSpline ? (
        <SplineScene scene={HERO_SPLINE_SCENE!} className="h-full w-full" />
      ) : (
        <RingsScene mode={mode} onReady={() => setReady(true)} />
      )}
    </div>
  )
}
