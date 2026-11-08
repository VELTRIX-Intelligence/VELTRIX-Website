'use client'

/**
 * SplineScene — equivalent of the 21st.dev "splite" wrapper (serafimcloud):
 * lazy-loads @splinetool/react-spline and shows a quiet loader until ready.
 * Not used until a VELTRIX Spline export exists (set HERO_SPLINE_SCENE in
 * components/home/HeroVisual.tsx); the coded stand-in renders meanwhile.
 */

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  return (
    <Suspense fallback={<div className="h-full w-full bg-void" />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
