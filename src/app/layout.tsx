import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grade convertor',
  description: 'Convertisseur de notes',
  manifest: './manifest.json',
  icons: {
	apple: './icon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
		<Providers>
			{children}
		</Providers>
		</body>
    </html>
  )
}
