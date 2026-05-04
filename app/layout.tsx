import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppChat } from '@/components/layout/whatsapp-chat'
import { StickyCTAMobile } from '@/components/layout/sticky-cta-mobile'
import { LocalBusinessSchema, OrganizationSchema, WebsiteSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/schemas/local-business-schema'
import { UrgencyTicker } from '@/components/sections/urgency-ticker'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Cancelar Busca e Apreensão de Veículo | 87% Taxa de Sucesso | Quitadoc',
    template: '%s | Quitadoc'
  },
  description: 'Cancele a busca e apreensão do seu veículo com defesa jurídica especializada. 87% taxa de sucesso. Success fee de 10%. Atuação nacional. Consulta gratuita em 2h. ☎ (21) 99607-6746',
  keywords: ['busca e apreensão', 'cancelar busca apreensão', 'alienação fiduciária', 'revisão contrato financiamento', 'juros abusivos veículo', 'purgação mora', 'defesa veicular', 'advogado busca apreensão', 'leilão de veículo'],
  authors: [{ name: 'Quitadoc', url: 'https://www.quitadoc.com.br' }],
  creator: 'Quitadoc',
  metadataBase: new URL('https://www.quitadoc.com.br'),
  alternates: {
    canonical: 'https://www.quitadoc.com.br',
    types: {
      'application/rss+xml': 'https://www.quitadoc.com.br/feed.xml',
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.quitadoc.com.br',
    siteName: 'Quitadoc',
    title: 'Quitadoc - Cancele a Busca e Apreensão do Seu Veículo',
    description: 'Defesa jurídica especializada com 87% de taxa de sucesso. Você só paga se ganhar (10%). Resposta em até 2 horas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Quitadoc - Especialistas em Cancelamento de Busca e Apreensão',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancele a Busca e Apreensão do Seu Veículo | Quitadoc',
    description: '87% taxa de sucesso. Success fee 10%. Consulta gratuita em 2h.',
    images: ['/og-image.jpg'],
    creator: '@quitadoc',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ue8UKysbDiYxd9fdmZpy7tHnOW6ejeXMeoWJ-K4Zcpk',
  },
  category: 'Business',
  classification: 'Legal Services',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceMono.variable} bg-background`}>
      <head>
        {/* Google tag (gtag.js) — GA4 + Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18041490066"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WV9XQE3ZGQ');
            gtag('config', 'AW-18041490066');
          `}
        </Script>
        {/* Google Ads — Page View Conversion */}
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            gtag('event', 'conversion', {
                'send_to': 'AW-18041490066/39AXCJHdwY8cEJKV7ZpD',
                'value': 1.0,
                'currency': 'BRL'
            });
          `}
        </Script>
        {/* Schema.org Structured Data */}
        <LocalBusinessSchema />
        <OrganizationSchema />
        <WebsiteSchema />
        <BreadcrumbSchema />
        <FAQPageSchema />
        
        {/* Geo Meta Tags */}
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Rio de Janeiro" />
        <meta name="geo.position" content="-22.9068;-43.1729" />
        <meta name="ICBM" content="-22.9068, -43.1729" />
        
        {/* Contact Meta Tags */}
        <meta name="contact" content="contato@quitadoc.com.br" />
        <meta name="author" content="Quitadoc" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <UrgencyTicker />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppChat />
        <StickyCTAMobile />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
