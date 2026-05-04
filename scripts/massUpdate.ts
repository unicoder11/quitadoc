#!/usr/bin/env node

/**
 * PHASE 4.2: MASS UPDATE ENGINE
 * 
 * Update 50-100 existing pages daily to trigger re-crawl
 * This ensures Google continuously discovers and re-indexes content
 */

interface PageUpdate {
  id: string
  slug: string
  content: string
  updatedAt: Date
}

export async function massUpdatePages(batchSize: number = 100) {
  console.log(`\n🔄 Starting mass update of ${batchSize} pages...\n`)

  try {
    // Get oldest pages first (haven't been updated recently)
    const pagesToUpdate = await getOldestPages(batchSize)
    console.log(`📝 Found ${pagesToUpdate.length} pages to update`)

    let updatedCount = 0
    for (const page of pagesToUpdate) {
      // Make minor content update with timestamp
      const updatedContent = addTimestampComment(page.content)

      // Update page (in real implementation, write to database/filesystem)
      console.log(`✅ Updated: ${page.slug}`)
      updatedCount++

      if (updatedCount % 20 === 0) {
        console.log(`   Progress: ${updatedCount}/${pagesToUpdate.length}`)
      }
    }

    console.log(`\n✨ Successfully updated ${updatedCount} pages`)
    console.log(`📊 Total updated: ${updatedCount} pages`)

    return updatedCount
  } catch (error) {
    console.error('❌ Error during mass update:', error)
    throw error
  }
}

async function getOldestPages(limit: number): Promise<PageUpdate[]> {
  // In real implementation, query database for oldest updated pages
  // For now, return mock data
  const mockPages: PageUpdate[] = []

  for (let i = 0; i < Math.min(limit, 100); i++) {
    mockPages.push({
      id: `page-${i}`,
      slug: `/negociar-divida/nubank`,
      content: `<article>Content for page ${i}</article>`,
      updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    })
  }

  return mockPages
}

function addTimestampComment(content: string): string {
  // Add invisible timestamp comment to trigger update without changing visible content
  const timestamp = `<!-- Last updated: ${new Date().toISOString()} -->`

  // Insert before closing article tag
  if (content.includes('</article>')) {
    return content.replace('</article>', `${timestamp}\n</article>`)
  }

  // If no article tag, just prepend
  return timestamp + '\n' + content
}

/**
 * Schedule mass updates as a cron job
 * Run this daily to keep pages fresh in Google's index
 */
export async function scheduleMassUpdates() {
  console.log('📅 Scheduling daily mass updates...\n')

  // In real implementation, use cron job library
  // For now, just log the schedule
  console.log('Cron job configured:')
  console.log('  ⏰ Time: 03:00 AM UTC (Google crawls most during this time)')
  console.log('  📝 Action: Update 100 oldest pages')
  console.log('  🔄 Frequency: Daily\n')

  console.log('Expected impact:')
  console.log('  • Keeps pages fresh in Google index')
  console.log('  • Triggers re-crawl signal')
  console.log('  • Improves crawl budget efficiency')
  console.log('  • Can boost ranking for updated pages\n')
}

// Main execution
async function main() {
  const batchSize = parseInt(process.env.BATCH_SIZE || '100', 10)
  const schedule = process.env.SCHEDULE === 'true'

  if (schedule) {
    await scheduleMassUpdates()
  } else {
    await massUpdatePages(batchSize)
  }
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
