'use client'

import { useState, useEffect } from 'react'
import {
  VehicleType,
  FipeBrand,
  FipeModel,
  FipeYear,
  getFipeBrands,
  getFipeModels,
  getFipeYears,
} from '@/lib/fipe/api'
import { Button } from '@/components/ui/button'
import { ChevronDown, Loader2 } from 'lucide-react'

export interface VehicleSearchResult {
  type: VehicleType
  brandCode: string
  brandName: string
  modelCode: string
  modelName: string
  yearCode: string
  yearName: string
}

interface VehicleSelectorProps {
  onSearch?: (result: VehicleSearchResult) => void
}

const VEHICLE_TYPES: { value: VehicleType; label: string }[] = [
  { value: 'carros', label: 'Carros' },
  { value: 'motos', label: 'Motos' },
  { value: 'caminhoes', label: 'Caminhões' },
]

function SelectField({
  label,
  value,
  onChange,
  disabled,
  loading,
  children,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || loading}
          className="w-full appearance-none px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium pr-10 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {children}
        </select>
        {loading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : (
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
      </div>
    </div>
  )
}

export function VehicleSelector({ onSearch }: VehicleSelectorProps) {
  const [type, setType] = useState<VehicleType>('carros')

  const [brands, setBrands] = useState<FipeBrand[]>([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [loadingBrands, setLoadingBrands] = useState(false)

  const [models, setModels] = useState<FipeModel[]>([])
  const [selectedModel, setSelectedModel] = useState('')
  const [loadingModels, setLoadingModels] = useState(false)

  const [years, setYears] = useState<FipeYear[]>([])
  const [selectedYear, setSelectedYear] = useState('')
  const [loadingYears, setLoadingYears] = useState(false)

  // Load brands when type changes — reset downstream state immediately
  function changeType(newType: VehicleType) {
    setType(newType)
    setSelectedBrand('')
    setModels([])
    setSelectedModel('')
    setYears([])
    setSelectedYear('')
  }

  function changeBrand(brandCode: string) {
    setSelectedBrand(brandCode)
    setModels([])
    setSelectedModel('')
    setYears([])
    setSelectedYear('')
  }

  function changeModel(modelCode: string) {
    setSelectedModel(modelCode)
    setYears([])
    setSelectedYear('')
  }

  // Load brands when type changes
  useEffect(() => {
    setLoadingBrands(true)
    getFipeBrands(type)
      .then(setBrands)
      .catch(() => setBrands([]))
      .finally(() => setLoadingBrands(false))
  }, [type])

  // Load models when brand changes
  useEffect(() => {
    if (!selectedBrand) {
      setModels([])
      return
    }
    setLoadingModels(true)
    getFipeModels(type, selectedBrand)
      .then((data) => setModels(data.modelos))
      .catch(() => setModels([]))
      .finally(() => setLoadingModels(false))
  }, [type, selectedBrand])

  // Load years when model changes
  useEffect(() => {
    if (!selectedModel) {
      setYears([])
      return
    }
    setLoadingYears(true)
    getFipeYears(type, selectedBrand, selectedModel)
      .then(setYears)
      .catch(() => setYears([]))
      .finally(() => setLoadingYears(false))
  }, [type, selectedBrand, selectedModel])

  const handleSearch = () => {
    if (!selectedBrand || !selectedModel || !selectedYear) return
    const brandName = brands.find((b) => b.codigo === selectedBrand)?.nome ?? ''
    const modelName = models.find((m) => m.codigo === selectedModel)?.nome ?? ''
    const yearName = years.find((y) => y.codigo === selectedYear)?.nome ?? ''
    onSearch?.({ type, brandCode: selectedBrand, brandName, modelCode: selectedModel, modelName, yearCode: selectedYear, yearName })
  }

  const isComplete = selectedBrand && selectedModel && selectedYear

  return (
    <div className="w-full space-y-4">
      {/* Vehicle Type */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Tipo de Veículo</label>
        <div className="grid grid-cols-3 gap-2">
          {VEHICLE_TYPES.map((vt) => (
            <button
              key={vt.value}
              onClick={() => changeType(vt.value)}
              className={`p-2 rounded-lg border-2 transition-all font-medium text-sm ${
                type === vt.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {vt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <SelectField
        label="Marca"
        value={selectedBrand}
        onChange={changeBrand}
        loading={loadingBrands}
      >
        <option value="">Selecione uma marca...</option>
        {brands.map((b) => (
          <option key={b.codigo} value={b.codigo}>
            {b.nome}
          </option>
        ))}
      </SelectField>

      {/* Model */}
      <SelectField
        label="Modelo"
        value={selectedModel}
        onChange={changeModel}
        disabled={!selectedBrand}
        loading={loadingModels}
      >
        <option value="">Selecione um modelo...</option>
        {models.map((m) => (
          <option key={m.codigo} value={m.codigo}>
            {m.nome}
          </option>
        ))}
      </SelectField>

      {/* Year */}
      <SelectField
        label="Ano / Combustível"
        value={selectedYear}
        onChange={setSelectedYear}
        disabled={!selectedModel}
        loading={loadingYears}
      >
        <option value="">Selecione um ano...</option>
        {years.map((y) => (
          <option key={y.codigo} value={y.codigo}>
            {y.nome}
          </option>
        ))}
      </SelectField>

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
