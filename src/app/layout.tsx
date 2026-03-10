import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Dr. Detoxer — Wash Smart. Live Safe.',
  description:
    'Dr. Detoxer is a natural vegetable & fruit wash liquid that removes pesticides, bacteria, and dirt using Neem, Tulsi, and Lemon extracts. Safe for daily family use.',
  keywords: ['vegetable wash', 'fruit wash', 'pesticide remover', 'natural wash liquid', 'Dr Detoxer', 'food safety'],
  openGraph: {
    title: 'Dr. Detoxer — Wash Smart. Live Safe.',
    description:
      'Remove pesticides, bacteria & dirt from your produce with Dr. Detoxer — made from Neem, Tulsi & Lemon extracts.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Detoxer — Wash Smart. Live Safe.',
    description: 'Natural vegetable & fruit wash. Removes pesticides, bacteria & dirt safely.',
    images: ['/assets/images/app_logo.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Dr. Detoxer Vegetable & Fruit Wash Liquid',
              description:
                'Natural vegetable and fruit wash liquid that removes pesticides, bacteria, and dirt using Neem, Tulsi, and Lemon extracts.',
              brand: { '@type': 'Brand', name: 'Dr. Detoxer' },
              offers: {
                '@type': 'Offer',
                price: '299',
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fdrdetoxer3490back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body>
        {children}
      </body>
    </html>
  );
}