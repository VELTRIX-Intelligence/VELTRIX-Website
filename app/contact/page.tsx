import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactGlobe } from '@/components/contact/ContactGlobe'
import { ContactRows } from '@/components/contact/ContactRows'
import { EnquiryForm } from '@/components/contact/EnquiryForm'

export const metadata: Metadata = {
  title: 'Get in touch',
  description:
    "Tell us about your software challenge, process or idea. We'll reply with clear next steps — no jargon, no hard sell.",
}

const nextSteps = [
  'We read your enquiry',
  'We arrange a call to understand the requirements',
  'You get a clear proposal and plan',
]

function FormFallback() {
  return <div className="min-h-[640px] rounded-[12px] bg-carbon shadow-[inset_0_0_0_1px_#23252a]" />
}

export default function ContactPage() {
  return (
    <>
      <section className="container-site pb-16 pt-[120px] md:pb-24 md:pt-[160px]">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-12 md:gap-x-6">
          {/* Header — first on every breakpoint */}
          <div className="relative col-span-4 md:col-span-5">
            {/* Mobile: small static globe behind the headline at 30% opacity */}
            <div className="pointer-events-none absolute -right-16 -top-10 w-[260px] opacity-30 md:hidden">
              <ContactGlobe interactive={false} />
            </div>
            <div className="relative">
              <p className="text-label text-fog">Get in touch</p>
              <h1 className="text-page mt-6">Let&apos;s build something.</h1>
              <p className="text-intro mt-6 text-mist">
                Whether you have a software challenge, a process that needs improving or an idea that
                needs technical expertise, tell us about it. We&apos;ll reply with clear next steps — no
                jargon, no hard sell.
              </p>
            </div>
          </div>

          {/* Form — right column on desktop, second on mobile */}
          <div className="col-span-4 md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-1">
            <Suspense fallback={<FormFallback />}>
              <EnquiryForm />
            </Suspense>
          </div>

          {/* Contact links + desktop globe */}
          <div className="col-span-4 md:col-span-5 md:row-start-2">
            <ContactRows />
            <div className="mx-auto mt-10 hidden max-w-[440px] md:block">
              <ContactGlobe interactive />
            </div>
          </div>
        </div>

        {/* What happens next */}
        <ol className="mt-16 grid grid-cols-1 gap-6 border-t border-graphite pt-10 md:mt-24 md:grid-cols-3">
          {nextSteps.map((s, i) => (
            <li key={s} className="flex gap-4">
              <span className="font-mono text-[12px] tracking-[0.02em] text-fog">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-mist">{s}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
