import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RaceTrack Pro - Realistic Racing Game',
  description: 'Experience the thrill of realistic racing with advanced physics, multiple tracks, and competitive gameplay',
  keywords: 'racing game, car racing, realistic physics, online racing, motorsport',
  authors: [{ name: 'RaceTrack Pro Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'RaceTrack Pro - Realistic Racing Game',
    description: 'Experience the thrill of realistic racing with advanced physics and multiple tracks',
    type: 'website',
    url: 'https://racetrack-pro.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RaceTrack Pro Racing Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RaceTrack Pro - Realistic Racing Game',
    description: 'Experience the thrill of realistic racing with advanced physics and multiple tracks',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-black text-white overflow-hidden select-none`}>
        <div id="game-root" className="w-full h-screen relative">
          {children}
        </div>
        <div id="portal-root" />
      </body>
    </html>
  )
}