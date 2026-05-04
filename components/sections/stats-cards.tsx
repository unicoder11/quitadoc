"use client"

import { useEffect, useState, useRef } from "react"
import { Car, Banknote, TrendingUp, Users } from "lucide-react"

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  icon: React.ReactNode
}

interface StatsCardsProps {
  stats?: Stat[]
  layout?: "grid" | "inline"
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl font-bold text-accent">
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </span>
  )
}

const defaultStats: Stat[] = [
  { value: 650, suffix: "+", label: "Veículos Salvos", icon: <Car className="h-8 w-8" /> },
  { value: 12.8, prefix: "R$ ", suffix: "M", label: "Economizados", icon: <Banknote className="h-8 w-8" /> },
  { value: 87, suffix: "%", label: "Taxa de Sucesso", icon: <TrendingUp className="h-8 w-8" /> },
  { value: 5, suffix: "+", label: "Anos de Experiência", icon: <Users className="h-8 w-8" /> },
]

export function StatsCards({ stats = defaultStats, layout = "grid" }: StatsCardsProps) {
  return (
    <section className="bg-card py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className={
          layout === "grid" 
            ? "grid grid-cols-2 gap-6 lg:grid-cols-4" 
            : "flex flex-wrap justify-center gap-8"
        }>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative rounded-xl border-t-4 border-accent bg-secondary p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                {stat.icon}
              </div>
              <AnimatedNumber 
                value={stat.value} 
                prefix={stat.prefix} 
                suffix={stat.suffix} 
              />
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
