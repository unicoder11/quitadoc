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
  // Fiat (brandId: 1)
  { id: '1', name: 'Uno', slug: 'uno', brandId: '1', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '2', name: 'Argo', slug: 'argo', brandId: '1', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '3', name: 'Cronos', slug: 'cronos', brandId: '1', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '4', name: 'Mobi', slug: 'mobi', brandId: '1', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '5', name: 'Toro', slug: 'toro', brandId: '1', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Volkswagen (brandId: 2)
  { id: '6', name: 'Gol', slug: 'gol', brandId: '2', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '7', name: 'Polo', slug: 'polo', brandId: '2', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '8', name: 'Virtus', slug: 'virtus', brandId: '2', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '9', name: 'T-Cross', slug: 't-cross', brandId: '2', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '10', name: 'Nivus', slug: 'nivus', brandId: '2', years: [2021, 2022, 2023, 2024, 2025] },
  // Ford (brandId: 3)
  { id: '11', name: 'Ka', slug: 'ka', brandId: '3', years: [2018, 2019, 2020, 2021] },
  { id: '12', name: 'Ka Sedan', slug: 'ka-sedan', brandId: '3', years: [2018, 2019, 2020, 2021] },
  { id: '13', name: 'EcoSport', slug: 'ecosport', brandId: '3', years: [2018, 2019, 2020, 2021, 2022] },
  { id: '14', name: 'Ranger', slug: 'ranger', brandId: '3', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '15', name: 'Bronco', slug: 'bronco', brandId: '3', years: [2022, 2023, 2024, 2025] },
  // Chevrolet (brandId: 4)
  { id: '16', name: 'Onix', slug: 'onix', brandId: '4', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '17', name: 'Onix Plus', slug: 'onix-plus', brandId: '4', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '18', name: 'Tracker', slug: 'tracker', brandId: '4', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '19', name: 'S10', slug: 's10', brandId: '4', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '20', name: 'Montana', slug: 'montana', brandId: '4', years: [2023, 2024, 2025] },
  // Hyundai (brandId: 5)
  { id: '21', name: 'HB20', slug: 'hb20', brandId: '5', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '22', name: 'HB20S', slug: 'hb20s', brandId: '5', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '23', name: 'Creta', slug: 'creta', brandId: '5', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '24', name: 'Tucson', slug: 'tucson', brandId: '5', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Renault (brandId: 6)
  { id: '25', name: 'Kwid', slug: 'kwid', brandId: '6', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '26', name: 'Sandero', slug: 'sandero', brandId: '6', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: '27', name: 'Logan', slug: 'logan', brandId: '6', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: '28', name: 'Duster', slug: 'duster', brandId: '6', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Peugeot (brandId: 7)
  { id: '29', name: '208', slug: '208', brandId: '7', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '30', name: '2008', slug: '2008', brandId: '7', years: [2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '31', name: '3008', slug: '3008', brandId: '7', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  // Honda (brandId: 8)
  { id: '32', name: 'Civic', slug: 'civic', brandId: '8', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '33', name: 'City', slug: 'city', brandId: '8', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '34', name: 'HR-V', slug: 'hr-v', brandId: '8', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '35', name: 'Fit', slug: 'fit', brandId: '8', years: [2018, 2019, 2020, 2021] },
  // Toyota (brandId: 9)
  { id: '36', name: 'Corolla', slug: 'corolla', brandId: '9', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '37', name: 'Corolla Cross', slug: 'corolla-cross', brandId: '9', years: [2021, 2022, 2023, 2024, 2025] },
  { id: '38', name: 'Hilux', slug: 'hilux', brandId: '9', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: '39', name: 'Yaris', slug: 'yaris', brandId: '9', years: [2019, 2020, 2021, 2022, 2023] },
  // Citroen (brandId: 10)
  { id: '40', name: 'C3', slug: 'c3', brandId: '10', years: [2022, 2023, 2024, 2025] },
  { id: '41', name: 'C4 Cactus', slug: 'c4-cactus', brandId: '10', years: [2019, 2020, 2021, 2022, 2023] },
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
