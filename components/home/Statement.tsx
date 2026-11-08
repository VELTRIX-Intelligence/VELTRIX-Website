'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { useIsMobile } from '@/lib/hooks'

export function Statement() {
  const isMobile = useIsMobile()
  return (
    <section className="container-site py-24 md:py-32">
      <ScrollReveal
        splitBy="words"
        effect="fade"
        mode="scrub"
        enableBlur={!isMobile}
        blurStrength={4}
        baseOpacity={0.15}
        baseRotation={0}
        containerClassName="mx-auto max-w-[900px] text-center"
        textClassName="text-statement text-paper"
      >
        We believe software should do more than simply perform a function. It should solve problems,
        improve processes, simplify everyday activities and create opportunities.
      </ScrollReveal>
      <p className="text-label mt-8 text-center text-fog">— The VELTRIX approach</p>
    </section>
  )
}
