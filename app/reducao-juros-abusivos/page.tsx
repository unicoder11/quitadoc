import { Breadcrumb } from "@/components/layout/breadcrumb"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { FAQAccordion } from "@/components/sections/faq-accordion"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"

export const metadata = {
  title: "Redução de Juros Abusivos | Quitadoc",
  description: "Reduza juros abusivos de empréstimos, financiamentos e contratos. Especialistas em direito do consumidor.",
}

export default function ReducaoJurosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Redução de Juros Abusivos", href: "#" }]} />
        
        <HeroSection
          title="Redução de Juros Abusivos"
          subtitle="Nós ajudamos a reduzir juros ilegais e economizar na sua dívida"
          description="Saiba como contestar juros abusivos e obter redução através de vias legais. Consultoria especializada para sua situação."
          ctaText="Solicitar Consulta"
          ctaHref="/consulta-gratuita"
        />

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">O que são juros abusivos?</h2>
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-4">
                Juros abusivos são aqueles que ultrapassam significativamente a taxa média de mercado e prejudicam a capacidade do consumidor de pagar a dívida. Segundo a legislação brasileira, existem limites legais para juros em diferentes tipos de contrato.
              </p>
              <p className="mb-4">
                Muitas instituições financeiras cobram juros bem acima do permitido, aproveitando a falta de informação dos consumidores. Isso é crime e pode ser revertido através de ação judicial.
              </p>
              <p>
                A Quitadoc identifica quando os juros estão abusivos e atua para reduzir significativamente sua dívida.
              </p>
            </div>
          </div>
        </section>

        <BenefitsGrid
          title="Como reduzimos seus juros"
          benefits={[
            {
              icon: "🔍",
              title: "Análise Jurídica",
              description: "Comparamos seus juros com os limites legais e taxa de mercado"
            },
            {
              icon: "⚖️",
              title: "Ação Legal",
              description: "Entramos com ação para limitar os juros ao permitido"
            },
            {
              icon: "💰",
              title: "Renegociação",
              description: "Negociamos com a instituição para redução imediata"
            },
            {
              icon: "📉",
              title: "Devolução",
              description: "Buscamos devolução dos juros ilegais cobrados"
            }
          ]}
        />

        <section className="py-16 px-4 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">Limites de Juros por Tipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-lg font-bold text-primary mb-2">Empréstimo Pessoal</h3>
                <p className="text-muted-foreground mb-3">Taxa máxima: Limite legal estabelecido</p>
                <p className="text-sm text-muted-foreground">Qualquer taxa acima disso é considerada abusiva</p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-lg font-bold text-primary mb-2">Crédito Imobiliário</h3>
                <p className="text-muted-foreground mb-3">Taxa reduzida: Regulação mais rigorosa</p>
                <p className="text-sm text-muted-foreground">Taxas devem ser compatíveis com mercado</p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-lg font-bold text-primary mb-2">Financiamento de Veículos</h3>
                <p className="text-muted-foreground mb-3">Limite específico: Resolução do Banco Central</p>
                <p className="text-sm text-muted-foreground">Proteção especial para consumidor</p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-lg font-bold text-primary mb-2">Crédito Consignado</h3>
                <p className="text-muted-foreground mb-3">Taxa máxima reduzida: 2% ao mês</p>
                <p className="text-sm text-muted-foreground">Uma das proteções mais fortes</p>
              </div>
            </div>
          </div>
        </section>

        <ProcessTimeline
          title="Processo de Redução"
          steps={[
            { title: "Análise do Contrato", description: "Avaliamos o contrato e calculamos se há abusividade" },
            { title: "Comprovação", description: "Documentamos todos os juros cobrados indevidamente" },
            { title: "Comunicação", description: "Enviamos carta solicitando redução à instituição" },
            { title: "Negociação", description: "Tentamos acordo administrativo com a instituição" },
            { title: "Ação Judicial", description: "Se necessário, entramos com ação para garantir direitos" }
          ]}
        />

        <FAQAccordion
          title="Dúvidas sobre Redução de Juros"
          faqs={[
            {
              question: "Como saber se estou pagando juros abusivos?",
              answer: "Nossa equipe faz essa análise. Basta enviar seu contrato para avaliação."
            },
            {
              question: "Posso pedir devolução dos juros cobrados?",
              answer: "Sim! Se identificarmos abusividade, podemos requerer devolução com correção monetária."
            },
            {
              question: "Quanto tempo leva para reduzir os juros?",
              answer: "Negociações costumam levar 30-60 dias. Ações judiciais podem ser mais longas, mas mais eficazes."
            },
            {
              question: "Isso vai prejudicar meu contato com o banco?",
              answer: "Não. É seu direito legal contestar juros abusivos. O banco é obrigado a cumprir a lei."
            }
          ]}
        />

        <section className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <FormCTA
              variant="mid"
              heading="Descubra se você está pagando juros abusivos"
              subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
              buttonText="Verificar meus juros agora"
            />
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <FormCTA
              variant="final"
              heading="Ainda dá tempo de reduzir sua dívida"
              subheading="Avaliação em 30 segundos."
              buttonText="Quero reduzir meus juros"
            />
          </div>
        </section>

        <CTASection
          title="Descubra quanto você pode economizar"
          subtitle="Análise personalizada e sem compromisso"
          buttonText="Fazer Avaliação"
          buttonHref="/consulta-gratuita"
        />
    </>
  )
}
