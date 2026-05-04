"use client"

import { useEffect, useState } from "react"
import { Shield, Award, Users, TrendingDown, Clock, Star, CheckCircle2, Building2 } from "lucide-react"

interface TrustIndicatorsProps {
  variant?: "light" | "dark" | "primary"
  showLogos?: boolean
  compact?: boolean
}

const STATS = [
  { icon: Users, value: 12847, suffix: "+", label: "clientes atendidos", prefix: "" },
  { icon: TrendingDown, value: 127, suffix: "M+", label: "em dívidas negociadas", prefix: "R$ " },
  { icon: Star, value: 98.7, suffix: "%", label: "taxa de sucesso", prefix: "" },
  { icon: Clock, value: 4, suffix: " min", label: "tempo médio resposta", prefix: "" },
]

const MEDIA_LOGOS = [
  { name: "Globo", src: "/logos/globo.svg" },
  { name: "Folha", src: "/logos/folha.svg" },
  { name: "Estadão", src: "/logos/estadao.svg" },
  { name: "Exame", src: "/logos/exame.svg" },
  { name: "InfoMoney", src: "/logos/infomoney.svg" },
]

const CERTIFICACOES = [
  { icon: Shield, label: "SSL Seguro" },
  { icon: Award, label: "OAB Verificado" },
  { icon: Building2, label: "CNPJ Ativo" },
  { icon: CheckCircle2, label: "Reclame Aqui" },
]

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current * 10) / 10)
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  const formatted = Number.isInteger(value) 
    ? count.toLocaleString("pt-BR", { maximumFractionDigits: 0 })
    : count.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  
  return <span>{prefix}{formatted}{suffix}</span>
}

export function TrustIndicators({ variant = "light", showLogos = true, compact = false }: TrustIndicatorsProps) {
  const bgClass = variant === "dark" 
    ? "bg-foreground text-background" 
    : variant === "primary" 
    ? "bg-primary text-primary-foreground" 
    : "bg-card text-foreground"
  
  const mutedClass = variant === "dark" 
    ? "text-background/70" 
    : variant === "primary" 
    ? "text-primary-foreground/70" 
    : "text-muted-foreground"

  return (
    <section className={`py-8 lg:py-12 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Stats com numeros animados */}
        <div className={`grid ${compact ? "grid-cols-2 lg:grid-cols-4 gap-4" : "grid-cols-2 lg:grid-cols-4 gap-8"}`}>
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${variant === "light" ? "text-primary" : ""}`} />
              <p className={`${compact ? "text-2xl lg:text-3xl" : "text-3xl lg:text-4xl"} font-bold`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </p>
              <p className={`text-sm ${mutedClass}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Certificacoes */}
        <div className="mt-8 pt-8 border-t border-current/10">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {CERTIFICACOES.map((cert) => (
              <div key={cert.label} className="flex items-center gap-2">
                <cert.icon className={`h-5 w-5 ${variant === "light" ? "text-success" : "text-accent"}`} />
                <span className={`text-sm ${mutedClass}`}>{cert.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logos de midia (placeholder) */}
        {showLogos && (
          <div className="mt-8 pt-8 border-t border-current/10">
            <p className={`text-center text-xs uppercase tracking-wider mb-4 ${mutedClass}`}>
              Visto em
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {MEDIA_LOGOS.map((logo) => (
                <div 
                  key={logo.name} 
                  className={`h-6 px-4 flex items-center justify-center rounded ${variant === "light" ? "bg-muted" : "bg-current/10"}`}
                >
                  <span className={`text-sm font-medium ${mutedClass}`}>{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function TrustBadgesInline() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span>12.847 clientes</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <TrendingDown className="h-4 w-4 text-success" />
        <span>R$ 127M negociados</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Star className="h-4 w-4 text-accent" />
        <span>98.7% sucesso</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Shield className="h-4 w-4 text-primary" />
        <span>OAB Verificado</span>
      </div>
    </div>
  )
}
