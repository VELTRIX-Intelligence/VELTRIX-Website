'use client'

/**
 * ProductCard — adapted from the 21st.dev "Glass Blog Card" (moumensoliman /
 * UI TripleD, MIT). Blog parts mapped to product parts:
 *   cover image + zoom → screenshot (or line-art frame) 16:10, 1.05× zoom on hover
 *   category tags      → division tag (tinted) + status tag, mono
 *   title / excerpt    → product name 22px/510 / one or two lines in Mist
 *   author row         → platform icons in Fog
 *   read time          → pricing model in mono
 *   read button        → ghost "View product →" or "Get notified"
 * Glass re-tuned for dark: 3% white fill, 16px blur, 8% border, 12px radius;
 * on hover the border goes to Smoke and a faint division-colour glow appears
 * along the top edge. No hover effects on touch screens.
 */

import Image from 'next/image'
import Link from 'next/link'
import { AppWindow, Monitor, Smartphone, TabletSmartphone } from 'lucide-react'
import type { Platform, Product } from '@/lib/products'
import { divisions, site } from '@/lib/site'
import { Tag } from '@/components/ui/primitives'

const platformIcons: Record<Platform, { Icon: typeof AppWindow; label: string }> = {
  web: { Icon: AppWindow, label: 'Web' },
  ios: { Icon: Smartphone, label: 'iOS' },
  android: { Icon: TabletSmartphone, label: 'Android' },
  desktop: { Icon: Monitor, label: 'Desktop' },
}

const statusLabel: Record<Product['status'], string> = {
  live: 'Live',
  beta: 'Beta',
  'coming-soon': 'Coming soon',
}

/** Dark frame with a line-art app skeleton, used until a real screenshot exists. */
function FramePlaceholder({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full"
      aria-hidden="true"
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <rect width="320" height="200" fill="#0f1011" />
      <g stroke="#23252a">
        <rect x="24" y="22" width="272" height="156" rx="6" />
        <path d="M24 42h272" />
        <path d="M84 42v136" />
        <path d="M38 58h32M38 72h24M38 86h28M38 100h20" />
        <rect x="100" y="58" width="180" height="44" rx="4" />
        <rect x="100" y="114" width="84" height="48" rx="4" />
        <rect x="196" y="114" width="84" height="48" rx="4" />
      </g>
      <circle cx="34" cy="32" r="2.5" stroke={color} />
      <path d="M112 90l22-14 18 8 22-16 22 10" stroke={color} strokeOpacity="0.7" />
    </svg>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const div = divisions[product.division]
  const comingSoon = product.status === 'coming-soon'
  const action = comingSoon
    ? {
        label: 'Get notified',
        href: `mailto:${site.email}?subject=${encodeURIComponent(`Notify me: ${product.name}`)}`,
      }
    : { label: 'View product →', href: product.href ?? '#' }

  return (
    <article
      className="group/card relative flex h-full flex-col overflow-hidden rounded-[12px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-[16px] transition-colors duration-300 ease-out-quint [@media(hover:hover)]:hover:border-smoke"
      style={{ ['--div-color' as string]: div.color }}
    >
      {/* Division-colour glow along the top edge on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover/card:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${div.color}, transparent)`,
          boxShadow: `0 0 12px 1px ${div.tint}`,
        }}
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-carbon">
        <div className="h-full w-full transition-transform duration-[400ms] ease-out-quint [@media(hover:hover)]:group-hover/card:scale-105">
          {product.image ? (
            <Image
              src={product.image}
              alt={`${product.name} interface`}
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          ) : (
            <FramePlaceholder color={div.color} />
          )}
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          <Tag tint={div.tint}>{div.short}</Tag>
          <Tag className="bg-void/70 backdrop-blur-sm">{statusLabel[product.status]}</Tag>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-[22px] font-[510] leading-[1.25] tracking-[-0.012em] text-paper">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-mist">{product.summary}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-2 text-fog">
            {product.platforms.length ? (
              product.platforms.map(p => {
                const { Icon, label } = platformIcons[p]
                return <Icon key={p} className="h-4 w-4" strokeWidth={1.5} aria-label={label} />
              })
            ) : (
              <span className="font-mono text-[12px] uppercase tracking-[0.02em]">Platforms TBC</span>
            )}
          </div>
          <span className="font-mono text-[12px] uppercase tracking-[0.02em] text-fog">
            {product.pricing ?? 'Pricing TBC'}
          </span>
        </div>

        {action.href.startsWith('mailto:') ? (
          <a
            href={action.href}
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-[6px] border border-graphite px-3.5 py-2 text-[13px] font-[510] text-mist transition-colors hover:border-smoke hover:text-paper"
          >
            {action.label}
          </a>
        ) : (
          <Link
            href={action.href}
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-[6px] border border-graphite px-3.5 py-2 text-[13px] font-[510] text-mist transition-colors hover:border-smoke hover:text-paper"
          >
            {action.label}
          </Link>
        )}
      </div>
    </article>
  )
}

/** Always the final grid cell. */
export function IdeaCard() {
  return (
    <Link
      href="/contact"
      className="group/idea flex h-full min-h-[320px] flex-col justify-between rounded-[12px] border border-dashed border-smoke p-6 transition-colors hover:border-fog"
    >
      <span className="text-label text-fog">Bespoke software</span>
      <div>
        <p className="text-[22px] font-[510] leading-[1.25] tracking-[-0.012em] text-paper">
          Got an idea for a product? We build bespoke software too.
        </p>
        <span className="mt-6 inline-flex min-h-11 items-center text-sm font-[510] text-mist transition-colors group-hover/idea:text-paper">
          Get in touch →
        </span>
      </div>
    </Link>
  )
}
