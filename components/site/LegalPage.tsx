import type { ReactNode } from 'react'

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <article className="container-site pb-16 pt-[120px] md:pb-24 md:pt-[160px]">
      <div className="max-w-[680px]">
        <p className="text-label text-fog">Legal</p>
        <h1 className="text-page mt-6">{title}</h1>
        <p className="text-label mt-6 text-fog">Last updated {updated}</p>

        <div
          role="note"
          className="mt-10 rounded-[12px] border border-graphite bg-carbon p-5 text-sm text-mist"
        >
          <span className="text-label mr-2 text-fog">Draft</span>
          This is starter text and has not been reviewed by a legal professional. Items in
          [square brackets] still need to be completed. Have it reviewed before relying on it.
        </div>

        <div className="legal-prose mt-12">{children}</div>
      </div>
    </article>
  )
}
