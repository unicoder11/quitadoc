import type { Metadata } from 'next'
import { getCategoryBySlug, getBrandsByCategory } from '@/lib/fipe/mock-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const categoryData = getCategoryBySlug(category)

  if (!categoryData) {
    return {}
  }

  const title = `Tabela FIPE ${categoryData.name} 2025 - Preços Atualizados | QuitaDoc`
  const description = `Consulte a tabela FIPE 2025 para ${categoryData.name}. Preços atualizados diariamente com histórico de 12 meses. Análise precisa de mercado.`

  return {
    title,
    description,
    keywords: [`FIPE ${categoryData.name}`, 'tabela FIPE', `preço ${categoryData.name}`],
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.quitadoc.com.br/fipe/${category}`,
    },
  }
}

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const categoryData = getCategoryBySlug(category)

  if (!categoryData) {
    notFound()
  }

  return children
}
