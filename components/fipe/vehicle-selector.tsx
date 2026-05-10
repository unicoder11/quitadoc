'use client'

import { useState, useMemo } from 'react'
import { getCategories, getBrandsByCategory, getModelsByBrand, generateFipePrice } from '@/lib/fipe/mock-data'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface VehicleSelectorProps {
  onSearch?: (result: { brand: string; model: string; year: number }) => void
}

export function VehicleSelector({ onSearch }: VehicleSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('1')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')

  const categories = getCategories()
  const brands = useMemo(() => getBrandsByCategory(selectedCategory), [selectedCategory])
  const models = useMemo(() => (selectedBrand ? getModelsByBrand(selectedBrand) : []), [selectedBrand])
  const years = useMemo(() => {
    const model = models.find((m) => m.id === selectedModel)
    return model ? model.years.sort((a, b) => b - a) : []
  }, [selectedModel, models])

  const handleSearch = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      const brandName = brands.find((b) => b.id === selectedBrand)?.name || ''
      const modelName = models.find((m) => m.id === selectedModel)?.name || ''
      onSearch?.({
        brand: brandName,
        model: modelName,
        year: parseInt(selectedYear),
      })
    }
  }

  const isComplete = selectedBrand && selectedModel && selectedYear

  return (
    <div className="w-full space-y-4">
      {/* Category Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Tipo de Veículo</label>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id)
                setSelectedBrand('')
                setSelectedModel('')
                setSelectedYear('')
              }}
              className={`p-2 rounded-lg border-2 transition-all font-medium text-sm ${
                selectedCategory === cat.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Marca</label>
        <div className="relative">
          <select
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value)
              setSelectedModel('')
              setSelectedYear('')
            }}
            className="w-full appearance-none px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium pr-10 focus:border-primary focus:outline-none"
          >
            <option value="">Selecione uma marca...</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Model Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Modelo</label>
        <div className="relative">
          <select
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value)
              setSelectedYear('')
            }}
            disabled={!selectedBrand}
            className="w-full appearance-none px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium pr-10 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Selecione um modelo...</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Year Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Ano</label>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            disabled={!selectedModel}
            className="w-full appearance-none px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium pr-10 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Selecione um ano...</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        disabled={!isComplete}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2.5"
      >
        Consultar Preço FIPE
      </Button>
    </div>
  )
}
