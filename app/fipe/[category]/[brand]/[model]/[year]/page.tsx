'use client'

import { getCategoryBySlug, getBrandBySlug, getModelBySlug, generateFipePrice } from '@/lib/fipe/mock-data'
import { FipeResultCard } from '@/components/fipe/fipe-result-card'
import Link from 'next/link'
import { use } from 'react'

interface Props {
  params: Promise<{ category: string; brand: string; model: string; year: string }>
}

export default function YearPage({ params }: Props) {
  const { category, brand, model, year } = use(params)
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)
  const modelData = getModelBySlug(model)
  const yearNum = parseInt(year)

  if (!categoryData || !brandData || !modelData || !modelData.years.includes(yearNum)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Página não encontrada</h1>
          <Link href="/fipe" className="text-primary hover:underline">
            Voltar à tabela FIPE
          </Link>
        </div>
      </div>
    )
  }

  const fipePrice = generateFipePrice(modelData, yearNum, brandData.name)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Breadcrumb */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light py-12 md:py-16">
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="mb-6 text-sm text-primary-foreground/70 overflow-x-auto pb-2">
            <Link href="/fipe" className="hover:text-primary-foreground transition-colors whitespace-nowrap">
              Tabela FIPE
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/fipe/${category}`} className="hover:text-primary-foreground transition-colors whitespace-nowrap">
              {categoryData.name}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/fipe/${category}/${brand}`} className="hover:text-primary-foreground transition-colors whitespace-nowrap">
              {brandData.name}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/fipe/${category}/${brand}/${model}`} className="hover:text-primary-foreground transition-colors whitespace-nowrap">
              {modelData.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary-foreground font-semibold whitespace-nowrap">{year}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
            {brandData.name} {modelData.name} {year}
          </h1>
        </div>
      </section>

      {/* Result Card */}
      <section className="py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <FipeResultCard price={fipePrice} showChart={true} />
        </div>
      </section>

      {/* Related Models */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Outros anos do {brandData.name} {modelData.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {modelData.years.map((y) => (
              <Link
                key={y}
                href={`/fipe/${category}/${brand}/${model}/${y}`}
                className={`p-4 text-center rounded-lg border-2 transition-all font-semibold ${
                  yearNum === y
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {y}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
