/**
 * Sistema de Interlinking Automático (estilo Wikipedia)
 * Gera links internos contextualizados entre páginas relacionadas
 */

interface RelatedLink {
  text: string
  href: string
  anchor: string
}

export function gerarInterlinksRelacionados(
  tipo: string,
  empresa: string,
  estado: string,
  todasTipos: any[],
  todasEmpresas: any[],
  todosEstados: any[]
): RelatedLink[] {
  const links: RelatedLink[] = []

  // Link para outro tipo de dívida similar
  const tiposRelacionados = todasTipos.filter(t => t.slug !== tipo).slice(0, 2)
  for (const t of tiposRelacionados) {
    links.push({
      text: t.nome,
      href: `/negociar-divida/${t.slug}`,
      anchor: `Se você também possui dívida de ${t.nome.toLowerCase()}, veja como negociar`,
    })
  }

  // Link para outra empresa
  const empresasRelacionadas = todasEmpresas.filter(e => e.slug !== empresa).slice(0, 2)
  for (const e of empresasRelacionadas) {
    links.push({
      text: e.nome,
      href: `/negociar-divida/${tipo}/${e.slug}`,
      anchor: `Encontre a mesma estratégia para negociar dívida com ${e.nome}`,
    })
  }

  // Link para outro estado
  const estadosRelacionados = todosEstados.filter(e => e.slug !== estado).slice(0, 2)
  for (const e of estadosRelacionados) {
    links.push({
      text: e.nome,
      href: `/negociar-divida/${tipo}/${estado}/${e.slug}`,
      anchor: `Negociar ${tipo} em ${e.nome} funciona da mesma forma`,
    })
  }

  return links
}

export function renderInterlinksHTML(links: RelatedLink[]): string {
  return `
    <div class="bg-secondary/50 rounded-lg p-6 mt-8">
      <h3 class="text-lg font-semibold mb-4">Tópicos Relacionados</h3>
      <ul class="space-y-2">
        ${links
          .map(
            link => `
          <li>
            <a href="${link.href}" class="text-primary hover:underline">
              ${link.anchor}
            </a>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `
}
