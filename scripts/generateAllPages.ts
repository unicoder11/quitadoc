import { generateAllConfigs, filterByTier, shuffleConfigs } from './generateConfigs'
import { BatchProcessor } from './batchProcessor'
import { QualityChecker } from './qualityChecker'
import { saveGenerationReport, savePageToDatabase } from './utils/database'
import { createLogger } from './utils/logger'

const logger = createLogger('GenerateAllPages')

interface GenerationOptions {
  tiers?: number[]
  count?: number
  batchSize?: number
  validateQuality?: boolean
  dryRun?: boolean
}

/**
 * Script principal de geração em massa
 */
async function main(options: GenerationOptions = {}) {
  const {
    tiers = [1, 2, 3, 4, 5],
    count,
    batchSize = 100,
    validateQuality = true,
    dryRun = false,
  } = options

  console.log('\n🚀 GERAÇÃO EM MASSA DE PÁGINAS')
  console.log('================================\n')

  // 1. Gerar configurações
  logger.info('Gerando configurações...')
  const allConfigs = generateAllConfigs()

  // 2. Filtrar por tiers
  let configs = allConfigs.filter((c) => tiers.includes(c.tier))
  logger.info(`Configs após filtro de tiers: ${configs.length}`)

  // 3. Limitar quantidade se especificado
  if (count && count < configs.length) {
    configs = shuffleConfigs(configs).slice(0, count)
    logger.info(`Limitado a ${count} páginas`)
  }

  // 4. Modo dry-run
  if (dryRun) {
    console.log('\n📊 DRY RUN - Simulação apenas\n')
    console.log(`Total de páginas: ${configs.length}`)
    console.log(`Batches de ${batchSize}: ${Math.ceil(configs.length / batchSize)}`)
    console.log(`Tempo estimado: ${estimateTime(configs.length, batchSize)} minutos\n`)
    return
  }

  // 5. Processar páginas em batches
  logger.info('Iniciando processamento...')
  const processor = new BatchProcessor(batchSize)
  const result = await processor.processAll(configs)

  // 6. Validar qualidade (opcional)
  if (validateQuality && result.success > 0) {
    logger.info('Validando qualidade...')
    console.log('Validação de qualidade implementada no processamento')
  }

  // 7. Salvar relatório
  await saveGenerationReport({
    timestamp: new Date(),
    totalConfigs: configs.length,
    success: result.success,
    failed: result.failed,
    skipped: result.skipped,
    errors: result.errors,
    options,
  })

  // 8. Sumário final
  console.log('\n✅ GERAÇÃO CONCLUÍDA')
  console.log('====================\n')
  console.log(`Total processadas: ${configs.length}`)
  console.log(`✅ Sucesso: ${result.success} (${percentage(result.success, configs.length)}%)`)
  console.log(`❌ Falhas: ${result.failed} (${percentage(result.failed, configs.length)}%)`)
  console.log(`⏭️  Ignoradas: ${result.skipped} (${percentage(result.skipped, configs.length)}%)`)

  if (result.errors.length > 0) {
    console.log(`\n⚠️  ${result.errors.length} erros detectados.`)
  }

  console.log('')
}

/**
 * Estima tempo de processamento
 */
function estimateTime(total: number, batchSize: number): number {
  const batchesCount = Math.ceil(total / batchSize)
  const secondsPerBatch = 3
  return Math.ceil((batchesCount * secondsPerBatch) / 60)
}

/**
 * Calcula percentual
 */
function percentage(part: number, total: number): number {
  return Math.floor((part / total) * 100)
}

// ========================================
// EXECUÇÃO
// ========================================

// Parse argumentos da linha de comando
const args = process.argv.slice(2)
const options: GenerationOptions = {}

args.forEach((arg) => {
  if (arg.startsWith('--tier=')) {
    const tiers = arg.split('=')[1].split(',').map(Number)
    options.tiers = tiers
  }
  if (arg.startsWith('--count=')) {
    options.count = parseInt(arg.split('=')[1])
  }
  if (arg.startsWith('--batch=')) {
    options.batchSize = parseInt(arg.split('=')[1])
  }
  if (arg === '--dry-run') {
    options.dryRun = true
  }
  if (arg === '--no-validate') {
    options.validateQuality = false
  }
})

// Executar
main(options).catch((error) => {
  console.error('\n❌ ERRO FATAL:', error)
  process.exit(1)
})
