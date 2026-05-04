"use client"

import { useState } from "react"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator, TrendingDown, PiggyBank, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { FormCTA } from "@/components/sections/form-cta"

export default function CalculadoraJurosPage() {
  const [formData, setFormData] = useState({
    valorFinanciado: "",
    taxaJurosMensal: "",
    numeroParcelas: "",
    parcelasPagas: "",
    valorParcela: ""
  })
  const [resultado, setResultado] = useState<{
    totalPago: number
    totalAPagar: number
    jurosTotais: number
    taxaReal: number
    economiaEstimada: number
    percentualJuros: number
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    // Allow only numbers and decimal point
    const sanitized = value.replace(/[^\d.,]/g, '').replace(',', '.')
    setFormData(prev => ({ ...prev, [field]: sanitized }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const calcular = async () => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const valorFinanciado = parseFloat(formData.valorFinanciado) || 0
    const taxaJurosMensal = parseFloat(formData.taxaJurosMensal) / 100 || 0
    const numeroParcelas = parseInt(formData.numeroParcelas) || 0
    const parcelasPagas = parseInt(formData.parcelasPagas) || 0
    const valorParcela = parseFloat(formData.valorParcela) || 0

    // Calculate total to be paid
    const totalContrato = valorParcela * numeroParcelas
    const totalPago = valorParcela * parcelasPagas
    const totalAPagar = totalContrato - totalPago
    
    // Calculate total interest
    const jurosTotais = totalContrato - valorFinanciado
    
    // Calculate real rate (compound interest)
    const taxaReal = taxaJurosMensal * 12 * 100 // Annualized
    
    // Calculate percentage of interest vs principal
    const percentualJuros = (jurosTotais / valorFinanciado) * 100
    
    // Estimate potential savings (if interest is above 1.5% monthly)
    const taxaReferencia = 0.015 // 1.5% monthly as reference
    let economiaEstimada = 0
    if (taxaJurosMensal > taxaReferencia) {
      // Calculate what would be paid with reference rate
      const parcelaJusta = (valorFinanciado * taxaReferencia * Math.pow(1 + taxaReferencia, numeroParcelas)) / 
                           (Math.pow(1 + taxaReferencia, numeroParcelas) - 1)
      economiaEstimada = (valorParcela - parcelaJusta) * (numeroParcelas - parcelasPagas)
    }
    
    setResultado({
      totalPago,
      totalAPagar,
      jurosTotais,
      taxaReal,
      economiaEstimada,
      percentualJuros
    })
    
    setIsCalculating(false)
  }

  const limpar = () => {
    setFormData({
      valorFinanciado: "",
      taxaJurosMensal: "",
      numeroParcelas: "",
      parcelasPagas: "",
      valorParcela: ""
    })
    setResultado(null)
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Ferramentas" },
          { label: "Calculadora de Juros" }
        ]} />
      </div>
      
      {/* Hero */}
      <section className="bg-primary py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
            <Calculator className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="mt-6 text-primary-foreground">Calculadora de Juros do Financiamento</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Descubra quanto voce esta pagando de juros no seu financiamento e se ha potencial 
            de economia com uma revisao contratual.
          </p>
        </div>
      </section>
      
      {/* Calculator */}
      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
              <h2 className="text-xl font-bold text-foreground">Dados do Financiamento</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Preencha os dados do seu contrato para calcular
              </p>
              
              <form className="mt-6 space-y-5">
                <div>
                  <label htmlFor="valorFinanciado" className="block text-sm font-medium text-foreground">
                    Valor Financiado (R$)
                  </label>
                  <Input
                    id="valorFinanciado"
                    type="text"
                    placeholder="Ex: 50000"
                    value={formData.valorFinanciado}
                    onChange={(e) => handleInputChange("valorFinanciado", e.target.value)}
                    className="mt-1.5 bg-secondary"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Valor original do bem financiado
                  </p>
                </div>

                <div>
                  <label htmlFor="taxaJurosMensal" className="block text-sm font-medium text-foreground">
                    Taxa de Juros Mensal (%)
                  </label>
                  <Input
                    id="taxaJurosMensal"
                    type="text"
                    placeholder="Ex: 1.99"
                    value={formData.taxaJurosMensal}
                    onChange={(e) => handleInputChange("taxaJurosMensal", e.target.value)}
                    className="mt-1.5 bg-secondary"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Taxa mensal informada no contrato (CET)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="numeroParcelas" className="block text-sm font-medium text-foreground">
                      Total de Parcelas
                    </label>
                    <Input
                      id="numeroParcelas"
                      type="text"
                      placeholder="Ex: 48"
                      value={formData.numeroParcelas}
                      onChange={(e) => handleInputChange("numeroParcelas", e.target.value)}
                      className="mt-1.5 bg-secondary"
                    />
                  </div>
                  <div>
                    <label htmlFor="parcelasPagas" className="block text-sm font-medium text-foreground">
                      Parcelas Pagas
                    </label>
                    <Input
                      id="parcelasPagas"
                      type="text"
                      placeholder="Ex: 12"
                      value={formData.parcelasPagas}
                      onChange={(e) => handleInputChange("parcelasPagas", e.target.value)}
                      className="mt-1.5 bg-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="valorParcela" className="block text-sm font-medium text-foreground">
                    Valor da Parcela (R$)
                  </label>
                  <Input
                    id="valorParcela"
                    type="text"
                    placeholder="Ex: 1200"
                    value={formData.valorParcela}
                    onChange={(e) => handleInputChange("valorParcela", e.target.value)}
                    className="mt-1.5 bg-secondary"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button"
                    onClick={calcular}
                    disabled={isCalculating}
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent-light font-semibold"
                  >
                    {isCalculating ? "Calculando..." : "Calcular Juros"}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={limpar}
                  >
                    Limpar
                  </Button>
                </div>
              </form>
            </div>

            {/* Results */}
            <div>
              {resultado ? (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-card border border-border p-4">
                      <p className="text-sm text-muted-foreground">Total Pago</p>
                      <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                        {formatCurrency(resultado.totalPago)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-card border border-border p-4">
                      <p className="text-sm text-muted-foreground">Falta Pagar</p>
                      <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                        {formatCurrency(resultado.totalAPagar)}
                      </p>
                    </div>
                  </div>

                  {/* Interest Info */}
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
                        <TrendingDown className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total em Juros</p>
                        <p className="font-mono text-3xl font-bold text-destructive">
                          {formatCurrency(resultado.jurosTotais)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Voce pagara <strong className="text-destructive">{resultado.percentualJuros.toFixed(1)}%</strong> a mais 
                      que o valor original do bem apenas em juros.
                    </p>
                  </div>

                  {/* Savings Estimate */}
                  {resultado.economiaEstimada > 0 && (
                    <div className="rounded-xl bg-success/10 border border-success/20 p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                          <PiggyBank className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Economia Potencial</p>
                          <p className="font-mono text-3xl font-bold text-success">
                            {formatCurrency(resultado.economiaEstimada)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Com uma revisao contratual, voce pode economizar ate este valor 
                        nas parcelas restantes.
                      </p>
                    </div>
                  )}

                  {/* Rate Analysis */}
                  <div className="rounded-xl bg-card border border-border p-6">
                    <h3 className="font-semibold text-foreground">Analise da Taxa</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sua taxa anual</span>
                        <span className="font-mono font-semibold text-foreground">
                          {resultado.taxaReal.toFixed(2)}% a.a.
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxa Selic (referencia)</span>
                        <span className="font-mono font-semibold text-success">13.25% a.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Diferenca</span>
                        <span className={`font-mono font-semibold ${resultado.taxaReal > 18 ? 'text-destructive' : 'text-foreground'}`}>
                          {(resultado.taxaReal - 13.25).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    
                    {resultado.taxaReal > 24 && (
                      <div className="mt-4 rounded-lg bg-destructive/10 p-3 flex gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-destructive">Atencao!</strong> Sua taxa esta 
                          significativamente acima da media de mercado. Voce pode ter direito 
                          a revisao contratual.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="rounded-xl bg-accent p-6 text-center">
                    <h3 className="font-bold text-accent-foreground">
                      Quer Revisar Seu Contrato?
                    </h3>
                    <p className="mt-2 text-sm text-accent-foreground/80">
                      Nossa equipe pode analisar gratuitamente seu contrato e identificar 
                      possibilidades de reducao.
                    </p>
                    <Link href="/consulta-gratuita">
                      <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary-dark">
                        Quero Revisao Gratuita
                      </Button>
                    </Link>

                    <div className="mt-6">
                      <FormCTA
                        variant="mid"
                        heading="Descubra se pode recuperar o que pagou a mais"
                        subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
                        buttonText="Analisar meu caso agora"
                      />
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-center text-muted-foreground">
                    * Os valores apresentados sao estimativas baseadas nos dados informados. 
                    Para uma analise precisa do seu contrato, solicite uma consulta gratuita 
                    com nossos especialistas.
                  </p>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/50 p-12">
                  <div className="text-center">
                    <Calculator className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 font-semibold text-foreground">Resultado do Calculo</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Preencha os dados ao lado e clique em calcular para ver o resultado.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-secondary py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-center text-foreground">Como Funciona a Calculadora</h2>
          
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-mono font-bold">1</span>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Informe os Dados</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Preencha os dados do seu contrato de financiamento
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-mono font-bold">2</span>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Veja o Resultado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Descubra quanto esta pagando de juros e se ha economia possivel
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-mono font-bold">3</span>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Consulte Especialistas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Se houver potencial de economia, nossa equipe pode ajudar
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-card p-6">
            <h3 className="font-semibold text-foreground">O que sao juros abusivos?</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Sao considerados abusivos os juros que excedem significativamente a media praticada 
              pelo mercado. O <strong>Codigo de Defesa do Consumidor</strong> (Lei 8.078/90) 
              protege o consumidor contra clausulas que estabelecam obrigacoes excessivamente 
              onerosas. Se sua taxa esta muito acima da media, voce pode ter direito a revisao 
              judicial do contrato.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/blog/juros-abusivos-cdc" className="text-sm text-primary hover:underline">
                Saiba mais sobre juros abusivos
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/revisao-contrato-financiamento" className="text-sm text-primary hover:underline">
                Como funciona a revisao contratual
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de reduzir sua dívida"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>
    </>
  )
}
