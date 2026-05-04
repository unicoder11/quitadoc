import { Breadcrumb } from "@/components/layout/breadcrumb"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { FAQAccordion } from "@/components/sections/faq-accordion"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"

export const metadata = {
  title: "Defesa em Alienação Fiduciária | Quitadoc",
  description: "Proteja seus direitos em alienação fiduciária. Advogados especializados para contestar cláusulas abusivas.",
}

export default function DefesaAlienacaoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Defesa Alienação Fiduciária", href: "#" }]} />
        
        <HeroSection
          title="Defesa em Alienação Fiduciária"
          subtitle="Proteja seus direitos contra cláusulas abusivas e garantia de segurança do bem"
          description="A alienação fiduciária é uma modalidade de garantia de empréstimo. Orientamos você sobre os direitos e como se defender de práticas abusivas."
          ctaText="Solicitar Consulta Gratuita"
          ctaHref="/consulta-gratuita"
        />

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">O que é Alienação Fiduciária?</h2>
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-4">
                A alienação fiduciária é um tipo de garantia oferecida ao credor de um financiamento. Na prática, o bem fica em nome do credor (geralmente uma instituição financeira) até a quitação total da dívida.
              </p>
              <p className="mb-4">
                Muitos contratos de alienação fiduciária contêm cláusulas abusivas que prejudicam o consumidor, como juros muito elevados, prazos extensos e penalidades injustas.
              </p>
              <p>
                A Quitadoc oferece orientação legal especializada para proteger seus direitos e encontrar as melhores soluções para sua situação.
              </p>
            </div>
          </div>
        </section>

        <BenefitsGrid
          title="Por que contar com a Quitadoc?"
          benefits={[
            {
              icon: "🛡️",
              title: "Defesa Jurídica",
              description: "Análise completa do contrato e identificação de cláusulas abusivas"
            },
            {
              icon: "💰",
              title: "Economia",
              description: "Redução de juros e penalidades através de negociação"
            },
            {
              icon: "⚡",
              title: "Agilidade",
              description: "Processo rápido e eficiente para resolução"
            },
            {
              icon: "👨‍⚖️",
              title: "Expertise",
              description: "Equipe de advogados especializados em direito do consumidor"
            }
          ]}
        />

        <ProcessTimeline
          title="Nosso Processo"
          steps={[
            { title: "Análise do Contrato", description: "Avaliamos todos os termos do seu contrato de alienação fiduciária" },
            { title: "Identificação de Problemas", description: "Detectamos cláusulas abusivas e irregularidades" },
            { title: "Estratégia Jurídica", description: "Desenvolvemos a melhor abordagem para seu caso" },
            { title: "Negociação", description: "Entramos em contato com a instituição para resolver" },
            { title: "Resolução", description: "Implementamos a solução e protegemos seus direitos" }
          ]}
        />

        <FAQAccordion
          title="Perguntas Frequentes sobre Alienação Fiduciária"
          faqs={[
            {
              question: "Posso perder meu carro em uma alienação fiduciária?",
              answer: "Sim, se não pagar as parcelas. Por isso é importante conhecer seus direitos e contestar cláusulas abusivas que possam dificultar o pagamento."
            },
            {
              question: "Quais são as cláusulas abusivas mais comuns?",
              answer: "Juros compostos excessivos, prazos muito longos, multas injustificadas, e cláusulas que limitam seu direito de defesa."
            },
            {
              question: "Consigo reduzir os juros do meu contrato?",
              answer: "Sim! Através de negociação jurídica, frequentemente conseguimos reduzir significativamente os juros e penalidades."
            },
            {
              question: "Qual é o custo do serviço?",
              answer: "Oferecemos uma consulta gratuita inicial. Os honorários são discutidos após a análise do seu caso."
            }
          ]}
        />

        <section className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <FormCTA
              variant="mid"
              heading="Analisar meu contrato de alienação agora"
              subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
              buttonText="Analisar meu caso agora"
            />
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <FormCTA
              variant="final"
              heading="Ainda dá tempo de agir"
              subheading="Ver minhas opções sem compromisso."
              buttonText="Quero evitar a apreensão"
            />
          </div>
        </section>

        <CTASection
          title="Proteja seus direitos em alienação fiduciária"
          subtitle="Nossa equipe está pronta para ajudar"
          buttonText="Agendar Consulta Gratuita"
          buttonHref="/consulta-gratuita"
        />
    </>
  )
}
