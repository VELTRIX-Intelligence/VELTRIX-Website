import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { DesktopNav } from '@/components/site/DesktopNav'
import { MobileMenu } from '@/components/site/MobileMenu'
import { PageBlur } from '@/components/site/PageBlur'
import { SiteFooter } from '@/components/site/SiteFooter'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'VELTRIX — Software. Engineered for Possibility.',
    template: '%s · VELTRIX',
  },
  description:
    'VELTRIX designs, develops and delivers modern software through three divisions: VELTRIX Software, VELTRIX Solutions and VELTRIX Intelligence.',
}

export const viewport: Viewport = {
  themeColor: '#08090a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-[70] rounded-[6px] bg-lime px-4 py-2 text-sm font-[510] text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <DesktopNav />
        <MobileMenu />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <PageBlur />
      </body>
    </html>
  )
}
