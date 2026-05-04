"use client"

import { useState } from "react"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Clock, CheckCircle, MessageCircle, Phone, Mail } from "lucide-react"
import { FormCTA } from "@/components/sections/form-cta"

export default function ConsultaGratuitaPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    placa: "",
    situacao: "",
    mensagem: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const WHATSAPP_NUMBER = "11925332215"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const situacaoLabels: Record<string, string> = {
      notificacao: "Recebi notificacao do banco",
      atrasado: "Estou com parcelas atrasadas",
      apreendido: "Veiculo foi apreendido",
      leilao: "Veiculo vai para leilao",
      juros: "Quero revisar juros",
      outro: "Outra situacao",
    }

    const msg = [
      `*Nova Consulta - Quitadoc*`,
      ``,
      `*Nome:* ${formData.nome}`,
      `*Email:* ${formData.email}`,
      `*WhatsApp:* ${formData.telefone}`,
      formData.placa ? `*Placa:* ${formData.placa}` : null,
      `*Situacao:* ${situacaoLabels[formData.situacao] || formData.situacao}`,
      formData.mensagem ? `*Mensagem:* ${formData.mensagem}` : null,
    ]
      .filter(Boolean)
      .join("\n")

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

    setIsSubmitting(false)
    setSubmitted(true)

    window.open(url, "_blank")
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[{ label: "Consulta Gratuita" }]} />
      </div>
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-primary-foreground">
                Consulta Gratuita com Especialistas
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Analise seu caso sem compromisso. Nossa equipe de advogados especializados 
                vai avaliar sua situacao e indicar a melhor estrategia de defesa.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Sem custo</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Sem compromisso</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Resposta em 2h</span>
                </div>
              </div>

              {/* Contact Options */}
              <div className="mt-10 space-y-4">
                <a 
                  href="https://wa.me/11925332215?text=Ola!%20Preciso%20de%20ajuda%20com%20meu%20veiculo%20financiado."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-[#25D366] px-6 py-4 text-white transition-transform hover:scale-105 max-w-sm mx-auto lg:mx-0"
                >
                  <MessageCircle className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-sm text-white/80">(21) 99607-6746</p>
                  </div>
                </a>
                <a 
                  href="tel:+5521996076746"
                  className="flex items-center gap-3 rounded-lg bg-primary-foreground/10 px-6 py-4 text-primary-foreground transition-colors hover:bg-primary-foreground/20 max-w-sm mx-auto lg:mx-0"
                >
                  <Phone className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="text-sm text-primary-foreground/80">(21) 99607-6746</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="rounded-2xl bg-card p-6 lg:p-8 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-success-foreground" />
                    </div>
                    <h2 className="mt-6 text-xl font-bold text-foreground">Mensagem Enviada!</h2>
                    <p className="mt-3 text-muted-foreground">
                      Nossa equipe recebeu seu contato e entrara em contato em ate 2 horas.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Fique atento ao seu WhatsApp e email.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-foreground">Preencha seus Dados</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Vamos analisar seu caso e retornar em ate 2 horas
                    </p>
                    
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-foreground">
                          Nome Completo *
                        </label>
                        <Input
                          id="nome"
                          type="text"
                          value={formData.nome}
                          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                          required
                          className="mt-1 bg-secondary"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground">
                            Email *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="mt-1 bg-secondary"
                          />
                        </div>
                        <div>
                          <label htmlFor="telefone" className="block text-sm font-medium text-foreground">
                            WhatsApp *
                          </label>
                          <Input
                            id="telefone"
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                            required
                            className="mt-1 bg-secondary"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="placa" className="block text-sm font-medium text-foreground">
                          Placa do Veiculo
                        </label>
                        <Input
                          id="placa"
                          type="text"
                          placeholder="ABC1234"
                          value={formData.placa}
                          onChange={(e) => setFormData(prev => ({ ...prev, placa: e.target.value.toUpperCase() }))}
                          className="mt-1 bg-secondary uppercase"
                          maxLength={7}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="situacao" className="block text-sm font-medium text-foreground">
                          Sua Situacao *
                        </label>
                        <select
                          id="situacao"
                          value={formData.situacao}
                          onChange={(e) => setFormData(prev => ({ ...prev, situacao: e.target.value }))}
                          required
                          className="mt-1 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground"
                        >
                          <option value="">Selecione...</option>
                          <option value="notificacao">Recebi notificacao do banco</option>
                          <option value="atrasado">Estou com parcelas atrasadas</option>
                          <option value="apreendido">Veiculo foi apreendido</option>
                          <option value="leilao">Veiculo vai para leilao</option>
                          <option value="juros">Quero revisar juros</option>
                          <option value="outro">Outra situacao</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="mensagem" className="block text-sm font-medium text-foreground">
                          Conte-nos mais (opcional)
                        </label>
                        <textarea
                          id="mensagem"
                          rows={3}
                          value={formData.mensagem}
                          onChange={(e) => setFormData(prev => ({ ...prev, mensagem: e.target.value }))}
                          className="mt-1 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground resize-none"
                          placeholder="Descreva sua situacao brevemente..."
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent-light font-semibold py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando..." : "Enviar para Analise"}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                        <Shield className="h-3 w-3" />
                        Seus dados estão protegidos
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page FormCTA */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Prefere preencher um formulário rápido?"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Solicitar avaliação"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-foreground">O Que Você Recebe na Consulta</h2>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Analise do Caso</h3>
              <p className="mt-2 text-muted-foreground">
                Nossa equipe avalia sua situacao e identifica as melhores teses de defesa.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Chances de Sucesso</h3>
              <p className="mt-2 text-muted-foreground">
                Informamos de forma transparente quais sao suas reais chances de sucesso.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Proposta Clara</h3>
              <p className="mt-2 text-muted-foreground">
                Apresentamos uma proposta clara de honorarios, sem surpresas ou letras miudas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
