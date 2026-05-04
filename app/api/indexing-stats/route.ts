import { NextResponse } from 'next/server'

/**
 * API endpoint for indexing statistics
 * In production, this would fetch real data from Google Search Console
 */

interface IndexingStats {
  totalPages: number
  indexedPages: number
  pendingPages: number
  crawlRate: number
  dailyIndexing: Array<{ date: string; count: number }>
  recentPages: Array<{ slug: string; status: string; updatedAt: string }>
}

export async function GET(): Promise<NextResponse<IndexingStats>> {
  // Mock data - in production, integrate with Google Search Console API
  const stats: IndexingStats = {
    totalPages: 10000,
    indexedPages: 6500, // 65% indexed
    pendingPages: 3500,
    crawlRate: 450, // pages per day

    // Sample daily indexing data
    dailyIndexing: Array.from({ length: 14 }, (_, i) => {
      const day = i + 1
      const baseRate = day <= 3 ? 500 : day <= 10 ? 350 : 200
      const variance = Math.floor(Math.random() * 100 - 50)
      return {
        date: `Dia ${day}`,
        count: Math.max(100, baseRate + variance),
      }
    }),

    // Sample recent pages
    recentPages: [
      {
        slug: '/negociar-divida/nubank',
        status: 'indexed',
        updatedAt: new Date().toISOString().split('T')[0],
      },
      {
        slug: '/negociar-divida/itau/cartao',
        status: 'indexed',
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        slug: '/cancelar-busca-apreensao/bradesco/sp',
        status: 'pending',
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        slug: '/revisao-contrato/santander/rj',
        status: 'pending',
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        slug: '/negociar-divida/bb/mg',
        status: 'indexed',
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    ],
  }

  return NextResponse.json(stats)
}
