'use client'

import RotatingText from '@/components/ui/RotatingText'
import { Spotlight } from '@/components/ui/Spotlight'
import { GhostButton, PrimaryButton } from '@/components/ui/primitives'
import { useIsMobile, usePrefersReducedMotion } from '@/lib/hooks'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-void">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      {/* 3D scene: right half on desktop, bleeding behind the text */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block">
        {!isMobile && <HeroVisual />}
      </div>

      <div className="container-site relative z-10 grid flex-1 grid-cols-4 gap-x-4 pt-[120px] md:grid-cols-12 md:gap-x-6 md:pt-[160px]">
        <div className="col-span-4 flex flex-col md:col-span-7 lg:col-span-6">
          <p className="text-label text-fog">Software · Solutions · Intelligence</p>
          <h1 className="text-hero mt-6 text-paper">
            Software.
            <br />
            Engineered for Possibility.
          </h1>

          <p className="text-intro mt-6 max-w-[34rem] text-mist">
            We build{' '}
            <span className="my-1.5 flex md:my-0 md:inline-flex md:align-middle">
              <RotatingText
                texts={['your next product', 'bespoke platforms', 'intelligent systems']}
                effect="slide"
                direction="up"
                rotationInterval={2500}
                staggerDuration={0.015}
                staggerFrom="first"
                pauseOnHover
                auto={!reduced}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                mainClassName="inline-flex overflow-hidden rounded-full bg-carbon px-3 py-0.5 text-paper shadow-[inset_0_0_0_1px_#23252a]"
                splitLevelClassName="overflow-hidden pb-0.5"
              />
            </span>{' '}
            — designed properly, engineered to last.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <PrimaryButton href="/contact">Start a project</PrimaryButton>
            <GhostButton href="/products">View products →</GhostButton>
          </div>
        </div>

        {/* Mobile: scene underneath the text at half the screen height */}
        <div className="pointer-events-none col-span-4 -mx-6 mt-8 h-[50svh] md:hidden">
          {isMobile && <HeroVisual />}
        </div>

        <p className="text-label col-span-4 self-end pb-20 pt-6 text-fog md:col-span-12 md:pb-28">
          Scroll to explore ↓
        </p>
      </div>

      {/* Linear-style floor: Void fading to a faint grey at the very bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-void to-[#d0d6e0]/[0.06]" />
    </section>
  )
}
