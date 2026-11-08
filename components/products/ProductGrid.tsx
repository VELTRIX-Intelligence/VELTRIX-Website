'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { products } from '@/lib/products'
import type { DivisionSlug } from '@/lib/site'
import { cn } from '@/lib/utils'
import { IdeaCard, ProductCard } from './ProductCard'

type Filter = 'all' | DivisionSlug

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'software', label: 'Software' },
  { value: 'solutions', label: 'Solutions' },
  { value: 'intelligence', label: 'Intelligence' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function ProductGrid() {
  const [filter, setFilter] = useState<Filter>('all')
  const reduce = useReducedMotion()
  const shown = products.filter(p => filter === 'all' || p.division === filter)

  return (
    <>
      {/* Filter pills — scroll sideways on mobile */}
      <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:px-0">
        <div role="group" aria-label="Filter products by division" className="flex w-max gap-2">
          {filters.map(f => {
            const active = f.value === filter
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'inline-flex h-11 items-center rounded-full px-4 text-sm font-[510] tracking-[-0.011em] transition-colors duration-200',
                  active
                    ? 'bg-lime text-void'
                    : 'bg-carbon text-mist shadow-[inset_0_0_0_1px_#23252a] hover:text-paper',
                )}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'product' : 'products'} shown
      </p>

      <motion.ul layout={!reduce} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => (
            <motion.li
              key={p.name}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : (i % 3) * 0.08 }}
            >
              <ProductCard product={p} />
            </motion.li>
          ))}
          <motion.li
            key="idea"
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : (shown.length % 3) * 0.08 }}
          >
            <IdeaCard />
          </motion.li>
        </AnimatePresence>
      </motion.ul>
    </>
  )
}
