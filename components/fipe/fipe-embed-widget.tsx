'use client'

import { VehicleSelector, VehicleSearchResult } from '@/components/fipe/vehicle-selector'
import { getFipePrice, FipeVehiclePrice } from '@/lib/fipe/api'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Loader2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export function FipeEmbedWidget() {
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
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge className="mx-auto bg-primary text-primary-foreground">
            Tabela FIPE 2026
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">
            Consulte Preços de Veículos
          </h1>
          <p className="text-muted-foreground">
            Preços oficiais da Tabela FIPE atualizados mensalmente
          </p>
        </div>

        {/* Search */}
        <div className="bg-card border border-border rounded-lg p-6">
          <VehicleSelector onSearch={handleSearch} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-8 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Consultando tabela FIPE...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Results */}
        {fipePrice && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              {fipePrice.Marca} {fipePrice.Modelo} {fipePrice.AnoModelo}
            </h2>

            {/* Price Display */}
            <div className="flex items-baseline gap-2 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <DollarSign className="h-6 w-6 text-primary shrink-0" />
              <span className="text-3xl font-bold text-primary">{fipePrice.Valor}</span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-muted-foreground text-xs mb-0.5">Combustível</p>
                <p className="font-semibold text-foreground">{fipePrice.Combustivel}</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-muted-foreground text-xs mb-0.5">Referência</p>
                <p className="font-semibold text-foreground capitalize">{fipePrice.MesReferencia}</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg col-span-2">
                <p className="text-muted-foreground text-xs mb-0.5">Código FIPE</p>
                <p className="font-semibold text-foreground">{fipePrice.CodigoFipe}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground py-4 border-t border-border">
              <p>Dados da Fundação Instituto de Pesquisas Econômicas — FIPE</p>
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

