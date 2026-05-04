import { ContentGenerator, type PageContext } from '@/lib/contentGenerator'
import type { PageConfig } from './generateConfigs'

export interface BatchResult {
  success: number
  failed: number
  skipped: number
  errors: Array<{ config: PageConfig; error: string }>
}

export class BatchProcessor {
  private generator: ContentGenerator
  private batchSize: number
  private delayBetweenBatches: number

  constructor(batchSize = 100, delayMs = 1000) {
    this.generator = new ContentGenerator()
    this.batchSize = batchSize
    this.delayBetweenBatches = delayMs
  }

  /**
   * Processa múltiplos batches de configurações
   */
  async processAll(configs: PageConfig[]): Promise<BatchResult> {
    const totalBatches = Math.ceil(configs.length / this.batchSize)
    const result: BatchResult = {
      success: 0,
      failed: 0,
      skipped: 0,
      errors: [],
    }

    console.log(
      `\n🚀 Processando ${configs.length} páginas em ${totalBatches} batches de ${this.batchSize}\n`
    )

    for (let i = 0; i < configs.length; i += this.batchSize) {
      const batchNum = Math.floor(i / this.batchSize) + 1
      const batch = configs.slice(i, i + this.batchSize)

      this.logProgress(`Batch ${batchNum}/${totalBatches}`, i, configs.length)

      const batchResult = await this.processBatch(batch)

      result.success += batchResult.success
      result.failed += batchResult.failed
      result.skipped += batchResult.skipped
      result.errors.push(...batchResult.errors)

      // Delay entre batches para evitar sobrecarga
      if (i + this.batchSize < configs.length) {
        await this.sleep(this.delayBetweenBatches)
      }
    }

    console.log('\n✅ Processamento completo!')
    console.log(`   Sucesso: ${result.success}`)
    console.log(`   Falhas: ${result.failed}`)
    console.log(`   Ignoradas: ${result.skipped}\n`)

    return result
  }

  /**
   * Processa um único batch
   */
  private async processBatch(configs: PageConfig[]): Promise<BatchResult> {
    const result: BatchResult = {
      success: 0,
      failed: 0,
      skipped: 0,
      errors: [],
    }

    const promises = configs.map((config) => this.processOne(config, result))
    await Promise.all(promises)

    return result
  }

  /**
   * Processa uma única página
   */
  private async processOne(config: PageConfig, result: BatchResult): Promise<void> {
    try {
      // Gera conteúdo
      const content = await this.generator.generatePageContent(config)

      // Simula salvamento no banco de dados
      console.log(`[v0] Generated page: ${config.slug}`)

      result.success++
    } catch (error) {
      result.failed++
      result.errors.push({
        config,
        error: error instanceof Error ? error.message : String(error),
      })
      console.error(`Erro ao processar ${config.slug}:`, error)
    }
  }

  /**
   * Sleep assíncrono
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Log de progresso
   */
  private logProgress(label: string, current: number, total: number): void {
    const percentage = Math.floor((current / total) * 100)
    const bar = this.createProgressBar(percentage, 30)
    process.stdout.write(`\r${label}: ${bar} ${percentage}% (${current}/${total})`)

    if (current === total) {
      console.log('')
    }
  }

  /**
   * Cria barra de progresso
   */
  private createProgressBar(percentage: number, width: number): string {
    const filled = Math.floor((percentage / 100) * width)
    const empty = width - filled
    return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']'
  }
}
