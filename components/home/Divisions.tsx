import Link from 'next/link'
import { AppWindow, Puzzle, Sparkles, type LucideIcon } from 'lucide-react'
import { GlowCard } from '@/components/ui/GlowCard'
import { SectionHeading } from '@/components/ui/primitives'

const cards: {
  slug: string
  eyebrow: string
  title: string
  body: string
  points: string[]
  cta: string
  href: string
  color: string
  Icon: LucideIcon
}[] = [
  {
    slug: 'software',
    eyebrow: '01 / Software',
    title: 'VELTRIX Software',
    body: 'Our own products, applications and platforms, built for general use and improved long after launch.',
    points: ['Productivity apps', 'Web platforms', 'Business management software', 'Subscription products'],
    cta: 'Explore products',
    href: '/products',
    color: '#02b8cc',
    Icon: AppWindow,
  },
  {
    slug: 'solutions',
    eyebrow: '02 / Solutions',
    title: 'VELTRIX Solutions',
    body: 'Bespoke software built around your requirements, not the other way round.',
    points: ['Custom web and mobile apps', 'Internal platforms', 'APIs and integrations', 'Workflow automation'],
    cta: 'Discuss a project',
    href: '/contact?type=solutions',
    color: '#27a644',
    Icon: Puzzle,
  },
  {
    slug: 'intelligence',
    eyebrow: '03 / Intelligence',
    title: 'VELTRIX Intelligence',
    body: 'AI applied where it adds genuine value — as products, and inside everything we build.',
    points: ['AI assistants and agents', 'LLM integration', 'Document processing', 'Intelligent automation'],
    cta: 'Explore AI',
    href: '/contact?type=ai',
    color: '#6366f1',
    Icon: Sparkles,
  },
]

export function Divisions() {
  return (
    <section className="container-site py-16 md:py-24" aria-labelledby="divisions-heading">
      <div id="divisions-heading">
        <SectionHeading
          title="One company. Three divisions."
          intro="Each division has its own focus, but all three share the same engineers, knowledge and standard of quality."
        />
      </div>

      <div className="mt-12 grid grid-cols-4 gap-4 md:grid-cols-12 md:mt-16">
        {cards.map(({ slug, eyebrow, title, body, points, cta, href, color, Icon }) => (
          <GlowCard
            key={slug}
            glowColor={color}
            className="col-span-4 min-h-[420px] p-8 md:col-span-12 lg:col-span-4"
          >
            <div className="flex items-start justify-between">
              <span className="text-label text-fog">{eyebrow}</span>
              <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} style={{ color }} />
            </div>
            <h3 className="text-card-title mt-6">{title}</h3>
            <p className="mt-3 text-mist">{body}</p>
            <ul className="mt-6 space-y-2 text-sm text-fog">
              {points.map(p => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-smoke" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={href}
              className="mt-auto inline-flex min-h-11 items-center pt-8 text-sm font-[510] text-mist transition-colors hover:text-paper"
            >
              {cta} →
            </Link>
          </GlowCard>
        ))}
      </div>

      <p className="mt-10 max-w-[640px] text-fog">
        The divisions work together — a VELTRIX Software product can ship with an AI assistant from
        VELTRIX Intelligence, and a VELTRIX Solutions client platform can include intelligent automation.
      </p>
    </section>
  )
}
