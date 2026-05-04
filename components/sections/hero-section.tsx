"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, MapPin, Percent, Phone, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { FormCTA } from "@/components/sections/form-cta"

const ROTATING_SERVICES = [
  "Cancele Busca e Apreensão",
  "Defesa em Alienação Fiduciária",
  "Revisão de Contrato",
  "Redução de Juros Abusivos",
  "Contestação de Leilão",
]

const PHONE = "5511925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

interface Badge {
  icon: React.ReactNode
  text: string
}

interface HeroSectionProps {
  title: string
  subtitle: string
  badges?: Badge[]
  showForm?: boolean
  backgroundPattern?: boolean
}

export function HeroSection({ 
  title, 
  subtitle, 
  badges,
  showForm = true,
  backgroundPattern = true 
}: HeroSectionProps) {
  const [formData, setFormData] = useState({ nome: "", telefone: "", placa: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serviceIndex, setServiceIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setServiceIndex((prev) => (prev + 1) % ROTATING_SERVICES.length)
        setFading(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const linhas = [
      `*Nova Consulta Gratuita - Quitadoc*`,
      ``,
      `*Nome:* ${formData.nome}`,
      `*WhatsApp:* ${formData.telefone}`,
      formData.placa ? `*Placa:* ${formData.placa}` : null,
      ``,
      `_Mensagem enviada pelo formulário do site._`,
    ]
      .filter((l) => l !== null)
      .join("\n")

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(linhas)}`

    setIsSubmitting(false)
    setSubmitted(true)
    window.open(url, "_blank")
  }

  const defaultBadges: Badge[] = [
    { icon: <Shield className="h-4 w-4" />, text: "Consulta Gratuita" },
    { icon: <MapPin className="h-4 w-4" />, text: "Atuação Nacional" },
    { icon: <Percent className="h-4 w-4" />, text: "Sucesso Fee 10%" },
  ]

  const displayBadges = badges || defaultBadges

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Background Pattern */}
      {backgroundPattern && (
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className={`grid gap-12 ${showForm ? 'lg:grid-cols-2' : ''} items-center`}>
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-balance text-primary-foreground">
              {title}
            </h1>
            <div className="mt-3 h-10 overflow-hidden">
              <span
                className="block text-2xl font-bold text-accent transition-all duration-300"
                style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(-8px)" : "translateY(0)" }}
              >
                {ROTATING_SERVICES[serviceIndex]}
              </span>
            </div>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>
            
            {/* Badges */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              {displayBadges.map((badge, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm"
                >
                  {badge.icon}
                  {badge.text}
                </div>
              ))}
            </div>

            {/* Urgency CTA */}
            {!showForm && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="relative">
                  <a
                    href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Preciso de ajuda urgente com meu veículo.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-[#20bb5a] transition-all hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    PROTEGER MEU CARRO AGORA
                  </a>
                  <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow">
                    URGENTE
                  </span>
                </div>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Prefere ligar? {PHONE_DISPLAY}
                </a>
              </div>
            )}
          </div>

          {/* Form — Google Forms CTA */}
          {showForm && (
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <FormCTA
                variant="hero"
                heading="Cancele a busca e apreensão do seu veículo em até 48h"
                subheading="Preencha o formulário e nossos profissionais entrarão em contato com você."
                buttonText="Analisar meu caso agora"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
