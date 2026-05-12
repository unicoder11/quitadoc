'use client'

import { useState } from 'react'
import { VehicleSelector, VehicleSearchResult } from '@/components/fipe/vehicle-selector'
import { getFipePrice, FipeVehiclePrice, parseValorFipe } from '@/lib/fipe/api'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Search, DollarSign, Calendar, Loader2, AlertCircle, Car, Tag, Fuel, Hash } from 'lucide-react'

export default function FipePage() {
  const [fipePrice, setFipePrice] = useState<FipeVehiclePrice | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (result: VehicleSearchResult) => {
    setLoading(true)
    setError(null)
    setFipePrice(null)
    try {
      const price = await getFipePrice(result.type, result.brandCode, result.modelCode, result.yearCode)
      setFipePrice(price)
    } catch {
      setError('Não foi possível obter o preço. Tente novamente.')
    } finally {
      setLoading(false)
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
              Tabela FIPE 2026
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
      {(loading || error || fipePrice) && (
        <section className="py-12 md:py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {loading && (
              <div className="flex items-center justify-center gap-3 py-12 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-lg">Consultando tabela FIPE...</span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {fipePrice && (
              <Card className="overflow-hidden">
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {fipePrice.Marca} {fipePrice.Modelo}
                      </h2>
                      <p className="text-muted-foreground">{fipePrice.AnoModelo} · {fipePrice.Combustivel}</p>
                    </div>
                    <Badge variant="outline" className="self-start">
                      Cód. FIPE: {fipePrice.CodigoFipe}
                    </Badge>
                  </div>

                  {/* Price */}
                  <div className="p-5 bg-primary/5 rounded-xl border border-primary/10 flex items-baseline gap-3">
                    <DollarSign className="h-7 w-7 text-primary shrink-0" />
                    <span className="text-4xl font-bold text-primary">{fipePrice.Valor}</span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-secondary rounded-lg space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Car className="h-3.5 w-3.5" /> Tipo
                      </div>
                      <p className="font-semibold text-foreground text-sm">
                        {fipePrice.TipoVeiculo === 1 ? 'Carro' : fipePrice.TipoVeiculo === 2 ? 'Moto' : 'Caminhão'}
                      </p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Fuel className="h-3.5 w-3.5" /> Combustível
                      </div>
                      <p className="font-semibold text-foreground text-sm">{fipePrice.Combustivel}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Tag className="h-3.5 w-3.5" /> Referência
                      </div>
                      <p className="font-semibold text-foreground text-sm capitalize">{fipePrice.MesReferencia}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Hash className="h-3.5 w-3.5" /> Ano Modelo
                      </div>
                      <p className="font-semibold text-foreground text-sm">{fipePrice.AnoModelo}</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Fonte: Fundação Instituto de Pesquisas Econômicas — FIPE. Preço médio de mercado, sem garantia de valor de venda.
                  </p>
                </div>
              </Card>
            )}
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

      {/* Popular Brands (static list for SEO) */}
      <section className="py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Marcas Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Fiat', 'Volkswagen', 'Chevrolet', 'Ford', 'Hyundai', 'Renault', 'Honda', 'Toyota', 'Jeep', 'Peugeot'].map((brand) => (
              <Card key={brand} className="p-4 text-center hover:shadow-lg transition-shadow">
                <p className="font-semibold text-foreground">{brand}</p>
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
