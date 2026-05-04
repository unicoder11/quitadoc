#!/usr/bin/env node

import { generatePageContent } from '@/lib/pageGenerator'
import fs from 'fs'
import path from 'path'

interface PageConfig {
  service: string
  institution: string
  productType?: string
  state?: string
  city?: string
}

const SERVICES = [
  'negociar-divida',
  'cancelar-busca-apreensao',
  'revisao-contrato',
  'reducao-juros',
  'contestacao-leilao',
]

const INSTITUTIONS = [
  'nubank',
  'inter',
  'c6',
  'neon',
  'picpay',
  'itau',
  'bradesco',
  'santander',
  'bb',
  'caixa',
  'safra',
  'bmg',
  'pan',
  'votorantim',
  'original',
  'bv',
  'agibank',
  'creditas',
  'banco-master',
  'sofisa',
]

const PRODUCT_TYPES = ['cartao', 'emprestimo', 'financiamento', 'cheque-especial', 'consignado']

const STATES = [
  'rj',
  'sp',
  'mg',
  'rs',
  'pr',
  'sc',
  'ba',
  'pe',
  'ce',
  'pa',
  'go',
  'es',
  'pb',
  'rn',
  'al',
  'mt',
  'ms',
  'df',
  'am',
  'ma',
  'pi',
  'se',
  'ro',
  'ac',
  'ap',
  'rr',
  'to',
]

const TOP_CITIES: Record<string, string[]> = {
  sp: ['sao-paulo', 'campinas', 'santos', 'sao-jose-dos-campos', 'ribeiro-preto'],
  rj: ['rio-de-janeiro', 'niteroi', 'sao-goncalo', 'duque-de-caxias', 'nova-iguacu'],
  mg: ['belo-horizonte', 'uberlandia', 'contagem', 'juiz-de-fora', 'betim'],
  rs: ['porto-alegre', 'caxias-do-sul', 'pelotas', 'canoas', 'santa-maria'],
  pr: ['curitiba', 'londrina', 'maringa', 'ponta-grossa', 'cascavel'],
}

interface GenerationStats {
  totalPages: number
  batchSize: number
  currentBatch: number
  pagesGenerated: number
}

async function generateAllPages() {
  const stats: GenerationStats = {
    totalPages: 10000,
    batchSize: 100, // Start smaller for testing
    currentBatch: 1,
    pagesGenerated: 0,
  }

  const allConfigs: PageConfig[] = []

  console.log('📋 Building page configurations...\n')

  // TIER 1: Service + Institution (100 pages)
  console.log('  Tier 1: Service + Institution')
  SERVICES.forEach(service => {
    INSTITUTIONS.forEach(institution => {
      allConfigs.push({ service, institution })
    })
  })

  // TIER 2: Service + Institution + Product (500 pages)
  console.log('  Tier 2: Service + Institution + Product')
  SERVICES.forEach(service => {
    INSTITUTIONS.slice(0, 10).forEach(institution => {
      PRODUCT_TYPES.forEach(productType => {
        allConfigs.push({ service, institution, productType })
      })
    })
  })

  // TIER 3: Service + Institution + State (2,700 pages)
  console.log('  Tier 3: Service + Institution + State')
  SERVICES.forEach(service => {
    INSTITUTIONS.slice(0, 20).forEach(institution => {
      STATES.forEach(state => {
        allConfigs.push({ service, institution, state })
      })
    })
  })

  // TIER 4: Service + Institution + Product + State (3,375 pages)
  console.log('  Tier 4: Service + Institution + Product + State')
  SERVICES.forEach(service => {
    INSTITUTIONS.slice(0, 10).forEach(institution => {
      PRODUCT_TYPES.forEach(productType => {
        STATES.slice(0, 15).forEach(state => {
          allConfigs.push({ service, institution, productType, state })
        })
      })
    })
  })

  // TIER 5: Service + Institution + City (3,325+ pages)
  console.log('  Tier 5: Service + Institution + City')
  SERVICES.forEach(service => {
    INSTITUTIONS.slice(0, 15).forEach(institution => {
      Object.entries(TOP_CITIES).forEach(([state, cities]) => {
        cities.forEach(city => {
          allConfigs.push({ service, institution, state, city })
        })
      })
    })
  })

  console.log(`\n📊 Total configurations: ${allConfigs.length}\n`)

  // Generate pages in batches
  const batches = chunkArray(allConfigs, stats.batchSize)

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    console.log(
      `🚀 Processing batch ${i + 1}/${batches.length} (${batch.length} pages)`
    )

    await generateBatch(batch, i + 1)

    stats.pagesGenerated += batch.length
    console.log(`✅ Progress: ${stats.pagesGenerated}/${allConfigs.length} pages\n`)

    // Delay between batches
    if (i < batches.length - 1) {
      await sleep(500)
    }
  }

  console.log(`\n🎉 COMPLETE: Generated ${stats.pagesGenerated} pages!`)
}

async function generateBatch(configs: PageConfig[], batchNumber: number) {
  const batchDir = path.join(process.cwd(), 'app', `batch-${batchNumber}`)

  for (const config of configs) {
    const pageData = generatePageContent(config)
    const filePath = path.join(process.cwd(), 'app', pageData.slug, 'page.tsx')

    // Create directory structure
    fs.mkdirSync(path.dirname(filePath), { recursive: true })

    // Generate Next.js page
    const pageCode = generateNextJSPage(pageData, config)
    fs.writeFileSync(filePath, pageCode)
  }
}

function generateNextJSPage(pageData: any, config: PageConfig): string {
  const metadataStr = JSON.stringify(pageData.metadata, null, 2)
  const schemaStr = JSON.stringify(pageData.schema, null, 2)

  return `import { Metadata } from 'next'

export const metadata: Metadata = ${metadataStr}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: \`${schemaStr}\` }}
      />
      
      <div className="container mx-auto px-4 py-12">
        ${pageData.content}
        
        <section className="my-16 p-8 bg-primary/10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Comece Agora Gratuitamente</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Consulta completa e sem compromisso com nossos especialistas. Resultado em até 2 horas.
          </p>
          <a href="/consulta-gratuita" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Solicitar Análise Gratuita
          </a>
        </section>
        
        <section className="my-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Serviços Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a href="/negociar-divida" className="p-4 border rounded hover:bg-muted transition-colors">Negociar Dívida</a>
            <a href="/cancelar-busca-apreensao" className="p-4 border rounded hover:bg-muted transition-colors">Cancelar Busca</a>
            <a href="/revisao-contrato" className="p-4 border rounded hover:bg-muted transition-colors">Revisão</a>
            <a href="/como-funciona" className="p-4 border rounded hover:bg-muted transition-colors">Como Funciona</a>
            <a href="/guias" className="p-4 border rounded hover:bg-muted transition-colors">Guias Jurídicos</a>
            <a href="/duvidas" className="p-4 border rounded hover:bg-muted transition-colors">Dúvidas</a>
          </div>
        </section>
      </div>
    </>
  )
}
`
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Execute
generateAllPages().catch(console.error)
