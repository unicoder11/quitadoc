import type { Metadata } from 'next'
import { getCategoryBySlug, getBrandBySlug, getModelsByBrand } from '@/lib/fipe/mock-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ category: string; brand: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, brand } = await params
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)

  if (!categoryData || !brandData) {
    return {}
  }

  const title = `FIPE ${brandData.name} 2025 - Tabela de Preços | QuitaDoc`
  const description = `Consulte a tabela FIPE 2025 para ${brandData.name}. Preços atualizados diariamente com histórico de 12 meses de ${brandData.name.toLowerCase()}.`

  return {
    title,
    description,
    keywords: [`FIPE ${brandData.name}`, 'tabela FIPE', `${brandData.name} preço`],
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.quitadoc.com.br/fipe/${category}/${brand}`,
    },
  }
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ category: string; brand: string }>
}) {
  const { category, brand } = await params
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)

  if (!categoryData || !brandData) {
    notFound()
  }

  return children
}
