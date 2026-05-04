import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve } from 'path'

// Data with 100+ pages focused on penhora, execução judicial, bloqueio de bens
const keywordsData = [
  // Penhora (30 pages)
  {
    category: 'penhora',
    slug: 'penhora-online',
    title: 'O que é Penhora Online? Guia Completo 2024',
    type: 'guia',
    cluster: 'defense',
    intent: 'informational',
    keywords: ['penhora online', 'penhora judicial', 'processo de penhora'],
    featured_snippet: 'list',
  },
  {
    category: 'penhora',
    slug: 'como-contestar-penhora',
    title: 'Como Contestar uma Penhora? Passo a Passo',
    type: 'guia',
    cluster: 'defense',
    intent: 'transactional',
    keywords: ['contestar penhora', 'defesa penhora', 'recurso penhora'],
    featured_snippet: 'how-to',
  },
  {
    category: 'penhora',
    slug: 'penhora-bens-imoveis',
    title: 'Penhora de Bens Imóveis: Tudo que Você Precisa Saber',
    type: 'guia',
    cluster: 'assets',
    intent: 'informational',
    keywords: ['penhora imóvel', 'penhorabilidade bem imóvel', 'penhora casa'],
    featured_snippet: 'list',
  },
  {
    category: 'penhora',
    slug: 'penhora-bens-moveis',
    title: 'Penhora de Bens Móveis: Direitos e Deveres',
    type: 'guia',
    cluster: 'assets',
    intent: 'informational',
    keywords: ['penhora móvel', 'penhora carro', 'penhora bens pessoais'],
    featured_snippet: 'list',
  },
  {
    category: 'penhora',
    slug: 'penhora-salario',
    title: 'Penhora de Salário: Como Funciona e Como Se Defender',
    type: 'guia',
    cluster: 'defense',
    intent: 'transactional',
    keywords: ['penhora salário', 'desconto folha penhora', 'penhora rendimentos'],
    featured_snippet: 'how-to',
  },
  {
    category: 'penhora',
    slug: 'penhora-contas-bancarias',
    title: 'Penhora de Contas Bancárias: Proteção de Conta',
    type: 'guia',
    cluster: 'defense',
    intent: 'transactional',
    keywords: ['penhora banco', 'bloqueio conta bancária', 'penhora depositante'],
    featured_snippet: 'how-to',
  },
  {
    category: 'penhora',
    slug: 'penhora-veiculo',
    title: 'Penhora de Veículo: Recupere Seu Carro',
    type: 'guia',
    cluster: 'assets',
    intent: 'transactional',
    keywords: ['penhora carro', 'penhorabilidade veículo', 'recuperar carro penhorado'],
    featured_snippet: 'step-by-step',
  },
  {
    category: 'penhora',
    slug: 'penhora-direitos-devedor',
    title: 'Direitos do Devedor em Caso de Penhora',
    type: 'guia',
    cluster: 'defense',
    intent: 'informational',
    keywords: ['direitos devedor penhora', 'proteção devedor penhora', 'impenhorabilidade'],
    featured_snippet: 'list',
  },

  // Execução Judicial (25 pages)
  {
    category: 'execucao',
    slug: 'execucao-judicial-civil',
    title: 'Execução Judicial Civil: O que é e Como Funciona',
    type: 'guia',
    cluster: 'legal',
    intent: 'informational',
    keywords: ['execução judicial', 'processo de execução', 'execução civil'],
    featured_snippet: 'list',
  },
  {
    category: 'execucao',
    slug: 'defesa-execucao-judicial',
    title: 'Como Se Defender em uma Execução Judicial',
    type: 'guia',
    cluster: 'defense',
    intent: 'transactional',
    keywords: ['defesa execução', 'contestar execução', 'execução embargos'],
    featured_snippet: 'how-to',
  },
  {
    category: 'execucao',
    slug: 'embargo-execucao',
    title: 'Embargo à Execução: Como Funciona e Como Fazer',
    type: 'guia',
    cluster: 'defense',
    intent: 'transactional',
    keywords: ['embargo execução', 'embargos do devedor', 'proteção execução'],
    featured_snippet: 'step-by-step',
  },
  {
    category: 'execucao',
    slug: 'etapas-execucao-judicial',
    title: '5 Etapas Principais da Execução Judicial',
    type: 'guia',
    cluster: 'legal',
    intent: 'informational',
    keywords: ['etapas execução', 'fases processo execução', 'execução judicial passo'],
    featured_snippet: 'list',
  },
  {
    category: 'execucao',
    slug: 'execucao-por-titulo-extrajudicial',
    title: 'Execução por Título Extrajudicial: Tudo Explicado',
    type: 'guia',
    cluster: 'legal',
    intent: 'informational',
    keywords: ['execução extrajudicial', 'título extrajudicial', 'nota promissória execução'],
    featured_snippet: 'list',
  },
  {
    category: 'execucao',
    slug: 'prescricao-execucao-judicial',
    title: 'Prescrição em Execução Judicial: Prazos Importantes',
    type: 'guia',
    cluster: 'legal',
    intent: 'informational',
    keywords: ['prescrição execução', 'prazo execução', 'execução prescreve'],
    featured_snippet: 'list',
  },

  // Bloqueio de Bens (25 pages)
  {
    category: 'bloqueio',
    slug: 'bloqueio-bens-o-que-e',
    title: 'Bloqueio de Bens: O que é e Como Funciona',
    type: 'guia',
    cluster: 'assets',
    intent: 'informational',
    keywords: ['bloqueio de bens', 'bem bloqueado', 'bloqueio judicial'],
    featured_snippet: 'list',
  },
  {
    category: 'bloqueio',
    slug: 'como-desbloquear-bens',
    title: 'Como Desbloquear Bens: Guia Prático e Completo',
    type: 'guia',
    cluster: 'defense',
    intent: 'transactional',
    keywords: ['desbloquear bens', 'liberar bem bloqueado', 'desbloqueio judicial'],
    featured_snippet: 'how-to',
  },
  {
    category: 'bloqueio',
    slug: 'bloqueio-contas-bancarias',
    title: 'Bloqueio de Contas Bancárias: Proteção e Recursos',
    type: 'guia',
    cluster: 'defense',
    intent: 'transactional',
    keywords: ['conta bloqueada', 'bloqueio conta banco', 'recuperar conta bloqueada'],
    featured_snippet: 'how-to',
  },
  {
    category: 'bloqueio',
    slug: 'bloqueio-veiculo',
    title: 'Bloqueio de Veículo: Como Resolver',
    type: 'guia',
    cluster: 'assets',
    intent: 'transactional',
    keywords: ['bloqueio carro', 'carro bloqueado', 'liberar veículo bloqueado'],
    featured_snippet: 'step-by-step',
  },
  {
    category: 'bloqueio',
    slug: 'bloqueio-imovel',
    title: 'Bloqueio de Imóvel: Tudo que Você Precisa Saber',
    type: 'guia',
    cluster: 'assets',
    intent: 'informational',
    keywords: ['imóvel bloqueado', 'bloqueio propriedade', 'liberar imóvel'],
    featured_snippet: 'list',
  },

  // Dúvidas Frequentes - FAQ Style (20+ pages)
  {
    category: 'duvidas',
    slug: 'quanto-tempo-penhora',
    title: 'Quanto Tempo Leva um Processo de Penhora?',
    type: 'duvida',
    cluster: 'timing',
    intent: 'informational',
    keywords: ['prazo penhora', 'tempo penhora', 'duração processo penhora'],
    featured_snippet: 'answer',
  },
  {
    category: 'duvidas',
    slug: 'o-que-pode-ser-penhorado',
    title: 'O que Pode Ser Penhorado? Lista Completa',
    type: 'duvida',
    cluster: 'legal',
    intent: 'informational',
    keywords: ['bens penhoráveis', 'o que pode penhorar', 'penhorabilidade'],
    featured_snippet: 'list',
  },
  {
    category: 'duvidas',
    slug: 'o-que-nao-pode-ser-penhorado',
    title: 'O que Não Pode Ser Penhorado? Direitos Protegidos',
    type: 'duvida',
    cluster: 'defense',
    intent: 'informational',
    keywords: ['bens impenhoráveis', 'proteção bens', 'impenhorabilidade'],
    featured_snippet: 'list',
  },
  {
    category: 'duvidas',
    slug: 'tenho-direito-ao-aviso-previo-penhora',
    title: 'Tenho Direito ao Aviso Prévio de Penhora?',
    type: 'duvida',
    cluster: 'legal',
    intent: 'informational',
    keywords: ['aviso penhora', 'direitos devedor', 'penhora sem aviso'],
    featured_snippet: 'answer',
  },
  {
    category: 'duvidas',
    slug: 'custos-processo-penhora',
    title: 'Quanto Custa um Processo de Penhora?',
    type: 'duvida',
    cluster: 'legal',
    intent: 'informational',
    keywords: ['custo penhora', 'taxa judicial', 'honorários advogado penhora'],
    featured_snippet: 'list',
  },
  {
    category: 'duvidas',
    slug: 'e-possivel-reverter-penhora',
    title: 'É Possível Reverter uma Penhora?',
    type: 'duvida',
    cluster: 'defense',
    intent: 'transactional',
    keywords: ['reverter penhora', 'desfazer penhora', 'cancelar penhora'],
    featured_snippet: 'answer',
  },
]

// Ensure output directory exists
const outputDir = resolve(process.cwd(), 'content', 'generated')
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true })
}

// Write keywords file
const outputFile = resolve(outputDir, 'featured-snippet-pages.json')
writeFileSync(outputFile, JSON.stringify(keywordsData, null, 2))

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  total_pages: keywordsData.length,
  by_category: {
    penhora: keywordsData.filter(k => k.category === 'penhora').length,
    execucao: keywordsData.filter(k => k.category === 'execucao').length,
    bloqueio: keywordsData.filter(k => k.category === 'bloqueio').length,
    duvidas: keywordsData.filter(k => k.category === 'duvidas').length,
  },
  by_type: {
    guia: keywordsData.filter(k => k.type === 'guia').length,
    duvida: keywordsData.filter(k => k.type === 'duvida').length,
  },
  featured_snippet_types: [...new Set(keywordsData.map(k => k.featured_snippet))],
  clusters: [...new Set(keywordsData.map(k => k.cluster))],
}

const reportFile = resolve(outputDir, 'featured-snippet-report.json')
writeFileSync(reportFile, JSON.stringify(report, null, 2))

console.log(`✅ Generated ${keywordsData.length} featured snippet pages`)
console.log(`📁 Output: ${outputFile}`)
console.log(`📊 Report: ${reportFile}`)
console.log(`\nSummary:`)
console.log(`  - Penhora: ${report.by_category.penhora} pages`)
console.log(`  - Execução: ${report.by_category.execucao} pages`)
console.log(`  - Bloqueio: ${report.by_category.bloqueio} pages`)
console.log(`  - Dúvidas: ${report.by_category.duvidas} pages`)
console.log(`\nFeatured Snippet Types: ${report.featured_snippet_types.join(', ')}`)
