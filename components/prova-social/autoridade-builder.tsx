'use client'

import { Users, TrendingDown, Award, Shield, Zap, Calendar } from 'lucide-react'

interface ProvaItem {
  icon: React.ReactNode
  valor: string
  label: string
  descricao?: string
}

interface AutoridadeBuilderProps {
  className?: string
}

const PROVAS_SOCIAIS: ProvaItem[] = [
  {
    icon: <Users className="h-8 w-8" />,
    valor: '12.847',
    label: 'Clientes Atendidos',
    descricao: 'em todos os 26 estados do Brasil'
  },
  {
    icon: <TrendingDown className="h-8 w-8" />,
    valor: 'R$ 127M+',
    label: 'em Dívidas Negociadas',
    descricao: 'economia real comprovada'
  },
  {
    icon: <Award className="h-8 w-8" />,
    valor: '98.7%',
    label: 'Taxa de Sucesso',
    descricao: 'nas ações judiciais'
  },
  {
    icon: <Zap className="h-8 w-8" />,
    valor: '4 min',
    label: 'Tempo Médio de Resposta',
    descricao: 'atendimento 24h'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    valor: '7+',
    label: 'Anos de Experiência',
    descricao: 'especialistas formados'
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    valor: '848',
    label: 'Atendidos Esta Semana',
    descricao: 'crescimento constante'
  },
]

export function AutoridadeBuilder({ className = '' }: AutoridadeBuilderProps) {
  return (
    <section className={`py-16 lg:py-24 border-t border-b border-border ${className}`}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Números que Comprovam Nossa <span className="text-primary">Autoridade</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Somos os especialistas mais experientes em negociação de dívidas no Brasil
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROVAS_SOCIAIS.map((prova, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-border hover:border-primary/50 transition-colors hover:bg-primary/5"
            >
              <div className="text-primary mb-4">
                {prova.icon}
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {prova.valor}
              </p>
              <p className="font-semibold text-foreground mb-1">
                {prova.label}
              </p>
              {prova.descricao && (
                <p className="text-sm text-muted-foreground">
                  {prova.descricao}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wide">
            Credibilidade Comprovada
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <p className="font-bold text-foreground">OAB</p>
              <p className="text-xs text-muted-foreground">Registrado</p>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="text-center">
              <p className="font-bold text-foreground">Seguro de Responsabilidade</p>
              <p className="text-xs text-muted-foreground">Ativa</p>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="text-center">
              <p className="font-bold text-foreground">SGP Reclamações</p>
              <p className="text-xs text-muted-foreground">0 ações abertas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
