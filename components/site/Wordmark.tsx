import Link from 'next/link'
import { cn } from '@/lib/utils'

/** "VELTRIX" in Inter 16px / 590, tracking 0.08em, white. Always links home. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="VELTRIX home"
      className={cn(
        'inline-flex h-11 items-center text-base font-[590] tracking-[0.08em] text-paper',
        className,
      )}
    >
      VELTRIX
    </Link>
  )
}
