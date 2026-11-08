import {
  Cloud,
  Database,
  FlaskConical,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Webhook,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/primitives'

const tools: { label: string; Icon: LucideIcon }[] = [
  { label: 'Frontend and backend frameworks', Icon: Layers },
  { label: 'Databases', Icon: Database },
  { label: 'Cloud infrastructure', Icon: Cloud },
  { label: 'APIs', Icon: Webhook },
  { label: 'Security and authentication', Icon: ShieldCheck },
  { label: 'AI models and frameworks', Icon: Sparkles },
  { label: 'Automation and integrations', Icon: Workflow },
  { label: 'Testing', Icon: FlaskConical },
  { label: 'Deployment', Icon: Rocket },
]

/** Deliberately calm, static band after the scroll stack. */
export function Technology() {
  return (
    <section className="container-site py-16 md:py-24" aria-labelledby="tech-heading">
      <div id="tech-heading">
        <SectionHeading
          title="The right tools for each project."
          intro="We choose technology for the project, its users and its long-term maintenance — not out of habit."
        />
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
        {tools.map(({ label, Icon }) => (
          <li
            key={label}
            className="flex min-h-[132px] flex-col justify-between gap-6 rounded-[12px] border border-graphite p-5 transition-colors duration-200 hover:border-smoke md:p-6"
          >
            <Icon aria-hidden="true" className="h-6 w-6 text-fog" strokeWidth={1.5} />
            <span className="text-label text-mist">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
