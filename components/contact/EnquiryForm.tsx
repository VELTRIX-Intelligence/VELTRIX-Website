'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PrimaryButton } from '@/components/ui/primitives'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const NEEDS = [
  'New product idea',
  'Bespoke software',
  'AI integration',
  'Improve existing software',
  'Something else',
] as const

const BUDGETS = ['Under £5k', '£5k–£20k', '£20k–£50k', '£50k+', 'Not sure yet'] as const

/** ?type= values used by links across the site → enquiry pill. */
const TYPE_TO_NEED: Record<string, (typeof NEEDS)[number]> = {
  software: 'New product idea',
  solutions: 'Bespoke software',
  ai: 'AI integration',
}

const schema = z.object({
  name: z.string().trim().min(1, 'Please tell us your name.'),
  email: z.string().trim().min(1, 'Please add your email address.').email('Please enter a valid email address.'),
  company: z.string().trim().optional(),
  need: z.enum(NEEDS, { error: 'Please choose what you need.' }),
  budget: z.union([z.enum(BUDGETS), z.literal('')]).optional(),
  details: z
    .string()
    .trim()
    .min(20, 'Please give us a little more detail (at least 20 characters).'),
})

type FormValues = z.infer<typeof schema>

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

const labelClass = 'mb-2 block text-[13px] font-[510] text-mist'
const inputClass =
  'w-full rounded-[6px] border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 text-sm text-mist placeholder:text-fog transition-colors duration-200 focus:border-mist focus:outline-2 focus:outline-offset-2 focus:outline-lime aria-[invalid=true]:border-coral/70'

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} role="alert" className="mt-2 min-h-0 text-[13px] text-coral empty:hidden">
      {message ?? ''}
    </p>
  )
}

export function EnquiryForm() {
  const params = useSearchParams()
  const preselect = TYPE_TO_NEED[params.get('type') ?? '']
  const uid = useId()
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { need: preselect, budget: '' },
  })

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    if (!FORMSPREE_ID) {
      setStatus('error')
      setServerError(`The enquiry form isn't connected yet. Please email us at ${site.email}.`)
      return
    }
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          _subject: `New VELTRIX enquiry — ${values.need}`,
          _replyto: values.email,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
      setServerError(`Something went wrong sending your enquiry. Please try again, or email us at ${site.email}.`)
    }
  }

  const id = (name: string) => `${uid}-${name}`
  const err = (name: keyof FormValues) => (errors[name] ? `${id(name)}-error` : undefined)

  return (
    <div className="rounded-[12px] bg-carbon p-6 shadow-[inset_0_0_0_1px_#23252a] md:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className="flex min-h-[420px] flex-col items-start justify-center"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-lime text-lime">
              <Check className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="text-card-title mt-6 text-paper">Thanks — we&apos;ve got it.</p>
            <p className="mt-2 text-mist">We&apos;ll be in touch {site.replyTime}.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor={id('name')} className={labelClass}>
                  Name
                </label>
                <input
                  id={id('name')}
                  autoComplete="name"
                  className={inputClass}
                  aria-invalid={!!errors.name}
                  aria-describedby={err('name')}
                  aria-required="true"
                  {...register('name')}
                />
                <FieldError id={`${id('name')}-error`} message={errors.name?.message} />
              </div>
              <div>
                <label htmlFor={id('email')} className={labelClass}>
                  Email
                </label>
                <input
                  id={id('email')}
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  aria-invalid={!!errors.email}
                  aria-describedby={err('email')}
                  aria-required="true"
                  {...register('email')}
                />
                <FieldError id={`${id('email')}-error`} message={errors.email?.message} />
              </div>
            </div>

            <div>
              <label htmlFor={id('company')} className={labelClass}>
                Company <span className="font-normal text-fog">(optional)</span>
              </label>
              <input
                id={id('company')}
                autoComplete="organization"
                placeholder="Company or project name"
                className={inputClass}
                {...register('company')}
              />
            </div>

            <fieldset aria-describedby={err('need')}>
              <legend className={labelClass}>What do you need?</legend>
              <div className="flex flex-wrap gap-2">
                {NEEDS.map(n => (
                  <label key={n} className="relative">
                    <input type="radio" value={n} className="peer sr-only" {...register('need')} />
                    <span
                      className={cn(
                        'inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-[13px] font-[510] text-mist shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-colors duration-200',
                        'hover:text-paper hover:shadow-[inset_0_0_0_1px_#383b3f]',
                        'peer-checked:bg-white/[0.08] peer-checked:text-paper peer-checked:shadow-[inset_0_0_0_1px_#d0d6e0]',
                        'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime',
                      )}
                    >
                      {n}
                    </span>
                  </label>
                ))}
              </div>
              <FieldError id={`${id('need')}-error`} message={errors.need?.message} />
            </fieldset>

            <div>
              <label htmlFor={id('budget')} className={labelClass}>
                Budget range <span className="font-normal text-fog">(optional)</span>
              </label>
              <select
                id={id('budget')}
                className={cn(inputClass, 'appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10')}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a8f98' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
                {...register('budget')}
              >
                <option value="">Select a range</option>
                {BUDGETS.map(b => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={id('details')} className={labelClass}>
                Project details
              </label>
              <textarea
                id={id('details')}
                rows={5}
                placeholder="What should the software do, and who will use it?"
                className={cn(inputClass, 'resize-y')}
                aria-invalid={!!errors.details}
                aria-describedby={err('details')}
                aria-required="true"
                {...register('details')}
              />
              <FieldError id={`${id('details')}-error`} message={errors.details?.message} />
            </div>

            {serverError && (
              <p role="alert" className="text-[13px] text-coral">
                {serverError}
              </p>
            )}

            <div>
              <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Sending…' : 'Send enquiry'}
              </PrimaryButton>
              <p className="mt-3 text-[12px] text-fog">
                We&apos;ll only use your details to reply to this enquiry.{' '}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-mist">
                  Privacy policy
                </Link>
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
