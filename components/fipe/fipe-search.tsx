'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { searchBrands, searchModels, getBrandBySlug, FipeBrand, FipeModel, FIPE_BRANDS } from '@/lib/fipe/mock-data'
import { Search, X } from 'lucide-react'

interface FipeSearchProps {
  onSelect?: (result: { type: 'brand' | 'model'; data: FipeBrand | FipeModel }) => void
  placeholder?: string
  categoryId?: string
}

export function FipeSearch({ onSelect, placeholder = 'Busque marca ou modelo...', categoryId = '1' }: FipeSearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [brands, setBrands] = useState<FipeBrand[]>([])
  const [models, setModels] = useState<FipeModel[]>([])
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setBrands([])
      setModels([])
      setIsOpen(false)
      return
    }

    setLoading(true)
    const timer = setTimeout(() => {
      const searchedBrands = searchBrands(query, categoryId)
      const searchedModels = searchModels(query)
      setBrands(searchedBrands)
      setModels(searchedModels)
      setIsOpen(true)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, categoryId])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = useCallback((type: 'brand' | 'model', data: FipeBrand | FipeModel) => {
    onSelect?.({ type, data })
    setQuery('')
    setIsOpen(false)
  }, [onSelect])

  const totalResults = brands.length + models.length

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="pl-10 pr-10 py-3 text-base"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setBrands([])
              setModels([])
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">Buscando...</div>
          ) : totalResults === 0 ? (
            <div className="p-4 text-center text-muted-foreground">Nenhum resultado encontrado</div>
          ) : (
            <div className="divide-y">
              {/* Brands Section */}
              {brands.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-secondary">
                    Marcas
                  </div>
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => handleSelect('brand', brand)}
                      className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors"
                    >
                      <div className="font-medium">{brand.name}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Models Section */}
              {models.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-secondary">
                    Modelos
                  </div>
                  {models.map((model) => {
                    const brand = getBrandBySlug(model.brandId)
                    return (
                      <button
                        key={model.id}
                        onClick={() => handleSelect('model', model)}
                        className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors"
                      >
                        <div className="font-medium">{model.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {FIPE_BRANDS.find(b => b.id === model.brandId)?.name}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
