import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tabela FIPE 2025 - Preços de Carros, Motos e Caminhões | QuitaDoc',
  description: 'Consulte a tabela FIPE 2025 com preços atualizados diariamente. Encontre o valor do seu carro, moto ou caminhão com histórico de 12 meses. Análise precisa e atualizada.',
  keywords: ['FIPE', 'tabela FIPE 2025', 'preço de carros', 'preço de motos', 'preço de caminhões', 'valor FIPE', 'consultoria FIPE', 'histórico de preços'],
  openGraph: {
    title: 'Tabela FIPE 2025 - Preços Atualizados',
    description: 'Consulte preços FIPE atualizados diariamente com histórico de 12 meses. Análise completa de mercado automotivo.',
    type: 'website',
    url: 'https://www.quitadoc.com.br/fipe',
    siteName: 'QuitaDoc',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tabela FIPE 2025 - Preços Atualizados',
    description: 'Consulte preços FIPE atualizados diariamente com histórico de 12 meses.',
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
  alternates: {
    canonical: 'https://www.quitadoc.com.br/fipe',
  },
}

export default function FipeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
