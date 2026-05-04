'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface IndexingStats {
  totalPages: number
  indexedPages: number
  pendingPages: number
  crawlRate: number
  dailyIndexing: Array<{ date: string; count: number }>
  recentPages: Array<{ slug: string; status: string; updatedAt: string }>
}

interface StatCardProps {
  title: string
  value: string | number
  trend?: string
  percentage?: string
}

export default function IndexingDashboard() {
  const [stats, setStats] = useState<IndexingStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  async function fetchStats() {
    try {
      const response = await fetch('/api/indexing-stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8">Carregando dashboard...</div>
  }

  if (!stats) {
    return <div className="p-8">Erro ao carregar estatísticas</div>
  }

  const indexedPercent = ((stats.indexedPages / stats.totalPages) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Painel de Indexação</h1>
          <p className="text-muted-foreground">Monitore o progresso de indexação no Google em tempo real</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total de Páginas"
            value={stats.totalPages.toLocaleString()}
            trend="+500 hoje"
          />
          <StatCard
            title="Páginas Indexadas"
            value={stats.indexedPages.toLocaleString()}
            percentage={indexedPercent}
          />
          <StatCard
            title="Pendentes"
            value={stats.pendingPages.toLocaleString()}
          />
          <StatCard
            title="Taxa de Rastreamento"
            value={`${stats.crawlRate}`}
          />
        </div>

        {/* Daily Indexing Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Indexação Diária</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.dailyIndexing.map((day, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{day.date}</span>
                    <div className="flex-1 mx-4 bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(day.count / Math.max(...stats.dailyIndexing.map(d => d.count))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{day.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taxa de Indexação</p>
                <p className="text-2xl font-bold">{indexedPercent}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Faltam para 100%</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingPages.toLocaleString()}</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Meta para 4 semanas:</p>
                <div className="space-y-1 text-sm">
                  <p>• Semana 1: 2,000-4,000</p>
                  <p>• Semana 2: 5,000-8,000</p>
                  <p>• Semana 3: 8,000-10,000+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Páginas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-muted-foreground">
                    <th className="text-left py-2 px-4">Página</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Atualizado em</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentPages.map((page, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4 font-mono text-xs">{page.slug}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          page.status === 'indexed'
                            ? 'bg-green-100 text-green-800'
                            : page.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {page.status === 'indexed' && 'Indexada'}
                          {page.status === 'pending' && 'Pendente'}
                          {page.status === 'excluded' && 'Excluída'}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-xs text-muted-foreground">{page.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Schedule */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Cronograma de Publicação (Próximas 4 Semanas)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <DeploymentPhase title="Fase de Explosão (Dias 1-3)" pages="500/dia" description="Atrai atenção do rastreador inicial" />
              <DeploymentPhase title="Fase Sustentada (Dias 4-10)" pages="200-300/dia" description="Mantém o ritmo de publicação" />
              <DeploymentPhase title="Fase de Otimização (Dias 11-14)" pages="100/dia" description="Atualiza e refina páginas existentes" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, trend, percentage }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
        {percentage && <p className="text-sm text-green-600 font-semibold">{percentage}% indexado</p>}
        {trend && <p className="text-sm text-green-600 font-semibold">{trend}</p>}
      </CardContent>
    </Card>
  )
}

function DeploymentPhase({ title, pages, description }: { title: string; pages: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
      <div className="flex-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary">{pages}</p>
      </div>
    </div>
  )
}
