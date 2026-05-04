import { slugify } from './utils/helpers'

export interface InterlinkingConfig {
  tipo: string
  empresa: string
  estado: string
  cidade: string
  produto?: string
}

export interface InterlinkingLinks {
  hierarquicos: string[]
  laterais: string[]
  contextuais: Array<{ texto: string; url: string; anchorText?: string }>
}

const EMPRESAS_PRINCIPAIS = [
  'nubank',
  'inter',
  'itau',
  'bradesco',
  'santander',
  'caixa',
  'bb',
  'c6',
  'bmg',
  'pan',
]

const TIPOS = [
  'cartao-de-credito',
  'financiamento-veiculo',
  'emprestimo-pessoal',
  'cheque-especial',
  'crediario',
]

const ESTADOS = ['sp', 'rj', 'mg', 'rs', 'pr', 'sc', 'ba', 'pe', 'ce', 'df']

const CIDADES_POR_ESTADO: Record<string, string[]> = {
  sp: ['sao-paulo', 'campinas', 'santos', 'sorocaba', 'ribeirão-preto'],
  rj: ['rio-de-janeiro', 'niteroi', 'campos-dos-goytacazes'],
  mg: ['belo-horizonte', 'uberlandia', 'contagem', 'juiz-de-fora'],
  rs: ['porto-alegre', 'caxias-do-sul', 'santa-maria'],
  pr: ['curitiba', 'londrina', 'maringá'],
}

/**
 * Gera links em 3 níveis: hierárquicos, laterais e contextuais
 * Cada página nasce com autoridade interna automática
 */
export function gerarLinks(config: InterlinkingConfig): InterlinkingLinks {
  const { tipo, empresa, estado, cidade, produto } = config
  const basePath = `/negociar-divida`

  // NÍVEL 1: HIERÁRQUICOS (3 links obrigatórios)
  const hierarquicos = [
    `${basePath}/${empresa}`,
    `${basePath}/${tipo}`,
    `${basePath}/${estado}`,
  ]

  // NÍVEL 2: LATERAIS (5-10 links semelhantes)
  const laterais: string[] = []

  // Adiciona outras empresas do mesmo tipo + estado
  const outrasEmpresas = EMPRESAS_PRINCIPAIS.filter(
    (e) => e !== empresa
  ).slice(0, 3)
  outrasEmpresas.forEach((empresa) => {
    laterais.push(`${basePath}/${tipo}/${empresa}/${estado}/${city}`)
  })

  // Adiciona outras cidades do mesmo estado
  const cidades = CIDADES_POR_ESTADO[estado] || []
  cidades.forEach((c) => {
    if (c !== city) {
      laterais.push(`${basePath}/${tipo}/${empresa}/${estado}/${c}`)
    }
  })

  // Adiciona outros estados
  ESTADOS.filter((e) => e !== estado)
    .slice(0, 2)
    .forEach((estado) => {
      const cidade = CIDADES_POR_ESTADO[estado]?.[0] || estado
      laterais.push(`${basePath}/${tipo}/${empresa}/${estado}/${cidade}`)
    })

  // NÍVEL 3: CONTEXTUAIS (2-5 links com anchor text natural)
  const contextuais = [
    {
      texto: `negociar dívida de ${tipo.replace(/-/g, ' ')}`,
      url: `${basePath}/${tipo}`,
      anchorText: tipo.replace(/-/g, ' '),
    },
    {
      texto: `${empresa} ${estado.toUpperCase()}`,
      url: `${basePath}/${empresa}/${estado}`,
      anchorText: `${empresa} em ${estado.toUpperCase()}`,
    },
    {
      texto: `dívida ${empresa}`,
      url: `${basePath}/${empresa}`,
      anchorText: empresa,
    },
    {
      texto: `${tipo} ${cidade}`,
      url: `${basePath}/${tipo}/${estado}/${cidade}`,
      anchorText: `${tipo.replace(/-/g, ' ')} em ${cidade.replace(/-/g, ' ')}`,
    },
  ]

  return {
    hierarquicos,
    laterais: [...new Set(laterais)], // Remove duplicatas
    contextuais,
  }
}

/**
 * Injeta links contextuais no HTML/texto
 * "Nubank" → "<a href="/negociar-divida/nubank">Nubank</a>"
 */
export function inserirLinksNoTexto(
  html: string,
  config: InterlinkingConfig
): string {
  let resultado = html
  const { tipo, empresa, estado, cidade } = config
  const links = gerarLinks(config)

  // Injeta links contextuais no primeira ocorrência
  links.contextuais.forEach(({ anchorText, url }) => {
    const regex = new RegExp(`\\b${anchorText}\\b(?!.*<a)`, 'gi')
    resultado = resultado.replace(
      regex,
      `<a href="${url}" class="text-accent hover:underline font-medium">${anchorText}</a>`
    )
  })

  // Injeta links de empresa (primeira ocorrência apenas)
  const empresaRegex = new RegExp(`\\b${empresa}\\b`, 'i')
  if (empresaRegex.test(resultado)) {
    resultado = resultado.replace(
      empresaRegex,
      `<a href="/negociar-divida/${empresa}" class="text-accent hover:underline font-medium">${empresa}</a>`
    )
  }

  // Injeta links de tipo
  const tipoRegex = new RegExp(`\\b${tipo.replace(/-/g, ' ')}\\b`, 'i')
  if (tipoRegex.test(resultado)) {
    resultado = resultado.replace(
      tipoRegex,
      `<a href="/negociar-divida/${tipo}" class="text-accent hover:underline font-medium">${tipo.replace(/-/g, ' ')}</a>`
    )
  }

  return resultado
}

/**
 * Gera links relacionadas para seção de "Páginas Relacionadas"
 */
export function gerarLinksRelacionadas(config: InterlinkingConfig): Array<{
  titulo: string
  url: string
  descricao: string
}> {
  const { tipo, empresa, estado, cidade } = config
  const basePath = `/negociar-divida`

  return [
    {
      titulo: `Negociar dívida de ${tipo.replace(/-/g, ' ')} em ${cidade.replace(/-/g, ' ')}`,
      url: `${basePath}/${tipo}/${estado}/${cidade}`,
      descricao: 'Especialistas em negociação de ' + tipo.replace(/-/g, ' '),
    },
    {
      titulo: `${empresa.toUpperCase()} em ${estado.toUpperCase()} - Negociação`,
      url: `${basePath}/${empresa}/${estado}`,
      descricao: `Estratégias específicas para dívidas com ${empresa}`,
    },
    {
      titulo: `Todas as opções de ${tipo.replace(/-/g, ' ')}`,
      url: `${basePath}/${tipo}`,
      descricao: 'Veja todos os bancos e instituições',
    },
    {
      titulo: `Negociar em ${estado.toUpperCase()}`,
      url: `${basePath}/${estado}`,
      descricao: 'Estratégias regionais e jurisprudência local',
    },
  ]
}

/**
 * Estratégia de Link Rotation - alterna links para aumentar cobertura SEO
 */
export function rotacaoLinks(
  links: InterlinkingLinks,
  seed: number = 0
): InterlinkingLinks {
  const shuffle = (array: string[], seed: number) => {
    const shuffled = [...array]
    let random = seed
    for (let i = shuffled.length - 1; i > 0; i--) {
      random = (random * 9301 + 49297) % 233280
      const j = Math.floor((random / 233280) * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  return {
    hierarquicos: links.hierarquicos,
    laterais: shuffle(links.laterais, seed).slice(0, 8),
    contextuais: shuffle(links.contextuais, seed).slice(0, 3),
  }
}
