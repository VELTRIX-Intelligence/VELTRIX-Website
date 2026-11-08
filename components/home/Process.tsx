'use client'

import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'
import { SectionHeading } from '@/components/ui/primitives'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const steps = [
  {
    title: 'Understand the requirements',
    body: 'What the software needs to achieve, who will use it, and the constraints it works within.',
  },
  {
    title: 'Plan and design',
    body: 'Architecture, features and an interface that is understandable and straightforward to use.',
  },
  {
    title: 'Develop and engineer',
    body: 'Modern technologies, organised codebases and systems that can be maintained and expanded.',
  },
  {
    title: 'Test and assure quality',
    body: 'Features, performance and the overall experience checked before anything is released.',
  },
  {
    title: 'Deploy and keep improving',
    body: 'Launch is the start; software keeps evolving as requirements change.',
  },
]

/** Small abstract line illustrations, one per step (decorative). */
function StepArt({ index }: { index: number }) {
  const common = {
    width: 96,
    height: 96,
    viewBox: '0 0 96 96',
    fill: 'none',
    stroke: '#383b3f',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (index) {
    case 0:
      return (
        <svg {...common}>
          <circle cx="48" cy="48" r="34" />
          <circle cx="48" cy="48" r="20" />
          <circle cx="48" cy="48" r="4" />
          <path d="M48 6v16M48 74v16M6 48h16M74 48h16" />
        </svg>
      )
    case 1:
      return (
        <svg {...common}>
          <rect x="10" y="14" width="76" height="68" rx="4" />
          <path d="M10 28h76M30 28v54" />
          <rect x="40" y="38" width="36" height="14" rx="2" />
          <path d="M40 62h36M40 70h22" />
        </svg>
      )
    case 2:
      return (
        <svg {...common}>
          <path d="M30 28 12 48l18 20M66 28l18 20-18 20M56 18 40 78" />
        </svg>
      )
    case 3:
      return (
        <svg {...common}>
          <path d="M10 80h76M10 80V14" />
          <path d="M18 64l16-14 14 8 16-22 14 8" />
          <path d="m62 70 6 6 12-14" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M48 70V22M32 38l16-16 16 16" />
          <path d="M22 58a28 28 0 1 0 52 0" />
        </svg>
      )
  }
}

function StepContent({ i, title, body }: { i: number; title: string; body: string }) {
  return (
    <>
      <span className="col-span-4 font-mono text-5xl leading-none text-graphite md:col-span-3 md:text-[96px]">
        {String(i + 1).padStart(2, '0')}
      </span>
      <div className="col-span-4 md:col-span-9">
        <h3 className="text-card-title">{title}</h3>
        <p className="mt-3 max-w-[48ch] text-mist">{body}</p>
      </div>
      <div className="absolute bottom-6 right-6 hidden opacity-80 sm:block md:bottom-8 md:right-8">
        <StepArt index={i} />
      </div>
    </>
  )
}

export function Process() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="py-16 md:py-24" aria-labelledby="process-heading">
      <div className="container-site">
        <div id="process-heading">
          <SectionHeading
            title="From idea to working software."
            intro="Good software starts with understanding the problem, not with writing code."
          />
        </div>
      </div>

      <div className="container-site mt-12 md:mt-16">
        <div className="mx-auto max-w-[960px]">
          {reduced ? (
            <ol className="flex flex-col gap-4">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    'relative grid grid-cols-4 gap-6 rounded-[12px] bg-carbon p-6 shadow-[inset_0_0_0_1px_#23252a] md:grid-cols-12 md:p-10',
                    i === steps.length - 1 && 'overflow-hidden',
                  )}
                >
                  {i === steps.length - 1 && (
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-lime" />
                  )}
                  <StepContent i={i} {...s} />
                </li>
              ))}
            </ol>
          ) : (
            <ScrollStack
              useWindowScroll
              itemDistance={120}
              itemStackDistance={24}
              stackPosition="18%"
              itemScale={0.04}
              baseScale={0.9}
              dimAmount={0.35}
              blurAmount={0}
              tiltAmount={0}
              rotationAmount={0}
              holdDistance={120}
              smoothScroll={false}
              snap={false}
            >
              {steps.map((s, i) => (
                <ScrollStackItem
                  key={s.title}
                  itemClassName={cn(
                    'grid h-[320px] grid-cols-4 content-start gap-6 overflow-hidden p-6 md:h-[400px] md:grid-cols-12 md:p-10',
                  )}
                >
                  {i === steps.length - 1 && (
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-lime" />
                  )}
                  <StepContent i={i} {...s} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          )}
        </div>
      </div>
    </section>
  )
}
