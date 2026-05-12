// FIPE API Client - Using Parallelum API (https://deividfortuna.github.io/fipe/v2)
// Free tier: 500 requests/day (unauthenticated), 1000 requests/day (with token)

const FIPE_API_BASE_URL = 'https://fipe.parallelum.com.br/api/v2'

export type VehicleType = 'cars' | 'motorcycles' | 'trucks'

export interface FipeReference {
  code: string
  month: string
}

export interface FipeBrand {
  code: string
  name: string
}

export interface FipeModel {
  code: string
  name: string
}

export interface FipeYear {
  code: string
  name: string
}

export interface FipeVehicleInfo {
  vehicleType: number
  price: string
  brand: string
  model: string
  modelYear: number
  fuel: string
  fipeCode: string
  referenceMonth: string
  fuelAcronym: string
}

export interface FipeHistoryItem {
  month: string
  price: string
  reference: string
}

// Map our category IDs to FIPE API vehicle types
export function getCategoryVehicleType(categoryId: string): VehicleType {
  switch (categoryId) {
    case '1':
      return 'cars'
    case '2':
      return 'motorcycles'
    case '3':
      return 'trucks'
    default:
      return 'cars'
  }
}

// Get available reference months
export async function getReferences(): Promise<FipeReference[]> {
  const response = await fetch(`${FIPE_API_BASE_URL}/references`, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch references: ${response.status}`)
  }

  return response.json()
}

// Get brands by vehicle type
export async function getBrands(vehicleType: VehicleType): Promise<FipeBrand[]> {
  const response = await fetch(`${FIPE_API_BASE_URL}/${vehicleType}/brands`, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch brands: ${response.status}`)
  }

  return response.json()
}

// Get models by brand
export async function getModels(
  vehicleType: VehicleType,
  brandId: string
): Promise<FipeModel[]> {
  const response = await fetch(
    `${FIPE_API_BASE_URL}/${vehicleType}/brands/${brandId}/models`,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status}`)
  }

  return response.json()
}

// Get years by model
export async function getYears(
  vehicleType: VehicleType,
  brandId: string,
  modelId: string
): Promise<FipeYear[]> {
  const response = await fetch(
    `${FIPE_API_BASE_URL}/${vehicleType}/brands/${brandId}/models/${modelId}/years`,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch years: ${response.status}`)
  }

  return response.json()
}

// Get vehicle info (price)
export async function getVehicleInfo(
  vehicleType: VehicleType,
  brandId: string,
  modelId: string,
  yearId: string
): Promise<FipeVehicleInfo> {
  const response = await fetch(
    `${FIPE_API_BASE_URL}/${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearId}`,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch vehicle info: ${response.status}`)
  }

  return response.json()
}

// Get vehicle info by FIPE code
export async function getVehicleByFipeCode(
  fipeCode: string,
  yearId: string
): Promise<FipeVehicleInfo> {
  const response = await fetch(
    `${FIPE_API_BASE_URL}/${fipeCode}/years/${yearId}`,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch vehicle by FIPE code: ${response.status}`)
  }

  return response.json()
}

// Get price history by FIPE code
export async function getPriceHistory(
  fipeCode: string,
  yearId: string
): Promise<FipeHistoryItem[]> {
  const response = await fetch(
    `${FIPE_API_BASE_URL}/${fipeCode}/years/${yearId}/history`,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  )

  if (!response.ok) {
    // History might not be available for free tier
    return []
  }

  return response.json()
}

// Parse price string to number (e.g., "R$ 50.000,00" -> 50000)
export function parseFipePrice(priceString: string): number {
  const cleaned = priceString
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim()
  return parseFloat(cleaned)
}

// Format number to BRL currency
export function formatToBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
