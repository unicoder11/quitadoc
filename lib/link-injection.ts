/**
 * Utilitários para injeção de links contextuais em conteúdo HTML
 */

export interface LinkInjectionConfig {
  selectorStrategy: 'first-paragraph' | 'all-paragraphs' | 'smart'
  maxLinksPerPage: number
  excludeSelectors: string[]
}

const DEFAULT_CONFIG: LinkInjectionConfig = {
  selectorStrategy: 'smart',
  maxLinksPerPage: 5,
  excludeSelectors: ['nav', 'footer', '[role="navigation"]'],
}

/**
 * Injeta links contextuais em parágrafo específico
 * Estratégia: primeira ocorrência no primeiro parágrafo tem prioridade
 */
export function injetarLinksContextuais(
  htmlElement: HTMLElement,
  links: Array<{ texto: string; url: string; classe?: string }>,
  config: Partial<LinkInjectionConfig> = {}
): void {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  let linksInjetados = 0

  // Encontra todos os parágrafos
  const paragrafos = Array.from(
    htmlElement.querySelectorAll('p, li, span, div[data-content]')
  ) as HTMLElement[]

  // Filtra elementos que estão em exclude selectors
  const elementosFiltrados = paragrafos.filter((el) => {
    return !finalConfig.excludeSelectors.some((selector) =>
      el.closest(selector)
    )
  })

  for (const paragrafo of elementosFiltrados) {
    if (linksInjetados >= finalConfig.maxLinksPerPage) break

    for (const link of links) {
      if (linksInjetados >= finalConfig.maxLinksPerPage) break

      const regex = new RegExp(`\\b${link.texto}\\b(?!.*<a)`, 'gi')
      if (regex.test(paragrafo.innerHTML)) {
        paragrafo.innerHTML = paragrafo.innerHTML.replace(
          new RegExp(`\\b${link.texto}\\b(?!.*<a)`, 'gi'),
          `<a href="${link.url}" class="${link.classe || 'text-accent hover:underline font-medium'}">${link.texto}</a>`
        )
        linksInjetados++
      }
    }
  }
}

/**
 * Extrai keywords de um texto para link injection automático
 */
export function extrairKeywords(
  texto: string,
  minLength: number = 2
): Array<{ palavra: string; frequencia: number }> {
  const palavras = texto
    .toLowerCase()
    .match(/\b\w+\b/g) || []

  const contagem: Record<string, number> = {}
  palavras.forEach((palavra) => {
    if (palavra.length >= minLength) {
      contagem[palavra] = (contagem[palavra] || 0) + 1
    }
  })

  return Object.entries(contagem)
    .map(([palavra, frequencia]) => ({ palavra, frequencia }))
    .sort((a, b) => b.frequencia - a.frequencia)
    .slice(0, 10)
}

/**
 * Validação de links - evita links quebrados e relevantes
 */
export function validarLink(url: string, contexto: string): boolean {
  // Não linka para a mesma página
  if (url === contexto) return false

  // Não linka para URLs inválidas
  if (!url.startsWith('/')) return false

  // Não linka para páginas que não existem no padrão
  if (!/^\/[a-z0-9\-\/]+$/.test(url)) return false

  return true
}
