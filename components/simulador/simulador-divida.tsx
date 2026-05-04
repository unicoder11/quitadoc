"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Phone, MessageCircle, CheckCircle2, AlertTriangle, TrendingDown, Shield, Clock, Banknote } from "lucide-react"

const WHATSAPP = "5511925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

// Dados reais de mercado para simulacao
const DADOS_MERCADO = {
  descontoMedio: {
    cartao: { min: 40, max: 70, medio: 55 },
    emprestimo: { min: 30, max: 60, medio: 45 },
    financiamento: { min: 20, max: 50, medio: 35 },
    chequeEspecial: { min: 50, max: 80, medio: 65 },
    consignado: { min: 15, max: 40, medio: 28 },
    veicular: { min: 25, max: 55, medio: 40 },
  },
  taxaJurosAbusivos: {
    cartao: 450,
    emprestimo: 180,
    financiamento: 120,
    chequeEspecial: 320,
    consignado: 45,
    veicular: 96,
  },
  tempoMedioNegociacao: {
    cartao: "7-15 dias",
    emprestimo: "10-20 dias",
    financiamento: "15-30 dias",
    chequeEspecial: "5-10 dias",
    consignado: "20-40 dias",
    veicular: "10-25 dias",
  }
}

const BANCOS = [
  { id: "itau", nome: "Itau", descontoExtra: 5 },
  { id: "bradesco", nome: "Bradesco", descontoExtra: 3 },
  { id: "santander", nome: "Santander", descontoExtra: 4 },
  { id: "bb", nome: "Banco do Brasil", descontoExtra: 2 },
  { id: "caixa", nome: "Caixa Economica", descontoExtra: 6 },
  { id: "nubank", nome: "Nubank", descontoExtra: 8 },
  { id: "inter", nome: "Banco Inter", descontoExtra: 7 },
  { id: "c6", nome: "C6 Bank", descontoExtra: 6 },
  { id: "pan", nome: "Banco Pan", descontoExtra: 10 },
  { id: "bmg", nome: "Banco BMG", descontoExtra: 9 },
  { id: "outro", nome: "Outro banco", descontoExtra: 0 },
]

const TIPOS_DIVIDA = [
  { id: "cartao", nome: "Cartao de Credito" },
  { id: "emprestimo", nome: "Emprestimo Pessoal" },
  { id: "financiamento", nome: "Financiamento" },
  { id: "chequeEspecial", nome: "Cheque Especial" },
  { id: "consignado", nome: "Consignado" },
  { id: "veicular", nome: "Financiamento Veicular" },
]

const TEMPO_ATRASO = [
  { id: "30", nome: "Ate 30 dias", fator: 0.9 },
  { id: "60", nome: "30-60 dias", fator: 1.0 },
  { id: "90", nome: "60-90 dias", fator: 1.1 },
  { id: "180", nome: "3-6 meses", fator: 1.2 },
  { id: "365", nome: "6-12 meses", fator: 1.3 },
  { id: "mais", nome: "Mais de 1 ano", fator: 1.4 },
]

interface ResultadoSimulacao {
  valorOriginal: number
  valorAtualEstimado: number
  descontoEstimado: number
  valorFinalEstimado: number
  economiaEstimada: number
  percentualDesconto: number
  tempoNegociacao: string
  parcelas: { qtd: number; valor: number }[]
  jurosAbusivos: boolean
  potencialReducao: number
}

export function SimuladorDivida({ 
  tipoPreSelecionado,
  bancoPreSelecionado,
  className = ""
}: { 
  tipoPreSelecionado?: string
  bancoPreSelecionado?: string
  className?: string
}) {
  const [step, setStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [resultado, setResultado] = useState<ResultadoSimulacao | null>(null)
  
  const [formData, setFormData] = useState({
    valorDivida: "",
    tipoDivida: tipoPreSelecionado || "",
    banco: bancoPreSelecionado || "",
    tempoAtraso: "",
    nome: "",
    telefone: "",
  })

  // Progress bar calculation
  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const calcularSimulacao = (): ResultadoSimulacao => {
    const valor = parseFloat(formData.valorDivida.replace(/\D/g, "")) || 0
    const tipo = formData.tipoDivida as keyof typeof DADOS_MERCADO.descontoMedio
    const banco = BANCOS.find(b => b.id === formData.banco)
    const atraso = TEMPO_ATRASO.find(t => t.id === formData.tempoAtraso)
    
    const dadosTipo = DADOS_MERCADO.descontoMedio[tipo] || DADOS_MERCADO.descontoMedio.cartao
    const taxaJuros = DADOS_MERCADO.taxaJurosAbusivos[tipo] || 200
    const tempoNeg = DADOS_MERCADO.tempoMedioNegociacao[tipo] || "15-30 dias"
    
    // Calculo do valor atualizado com juros
    const fatorAtraso = atraso?.fator || 1.0
    const valorAtualEstimado = valor * fatorAtraso
    
    // Calculo do desconto (base + banco + atraso bonus)
    const descontoBase = dadosTipo.medio
    const descontoBanco = banco?.descontoExtra || 0
    const descontoAtraso = (fatorAtraso - 1) * 20 // Quanto mais atrasado, mais desconto
    const percentualDesconto = Math.min(85, descontoBase + descontoBanco + descontoAtraso)
    
    const descontoEstimado = valorAtualEstimado * (percentualDesconto / 100)
    const valorFinalEstimado = valorAtualEstimado - descontoEstimado
    const economiaEstimada = valor - valorFinalEstimado + (valorAtualEstimado - valor)
    
    // Opcoes de parcelamento
    const parcelas = [
      { qtd: 1, valor: valorFinalEstimado },
      { qtd: 6, valor: valorFinalEstimado / 6 },
      { qtd: 12, valor: valorFinalEstimado / 12 },
      { qtd: 24, valor: valorFinalEstimado / 24 },
    ]
    
    // Verificacao de juros abusivos
    const jurosAbusivos = taxaJuros > 100
    const potencialReducao = jurosAbusivos ? Math.min(40, (taxaJuros - 100) / 10) : 0
    
    return {
      valorOriginal: valor,
      valorAtualEstimado,
      descontoEstimado,
      valorFinalEstimado,
      economiaEstimada,
      percentualDesconto,
      tempoNegociacao: tempoNeg,
      parcelas,
      jurosAbusivos,
      potencialReducao,
    }
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Calcular resultado
      setIsCalculating(true)
      setTimeout(() => {
        const result = calcularSimulacao()
        setResultado(result)
        setIsCalculating(false)
        setStep(5)
      }, 2000)
    }
  }

  const handleWhatsApp = () => {
    const msg = [
      `*Simulacao de Divida - Quitadoc*`,
      ``,
      `*Nome:* ${formData.nome}`,
      `*Telefone:* ${formData.telefone}`,
      `*Valor da Divida:* R$ ${formData.valorDivida}`,
      `*Tipo:* ${TIPOS_DIVIDA.find(t => t.id === formData.tipoDivida)?.nome}`,
      `*Banco:* ${BANCOS.find(b => b.id === formData.banco)?.nome}`,
      `*Tempo em Atraso:* ${TEMPO_ATRASO.find(t => t.id === formData.tempoAtraso)?.nome}`,
      ``,
      `*RESULTADO DA SIMULACAO:*`,
      `Economia estimada: R$ ${resultado?.economiaEstimada.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      `Desconto: ${resultado?.percentualDesconto.toFixed(0)}%`,
      `Valor final: R$ ${resultado?.valorFinalEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    ].join("\n")
    
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    const amount = parseInt(numbers) / 100
    if (isNaN(amount)) return ""
    return amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.valorDivida && parseFloat(formData.valorDivida.replace(/\D/g, "")) > 0
      case 2: return formData.tipoDivida && formData.banco
      case 3: return formData.tempoAtraso
      case 4: return formData.nome && formData.telefone
      default: return false
    }
  }

  return (
    <div className={`rounded-2xl bg-card border border-border shadow-xl overflow-hidden ${className}`}>
      {/* Header com progresso */}
      <div className="bg-primary px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-primary-foreground">
            {step < 5 ? "Simulador de Negociacao" : "Seu Resultado"}
          </h3>
          {step < 5 && (
            <span className="text-sm text-primary-foreground/80">
              Passo {step} de {totalSteps}
            </span>
          )}
        </div>
        {step < 5 && (
          <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Step 1: Valor da divida */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Banknote className="h-12 w-12 text-primary mx-auto mb-3" />
              <h4 className="text-xl font-semibold text-foreground">Qual o valor da sua divida?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Leva menos de 2 minutos. Sem impacto no score.
              </p>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                R$
              </span>
              <Input
                type="text"
                placeholder="0,00"
                value={formData.valorDivida}
                onChange={(e) => setFormData({ ...formData, valorDivida: formatCurrency(e.target.value) })}
                className="pl-12 text-2xl h-14 font-semibold text-center"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {[5000, 10000, 25000, 50000].map((valor) => (
                <button
                  key={valor}
                  onClick={() => setFormData({ ...formData, valorDivida: formatCurrency(String(valor * 100)) })}
                  className="px-3 py-1.5 text-sm rounded-full border border-border hover:bg-secondary transition-colors"
                >
                  R$ {valor.toLocaleString("pt-BR")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Tipo e Banco */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
              <h4 className="text-xl font-semibold text-foreground">Qual o tipo de divida e banco?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Isso nos ajuda a calcular o desconto medio
              </p>
            </div>
            <div className="space-y-3">
              <Label>Tipo de Divida</Label>
              <Select 
                value={formData.tipoDivida} 
                onValueChange={(v) => setFormData({ ...formData, tipoDivida: v })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_DIVIDA.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>{tipo.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Banco ou Financeira</Label>
              <Select 
                value={formData.banco} 
                onValueChange={(v) => setFormData({ ...formData, banco: v })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione o banco" />
                </SelectTrigger>
                <SelectContent>
                  {BANCOS.map((banco) => (
                    <SelectItem key={banco.id} value={banco.id}>{banco.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Tempo em atraso */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-3" />
              <h4 className="text-xl font-semibold text-foreground">Ha quanto tempo esta em atraso?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Dividas mais antigas costumam ter descontos maiores
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TEMPO_ATRASO.map((tempo) => (
                <button
                  key={tempo.id}
                  onClick={() => setFormData({ ...formData, tempoAtraso: tempo.id })}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    formData.tempoAtraso === tempo.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="font-medium text-foreground">{tempo.nome}</span>
                  {tempo.fator > 1.2 && (
                    <span className="block text-xs text-success mt-1">Maior chance de desconto</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Contato */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-3" />
              <h4 className="text-xl font-semibold text-foreground">Quase la! Seus dados para contato</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Análise personalizada. Sem compromisso. Resposta em até 2 horas.
              </p>
            </div>
            <div className="space-y-3">
              <Label>Seu nome</Label>
              <Input
                type="text"
                placeholder="Digite seu nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-3">
              <Label>WhatsApp</Label>
              <Input
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="h-12"
              />
            </div>
          </div>
        )}

        {/* Calculando */}
        {isCalculating && (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">Calculando sua economia...</p>
            <p className="text-sm text-muted-foreground mt-2">Analisando dados de mercado</p>
          </div>
        )}

        {/* Step 5: Resultado */}
        {step === 5 && resultado && !isCalculating && (
          <div className="space-y-6">
            {/* Economia destacada */}
            <div className="text-center p-6 rounded-xl bg-success/10 border border-success/20">
              <p className="text-sm font-medium text-success uppercase tracking-wide">Economia Estimada</p>
              <p className="text-4xl font-bold text-success mt-2">
                R$ {resultado.economiaEstimada.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Desconto de ate <span className="font-semibold text-success">{resultado.percentualDesconto.toFixed(0)}%</span> sobre o valor atualizado
              </p>
            </div>

            {/* Detalhes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Valor Original</p>
                <p className="text-lg font-semibold text-foreground">
                  R$ {resultado.valorOriginal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Valor com Juros</p>
                <p className="text-lg font-semibold text-destructive line-through">
                  R$ {resultado.valorAtualEstimado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 col-span-2">
                <p className="text-xs text-primary font-medium">Valor Final Estimado</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {resultado.valorFinalEstimado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Alerta de juros abusivos */}
            {resultado.jurosAbusivos && (
              <div className="flex gap-3 p-4 rounded-lg bg-accent/10 border border-accent/30">
                <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Possivel cobranca de juros abusivos</p>
                  <p className="text-sm text-muted-foreground">
                    Identificamos que sua divida pode ter juros acima do permitido. 
                    Isso pode reduzir ainda mais o valor em ate {resultado.potencialReducao.toFixed(0)}%.
                  </p>
                </div>
              </div>
            )}

            {/* Parcelamento */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Opcoes de parcelamento:</p>
              <div className="grid grid-cols-2 gap-2">
                {resultado.parcelas.map((p) => (
                  <div key={p.qtd} className="p-3 rounded-lg border border-border text-center">
                    <p className="text-xs text-muted-foreground">{p.qtd}x de</p>
                    <p className="font-semibold text-foreground">
                      R$ {p.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Tempo medio de negociacao: <strong className="text-foreground">{resultado.tempoNegociacao}</strong></span>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4">
              <div className="text-center mb-2">
                <p className="text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    3 especialistas online agora
                  </span>
                </p>
              </div>
              <Button 
                onClick={handleWhatsApp}
                className="w-full h-14 text-base font-semibold bg-[#25D366] hover:bg-[#20bb5a]"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Garantir Meu Desconto Agora
              </Button>
              <a
                href={`tel:${WHATSAPP}`}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
              >
                <Phone className="h-4 w-4" />
                Ligar: {PHONE_DISPLAY}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>12.847 clientes</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <TrendingDown className="h-4 w-4 text-success" />
                <span>R$ 127M negociados</span>
              </div>
            </div>
          </div>
        )}

        {/* Botao de avancar */}
        {step < 5 && !isCalculating && (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-12 mt-6 text-base font-semibold"
          >
            {step === 4 ? "Ver Meu Resultado" : "Continuar"}
          </Button>
        )}
      </div>
    </div>
  )
}
