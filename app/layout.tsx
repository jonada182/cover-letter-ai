import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'

const inter = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoverLetterAI',
  description: 'CoverLetterAI crafts compelling and personalized cover letters in minutes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
