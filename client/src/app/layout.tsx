import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Theme from '@/lib/components/layout/Theme'
import { HeroUIProvider } from '@heroui/system'
import { ReactNode } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'MioCrew',
  description: 'Get your travel plans out of the group chat and into real life.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeroUIProvider>
          <Theme>{children}</Theme>
        </HeroUIProvider>
      </body>
    </html>
  )
}
