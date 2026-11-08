import { SectionHeading } from '@/components/ui/primitives'

const values = [
  ['Innovation', 'Exploring new ideas, technologies and approaches.'],
  ['Quality', 'Reliable, functional, carefully engineered software.'],
  ['Practicality', 'Useful outcomes over unnecessary complexity.'],
  ['User experience', 'Designed around the people who use it.'],
  ['Adaptability', 'Flexible as technology and opportunities change.'],
  ['Transparency', 'Clear communication, realistic expectations, honest relationships.'],
  ['Continuous improvement', 'Software and skills should keep developing.'],
] as const

export function Values() {
  return (
    <section className="container-site py-16 md:py-24" aria-labelledby="values-heading">
      <div id="values-heading">
        <SectionHeading title="What guides the work." />
      </div>
      <dl className="mt-12 border-t border-graphite md:mt-16">
        {values.map(([name, line]) => (
          <div
            key={name}
            className="grid grid-cols-4 gap-x-4 gap-y-1 border-b border-graphite py-5 md:grid-cols-12 md:gap-x-6 md:py-6"
          >
            <dt className="col-span-4 font-[510] text-paper">{name}</dt>
            <dd className="col-span-4 text-mist md:col-span-8">{line}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
