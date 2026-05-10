'use client'

import { FipePrice } from '@/lib/fipe/mock-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { PriceHistoryChart } from './price-history-chart'

interface FipeResultCardProps {
  price: FipePrice
  showChart?: boolean
}

export function FipeResultCard({ price, showChart = true }: FipeResultCardProps) {
  const lastMonth = price.priceHistory[price.priceHistory.length - 1]
  const previousMonth = price.priceHistory[price.priceHistory.length - 2]
  const monthlyChange = lastMonth?.price - (previousMonth?.price || lastMonth?.price)
  const changePercentage = previousMonth ? ((monthlyChange / previousMonth.price) * 100).toFixed(1) : '0'
  const isPositive = monthlyChange >= 0

  // Calculate year-over-year stats
  const maxPrice = Math.max(...price.priceHistory.map(p => p.price))
  const minPrice = Math.min(...price.priceHistory.map(p => p.price))
  const avgPrice = Math.round(price.priceHistory.reduce((sum, p) => sum + p.price, 0) / price.priceHistory.length)

  return (
    <Card className="w-full overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {price.brand} {price.model}
              </h2>
              <p className="text-lg text-muted-foreground font-medium">{price.year}</p>
            </div>
            <Badge variant="outline" className="text-sm font-medium">
              Código FIPE: {price.fipeCode}
            </Badge>
          </div>
        </div>

        {/* Price Display */}
        <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex items-baseline gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-4xl font-bold text-primary">
              {price.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-destructive" />
            ) : (
              <TrendingDown className="h-4 w-4 text-success" />
            )}
            <span
              className={`text-sm font-semibold ${
                isPositive ? 'text-destructive' : 'text-success'
              }`}
            >
              {isPositive ? '+' : ''}{changePercentage}% este mês
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground font-medium mb-1">Preço Máximo</p>
            <p className="text-lg font-bold text-foreground">
              {maxPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground font-medium mb-1">Preço Médio</p>
            <p className="text-lg font-bold text-foreground">
              {avgPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground font-medium mb-1">Preço Mínimo</p>
            <p className="text-lg font-bold text-foreground">
              {minPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>

        {/* Price History Chart */}
        {showChart && (
          <div className="pt-4 border-t border-border">
            <PriceHistoryChart data={price.priceHistory} />
          </div>
        )}

        {/* Footer Info */}
        <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
          <p>Dados atualizados diariamente pela FIPE</p>
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </Card>
  )
}
