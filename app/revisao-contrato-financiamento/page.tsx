import { Breadcrumb } from "@/components/layout/breadcrumb"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { FAQAccordion } from "@/components/sections/faq-accordion"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"
import { FileInput, Search, AlertTriangle, FileText, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Revisão de Contrato de Financiamento | Quitadoc",
  description: "Revisão completa de contratos de financiamento. Identifique e corrija cláusulas abusivas.",
}

export default function RevisaoContratoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Revisão de Contrato de Financiamento", href: "#" }]} />
        
        <HeroSection
          title="Revisão de Contrato de Financiamento"
          subtitle="Analise detalhada para identificar irregularidades e economizar milhares de reais. Muitos contratos de financiamento contêm cláusulas que prejudicam você. Oferecemos revisão completa e orientação especializada."
        />

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Por que revisar seu contrato?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-3">Cláusulas Abusivas</h3>
                <p className="text-muted-foreground">Muitos contratos incluem termos que violam direitos do consumidor e podem ser anulados judicialmente.</p>
              </div>
              <div className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-3">Economia Significativa</h3>
                <p className="text-muted-foreground">Uma revisão bem-feita pode resultar em economia de milhares de reais em juros e taxas.</p>
              </div>
              <div className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-3">Renegociação</h3>
                <p className="text-muted-foreground">Com uma análise jurídica sólida, conseguimos renegociar prazos e taxas com a instituição financeira.</p>
              </div>
              <div className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-3">Proteção de Direitos</h3>
                <p className="text-muted-foreground">Garantimos que todos os seus direitos como consumidor sejam protegidos e respeitados.</p>
              </div>
            </div>
          </div>
        </section>

        <BenefitsGrid
          title="Benefícios da Revisão"
          benefits={[
            {
              icon: "📋",
              title: "Análise Completa",
              description: "Revisão minuciosa de cada cláusula do seu contrato"
            },
            {
              icon: "💡",
              title: "Consultoria Jurídica",
              description: "Orientação de advogados especializados em direito financeiro"
            },
            {
              icon: "📊",
              title: "Relatório Detalhado",
              description: "Documento explicativo com todos os problemas encontrados"
            },
            {
              icon: "⚖️",
              title: "Ação Jurídica",
              description: "Apoio em ações judiciais se necessário"
            }
          ]}
        />

        <ProcessTimeline
          title="Processo de Revisão"
          steps={[
            { title: "Recebimento do Contrato", description: "Você nos envia cópia do contrato de financiamento", icon: <FileInput className="h-6 w-6" /> },
            { title: "Análise Jurídica", description: "Nossa equipe faz análise completa e comparação com legislação", icon: <Search className="h-6 w-6" /> },
            { title: "Identificação de Problemas", description: "Listamos todas as cláusulas irregulares encontradas", icon: <AlertTriangle className="h-6 w-6" /> },
            { title: "Relatório e Consultoria", description: "Você recebe relatório detalhado com recomendações", icon: <FileText className="h-6 w-6" /> },
            { title: "Próximos Passos", description: "Discutimos as melhores estratégias para sua situação", icon: <ArrowRight className="h-6 w-6" /> }
          ]}
        />

        <FAQAccordion
          title="Perguntas sobre Revisão de Contrato"
          faqs={[
            {
              question: "Quanto tempo leva para revisar um contrato?",
              answer: "Geralmente entre 3 a 7 dias úteis, dependendo da complexidade do contrato."
            },
            {
              question: "Quais tipos de financiamento vocês revisam?",
              answer: "Revisamos financiamentos de veículos, imóveis, crédito pessoal, crédito consignado e outros."
            },
            {
              question: "É possível pedir devolução de juros pagos indevidamente?",
              answer: "Sim! Se encontrarmos cláusulas ilegais, podemos requerer a devolução do valor pago indevidamente."
            },
            {
              question: "O que fazer com o contrato revisado?",
              answer: "Com o relatório em mão, você pode usar para negociar com a instituição ou propor ação judicial."
            }
          ]}
        />

        <section className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <FormCTA
              variant="mid"
              heading="Descubra se seu contrato tem cláusulas abusivas"
              subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
              buttonText="Analisar meu contrato agora"
            />
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <FormCTA
              variant="final"
              heading="Ainda dá tempo de recuperar o que pagou a mais"
              subheading="Avaliação em 30 segundos."
              buttonText="Ver minhas opções sem compromisso"
            />
          </div>
        </section>

        <CTASection
          title="Revise seu contrato agora"
          subtitle="Pode haver muito dinheiro em jogo"
        />
    </>
  )
}
