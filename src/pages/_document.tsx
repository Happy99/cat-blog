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

        {/* TODO: fix this, bootstrap JS is in bootstrap package - no mental power now */}
        <Script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        />
      </body>
    </Html>
  )
}
