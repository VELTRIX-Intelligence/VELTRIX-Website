import type { Metadata } from 'next'
import { ProductGrid } from '@/components/products/ProductGrid'
import { CtaBand } from '@/components/site/CtaBand'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Our own applications and platforms — built for real problems, maintained and improved long after launch.',
}

export default function ProductsPage() {
  return (
    <>
      <section className="container-site pb-16 pt-[120px] md:pb-24 md:pt-[160px]">
        <p className="text-label text-fog">VELTRIX Software · Products</p>
        <h1 className="text-page mt-6 max-w-[14ch]">Software people choose to use.</h1>
        <p className="text-intro mt-6 max-w-[640px] text-mist">
          Our own applications and platforms — built for real problems, maintained and improved long
          after launch.
        </p>

        <div className="mt-12 md:mt-16">
          <ProductGrid />
        </div>
      </section>

      <CtaBand title="Need something that doesn't exist yet?" />
    </>
  )
}
