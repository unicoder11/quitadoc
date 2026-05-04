"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Clock, Shield, CheckCircle, ArrowRight } from "lucide-react"

interface AggressiveCTAProps {
  variant?: "urgent" | "value" | "fear" | "authority"
  title?: string
  subtitle?: string
  className?: string
}

export function AggressiveCTA({ 
  variant = "urgent", 
  title,
  subtitle,
  className 
}: AggressiveCTAProps) {
  const variants = {
    urgent: {
      bg: "bg-gradient-to-r from-red-600 to-red-700",
      title: "Seu Prazo Pode Estar Acabando!",
      subtitle: "A cada dia sem ação, você perde direitos. Fale agora com um especialista.",
      icon: Clock,
    },
    value: {
      bg: "bg-gradient-to-r from-primary to-primary/80",
      title: "Economize Até 60% na Sua Dívida",
      subtitle: "Nossos clientes economizam em média R$ 15.000. Descubra quanto você pode economizar.",
      icon: CheckCircle,
    },
    fear: {
      bg: "bg-gradient-to-r from-amber-600 to-amber-700",
      title: "Não Deixe Tomarem Seu Patrimônio",
      subtitle: "Bancos agem rápido. Você precisa agir mais rápido ainda.",
      icon: Shield,
    },
    authority: {
      bg: "bg-gradient-to-r from-slate-800 to-slate-900",
      title: "Mais de 5.000 Casos Resolvidos",
      subtitle: "Equipe especializada com 15 anos de experiência em defesa patrimonial.",
      icon: Shield,
    },
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <section 
      className={cn(
        "my-8 overflow-hidden rounded-2xl text-white",
        config.bg,
        className
      )}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-white/20 p-3">
            <Icon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold md:text-2xl">
              {title || config.title}
            </h3>
            <p className="mt-2 text-white/90">
              {subtitle || config.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button 
            size="lg"
            className="w-full bg-white text-foreground hover:bg-white/90 sm:w-auto"
            asChild
          >
            <Link href="/consulta-gratuita">
              <Phone className="mr-2 h-5 w-5" />
              Consulta Gratuita Agora
            </Link>
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
            asChild
          >
            <a 
              href="https://wa.me/11925332215?text=Preciso%20de%20ajuda%20urgente"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Direto
            </a>
          </Button>
        </div>

        {variant === "urgent" && (
          <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            12 advogados online agora
          </div>
        )}
      </div>
    </section>
  )
}

interface MiniCTAProps {
  text?: string
  href?: string
  className?: string
}

export function MiniCTA({ 
  text = "Fale com um especialista agora", 
  href = "/consulta-gratuita",
  className 
}: MiniCTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group my-4 flex items-center justify-between rounded-lg border-2 border-primary bg-primary/5 p-4 transition-all hover:bg-primary/10",
        className
      )}
    >
      <span className="font-medium text-primary">{text}</span>
      <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

interface UrgencyBannerProps {
  message?: string
  className?: string
}

export function UrgencyBanner({ 
  message = "Prazo para defesa: geralmente 15 dias. Não perca tempo!",
  className 
}: UrgencyBannerProps) {
  return (
    <div 
      className={cn(
        "my-4 flex items-center gap-3 rounded-lg bg-amber-100 px-4 py-3 text-amber-900",
        className
      )}
    >
      <Clock className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
