import { Metadata } from 'next'
import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Applifting Blog',
  description: 'Applifting Blog',
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon1.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png' }],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </Html>
  )
}
