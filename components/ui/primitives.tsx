import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* Core VELTRIX primitives. Build once, reuse everywhere — never restyle ad hoc. */

type LinkOrButton =
  | ({ href: string } & Omit<ComponentProps<typeof Link>, 'href'>)
  | ({ href?: undefined } & ComponentProps<'button'>)

function Base({ className, ...props }: LinkOrButton & { className: string }) {
  if (props.href !== undefined) {
    const { href, ...rest } = props as { href: string } & Omit<ComponentProps<typeof Link>, 'href'>
    return <Link href={href} className={className} {...rest} />
  }
  return <button className={className} {...(props as ComponentProps<'button'>)} />
}

const primary =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-lime px-4 py-2.5 text-sm font-[510] leading-none tracking-[-0.011em] text-void transition-[filter] duration-200 ease-out-quint hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60'

const ghost =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] border border-graphite px-3.5 py-2 text-[13px] font-[510] leading-none tracking-[-0.011em] text-mist transition-colors duration-200 ease-out-quint hover:border-smoke hover:text-paper'

/** The single lime action per screen. */
export function PrimaryButton({ className, ...props }: LinkOrButton) {
  return <Base className={cn(primary, className)} {...props} />
}

export function GhostButton({ className, ...props }: LinkOrButton) {
  return <Base className={cn(ghost, className)} {...props} />
}

/** White pill used in the desktop top bar. */
export function NavCTA({ className, ...props }: LinkOrButton) {
  return (
    <Base
      className={cn(
        'inline-flex h-9 items-center rounded-full bg-paper px-4 text-[13px] font-[510] leading-none tracking-[-0.011em] text-void transition-colors duration-200 hover:bg-mist',
        className,
      )}
      {...props}
    />
  )
}

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-[12px] bg-carbon p-6 shadow-[inset_0_0_0_1px_#23252a] md:p-8', className)}
      {...props}
    />
  )
}

export function Tag({
  children,
  tint,
  className,
}: {
  children: ReactNode
  /** Division tint (15% fill). Omit for the neutral tag. */
  tint?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'text-label inline-flex items-center rounded-full px-2 py-0.5',
        tint ? 'text-mist' : 'bg-white/5 text-fog',
        className,
      )}
      style={tint ? { background: tint } : undefined}
    >
      {children}
    </span>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-label text-fog', className)}>{children}</p>
}

export function SectionHeading({
  title,
  intro,
  eyebrow,
  className,
}: {
  title: string
  intro?: string
  eyebrow?: string
  className?: string
}) {
  return (
    <div className={cn('max-w-[640px]', className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 className="text-section">{title}</h2>
      {intro && <p className="text-intro mt-4 text-mist">{intro}</p>}
    </div>
  )
}
