import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cancelar Busca e Apreensão de Veículo | 87% Taxa de Sucesso | Quitadoc",
  description: "Cancele a busca e apreensão do seu veículo com defesa jurídica especializada. Success fee de 10%. Atuação nacional. Resposta em 2h. ☎ (11) 92533-2215",
  keywords: ["busca e apreensão", "cancelar busca apreensão", "alienação fiduciária", "revisão contrato financiamento"],
}

import { HeroSection } from "@/components/sections/hero-section"
import { StatsCards } from "@/components/sections/stats-cards"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { FAQAccordion } from "@/components/sections/faq-accordion"
import { TestimonialSlider } from "@/components/sections/testimonial-slider"
import { CTASection } from "@/components/sections/cta-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ContactStrip } from "@/components/sections/contact-strip"
import { PhoneCTABar } from "@/components/sections/phone-cta-bar"
import { BreadcrumbSchema } from "@/components/schemas/breadcrumb-schema"
import { FormCTA } from "@/components/sections/form-cta"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const homeFAQs = [
  {
    question: "O que é busca e apreensão de veículo?",
    answer: "A busca e apreensão é um processo judicial que permite ao credor (banco ou financeira) retomar um veículo financiado quando o devedor deixa de pagar as parcelas. É um procedimento previsto no Decreto-Lei 911/69 e pode ser contestado judicialmente. Saiba mais no nosso artigo completo.",
    blogLink: { href: "/blog/o-que-e-busca-e-apreensao", label: "Ler artigo completo" }
  },
  {
    question: "Posso cancelar a busca e apreensão depois de notificado?",
    answer: "Sim! Mesmo após receber a notificação ou até mesmo depois do oficial de justiça ir buscar o veículo, é possível apresentar defesa judicial. O prazo legal é de 5 dias após a apreensão, mas quanto antes agir, maiores as chances de sucesso.",
    blogLink: { href: "/cancelar-busca-apreensao", label: "Ver como cancelar" }
  },
  {
    question: "Quanto custa o serviço da Quitadoc?",
    answer: "Trabalhamos no modelo Success Fee: você só paga se ganharmos. Nossa taxa é de 10% do valor da causa, parcelável em até 3x. A consulta inicial é focada em analisar seu caso.",
    blogLink: { href: "/como-funciona", label: "Como funciona" }
  },
  {
    question: "Vocês atuam em qual estado?",
    answer: "Atuamos em todo o território nacional. Nossa equipe jurídica está preparada para ajuizar ações em qualquer estado do Brasil, independente de onde você esteja.",
    blogLink: { href: "/consulta-gratuita", label: "Falar com especialista" }
  },
  {
    question: "Quanto tempo leva para resolver meu caso?",
    answer: "O prazo varia conforme a complexidade do caso e o juízo. Em média, conseguimos liminares (decisões urgentes) em 24-72 horas. A resolução completa pode levar de 30 a 90 dias.",
    blogLink: { href: "/como-funciona", label: "Ver processo completo" }
  },
  {
    question: "Preciso pagar as parcelas atrasadas para me defender?",
    answer: "Não necessariamente. Existem diversas teses jurídicas que podem suspender a cobrança, reduzir o valor devido ou até mesmo cancelar o contrato por práticas abusivas. Cada caso é analisado individualmente.",
    blogLink: { href: "/revisao-contrato-financiamento", label: "Revisar meu contrato" }
  },
  {
    question: "O que é alienação fiduciária?",
    answer: "Alienação fiduciária é uma modalidade de garantia em que o bem financiado (carro, imóvel) fica em nome do credor até a quitação da dívida. Isso permite que o banco tome o bem de forma mais rápida em caso de inadimplência.",
    blogLink: { href: "/defesa-alienacao-fiduciaria", label: "Saiba como se defender" }
  },
  {
    question: "Quais são os juros máximos permitidos por lei?",
    answer: "A legislação brasileira proíbe o anatocismo (juros sobre juros) e exige transparência nos contratos. O Código de Defesa do Consumidor permite revisão de cláusulas abusivas. Nossa análise identifica cobranças ilegais que podem reduzir sua dívida em até 40%.",
    blogLink: { href: "/blog/juros-abusivos-cdc", label: "Entender juros abusivos" }
  },
  {
    question: "É possível impedir o leilão do meu veículo?",
    answer: "Sim. Se você recebeu notificação de leilão, ainda há tempo. Através de medida liminar, conseguimos suspender leilões em horas. Já salvamos centenas de veículos que estavam com data de leilão marcada.",
    blogLink: { href: "/blog/como-evitar-leilao-veiculo", label: "Como evitar o leilão" }
  },
  {
    question: "Meu veículo já foi apreendido. Ainda posso recuperar?",
    answer: "Sim! Mesmo após a apreensão física do veículo, você tem 5 dias para apresentar defesa e pedir a devolução. Em muitos casos conseguimos liminar para devolução imediata enquanto o processo corre.",
    blogLink: { href: "/cancelar-busca-apreensao", label: "Ver como recuperar" }
  },
  {
    question: "O que acontece se eu ignorar a notificação de busca e apreensão?",
    answer: "Se você não agir após a notificação, o oficial de justiça pode ir buscar o veículo a qualquer momento. Após a apreensão, o prazo para defesa é de apenas 5 dias. Quanto antes você agir, maiores as chances de manter o veículo.",
    blogLink: { href: "/blog/prazo-defesa-busca-apreensao", label: "Ver prazos legais" }
  },
  {
    question: "Como funciona a revisão de contrato de financiamento?",
    answer: "Nossa equipe analisa seu contrato em busca de cláusulas abusivas, juros ilegais e cobranças indevidas. Em média, reduzimos o valor das dívidas em 30% a 40%. O processo pode ser feito extrajudicialmente ou via ação judicial.",
    blogLink: { href: "/revisao-contrato-financiamento", label: "Revisar meu contrato" }
  },
  {
    question: "Vocês também atuam em financiamentos de imóveis?",
    answer: "Sim. Atuamos em defesa de alienação fiduciária de imóveis, revisão de contratos de financiamento imobiliário e contestação de leilões de imóveis. O processo é similar ao de veículos.",
    blogLink: { href: "/defesa-alienacao-fiduciaria", label: "Defesa alienação fiduciária" }
  },
  {
    question: "Preciso ir ao escritório presencialmente?",
    answer: "Não. Todo nosso atendimento é 100% digital. Você envia os documentos por WhatsApp ou email, assinamos contratos digitalmente e te mantemos atualizado por mensagem. Atendemos todo o Brasil remotamente.",
    blogLink: { href: "/consulta-gratuita", label: "Iniciar atendimento online" }
  },
  {
    question: "Quais documentos preciso para a consulta gratuita?",
    answer: "Para a consulta inicial, basta ter o número do contrato de financiamento, o CPF e uma descrição do problema. Se possível, um extrato do contrato ou as parcelas em atraso. Mas mesmo sem documentos podemos dar uma orientação inicial.",
    blogLink: { href: "/consulta-gratuita", label: "Agendar consulta gratuita" }
  },
  {
    question: "Qual a diferença entre busca e apreensão e execução de dívida?",
    answer: "A busca e apreensão é específica para bens alienados fiduciariamente (carros, imóveis financiados) e é mais rápida. A execução de dívida é mais ampla e pode atingir qualquer bem do devedor. As estratégias de defesa são diferentes para cada caso.",
    blogLink: { href: "/blog/o-que-e-busca-e-apreensao", label: "Entender as diferenças" }
  },
  {
    question: "Posso contestar uma dívida que já foi para o SPC/Serasa?",
    answer: "Sim. Você pode contestar a negativação, especialmente se houver irregularidades no contrato ou cobranças abusivas. Em muitos casos conseguimos a exclusão do nome dos cadastros negativos como parte da negociação.",
    blogLink: { href: "/reducao-juros-abusivos", label: "Ver como contestar" }
  },
  {
    question: "Como funcionam os honorários Success Fee?",
    answer: "No modelo Success Fee, você não paga nada adiantado. Nossa remuneração é 10% do valor economizado ou do benefício obtido no processo, cobrada somente após o resultado favorável. Sem resultado, sem cobrança.",
    blogLink: { href: "/como-funciona", label: "Entender o modelo" }
  },
  {
    question: "O que é leilão extrajudicial de veículo?",
    answer: "O leilão extrajudicial ocorre sem necessidade de processo judicial prévio. O banco pode levar o veículo a leilão diretamente após a apreensão. É mais rápido que o judicial, mas também pode ser contestado se houver irregularidades.",
    blogLink: { href: "/contestacao-leilao-veiculo", label: "Como contestar leilão" }
  },
  {
    question: "Qual a taxa de sucesso da Quitadoc em casos de busca e apreensão?",
    answer: "Nossa taxa de sucesso é de 87% nos casos de defesa de busca e apreensão. Já atendemos mais de 3.200 clientes em todo o Brasil. Os casos com maior chance de êxito são aqueles em que há irregularidades no contrato ou nos quais agimos rapidamente após a notificação.",
    blogLink: { href: "/casos-de-sucesso", label: "Ver casos de sucesso" }
  },
]

export default function HomePage() {
  const breadcrumbs = [
    { name: "Início", url: "https://www.quitadoc.com.br" }
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <HeroSection
        title="Cancele a Busca e Apreensão do Seu Veículo"
        subtitle="Defesa jurídica especializada com 87% de taxa de sucesso. Consulta gratuita e pagamento somente após o resultado. Proteja seu patrimônio com quem entende do assunto."
      />
      
      <PhoneCTABar
        message="Seu veículo está em risco? Ligue agora — Resposta em minutos"
        variant="primary"
      />

      <StatsCards />
      
      <ServicesSection />
      
      <ProcessTimeline 
        title="Como Cancelamos a Busca e Apreensão"
        subtitle="Processo simples, transparente e eficaz"
      />
      
      <BenefitsGrid />

      {/* CTA Meio da página */}
      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se seu caso ainda tem solução"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você em minutos."
            buttonText="Verificar agora"
          />
        </div>
      </section>

      <PhoneCTABar
        message="Não perca seu veículo — Entre em contato agora: (11) 92533-2215"
        variant="dark"
      />
      
      <TestimonialSlider />

      <ContactStrip
        variant="dark"
        title="Seu caso é urgente? Fale com um especialista agora mesmo."
      />
      
      <FAQAccordion 
        title="Dúvidas Frequentes"
        subtitle="Entenda como podemos ajudar você"
        faqs={homeFAQs}
      />
      
      {/* Blog Preview Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-foreground">Conteúdo Educativo</h2>
              <p className="mt-2 text-muted-foreground">Aprenda sobre seus direitos</p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                Ver Todos os Artigos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BlogPreviewCard 
              title="O Que é Busca e Apreensão? Guia Completo 2025"
              excerpt="Entenda como funciona a busca e apreensão, seus direitos, prazos legais e como se defender."
              href="/blog/o-que-e-busca-e-apreensao"
              category="Educativo"
            />
            <BlogPreviewCard 
              title="Juros Abusivos: Como Identificar e Revisar"
              excerpt="Aprenda a identificar juros abusivos no seu contrato de financiamento e como reduzir parcelas."
              href="/blog/juros-abusivos-cdc"
              category="Finanças"
            />
            <BlogPreviewCard 
              title="Como Evitar o Leilão do Seu Veículo"
              excerpt="Dicas práticas para impedir que seu carro vá a leilão e recuperar seu bem."
              href="/blog/como-evitar-leilao-veiculo"
              category="Dicas"
            />
          </div>
        </div>
      </section>
      
      <ContactStrip
        variant="accent"
        title="Entre em contato agora — Atendimento imediato pelo WhatsApp"
      />

      <PhoneCTABar
        message="Prefere ligar? Nossos especialistas estão disponíveis agora"
        variant="accent"
      />

      {/* CTA Final da página */}
      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
            subheading="Cada hora conta. Preencha agora e veja suas opções sem compromisso."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>

      <CTASection 
        title="Proteja Seu Veículo Agora"
        subtitle="Consulta gratuita em 5 minutos. Resposta em até 2 horas. Sem compromisso."
      />
    </>
  )
}

function BlogPreviewCard({ title, excerpt, href, category }: { 
  title: string
  excerpt: string
  href: string
  category: string
}) {
  return (
    <Link href={href} className="group">
      <article className="h-full rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {category}
        </span>
        <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Ler mais
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </article>
    </Link>
  )
}
