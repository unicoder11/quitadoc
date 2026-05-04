export function logProgress(label: string, current: number, total: number): void {
  const percentage = Math.floor((current / total) * 100)
  const bar = createProgressBar(percentage, 30)

  process.stdout.write(`\r${label}: ${bar} ${percentage}% (${current}/${total})`)

  if (current === total) {
    console.log('')
  }
}

export function logSuccess(message: string): void {
  console.log('✅', message)
}

export function logError(message: string, error?: any): void {
  console.error('❌', message)
  if (error) {
    console.error(error)
  }
}

export function logWarning(message: string): void {
  console.warn('⚠️ ', message)
}

export function logInfo(message: string): void {
  console.log('ℹ️ ', message)
}

function createProgressBar(percentage: number, width: number): string {
  const filled = Math.floor((percentage / 100) * width)
  const empty = width - filled
  return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']'
}

export function createLogger(context: string) {
  return {
    info: (msg: string) => logInfo(`[${context}] ${msg}`),
    success: (msg: string) => logSuccess(`[${context}] ${msg}`),
    error: (msg: string, err?: any) => logError(`[${context}] ${msg}`, err),
    warn: (msg: string) => logWarning(`[${context}] ${msg}`),
  }
}
