import { Metadata } from "next"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { FAQAccordion } from "@/components/sections/faq-accordion"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"
import { CheckCircle, Shield, Clock, Users, FileText, Search, Gavel, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Como Funciona | Processo de Defesa Veicular Passo a Passo",
  description: "Entenda como funciona nosso processo de defesa veicular. Consulta gratuita, analise do caso, peticao judicial e acompanhamento ate o resultado.",
  alternates: {
    canonical: "https://www.quitadoc.com.br/como-funciona"
  }
}

const processSteps = [
  {
    title: "Contato Inicial",
    description: "Voce entra em contato pelo formulario, WhatsApp ou telefone. Nao precisa de documentos nessa etapa.",
    icon: <Search className="h-6 w-6" />,
    time: "5 min"
  },
  {
    title: "Analise Gratuita",
    description: "Nossa equipe analisa sua situacao e identifica as melhores estrategias de defesa para seu caso.",
    icon: <FileText className="h-6 w-6" />,
    time: "Ate 2h"
  },
  {
    title: "Proposta de Servico",
    description: "Apresentamos as chances de sucesso e nossa proposta de honorarios (Success Fee de 10%).",
    icon: <Users className="h-6 w-6" />,
    time: "Mesmo dia"
  },
  {
    title: "Acao Judicial",
    description: "Elaboramos e protocolamos a peticao de defesa, buscando liminar quando necessario.",
    icon: <Gavel className="h-6 w-6" />,
    time: "24-48h"
  },
  {
    title: "Acompanhamento",
    description: "Monitoramos seu processo e mantemos voce informado de cada movimentacao judicial.",
    icon: <Clock className="h-6 w-6" />,
    time: "Continuo"
  },
  {
    title: "Resultado",
    description: "Trabalhamos ate conseguir o melhor resultado possivel para seu caso.",
    icon: <Trophy className="h-6 w-6" />,
    time: "30-90 dias"
  },
]

const faqs = [
  {
    question: "Quanto custa o servico?",
    answer: "Trabalhamos no modelo Success Fee: voce so paga se ganharmos. Nossa taxa e de 10% do valor da causa, parcelavel em ate 3x. A consulta inicial e totalmente gratuita."
  },
  {
    question: "Preciso pagar algo adiantado?",
    answer: "Nao. No modelo Success Fee, voce nao paga nada adiantado. Nossos honorarios sao cobrados apenas apos o resultado positivo do seu caso."
  },
  {
    question: "Quanto tempo leva o processo?",
    answer: "O tempo varia conforme a complexidade do caso e o juizo. Em media, conseguimos liminares em 24-72 horas e a resolucao completa em 30-90 dias."
  },
  {
    question: "Voces atuam em qual regiao?",
    answer: "Atuamos em todo o territorio nacional. Independente de onde voce esteja, podemos ajuizar acoes em qualquer comarca do Brasil."
  },
  {
    question: "Preciso comparecer em audiencias?",
    answer: "Na maioria dos casos, nao e necessario comparecer em audiencias. Caso seja necessario, orientamos sobre como proceder ou representamos voce."
  },
  {
    question: "E se eu perder o caso?",
    answer: "No modelo Success Fee, se nao ganharmos, voce nao paga nossos honorarios. Voce pode ter custas judiciais, mas avaliamos isso antes de iniciar."
  },
]

export default function ComoFuncionaPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[{ label: "Como Funciona" }]} />
      </div>
      
      {/* Hero */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-primary-foreground">Como Funciona</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Processo simples, transparente e sem burocracia. Entenda como trabalhamos 
            para proteger seu veiculo.
          </p>
        </div>
      </section>
      
      {/* Process */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-foreground">Passo a Passo do Processo</h2>
            <p className="mt-4 text-muted-foreground">Do primeiro contato ao resultado final</p>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="relative rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {step.icon}
                  </div>
                  <span className="absolute top-4 right-4 font-mono text-4xl font-bold text-muted/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <span className="mt-1 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {step.time}
                </span>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Success Fee Explanation */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="rounded-2xl bg-card p-8 lg:p-12 shadow-lg">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
                <Shield className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="mt-6 text-foreground">Modelo Success Fee</h2>
              <p className="mt-2 text-muted-foreground">Voce so paga se ganharmos</p>
            </div>
            
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <p className="font-mono text-4xl font-bold text-accent">0</p>
                <p className="mt-2 text-sm text-muted-foreground">Custo inicial</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-4xl font-bold text-accent">10%</p>
                <p className="mt-2 text-sm text-muted-foreground">Apenas se ganhar</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-4xl font-bold text-accent">3x</p>
                <p className="mt-2 text-sm text-muted-foreground">Parcelamento</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Sem risco financeiro:</strong> voce nao paga 
                  nada se nao conseguirmos um resultado positivo.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Transparencia total:</strong> os 10% sao 
                  calculados sobre o valor economizado ou recuperado.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Flexibilidade:</strong> parcele em ate 3x 
                  sem juros apos o resultado.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/consulta-gratuita">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent-light">
                  Iniciar Consulta Gratuita
                </Button>
              </Link>
            </div>

            <div className="mt-10">
              <FormCTA
                variant="mid"
                heading="Descubra se seu caso ainda tem solução"
                subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
                buttonText="Analisar meu caso agora"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Guarantees */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-foreground">Nossas Garantias</h2>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-card p-6 border border-border text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Consulta Gratuita</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Analise do seu caso sem custo e sem compromisso
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 border border-border text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Sem Risco</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Você só paga se conseguirmos resultado
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 border border-border text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Agilidade</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Petições elaboradas em até 48 horas
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 border border-border text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Transparência</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Acompanhamento completo do seu processo
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <FAQAccordion 
        title="Perguntas Frequentes"
        subtitle="Tire suas duvidas sobre nosso processo"
        faqs={faqs}
      />
      
      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
            subheading="Cada hora conta. Preencha agora e veja suas opções sem compromisso."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>

      <CTASection />
    </>
  )
}
