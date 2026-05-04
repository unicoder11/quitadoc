"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircle, Phone, Shield, Clock, TrendingDown, Users } from "lucide-react"

const WHATSAPP = "5511925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

const STATS = [
  { icon: Users, value: "12.847+", label: "clientes" },
  { icon: TrendingDown, value: "R$ 127M+", label: "negociados" },
  { icon: Shield, value: "98.7%", label: "sucesso" },
]

interface OptimizedHeroProps {
  title: string
  subtitle: string
  ctaText?: string
  showStats?: boolean
  variant?: "primary" | "dark"
}

export function OptimizedHero({ 
  title, 
  subtitle, 
  ctaText = "Simular Minha Economia",
  showStats = true,
  variant = "primary"
}: OptimizedHeroProps) {
  const [isHovered, setIsHovered] = useState(false)

  const bgClass = variant === "dark" ? "bg-foreground" : "bg-primary"
  const textClass = variant === "dark" ? "text-background" : "text-primary-foreground"

  return (
    <section className={`relative ${bgClass} ${textClass} py-16 lg:py-24`}>
      {/* Minimal background - no heavy images */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          {/* Live indicator */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>847 pessoas simularam hoje</span>
          </div>

          {/* Title - uses text instead of images */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {title}
          </h1>

          <p className="mt-6 text-lg lg:text-xl opacity-90 max-w-2xl">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/simulador"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                inline-flex items-center justify-center gap-3 rounded-full 
                bg-accent px-8 py-4 text-lg font-semibold text-accent-foreground
                transition-transform duration-200
                ${isHovered ? "scale-105" : "scale-100"}
              `}
            >
              <MessageCircle className="h-5 w-5" />
              {ctaText}
            </Link>

            <a
              href={`tel:+${WHATSAPP}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-current/30 px-6 py-4 text-base font-medium hover:bg-white/10 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Ligar: {PHONE_DISPLAY}
            </a>
          </div>

          {/* Stats - inline, no heavy components */}
          {showStats && (
            <div className="mt-12 flex flex-wrap gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className="h-6 w-6 opacity-70" />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm opacity-70">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Trust line */}
          <div className="mt-8 flex items-center gap-2 text-sm opacity-70">
            <Clock className="h-4 w-4" />
            <span>Resposta em 4 minutos | Gratis e sem compromisso</span>
          </div>
        </div>
      </div>
    </section>
  )
}
