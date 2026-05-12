import type { Metadata } from 'next'
import { getCategoryBySlug, getBrandBySlug, getModelBySlug } from '@/lib/fipe/mock-data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ category: string; brand: string; model: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, brand, model } = await params
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)
  const modelData = getModelBySlug(model)

  if (!categoryData || !brandData || !modelData) {
    return {}
  }

  const title = `Preço FIPE ${brandData.name} ${modelData.name} 2025 | QuitaDoc`
  const description = `Consulte o preço FIPE 2026 do ${brandData.name} ${modelData.name}. Tabela de preços por ano com histórico de 12 meses.`

  return {
    title,
    description,
    keywords: [`${brandData.name} ${modelData.name}`, 'FIPE', 'preço'],
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.quitadoc.com.br/fipe/${category}/${brand}/${model}`,
    },
  }
}

export default async function ModelLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ category: string; brand: string; model: string }>
}) {
  const { category, brand, model } = await params
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)
  const modelData = getModelBySlug(model)

  if (!categoryData || !brandData || !modelData) {
    notFound()
  }

  return children
}
