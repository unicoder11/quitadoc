'use client'

import { getCategoryBySlug, getBrandBySlug, getModelBySlug, generateFipePrice } from '@/lib/fipe/mock-data'
import { FipeResultCard } from '@/components/fipe/fipe-result-card'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { use } from 'react'

interface Props {
  params: Promise<{ category: string; brand: string; model: string }>
}

export default function ModelPage({ params }: Props) {
  const { category, brand, model } = use(params)
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)
  const modelData = getModelBySlug(model)

  if (!categoryData || !brandData || !modelData) {
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

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light py-12 md:py-20">
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

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <nav className="mb-8 text-sm">
            <Link href="/fipe" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Tabela FIPE
            </Link>
            <span className="text-primary-foreground/70 mx-2">/</span>
            <Link href={`/fipe/${category}`} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              {categoryData.name}
            </Link>
            <span className="text-primary-foreground/70 mx-2">/</span>
            <Link href={`/fipe/${category}/${brand}`} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              {brandData.name}
            </Link>
            <span className="text-primary-foreground/70 mx-2">/</span>
            <span className="text-primary-foreground font-semibold">{modelData.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-balance mb-4">
            {brandData.name} {modelData.name}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Preços FIPE 2025 por ano com histórico de 12 meses
          </p>
        </div>
      </section>

      {/* Years Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            Anos disponíveis para {brandData.name} {modelData.name}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modelData.years.map((year) => {
              const price = generateFipePrice(modelData, year, brandData.name)
              return (
                <Link
                  key={year}
                  href={`/fipe/${category}/${brand}/${model}/${year}`}
                  className="group"
                >
                  <Card className="p-6 hover:shadow-lg transition-all hover:border-primary cursor-pointer h-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {year}
                        </h3>
                        <p className="text-lg font-semibold text-primary mt-2">
                          {price.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {brandData.name} {modelData.name}
          </h2>
          <p className="text-muted-foreground mb-4">
            Clique em qualquer ano acima para ver o preço completo FIPE com histórico de 12 meses de variação de preços.
          </p>
          <p className="text-muted-foreground">
            Use os dados para negociar melhores preços, solicitar indenizações de seguradoras ou tomar decisões informadas sobre compra e venda.
          </p>
        </div>
      </section>
    </main>
  )
}
