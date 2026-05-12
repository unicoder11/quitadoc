export type VehicleType = 'carros' | 'motos' | 'caminhoes'

export interface FipeBrand {
  codigo: string
  nome: string
}

export interface FipeModel {
  codigo: string
  nome: string
}

export interface FipeYear {
  codigo: string // e.g. "2022-1"
  nome: string   // e.g. "2022 Gasolina"
}

export interface FipeVehiclePrice {
  TipoVeiculo: number
  Valor: string        // e.g. "R$ 86.907,00"
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  CodigoFipe: string
  MesReferencia: string
  SiglaCombustivel: string
}

const BASE = '/api/fipe'

export async function getFipeBrands(type: VehicleType): Promise<FipeBrand[]> {
  const res = await fetch(`${BASE}/${type}/marcas`)
  if (!res.ok) throw new Error('Falha ao buscar marcas')
  return res.json()
}

export async function getFipeModels(
  type: VehicleType,
  brandCode: string
): Promise<{ modelos: FipeModel[]; anos: FipeYear[] }> {
  const res = await fetch(`${BASE}/${type}/marcas/${brandCode}/modelos`)
  if (!res.ok) throw new Error('Falha ao buscar modelos')
  return res.json()
}

export async function getFipeYears(
  type: VehicleType,
  brandCode: string,
  modelCode: string
): Promise<FipeYear[]> {
  const res = await fetch(`${BASE}/${type}/marcas/${brandCode}/modelos/${modelCode}/anos`)
  if (!res.ok) throw new Error('Falha ao buscar anos')
  return res.json()
}

export async function getFipePrice(
  type: VehicleType,
  brandCode: string,
  modelCode: string,
  yearCode: string
): Promise<FipeVehiclePrice> {
  const res = await fetch(
    `${BASE}/${type}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
  )
  if (!res.ok) throw new Error('Falha ao buscar preço FIPE')
  return res.json()
}

export function parseValorFipe(valor: string): number {
  // "R$ 86.907,00" → 86907
  return parseFloat(valor.replace('R$', '').trim().replace(/\./g, '').replace(',', '.'))
}
