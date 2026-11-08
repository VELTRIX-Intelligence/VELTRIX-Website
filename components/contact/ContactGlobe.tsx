'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useNearViewport, usePrefersReducedMotion } from '@/lib/hooks'
import { site } from '@/lib/site'

const GlobeWireframe = dynamic(() => import('@/components/ui/GlobeWireframe'), { ssr: false })

/**
 * Wireframe globe from the 21st.dev "Contact with Globe" section (ScrollX UI),
 * restyled: Graphite and Smoke lines only, slow rotation, one Acid Lime pulse
 * on VELTRIX's home base (UK). Decorative.
 */
export function ContactGlobe({ interactive }: { interactive: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const near = useNearViewport(ref, '200px')
  const reduced = usePrefersReducedMotion()
  const animate = interactive && !reduced

  return (
    <div ref={ref} aria-hidden="true" className="aspect-square w-full text-smoke">
      {near && (
        <GlobeWireframe
          className="aspect-square w-full"
          variant="wireframe"
          strokeColor="#383b3f"
          strokeWidth={0.6}
          graticuleColor="#23252a"
          graticuleOpacity={1}
          sphereOutlineColor="#383b3f"
          sphereOutlineWidth={1}
          autoRotate={animate}
          autoRotateSpeed={0.12}
          initialRotation={[-site.homeBase[1] - 20, -site.homeBase[0] + 22]}
          enableInteraction={animate}
          marker={site.homeBase}
          markerColor="#e4f222"
        />
      )}
    </div>
  )
}
