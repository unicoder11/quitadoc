import type { Metadata } from 'next'
import { getCategoryBySlug, getBrandBySlug, getModelBySlug } from '@/lib/fipe/mock-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ category: string; brand: string; model: string; year: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, brand, model, year } = await params
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)
  const modelData = getModelBySlug(model)
  const yearNum = parseInt(year)

  if (!categoryData || !brandData || !modelData) {
    return {}
  }

  const title = `${brandData.name} ${modelData.name} ${year} - Preço FIPE 2025 | QuitaDoc`
  const description = `Preço FIPE ${year} do ${brandData.name} ${modelData.name}. Veja o histórico de 12 meses de variação de preços e análise de mercado.`

  return {
    title,
    description,
    keywords: [`${brandData.name} ${modelData.name} ${year}`, 'FIPE', 'preço veículo'],
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.quitadoc.com.br/fipe/${category}/${brand}/${model}/${year}`,
    },
  }
}

export default async function YearLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ category: string; brand: string; model: string; year: string }>
}) {
  const { category, brand, model, year } = await params
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)
  const modelData = getModelBySlug(model)
  const yearNum = parseInt(year)

  if (!categoryData || !brandData || !modelData || !modelData.years.includes(yearNum)) {
    notFound()
  }

  return children
}
