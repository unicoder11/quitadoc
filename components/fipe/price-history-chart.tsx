'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PriceHistoryPoint } from '@/lib/fipe/mock-data'

interface PriceHistoryChartProps {
  data: PriceHistoryPoint[]
  title?: string
  height?: number
}

export function PriceHistoryChart({ data, title = 'Histórico de Preços (12 meses)', height = 300 }: PriceHistoryChartProps) {
  const formatPrice = (value: number) => {
    return `R$ ${(value / 1000).toFixed(0)}k`
  }

  const formatTooltip = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR')}`
  }

  return (
    <div className="w-full space-y-4">
      {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="month"
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="var(--color-muted-foreground)"
            tickFormatter={formatPrice}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: `1px solid var(--color-border)`,
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '12px',
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            dot={{ fill: 'var(--color-primary)', r: 4 }}
            activeDot={{ r: 6 }}
            name="Preço"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
