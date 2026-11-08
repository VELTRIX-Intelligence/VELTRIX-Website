import { Hero } from '@/components/home/Hero'
import { Statement } from '@/components/home/Statement'
import { Divisions } from '@/components/home/Divisions'
import { Process } from '@/components/home/Process'
import { Technology } from '@/components/home/Technology'
import { Values } from '@/components/home/Values'
import { CtaBand } from '@/components/site/CtaBand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Divisions />
      <Process />
      <Technology />
      <Values />
      <CtaBand
        title="Have an idea that needs engineering?"
        body="Startups, small businesses, established organisations and individuals — tell us what you need and we'll find the right technical solution."
      />
    </>
  )
}
