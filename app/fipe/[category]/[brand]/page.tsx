'use client'

import { getCategoryBySlug, getBrandBySlug, getModelsByBrand, generateFipePrice } from '@/lib/fipe/mock-data'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { use } from 'react'

interface Props {
  params: Promise<{ category: string; brand: string }>
}

export default function BrandPage({ params }: Props) {
  const { category, brand } = use(params)
  const categoryData = getCategoryBySlug(category)
  const brandData = getBrandBySlug(brand)
  const models = getModelsByBrand(brandData?.id || '')

  if (!categoryData || !brandData) {
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
            <span className="text-primary-foreground font-semibold">{brandData.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-balance mb-4">
            Tabela FIPE {brandData.name}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Confira os preços de {brandData.name.toLowerCase()} com histórico de variação de preços
          </p>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Modelos {brandData.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <Link
                key={model.id}
                href={`/fipe/${category}/${brand}/${model.slug}`}
                className="group"
              >
                <Card className="p-6 hover:shadow-lg transition-all hover:border-primary cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {model.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {model.years.length} anos disponíveis
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Average Price Section */}
      {models.length > 0 && (
        <section className="py-12 md:py-20 bg-secondary/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Faixa de Preços {brandData.name}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Modelo Mais Barato</p>
                <p className="text-2xl font-bold text-primary">
                  R$ 25.000 - 35.000
                </p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Preço Médio</p>
                <p className="text-2xl font-bold text-primary">
                  R$ 40.000 - 60.000
                </p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Modelo Mais Caro</p>
                <p className="text-2xl font-bold text-primary">
                  R$ 70.000+
                </p>
              </Card>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
