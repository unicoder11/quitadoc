import type { PageContent } from '@/lib/contentGenerator'

export interface QualityReport {
  slug: string
  passed: boolean
  score: number
  issues: string[]
  metrics: {
    wordCount: number
    hasH1: boolean
    hasH2: boolean
    hasFAQ: boolean
    hasCTA: boolean
    hasTestimonials: boolean
    uniquenessEstimate: number
  }
}

export class QualityChecker {
  private minWordCount = 400
  private maxWordCount = 800
  private minScore = 70

  /**
   * Valida qualidade de uma página gerada
   */
  validate(slug: string, content: PageContent): QualityReport {
    const issues: string[] = []
    const metrics = this.analyzeMetrics(content)

    // Validações
    if (metrics.wordCount < this.minWordCount) {
      issues.push(
        `Conteúdo muito curto (${metrics.wordCount} palavras, mínimo ${this.minWordCount})`
      )
    }

    if (metrics.wordCount > this.maxWordCount) {
      issues.push(
        `Conteúdo muito longo (${metrics.wordCount} palavras, máximo ${this.maxWordCount})`
      )
    }

    if (!metrics.hasH1) {
      issues.push('Faltando H1')
    }

    if (!metrics.hasH2) {
      issues.push('Faltando H2')
    }

    if (!metrics.hasFAQ) {
      issues.push('Faltando seção de FAQ')
    }

    if (!metrics.hasCTA) {
      issues.push('Faltando CTA')
    }

    if (!metrics.hasTestimonials) {
      issues.push('Faltando depoimentos')
    }

    if (metrics.uniquenessEstimate < 90) {
      issues.push(`Baixa unicidade estimada (${metrics.uniquenessEstimate}%)`)
    }

    // Calcula score (0-100)
    const score = this.calculateScore(metrics, issues)

    return {
      slug,
      passed: score >= this.minScore && issues.length === 0,
      score,
      issues,
      metrics,
    }
  }

  /**
   * Analisa métricas do conteúdo
   */
  private analyzeMetrics(content: PageContent): QualityReport['metrics'] {
    const fullText = this.extractFullText(content)
    const wordCount = this.countWords(fullText)

    return {
      wordCount,
      hasH1: !!content.h1,
      hasH2: fullText.includes('<h2'),
      hasFAQ: content.faq.length > 0,
      hasCTA: !!content.cta,
      hasTestimonials: content.testimonials.length > 0,
      uniquenessEstimate: this.estimateUniqueness(content),
    }
  }

  /**
   * Extrai texto completo de todas as seções
   */
  private extractFullText(content: PageContent): string {
    return [
      content.h1,
      content.intro,
      content.benefits,
      content.howItWorks,
      content.testimonials.map((t) => t.text).join(' '),
      content.faq.map((f) => `${f.question} ${f.answer}`).join(' '),
      content.cta,
    ].join(' ')
  }

  /**
   * Conta palavras no texto
   */
  private countWords(text: string): number {
    const cleanText = text.replace(/<[^>]*>/g, '')
    return cleanText.split(/\s+/).filter((w) => w.length > 0).length
  }

  /**
   * Estima unicidade baseado em variações detectadas
   */
  private estimateUniqueness(content: PageContent): number {
    const intro = content.intro.toLowerCase()
    const benefits = content.benefits.toLowerCase()

    const introWords = new Set(intro.split(/\s+/))
    const benefitsWords = new Set(benefits.split(/\s+/))

    const uniqueWords = new Set([...introWords, ...benefitsWords])
    const totalWords = introWords.size + benefitsWords.size

    return Math.min(100, Math.floor((uniqueWords.size / totalWords) * 100 * 1.2))
  }

  /**
   * Calcula score geral (0-100)
   */
  private calculateScore(metrics: QualityReport['metrics'], issues: string[]): number {
    let score = 100

    score -= issues.length * 10

    if (metrics.wordCount < this.minWordCount) {
      score -= 15
    }
    if (metrics.wordCount > this.maxWordCount) {
      score -= 10
    }

    if (metrics.hasH1) score += 5
    if (metrics.hasH2) score += 5
    if (metrics.hasFAQ) score += 10
    if (metrics.hasCTA) score += 5
    if (metrics.hasTestimonials) score += 5

    score = (score * metrics.uniquenessEstimate) / 100

    return Math.max(0, Math.min(100, Math.floor(score)))
  }

  /**
   * Valida batch de páginas e retorna relatório
   */
  validateBatch(pages: Array<{ slug: string; content: PageContent }>): {
    passed: number
    failed: number
    avgScore: number
    reports: QualityReport[]
  } {
    const reports = pages.map((p) => this.validate(p.slug, p.content))

    const passed = reports.filter((r) => r.passed).length
    const failed = reports.length - passed
    const avgScore = reports.reduce((sum, r) => sum + r.score, 0) / reports.length

    return { passed, failed, avgScore, reports }
  }
}
