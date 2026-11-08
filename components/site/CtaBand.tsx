import { PrimaryButton } from '@/components/ui/primitives'
import { site } from '@/lib/site'

/** Closing call to action, centred, with a faint Iris Violet radial glow. */
export function CtaBand({
  title,
  body,
}: {
  title: string
  body?: string
}) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(closest-side, rgba(99, 102, 241, 0.16), transparent)',
        }}
      />
      <div className="container-site relative text-center">
        <h2 className="text-section mx-auto max-w-[760px]">{title}</h2>
        {body && <p className="text-intro mx-auto mt-5 max-w-[640px] text-mist">{body}</p>}
        <div className="mt-10 flex flex-col items-center gap-4">
          <PrimaryButton href="/contact">Start a project</PrimaryButton>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center text-sm text-fog underline-offset-4 transition-colors hover:text-mist hover:underline"
          >
            or email us directly
          </a>
        </div>
      </div>
    </section>
  )
}
