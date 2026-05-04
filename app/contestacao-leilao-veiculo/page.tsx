import { Breadcrumb } from "@/components/layout/breadcrumb"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { FAQAccordion } from "@/components/sections/faq-accordion"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"

export const metadata = {
  title: "Contestação de Leilão de Veículo | Quitadoc",
  description: "Contestação e bloqueio de leilão de veículo. Proteja seu patrimônio com orientação jurídica especializada.",
}

export default function ContestaLeilaoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Contestação de Leilão de Veículo", href: "#" }]} />
        
        <HeroSection
          title="Contestação de Leilão de Veículo"
          subtitle="Bloqueie ou reverta um leilão do seu veículo. Proteja seu patrimônio agora"
          description="Se seu veículo foi levado a leilão, pode haver irregularidades no processo. Orientamos na contestação e recuperação."
          ctaText="Solicitar Consultoria Urgente"
          ctaHref="/consulta-gratuita"
        />

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">O que você precisa saber</h2>
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-4">
                Um leilão de veículo é uma das medidas mais severas que um credor pode tomar. No entanto, muitos leilões ocorrem com procedimentos irregulares ou violando direitos do consumidor.
              </p>
              <p className="mb-4">
                Existem várias causas legais para contestar um leilão: falta de aviso prévio adequado, não respeito aos prazos legais, venda por preço muito abaixo do valor de mercado, ou violação de direitos fundamentais.
              </p>
              <p>
                A Quitadoc atuará rapidamente para bloquear ou reverter o leilão, protegendo seu patrimônio.
              </p>
            </div>
          </div>
        </section>

        <BenefitsGrid
          title="Nossas ações"
          benefits={[
            {
              icon: "🛑",
              title: "Bloqueio de Leilão",
              description: "Ação judicial imediata para suspender o leilão"
            },
            {
              icon: "📜",
              title: "Revisão de Processo",
              description: "Análise completa dos procedimentos realizados"
            },
            {
              icon: "💼",
              title: "Defesa em Juízo",
              description: "Atuação especializados nos autos do processo"
            },
            {
              icon: "🔄",
              title: "Reversão",
              description: "Busca da anulação total do leilão"
            }
          ]}
        />

        <section className="py-16 px-4 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">Motivos para Contestar um Leilão</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-lg">
                <h3 className="font-bold text-primary mb-2">Falta de Aviso Prévio</h3>
                <p className="text-sm text-muted-foreground">Se você não recebeu aviso adequado ou com antecedência necessária</p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="font-bold text-primary mb-2">Preço Irrisório</h3>
                <p className="text-sm text-muted-foreground">Quando o veículo é vendido por valor muito inferior ao de mercado</p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="font-bold text-primary mb-2">Vício no Processo</h3>
                <p className="text-sm text-muted-foreground">Irregularidades procedimentais no processo de leilão</p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="font-bold text-primary mb-2">Violação de Direitos</h3>
                <p className="text-sm text-muted-foreground">Desrespeito a direitos fundamentais do consumidor</p>
              </div>
            </div>
          </div>
        </section>

        <ProcessTimeline
          title="Processo de Contestação"
          steps={[
            { title: "Avaliação de Urgência", description: "Análise imediata da situação para decisão de ações urgentes" },
            { title: "Preparação de Defesa", description: "Levantamento de todos os vícios do processo de leilão" },
            { title: "Ação Judicial", description: "Apresentação imediata de ação para bloqueio" },
            { title: "Medida Cautelar", description: "Solicitação de medida para suspender o leilão" },
            { title: "Recuperação", description: "Atuação para anulação e retorno do veículo" }
          ]}
        />

        <FAQAccordion
          title="Perguntas sobre Contestação de Leilão"
          faqs={[
            {
              question: "Posso impedir um leilão já marcado?",
              answer: "Sim! Existem medidas judiciais para bloquear leilões irregulares. Precisamos atuar rapidamente."
            },
            {
              question: "Qual é o prazo para contestar?",
              answer: "Existem prazos específicos. Se o leilão já ocorreu, ainda há possibilidade de revisão. Procure-nos urgentemente."
            },
            {
              question: "E se o veículo já foi vendido?",
              answer: "Mesmo assim, é possível reverter a venda se houver irregularidades no processo."
            },
            {
              question: "Qual é o valor do serviço?",
              answer: "Oferecemos consulta gratuita. Os honorários são discutidos após análise da situação."
            }
          ]}
        />

        <section className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <FormCTA
              variant="mid"
              heading="Seu veículo pode ir a leilão. Verifique agora"
              subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
              buttonText="Analisar meu caso agora"
            />
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-2xl px-4">
            <FormCTA
              variant="final"
              heading="Ainda dá tempo de bloquear o leilão"
              subheading="Cada hora conta. Preencha agora e veja suas opções."
              buttonText="Quero evitar o leilão do meu veículo"
            />
          </div>
        </section>

        <CTASection
          title="Precisa bloquear um leilão agora?"
          subtitle="Tempo é crucial. Procure-nos imediatamente"
          buttonText="Agendar Consulta Urgente"
          buttonHref="/consulta-gratuita"
        />
    </>
  )
}
