'use client'

import { VehicleSelector } from '@/components/fipe/vehicle-selector'
import { PriceHistoryChart } from '@/components/fipe/price-history-chart'
import { generateFipePrice, getModelsByBrand, FIPE_BRANDS } from '@/lib/fipe/mock-data'
import { Badge } from '@/components/ui/badge'
import { DollarSign } from 'lucide-react'
import { useState } from 'react'

interface SearchResult {
  brand: string
  model: string
  year: number
}

export function FipeEmbedWidget() {
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
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge className="mx-auto bg-primary text-primary-foreground">
            Tabela FIPE 2025
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">
            Consulte Preços de Veículos
          </h1>
          <p className="text-muted-foreground">
            Tabela FIPE atualizada diariamente com histórico de preços
          </p>
        </div>

        {/* Search */}
        <div className="bg-card border border-border rounded-lg p-6">
          <VehicleSelector onSearch={handleSearch} />
        </div>

        {/* Results */}
        {fipePrice && searchResult && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {searchResult.brand} {searchResult.model} {searchResult.year}
              </h2>
              <p className="text-muted-foreground">
                Análise de preço e histórico de 12 meses
              </p>
            </div>

            {/* Price Display */}
            <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-baseline gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <span className="text-4xl font-bold text-primary">
                  {fipePrice.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-card border border-border rounded-lg p-4">
              <PriceHistoryChart data={fipePrice.priceHistory} height={250} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-secondary rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Máximo</p>
                <p className="font-bold text-foreground">
                  {Math.max(...fipePrice.priceHistory.map(p => p.price)).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="p-3 bg-secondary rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Médio</p>
                <p className="font-bold text-foreground">
                  {Math.round(fipePrice.priceHistory.reduce((sum, p) => sum + p.price, 0) / fipePrice.priceHistory.length).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="p-3 bg-secondary rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Mínimo</p>
                <p className="font-bold text-foreground">
                  {Math.min(...fipePrice.priceHistory.map(p => p.price)).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground py-4 border-t border-border">
              <p>Dados atualizados diariamente pela FIPE</p>
              <p>
                <a href="https://www.quitadoc.com.br/fipe" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Ver tabela completa →
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
