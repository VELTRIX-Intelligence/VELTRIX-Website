'use client'

import { Check, Copy, Mail, Phone } from 'lucide-react'
import { useState, type ComponentType, type SVGProps } from 'react'
import { GitHubIcon, LinkedInIcon } from '@/components/site/SocialIcons'
import { site } from '@/lib/site'

type Row = {
  label: string
  value: string
  href: string | null
  Icon: ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>
  placeholder?: boolean
}

const rows: Row[] = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  {
    label: 'Phone',
    value: site.phone.label,
    href: site.phone.href,
    Icon: Phone,
    placeholder: site.phone.placeholder,
  },
  {
    label: 'LinkedIn',
    value: site.socials.linkedin.href,
    href: site.socials.linkedin.href,
    Icon: LinkedInIcon,
    placeholder: site.socials.linkedin.placeholder,
  },
  {
    label: 'GitHub',
    value: site.socials.github.href,
    href: site.socials.github.href,
    Icon: GitHubIcon,
    placeholder: site.socials.github.placeholder,
  },
]

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {
          /* clipboard unavailable — ignore */
        }
      }}
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] text-fog transition-colors hover:bg-white/[0.04] hover:text-mist"
    >
      {copied ? <Check className="h-4 w-4" strokeWidth={1.5} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  )
}

export function ContactRows() {
  return (
    <ul className="divide-y divide-graphite border-y border-graphite">
      {rows.map(({ label, value, href, Icon, placeholder }) => (
        <li key={label} className="flex items-center gap-4 py-3">
          <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-fog" strokeWidth={1.5} />
          <span className="text-label w-20 shrink-0 text-fog">{label}</span>
          {placeholder ? (
            <span className="text-label min-w-0 flex-1 text-fog">Coming soon</span>
          ) : (
            <>
              <a
                href={href ?? undefined}
                className="min-w-0 flex-1 truncate text-sm text-mist transition-colors hover:text-paper"
              >
                {value}
              </a>
              <CopyButton value={value} label={label} />
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
