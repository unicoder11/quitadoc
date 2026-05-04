"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Users, Star } from "lucide-react"

interface LeadMagnetCTAProps {
  onSubmit?: (data: { nome: string; email: string; telefone?: string }) => void
}

export function LeadMagnetCTA({ onSubmit }: LeadMagnetCTAProps) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      if (onSubmit) {
        onSubmit({ nome, email, telefone })
      }

      // Reset after 2 seconds
      setTimeout(() => {
        setNome("")
        setEmail("")
        setTelefone("")
        setIsSubmitted(false)
      }, 2000)
    }, 1000)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-accent via-accent/90 to-accent/80 py-16 lg:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <Download className="w-4 h-4" />
              <span className="text-sm font-semibold text-white/90">GUIA ESTRATÉGICO</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              7 Estratégias Jurídicas Para Cancelar a Busca e Apreensão
            </h2>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              PDF completo com modelos de defesa, jurisprudência favorável e passo a passo detalhado. 
              <strong> Usado por mais de 2.300 pessoas.</strong>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">47</div>
                <div className="text-sm text-white/80 mt-1">páginas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">2.347</div>
                <div className="text-sm text-white/80 mt-1">downloads</div>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div>
                  <div className="flex text-yellow-300 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="text-sm text-white/80">4.9/5</div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "Casos jurisprudenciais de sucesso (2023-2024)",
                "Modelos prontos de peças processuais",
                "Estratégia passo a passo para cada fase",
                "Direitos que o banco não quer que você saiba",
                "Prazos e procedimentos legais atualizados"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="text-white mt-1">✓</div>
                  <p className="text-white/90">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Baixe Agora</h3>
                  <p className="text-sm text-muted-foreground">Acesso rápido. Material completo.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Seu Nome
                  </label>
                  <Input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: João Silva"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Seu Melhor E-mail
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: joao@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    WhatsApp (opcional)
                  </label>
                  <Input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Ex: (11) 99999-9999"
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !nome || !email}
                  className="w-full h-14 text-base font-bold bg-accent hover:bg-accent/90 text-white"
                >
                  {isSubmitting ? "Processando..." : "BAIXAR GUIA GRATUITO"}
                </Button>

                <div className="space-y-2 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    ✓ Download imediato no seu e-mail
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    ✓ Sem spam, sem compromisso
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    ✓ Seus dados estão protegidos
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Enviado com Sucesso!</h3>
                <p className="text-muted-foreground mb-6">
                  Verifique seu e-mail (e a pasta de spam) para baixar o guia.
                </p>
                <p className="text-sm text-muted-foreground border-t pt-4">
                  Se tiver dúvidas, entre em contato conosco via WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center border-t border-white/20 pt-12">
          <p className="text-white/80 mb-6">
            Depois do guia, fale direto com nossos especialistas
          </p>
          <Button
            className="bg-white text-accent hover:bg-white/90 font-bold px-8 h-12"
            onClick={() => {
              const whatsappUrl = `https://wa.me/11925332215?text=${encodeURIComponent(
                "Oi! Gostaria de agendar uma consulta."
              )}`
              window.open(whatsappUrl, "_blank")
            }}
          >
            Agendar Consulta
          </Button>
        </div>
      </div>
    </section>
  )
}
