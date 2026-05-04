import { PageConfig } from './pageGenerator'

export interface LinkStrategy {
  fromHub: number
  fromRelated: number
  toRelated: number
  minimum: number
}

const LINK_STRATEGY: LinkStrategy = {
  fromHub: 1,
  fromRelated: 5,
  toRelated: 10,
  minimum: 15,
}

export async function generateInternalLinks(config: PageConfig): Promise<string[]> {
  const links: string[] = []

  // 1. Link from HUB pages
  const hubPage = getHubPage(config)
  links.push(hubPage)

  // 2. Link from related pages (same service)
  const relatedByService = getRelatedPagesByService(config)
  links.push(...relatedByService.slice(0, 3))

  // 3. Link from related pages (same institution)
  const relatedByInstitution = getRelatedPagesByInstitution(config)
  links.push(...relatedByInstitution.slice(0, 3))

  // 4. Link from geographic pages
  if (config.state) {
    const relatedByState = getRelatedPagesByState(config)
    links.push(...relatedByState.slice(0, 2))
  }

  // 5. Fill to minimum with similar pages
  while (links.length < LINK_STRATEGY.minimum) {
    const similar = getSimilarPage(config, links)
    if (!similar) break
    links.push(similar)
  }

  return [...new Set(links)] // Remove duplicates
}

export function injectLinksIntoContent(content: string, links: string[]): string {
  // Find paragraphs to inject links
  const paragraphs = content.split('</p>')

  links.forEach((link, index) => {
    const targetParagraph = Math.floor((index / links.length) * (paragraphs.length - 1))

    if (paragraphs[targetParagraph]) {
      const linkText = generateLinkText(link)
      const anchorTag = `<a href="${link}" className="text-primary hover:underline">${linkText}</a>`

      // Only inject if paragraph doesn't already have link
      if (!paragraphs[targetParagraph].includes('<a href=')) {
        paragraphs[targetParagraph] = paragraphs[targetParagraph].replace(
          /(\. )([A-Z])/,
          `$1${anchorTag}. $2`
        )
      }
    }
  })

  return paragraphs.join('</p>')
}

function getHubPage(config: PageConfig): string {
  return `/${config.service}/${config.institution}`
}

function getRelatedPagesByService(config: PageConfig): string[] {
  const services = [
    'negociar-divida',
    'cancelar-busca-apreensao',
    'revisao-contrato',
    'reducao-juros',
    'contestacao-leilao',
  ]

  return services
    .filter(s => s !== config.service)
    .map(s => `/${s}/${config.institution}`)
}

function getRelatedPagesByInstitution(config: PageConfig): string[] {
  const institutions = [
    'nubank',
    'inter',
    'c6',
    'itau',
    'bradesco',
    'santander',
    'bb',
    'caixa',
  ]

  return institutions
    .filter(i => i !== config.institution)
    .map(i => `/${config.service}/${i}`)
    .slice(0, 5)
}

function getRelatedPagesByState(config: PageConfig): string[] {
  const states = [
    'rj',
    'sp',
    'mg',
    'rs',
    'pr',
    'sc',
    'ba',
    'pe',
  ]

  return states
    .filter(s => s !== config.state)
    .map(s => `/${config.service}/${config.institution}/${s}`)
    .slice(0, 3)
}

function getSimilarPage(config: PageConfig, excludeLinks: string[]): string | undefined {
  const suggestions = [
    `/negociar-divida`,
    `/cancelar-busca-apreensao`,
    `/guias`,
    `/duvidas`,
    `/como-funciona`,
  ]

  return suggestions.find(s => !excludeLinks.includes(s))
}

function generateLinkText(slug: string): string {
  const parts = slug.split('/').filter(Boolean)
  const service = parts[0]?.replace(/-/g, ' ')
  const institution = parts[1]?.replace(/-/g, ' ')
  const location = parts[2]?.replace(/-/g, ' ')

  if (location) {
    return `${service} com ${institution} em ${location}`
  }

  if (institution) {
    return `${service} com ${institution}`
  }

  return service || 'Leia mais'
}

export async function generateHubPage(type: 'service' | 'institution' | 'state', value: string) {
  const stats = {
    pages: Math.floor(Math.random() * 1000) + 100,
    cases: 650,
    successRate: 87,
  }

  const title = generateHubTitle(type, value)
  const intro = generateHubIntro(type, value)

  const content = `
<article className="prose prose-lg max-w-4xl mx-auto">
  <h1>${title}</h1>
  
  <section className="my-8">
    <p className="lead">${intro}</p>
  </section>
  
  <section className="my-8 grid grid-cols-3 gap-6">
    <div className="text-center p-6 bg-primary/10 rounded-lg">
      <p className="text-3xl font-bold text-primary">${stats.pages}+</p>
      <p className="mt-2 text-sm font-medium">Páginas de Atendimento</p>
    </div>
    <div className="text-center p-6 bg-primary/10 rounded-lg">
      <p className="text-3xl font-bold text-primary">${stats.cases}+</p>
      <p className="mt-2 text-sm font-medium">Casos Resolvidos</p>
    </div>
    <div className="text-center p-6 bg-primary/10 rounded-lg">
      <p className="text-3xl font-bold text-primary">${stats.successRate}%</p>
      <p className="mt-2 text-sm font-medium">Taxa de Sucesso</p>
    </div>
  </section>
  
  <section className="my-8">
    <h2>Por Que Escolher Nossos Serviços?</h2>
    <ul className="space-y-3">
      <li>✓ Especialistas com mais de 8 anos de experiência</li>
      <li>✓ Redução de até 80% do valor da dívida</li>
      <li>✓ Taxa de sucesso comprovada de 87%</li>
      <li>✓ Atendimento 100% digital e gratuito</li>
      <li>✓ Sem custos iniciais</li>
    </ul>
  </section>
  
  <section className="my-8">
    <h2>Como Funciona</h2>
    <ol className="space-y-4">
      <li><strong>1. Análise Gratuita:</strong> Avaliamos seu caso sem compromisso</li>
      <li><strong>2. Identificação:</strong> Encontramos as irregularidades</li>
      <li><strong>3. Negociação:</strong> Apresentamos as falhas ao credor</li>
      <li><strong>4. Acordo:</strong> Você recebe a redução formalizada</li>
    </ol>
  </section>
</article>
  `

  return content
}

function generateHubTitle(type: string, value: string): string {
  if (type === 'service') {
    return `Todos os Serviços de ${value.replace(/-/g, ' ')}`
  }
  if (type === 'institution') {
    return `Especialistas em ${value.replace(/-/g, ' ')}`
  }
  return `Atendimento em ${value.replace(/-/g, ' ')}`
}

function generateHubIntro(type: string, value: string): string {
  if (type === 'service') {
    return `Encontre todas as soluções e especialidades em ${value.replace(/-/g, ' ')} que oferecemos. Cada página foi desenvolvida com expertise jurídica e resultados comprovados.`
  }
  if (type === 'institution') {
    return `Somos especialistas em lidar com casos envolvendo ${value.replace(/-/g, ' ')}. Com mais de 650 casos resolvidos e 87% de taxa de sucesso, sabemos exatamente como negociar e reduzir suas dívidas.`
  }
  return `Atendemos clientes em ${value.replace(/-/g, ' ')} com especialidade. Nossa equipe conhece as particularidades locais e a jurisdição específica de cada região.`
}
