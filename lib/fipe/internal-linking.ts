// Internal linking strategy for FIPE pages
import { FIPE_CATEGORIES, FIPE_BRANDS, FIPE_MODELS } from './mock-data'

export interface InternalLink {
  title: string
  url: string
  context: string
}

export function getRelatedLinks(category?: string, brand?: string, model?: string): InternalLink[] {
  const links: InternalLink[] = []

  // Link to main FIPE hub
  if (category || brand || model) {
    links.push({
      title: 'Tabela FIPE Completa',
      url: '/fipe',
      context: 'Voltar à tabela FIPE principal',
    })
  }

  // Link to other categories
  if (!category) {
    FIPE_CATEGORIES.forEach(cat => {
      links.push({
        title: `FIPE ${cat.name}`,
        url: `/fipe/${cat.slug}`,
        context: `Ver preços de ${cat.name}`,
      })
    })
  }

  // Link to other brands in same category
  if (category && !brand) {
    const categoryData = FIPE_CATEGORIES.find(c => c.slug === category)
    if (categoryData) {
      const brandsInCategory = FIPE_BRANDS.filter(b => b.categoryId === categoryData.id)
      brandsInCategory.slice(0, 5).forEach(b => {
        links.push({
          title: b.name,
          url: `/fipe/${category}/${b.slug}`,
          context: `Ver preços de ${b.name}`,
        })
      })
    }
  }

  // Link to other models in same brand
  if (category && brand && !model) {
    const brandData = FIPE_BRANDS.find(b => b.slug === brand)
    if (brandData) {
      const modelsInBrand = FIPE_MODELS.filter(m => m.brandId === brandData.id)
      modelsInBrand.slice(0, 5).forEach(m => {
        links.push({
          title: m.name,
          url: `/fipe/${category}/${brand}/${m.slug}`,
          context: `Ver preços do ${m.name}`,
        })
      })
    }
  }

  // Link to related services
  links.push({
    title: 'Cancelamento de Busca e Apreensão',
    url: '/cancelar-busca-apreensao',
    context: 'Proteção jurídica para seu veículo',
  })

  links.push({
    title: 'Revisão de Contrato de Financiamento',
    url: '/revisao-contrato-financiamento',
    context: 'Revise seu contrato de financiamento',
  })

  return links
}

// Keywords for FIPE pages
export function generateKeywords(category?: string, brand?: string, model?: string, year?: number): string[] {
  const keywords = ['FIPE', 'tabela FIPE', 'preço de veículo']

  if (category) keywords.push(`FIPE ${category}`)
  if (brand) keywords.push(`FIPE ${brand}`, `preço ${brand}`)
  if (model) keywords.push(`${brand} ${model}`, `${model} preço`)
  if (year) keywords.push(`${brand} ${model} ${year}`, `FIPE ${year}`)

  return [...new Set(keywords)]
}
