import type { PageContext } from '@/lib/contentGenerator'

// ========================================
// DADOS DE ENTRADA
// ========================================

const SERVICES = [
  'negociar-divida',
  'cancelar-busca-apreensao',
  'revisao-contrato',
] as const

const INSTITUTIONS = [
  'nubank',
  'itau',
  'bradesco',
  'santander',
  'bb',
  'caixa',
  'inter',
  'c6',
  'picpay',
  'mercadopago',
  'pan',
  'safra',
  'original',
  'bmg',
  'daycoval',
  'sofisa',
  'banrisul',
  'sicoob',
  'sicredi',
  'banestes',
] as const

const PRODUCT_TYPES = [
  'cartao',
  'emprestimo',
  'financiamento',
] as const

const STATES = [
  'rj',
  'sp',
  'mg',
  'rs',
  'pr',
  'ba',
  'sc',
  'pe',
  'ce',
  'go',
  'pa',
  'ma',
  'es',
  'pb',
  'rn',
  'mt',
  'ms',
  'pi',
  'al',
  'se',
  'ro',
  'ac',
  'am',
  'rr',
  'ap',
  'to',
  'df',
] as const

const TOP_CITIES: Record<string, string[]> = {
  rj: ['rio-de-janeiro', 'niteroi', 'sao-goncalo', 'duque-de-caxias', 'nova-iguacu'],
  sp: ['sao-paulo', 'campinas', 'santos', 'sorocaba', 'ribeirao-preto'],
  mg: ['belo-horizonte', 'uberlandia', 'contagem', 'juiz-de-fora'],
  rs: ['porto-alegre', 'caxias-do-sul', 'pelotas'],
  pr: ['curitiba', 'londrina', 'maringa'],
  ba: ['salvador', 'feira-de-santana'],
  sc: ['florianopolis', 'joinville', 'blumenau'],
  pe: ['recife', 'olinda', 'jaboatao'],
  ce: ['fortaleza', 'caucaia'],
  go: ['goiania', 'aparecida-de-goiania'],
}

// ========================================
// GERAÇÃO DE CONFIGURAÇÕES
// ========================================

export interface PageConfig extends PageContext {
  slug: string
  tier: 1 | 2 | 3 | 4 | 5
  priority: number
}

/**
 * Gera todas as configurações de páginas (10.000+)
 */
export function generateAllConfigs(): PageConfig[] {
  const configs: PageConfig[] = []

  console.log('📋 Gerando configurações de páginas...\n')

  // TIER 1: Service + Institution (60 páginas)
  // Prioridade: 0.9
  SERVICES.forEach((service) => {
    INSTITUTIONS.forEach((institution) => {
      configs.push({
        service,
        institution,
        slug: `${service}/${institution}`,
        tier: 1,
        priority: 0.9,
      })
    })
  })
  console.log(`✅ TIER 1: ${configs.length} páginas (Service + Institution)`)

  const tier1Count = configs.length

  // TIER 2: + Product (180 páginas)
  // Prioridade: 0.8
  SERVICES.forEach((service) => {
    INSTITUTIONS.forEach((institution) => {
      PRODUCT_TYPES.forEach((productType) => {
        configs.push({
          service,
          institution,
          productType,
          slug: `${service}/${productType}/${institution}`,
          tier: 2,
          priority: 0.8,
        })
      })
    })
  })
  console.log(`✅ TIER 2: ${configs.length - tier1Count} páginas (+ Product)`)

  const tier2Count = configs.length

  // TIER 3: Service + Institution + State (1,620 páginas)
  // Prioridade: 0.7
  SERVICES.forEach((service) => {
    INSTITUTIONS.forEach((institution) => {
      STATES.forEach((state) => {
        configs.push({
          service,
          institution,
          state,
          slug: `${service}/${institution}/${state}`,
          tier: 3,
          priority: 0.7,
        })
      })
    })
  })
  console.log(`✅ TIER 3: ${configs.length - tier2Count} páginas (+ State)`)

  const tier3Count = configs.length

  // TIER 4: + Product + State (4,860 páginas)
  // Prioridade: 0.6
  SERVICES.forEach((service) => {
    INSTITUTIONS.forEach((institution) => {
      PRODUCT_TYPES.forEach((productType) => {
        STATES.forEach((state) => {
          configs.push({
            service,
            institution,
            productType,
            state,
            slug: `${service}/${productType}/${institution}/${state}`,
            tier: 4,
            priority: 0.6,
          })
        })
      })
    })
  })
  console.log(`✅ TIER 4: ${configs.length - tier3Count} páginas (+ Product + State)`)

  const tier4Count = configs.length

  // TIER 5: + City (3,000+ páginas)
  // Prioridade: 0.5
  SERVICES.forEach((service) => {
    INSTITUTIONS.forEach((institution) => {
      Object.entries(TOP_CITIES).forEach(([state, cities]) => {
        cities.forEach((city) => {
          configs.push({
            service,
            institution,
            state,
            city,
            slug: `${service}/${institution}/${state}/${city}`,
            tier: 5,
            priority: 0.5,
          })
        })
      })
    })
  })
  console.log(`✅ TIER 5: ${configs.length - tier4Count} páginas (+ City)`)

  console.log(`\n🎯 TOTAL: ${configs.length} configurações geradas\n`)

  return configs
}

/**
 * Filtra configs por tier
 */
export function filterByTier(configs: PageConfig[], tier: number): PageConfig[] {
  return configs.filter((c) => c.tier === tier)
}

/**
 * Filtra configs por prioridade
 */
export function filterByPriority(configs: PageConfig[], minPriority: number): PageConfig[] {
  return configs.filter((c) => c.priority >= minPriority)
}

/**
 * Embaralha configs (útil para deployment variado)
 */
export function shuffleConfigs(configs: PageConfig[]): PageConfig[] {
  const shuffled = [...configs]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
