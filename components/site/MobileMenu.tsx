'use client'

import StaggeredMenu from '@/components/ui/StaggeredMenu'
import { PrimaryButton } from '@/components/ui/primitives'
import { Wordmark } from '@/components/site/Wordmark'
import { useScrolledPast } from '@/components/site/useScrolledPast'
import { navItems, site } from '@/lib/site'

const ariaLabels: Record<string, string> = {
  '/': 'Go to the home page',
  '/products': 'View VELTRIX products',
  '/contact': 'Contact VELTRIX',
}

/** Mobile side menu (<768px). */
export function MobileMenu() {
  const scrolled = useScrolledPast(80)
  return (
    <StaggeredMenu
      colors={['#23252a', '#6366f1']}
      logo={<Wordmark />}
      stripClassName={
        scrolled
          ? 'border-b border-graphite bg-void/80 backdrop-blur-[12px]'
          : 'border-b border-transparent bg-transparent'
      }
      items={navItems.map(i => ({ label: i.label, link: i.href, ariaLabel: ariaLabels[i.href] }))}
      socialItems={[
        { label: site.socials.linkedin.label, link: site.socials.linkedin.href },
        { label: site.socials.github.label, link: site.socials.github.href },
        { label: site.socials.x.label, link: site.socials.x.href },
      ]}
      footer={
        <div className="flex flex-col items-start gap-5">
          <PrimaryButton href="/contact">Start a project</PrimaryButton>
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-[13px] text-mist underline-offset-4 hover:text-paper hover:underline"
          >
            {site.email}
          </a>
        </div>
      }
    />
  )
}
