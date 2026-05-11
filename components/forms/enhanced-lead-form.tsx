"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

interface EnhancedLeadFormProps {
  onSubmit?: (data: FormData) => void
}

interface FormData {
  nome: string
  telefone: string
  email?: string
  placa?: string
  banco?: string
  parcelas?: string
  situacao?: string
  valor?: string
}

export function EnhancedLeadForm({ onSubmit }: EnhancedLeadFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    email: "",
    placa: "",
    banco: "",
    parcelas: "",
    situacao: "",
    valor: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Enviar para WhatsApp
    const linhas = [
      `*Novo Lead - Análise de Caso*`,
      ``,
      `*Dados Pessoais:*`,
      `Nome: ${formData.nome}`,
      `WhatsApp: ${formData.telefone}`,
      formData.email ? `Email: ${formData.email}` : null,
      ``,
      `*Informações do Veículo:*`,
      formData.placa ? `Placa: ${formData.placa}` : null,
      formData.banco ? `Banco/Financeira: ${formData.banco}` : null,
      ``,
      `*Situação Atual:*`,
      formData.parcelas ? `Parcelas atrasadas: ${formData.parcelas}` : null,
      formData.situacao ? `Situação: ${formData.situacao}` : null,
      formData.valor ? `Valor aproximado: R$ ${formData.valor}` : null,
    ]
      .filter(l => l !== null)
      .join("\n")

    const whatsappUrl = `https://wa.me/11925332215?text=${encodeURIComponent(linhas)}`

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      window.open(whatsappUrl, "_blank")

      if (onSubmit) {
        onSubmit(formData)
      }

      setTimeout(() => {
        setStep(1)
        setIsSubmitted(false)
        setFormData({
          nome: "",
          telefone: "",
          email: "",
          placa: "",
          banco: "",
          parcelas: "",
          situacao: "",
          valor: "",
        })
      }, 2000)
    }, 800)
  }

  const progressPercentage = (step / 3) * 100

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-2xl shadow-xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`text-center ${s <= step ? "opacity-100" : "opacity-50"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm ${
                  s < step
                    ? "bg-success text-success-foreground"
                    : s === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                {s === 1 ? "Dados" : s === 2 ? "Situação" : "Análise"}
              </p>
            </div>
          ))}
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: Personal Data */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Seus Dados Pessoais</h2>
              <p className="text-sm text-muted-foreground">Informações básicas para contato</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome Completo *
              </label>
              <Input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: João Silva"
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                WhatsApp com DDD *
              </label>
              <Input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Ex: (11) 99999-9999"
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Responderemos por aqui em até 2 horas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                E-mail (opcional)
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: joao@email.com"
                className="w-full"
              />
            </div>

            <Button
              type="button"
              onClick={() => formData.nome && formData.telefone ? setStep(2) : null}
              disabled={!formData.nome || !formData.telefone}
              className="w-full mt-6"
            >
              Continuar para Próxima Etapa →
            </Button>
          </div>
        )}

        {/* STEP 2: Vehicle & Financial Info */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Informações do Seu Caso</h2>
              <p className="text-sm text-muted-foreground">Dados sobre o veículo e situação financeira</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Placa do Veículo (opcional)
              </label>
              <Input
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                placeholder="Ex: ABC1234"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Banco/Financeira
              </label>
              <select 
                name="banco" 
                value={formData.banco} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Selecione...</option>
                <option value="Santander">Santander</option>
                <option value="Bradesco">Bradesco</option>
                <option value="Itaú">Itaú</option>
                <option value="Banco do Brasil">Banco do Brasil</option>
                <option value="BV Financeira">BV Financeira</option>
                <option value="BMG">BMG</option>
                <option value="Caixa Econômica">Caixa Econômica</option>
                <option value="Nubank">Nubank</option>
                <option value="Sicredi">Sicredi</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantas parcelas estão atrasadas?
              </label>
              <select 
                name="parcelas" 
                value={formData.parcelas} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Selecione...</option>
                <option value="1-2 parcelas">1-2 parcelas</option>
                <option value="3-5 parcelas">3-5 parcelas</option>
                <option value="6-10 parcelas">6-10 parcelas</option>
                <option value="Mais de 10 parcelas">Mais de 10 parcelas</option>
                <option value="Não sei ao certo">Não sei ao certo</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1"
              >
                ← Voltar
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1"
              >
                Próxima Etapa →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Situation & Submit */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Qual é sua Situação?</h2>
              <p className="text-sm text-muted-foreground">Informações para análise rápida</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Situação Atual
              </label>
              <select 
                name="situacao" 
                value={formData.situacao} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Selecione...</option>
                <option value="Recebi notificação de busca e apreensão">
                  Recebi notificação de busca e apreensão
                </option>
                <option value="Veículo já foi apreendido">Veículo já foi apreendido</option>
                <option value="Estou apenas atrasado">Estou apenas atrasado</option>
                <option value="Quero revisar meu contrato">Quero revisar meu contrato</option>
                <option value="Preciso negociar a dívida">Preciso negociar a dívida</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Valor aproximado da dívida (opcional)
              </label>
              <Input
                type="text"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                placeholder="Ex: 15000"
                className="w-full"
              />
            </div>

            <div className="bg-info/10 border border-info/30 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>Próximas etapas:</strong> Após enviar, falaremos com você por WhatsApp em até 2 horas com a análise do seu caso.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1"
              >
                ← Voltar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#25D366] hover:bg-[#20bb5a]"
              >
                {isSubmitting ? "Enviando..." : "Enviar para Análise"}
              </Button>
            </div>
          </div>
        )}

        {/* Success State */}
        {isSubmitted && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Enviado com Sucesso!</h3>
            <p className="text-sm text-muted-foreground">
              Nossa equipe receberá sua solicitação e entraremos em contato em até 2 horas via WhatsApp.
            </p>
          </div>
        )}
      </form>

      <p className="text-xs text-center text-muted-foreground mt-6">
        🔒 Seus dados estão protegidos e não serão compartilhados com terceiros.
      </p>
    </div>
  )
}
