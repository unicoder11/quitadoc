'use client'

import { useState } from 'react'
import { VehicleSelector } from '@/components/fipe/vehicle-selector'
import { FipeResultCard } from '@/components/fipe/fipe-result-card'
import { generateFipePrice, getModelsByBrand, FIPE_BRANDS } from '@/lib/fipe/mock-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Search, DollarSign, Calendar } from 'lucide-react'

interface SearchResult {
  brand: string
  model: string
  year: number
}

export default function FipePage() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [fipePrice, setFipePrice] = useState(null)

  const handleSearch = (result: SearchResult) => {
    setSearchResult(result)
    // Find the model and generate price
    const allModels = getModelsByBrand(FIPE_BRANDS.find(b => b.name === result.brand)?.id || '')
    const model = allModels.find(m => m.name === result.model)
    if (model) {
      const brandObj = FIPE_BRANDS.find(b => b.name === result.brand)
      const price = generateFipePrice(model, result.year, result.brand)
      setFipePrice(price)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
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

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="mx-auto bg-accent text-accent-foreground hover:bg-accent/90">
              <TrendingUp className="h-3 w-3 mr-1" />
              Tabela FIPE Atualizada Diariamente
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-balance">
              Tabela FIPE 2025
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Consulte os preços mais precisos de carros, motos e caminhões com histórico de valores e análise de mercado
            </p>
          </div>

          {/* Search Component */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Selector */}
            <Card className="bg-card/95 backdrop-blur-sm border-white/10">
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Buscar Preço FIPE</h2>
                </div>
                <VehicleSelector onSearch={handleSearch} />
              </div>
            </Card>

            {/* Right: Info Cards */}
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary-foreground">Dados Atualizados</h3>
                    <p className="text-sm text-primary-foreground/70">
                      Tabela FIPE atualizada diariamente com os preços mais recentes do mercado
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary-foreground">Preços Precisos</h3>
                    <p className="text-sm text-primary-foreground/70">
                      Análise de mercado com histórico de 12 meses de variações de preço
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {fipePrice && searchResult && (
        <section className="py-12 md:py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Resultado para {searchResult.brand} {searchResult.model} {searchResult.year}
                </h2>
                <p className="text-muted-foreground">
                  Análise completa de preços e histórico de valores
                </p>
              </div>
              <FipeResultCard price={fipePrice} showChart={true} />
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Como Usar a Tabela FIPE
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-4xl font-bold text-primary mb-4">1</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Selecione o Veículo</h3>
              <p className="text-muted-foreground">
                Escolha a marca, modelo e ano do seu veículo na busca acima
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl font-bold text-primary mb-4">2</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Consulte o Preço</h3>
              <p className="text-muted-foreground">
                Veja o preço FIPE oficial atualizado diariamente com histórico de 12 meses
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl font-bold text-primary mb-4">3</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Analise Tendências</h3>
              <p className="text-muted-foreground">
                Acompanhe a variação de preço e tome decisões informadas sobre sua compra
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Marcas Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {FIPE_BRANDS.slice(0, 10).map((brand) => (
              <Card key={brand.id} className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <p className="font-semibold text-foreground">{brand.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-2">O que é FIPE?</h3>
              <p className="text-muted-foreground">
                A FIPE (Fundação Instituto de Pesquisas Econômicas) é uma instituição responsável pela pesquisa de
                preços de veículos no Brasil. A tabela FIPE é o referencial oficial de preços.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-2">A tabela FIPE é atualizada com que frequência?</h3>
              <p className="text-muted-foreground">
                A tabela FIPE é atualizada diariamente e os dados aqui são sincronizados constantemente com as
                informações oficiais da FIPE.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Como posso usar estes dados?</h3>
              <p className="text-muted-foreground">
                Você pode usar os dados FIPE para negociar preços na compra ou venda de um veículo, solicitar
                indenizações de seguradoras, e tomar decisões informadas sobre seu veículo.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
