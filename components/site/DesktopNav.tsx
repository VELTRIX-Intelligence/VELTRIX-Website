'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PillNav from '@/components/ui/PillNav'
import { NavCTA } from '@/components/ui/primitives'
import { Wordmark } from '@/components/site/Wordmark'
import { navItems } from '@/lib/site'
import { useScrolledPast } from '@/components/site/useScrolledPast'
import { cn, normalizePath } from '@/lib/utils'

/** Desktop top bar (≥768px): wordmark left, Pill Nav centre, white pill CTA right. */
export function DesktopNav() {
  const pathname = normalizePath(usePathname())
  const scrolled = useScrolledPast(80)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 hidden border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out-quint md:block',
        scrolled
          ? 'border-graphite bg-void/80 backdrop-blur-[12px]'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center">
        <Wordmark className="justify-self-start" />
        <PillNav
          items={navItems.map(i => ({ label: i.label, href: i.href }))}
          activeHref={pathname}
          linkComponent={Link}
          ariaLabel="Main"
          theme="dark"
          layout="split"
          size="md"
          surface="solid"
          itemStyle="plain"
          hoverEffect="fill"
          indicator="pill"
          bounce={0.1}
          intro
          collapse="never"
        />
        <NavCTA href="/contact" className="justify-self-end">
          Start a project
        </NavCTA>
      </div>
    </header>
  )
}
