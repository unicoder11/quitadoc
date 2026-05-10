// Mock FIPE data for demonstration
// This will be replaced with actual FIPE API integration

export interface FipeCategory {
  id: string
  name: string
  slug: string
}

export interface FipeBrand {
  id: string
  name: string
  slug: string
  categoryId: string
}

export interface FipeModel {
  id: string
  name: string
  slug: string
  brandId: string
  years: number[]
}

export interface FipePrice {
  id: string
  modelId: string
  year: number
  price: number
  fipeCode: string
  brand: string
  model: string
  priceHistory: PriceHistoryPoint[]
}

export interface PriceHistoryPoint {
  month: string
  price: number
  change: number
}

// FIPE Categories (mock data)
export const FIPE_CATEGORIES: FipeCategory[] = [
  { id: '1', name: 'Carros', slug: 'carros' },
  { id: '2', name: 'Motos', slug: 'motos' },
  { id: '3', name: 'Caminhões', slug: 'caminhoes' },
]

// FIPE Brands (mock data for Carros category)
export const FIPE_BRANDS: FipeBrand[] = [
  { id: '1', name: 'Fiat', slug: 'fiat', categoryId: '1' },
  { id: '2', name: 'Volkswagen', slug: 'volkswagen', categoryId: '1' },
  { id: '3', name: 'Ford', slug: 'ford', categoryId: '1' },
  { id: '4', name: 'Chevrolet', slug: 'chevrolet', categoryId: '1' },
  { id: '5', name: 'Hyundai', slug: 'hyundai', categoryId: '1' },
  { id: '6', name: 'Renault', slug: 'renault', categoryId: '1' },
  { id: '7', name: 'Peugeot', slug: 'peugeot', categoryId: '1' },
  { id: '8', name: 'Honda', slug: 'honda', categoryId: '1' },
  { id: '9', name: 'Toyota', slug: 'toyota', categoryId: '1' },
  { id: '10', name: 'Citroën', slug: 'citroen', categoryId: '1' },
]

// FIPE Models (mock data)
export const FIPE_MODELS: FipeModel[] = [
  {
    id: '1',
    name: 'Uno',
    slug: 'uno',
    brandId: '1',
    years: [2020, 2021, 2022, 2023, 2024, 2025],
  },
  {
    id: '2',
    name: 'Argo',
    slug: 'argo',
    brandId: '1',
    years: [2021, 2022, 2023, 2024, 2025],
  },
  {
    id: '3',
    name: 'Cronos',
    slug: 'cronos',
    brandId: '1',
    years: [2020, 2021, 2022, 2023, 2024, 2025],
  },
  {
    id: '4',
    name: 'Gol',
    slug: 'gol',
    brandId: '2',
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  },
  {
    id: '5',
    name: 'Polo',
    slug: 'polo',
    brandId: '2',
    years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
  },
]

// Generate realistic price history
function generatePriceHistory(basePrice: number): PriceHistoryPoint[] {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const history: PriceHistoryPoint[] = []
  let currentPrice = basePrice * 0.85 // Start 15% lower

  for (let i = 0; i < 12; i++) {
    const change = (Math.random() - 0.45) * 1000 // Random fluctuation
    currentPrice += change
    history.push({
      month: months[i],
      price: Math.round(currentPrice),
      change: Math.round(change),
    })
  }

  return history
}

// Generate mock FIPE prices for different years
export function generateFipePrice(
  model: FipeModel,
  year: number,
  brandName: string
): FipePrice {
  const basePrice = 30000 + Math.random() * 50000
  const ageAdjustment = (2025 - year) * 2000 // Depreciation
  const adjustedPrice = Math.max(basePrice - ageAdjustment, 10000)

  return {
    id: `${model.id}-${year}`,
    modelId: model.id,
    year,
    price: Math.round(adjustedPrice),
    fipeCode: `${year}${model.id}${year % 10}`,
    brand: brandName,
    model: model.name,
    priceHistory: generatePriceHistory(adjustedPrice),
  }
}

// Helper functions to get data
export function getCategories(): FipeCategory[] {
  return FIPE_CATEGORIES
}

export function getBrandsByCategory(categoryId: string): FipeBrand[] {
  return FIPE_BRANDS.filter((brand) => brand.categoryId === categoryId)
}

export function getModelsByBrand(brandId: string): FipeModel[] {
  return FIPE_MODELS.filter((model) => model.brandId === brandId)
}

export function getModelBySlug(slug: string): FipeModel | undefined {
  return FIPE_MODELS.find((model) => model.slug === slug)
}

export function getBrandBySlug(slug: string): FipeBrand | undefined {
  return FIPE_BRANDS.find((brand) => brand.slug === slug)
}

export function getCategoryBySlug(slug: string): FipeCategory | undefined {
  return FIPE_CATEGORIES.find((cat) => cat.slug === slug)
}

// Search function
export function searchModels(query: string, brandId?: string): FipeModel[] {
  let results = FIPE_MODELS.filter(
    (model) =>
      model.name.toLowerCase().includes(query.toLowerCase()) &&
      (!brandId || model.brandId === brandId)
  )
  return results.slice(0, 10)
}

export function searchBrands(query: string, categoryId?: string): FipeBrand[] {
  let results = FIPE_BRANDS.filter(
    (brand) =>
      brand.name.toLowerCase().includes(query.toLowerCase()) &&
      (!categoryId || brand.categoryId === categoryId)
  )
  return results.slice(0, 10)
}
