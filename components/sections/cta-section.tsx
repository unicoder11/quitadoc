"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Shield, Mail } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { FormCTA } from "@/components/sections/form-cta"

interface CTASectionProps {
  title?: string
  subtitle?: string
  showForm?: boolean
  showWhatsApp?: boolean
}

export function CTASection({ 
  title = "Evite Perder Seu Veiculo",
  subtitle = "Análise personalizada em 5 minutos. Resposta em até 2 horas.",
  showForm = true,
  showWhatsApp = true 
}: CTASectionProps) {
  const [formData, setFormData] = useState({ nome: "", telefone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const whatsappUrl = "https://wa.me/11925332215?text=" + encodeURIComponent("Ola! Preciso de ajuda com meu veiculo financiado.")

  return (
    <section className="bg-gradient-to-r from-accent to-accent-light py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="text-balance text-accent-foreground">{title}</h2>
        <p className="mt-4 text-lg text-accent-foreground/80">{subtitle}</p>

        <div className="mt-8">
          {submitted ? (
            <div className="mx-auto max-w-md rounded-lg bg-white/90 p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-success flex items-center justify-center">
                <svg className="h-6 w-6 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Mensagem Enviada!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Nossa equipe entrara em contato em breve.
              </p>
            </div>
          ) : (
            <>
              {showForm && (
                <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    required
                    className="flex-1 bg-white/90 text-foreground placeholder:text-muted-foreground"
                  />
                  <Input
                    type="tel"
                    placeholder="Seu WhatsApp"
                    value={formData.telefone}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                    required
                    className="flex-1 bg-white/90 text-foreground placeholder:text-muted-foreground"
                  />
                  <Button 
                    type="submit" 
                    className="bg-primary text-primary-foreground hover:bg-primary-dark font-semibold px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Quero Ajuda"}
                  </Button>
                </form>
              )}

              {showWhatsApp && (
                <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  {showForm && <span className="text-sm text-accent-foreground/60">ou</span>}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chamar no WhatsApp
                  </a>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-accent-foreground/70">
            <Shield className="h-4 w-4" />
            Sem compromisso. Seus dados estão protegidos.
          </div>
          <a
            href="mailto:contato@quitadoc.com.br"
            className="flex items-center gap-2 text-sm font-semibold text-accent-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            <Mail className="h-4 w-4" />
            Prefere e-mail? contato@quitadoc.com.br
          </a>
        </div>

        {/* Google Forms CTA — 4o ponto de conversão */}
        <div className="mt-10 w-full max-w-lg mx-auto">
          <FormCTA
            variant="inline"
            heading="Análise personalizada sem compromisso"
            subheading="Avaliação em 30 segundos. Nossos profissionais entrarão em contato com você."
            buttonText="Solicitar avaliação"
          />
        </div>
      </div>
    </section>
  )
}
