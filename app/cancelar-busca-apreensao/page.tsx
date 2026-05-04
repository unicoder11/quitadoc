import { Metadata } from "next"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsCards } from "@/components/sections/stats-cards"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { FAQAccordion } from "@/components/sections/faq-accordion"
import { TestimonialSlider } from "@/components/sections/testimonial-slider"
import { CTASection } from "@/components/sections/cta-section"
import { SEOContent } from "@/components/sections/seo-content"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Car, Banknote, TrendingUp, Clock } from "lucide-react"
import { FormCTA } from "@/components/sections/form-cta"

export const metadata: Metadata = {
  title: "Cancelar Busca e Apreensao de Veiculo em Ate 48 Horas",
  description: "Defesa juridica especializada em cancelamento de busca e apreensao veicular. 87% de taxa de sucesso. Consulta gratuita. Pagamento apos resultado.",
  keywords: ["cancelar busca e apreensao", "busca e apreensao veiculo", "defesa busca apreensao", "cancelar apreensao carro", "advogado busca apreensao"],
  openGraph: {
    title: "Cancelar Busca e Apreensao de Veiculo em Ate 48 Horas | Quitadoc",
    description: "Defesa juridica especializada com 87% de taxa de sucesso. Consulta gratuita e pagamento apos resultado.",
    images: ["/og-cancelar-busca.jpg"],
  },
  alternates: {
    canonical: "https://www.quitadoc.com.br/cancelar-busca-apreensao"
  }
}

const serviceFAQs = [
  {
    question: "O que e busca e apreensao de veiculo?",
    answer: "A busca e apreensao e uma acao judicial que permite ao credor (banco ou financeira) retomar o veiculo dado em garantia quando ha inadimplencia no financiamento. E regulada pelo Decreto-Lei 911/69 e pode ser contestada judicialmente quando ha irregularidades no contrato ou no procedimento."
  },
  {
    question: "Posso cancelar a busca e apreensao depois de notificado?",
    answer: "Sim! Mesmo apos a notificacao extrajudicial ou judicial, e possivel apresentar defesa. O prazo legal apos a efetiva apreensao e de 5 dias, mas recomendamos agir o quanto antes. Quanto mais rapido entrar com a defesa, maiores as chances de obter uma liminar favoravel."
  },
  {
    question: "Quanto tempo leva para cancelar uma busca e apreensao?",
    answer: "Em casos urgentes, conseguimos obter liminares (decisoes de urgencia) em 24 a 72 horas. A resolucao definitiva do processo pode levar de 30 a 90 dias, dependendo do juizo e da complexidade do caso."
  },
  {
    question: "Qual o custo do servico de defesa?",
    answer: "Trabalhamos no modelo Success Fee: voce so paga se ganharmos. Nossa taxa e de apenas 10% do valor da causa, parcelavel em ate 3x. A consulta inicial e analise do caso sao totalmente gratuitas."
  },
  {
    question: "Posso perder meu carro no leilao?",
    answer: "Se nao houver defesa, sim. Apos a apreensao, o credor pode levar o veiculo a leilao em poucos dias. Por isso e fundamental agir rapidamente. Com a defesa adequada, conseguimos suspender o leilao e ate recuperar veiculos ja leiloados em casos de irregularidades."
  },
  {
    question: "Como funciona a alienacao fiduciaria?",
    answer: "Na alienacao fiduciaria, o veiculo fica em nome do banco ate a quitacao total do financiamento. O comprador tem a posse, mas nao a propriedade plena. Isso permite ao credor retomar o bem mais facilmente em caso de inadimplencia, mas tambem existem limites legais para essa retomada."
  },
  {
    question: "Preciso pagar as parcelas atrasadas para me defender?",
    answer: "Nao necessariamente. Existem diversas teses juridicas que podem ser utilizadas independente do pagamento das parcelas: juros abusivos, capitalizacao ilegal, falta de notificacao adequada, entre outras. Cada caso e analisado individualmente."
  },
  {
    question: "Voces atuam em qual estado?",
    answer: "Atuamos em todo o Brasil. Nossa equipe esta preparada para ajuizar acoes em qualquer comarca do territorio nacional, com acompanhamento completo do processo."
  },
  {
    question: "O que acontece se eu ja entreguei o veiculo?",
    answer: "Mesmo apos a entrega voluntaria ou apreensao judicial, ainda e possivel buscar a devolucao do veiculo ou a indenizacao por irregularidades. Alem disso, podemos atuar para evitar que voce seja cobrado por eventuais saldos residuais abusivos."
  },
  {
    question: "Como inicio o processo de defesa?",
    answer: "Basta preencher o formulario nesta pagina ou nos chamar no WhatsApp. Nossa equipe fara uma analise gratuita do seu caso em ate 2 horas e informara as chances de sucesso e os proximos passos."
  },
]

const stats = [
  { value: 650, suffix: "+", label: "Veiculos Salvos", icon: <Car className="h-8 w-8" /> },
  { value: 12.8, prefix: "R$ ", suffix: "M", label: "Economizados", icon: <Banknote className="h-8 w-8" /> },
  { value: 87, suffix: "%", label: "Taxa de Sucesso", icon: <TrendingUp className="h-8 w-8" /> },
  { value: 48, suffix: "h", label: "Tempo Medio Liminar", icon: <Clock className="h-8 w-8" /> },
]

const seoSections = [
  {
    title: "Entenda Seus Direitos na Busca e Apreensao de Veiculo Financiado",
    content: `<p>A <strong>busca e apreensao de veiculo financiado</strong> e um procedimento previsto no Decreto-Lei 911/69 que permite aos credores (bancos e financeiras) retomar veiculos quando o devedor deixa de pagar as parcelas do financiamento. No entanto, esse procedimento deve seguir regras rigorosas, e muitas vezes os credores cometem irregularidades que podem ser questionadas judicialmente.</p>
    <p>O <strong>Codigo de Defesa do Consumidor (CDC)</strong> oferece diversas protecoes ao devedor, especialmente quando ha clausulas abusivas no contrato, como juros acima da media de mercado, capitalizacao ilegal de juros (juros sobre juros), ou cobranca de taxas nao autorizadas.</p>`,
    links: [
      { text: "O que e busca e apreensao?", href: "/blog/o-que-e-busca-e-apreensao" },
      { text: "Direitos do devedor", href: "/blog/direitos-devedor-financiamento" }
    ]
  },
  {
    title: "Processo de Busca e Apreensao: Como Funciona",
    content: `<p>O processo de busca e apreensao segue etapas especificas que devem ser rigorosamente cumpridas pelo credor:</p>
    <ul>
      <li><strong>Notificacao extrajudicial:</strong> O banco deve notificar o devedor sobre a mora (atraso) e dar prazo para regularizacao.</li>
      <li><strong>Acao judicial:</strong> Nao havendo pagamento, o credor pode ajuizar acao de busca e apreensao.</li>
      <li><strong>Liminar:</strong> O juiz pode conceder liminar para apreensao imediata do veiculo.</li>
      <li><strong>Defesa:</strong> O devedor tem 5 dias apos a execucao da liminar para apresentar defesa.</li>
      <li><strong>Leilao:</strong> Sem defesa, o veiculo pode ser levado a leilao.</li>
    </ul>
    <p>Em cada uma dessas etapas, podem ocorrer irregularidades que fundamentam a defesa do devedor.</p>`,
    links: [
      { text: "Prazos para defesa", href: "/blog/prazo-defesa-busca-apreensao" },
      { text: "Como evitar o leilao", href: "/blog/como-evitar-leilao-veiculo" }
    ]
  },
  {
    title: "Jurisprudencia Favoravel ao Consumidor",
    content: `<p>Os tribunais brasileiros, especialmente o <strong>Superior Tribunal de Justica (STJ)</strong>, tem consolidado entendimentos favoraveis ao consumidor em casos de busca e apreensao:</p>
    <ul>
      <li><strong>Sumula 297 STJ:</strong> O Codigo de Defesa do Consumidor e aplicavel as instituicoes financeiras.</li>
      <li><strong>Sumula 369 STJ:</strong> No contrato de arrendamento mercantil (leasing), ainda que haja clausula resolutiva expressa, e necessaria a notificacao previa do arrendatario para constitui-lo em mora.</li>
      <li><strong>Sumula 472 STJ:</strong> A cobranca de comissao de permanencia cumulada com correcao monetaria, juros remuneratorios, moratorios ou multa contratual e ilegal.</li>
    </ul>
    <p>Essas e outras decisoes fundamentam as teses de defesa que utilizamos para proteger nossos clientes.</p>`,
    links: [
      { text: "Juros abusivos e CDC", href: "/blog/juros-abusivos-cdc" }
    ]
  },
]

export default function CancelarBuscaApreensaoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Cancelamento de Busca e Apreensao de Veiculo",
            "description": "Servico juridico especializado em cancelamento de busca e apreensao veicular, com 87% de taxa de sucesso e pagamento apos resultado.",
            "provider": {
              "@type": "LegalService",
              "name": "Quitadoc",
              "url": "https://www.quitadoc.com.br"
            },
            "areaServed": "BR",
            "serviceType": "Defesa Juridica em Busca e Apreensao"
          })
        }}
      />
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Servicos", href: "/#servicos" },
          { label: "Cancelar Busca e Apreensao" }
        ]} />
      </div>
      
      <HeroSection
        title="Cancele a Busca e Apreensao do Seu Veiculo em Ate 48 Horas"
        subtitle="Defesa juridica especializada com 87% de taxa de sucesso. Pagamento somente apos o resultado. Proteja seu patrimonio com quem entende do assunto."
      />
      
      <StatsCards stats={stats} />
      
      <ProcessTimeline 
        title="Como Cancelamos a Busca e Apreensao do Seu Veiculo"
        subtitle="Processo simples, rapido e eficaz"
      />
      
      <BenefitsGrid 
        title="Por Que Escolher a Quitadoc"
        subtitle="Especialistas em defesa veicular"
      />

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se seu caso ainda tem solução"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Verificar se posso evitar a busca e apreensão"
          />
        </div>
      </section>
      
      <FAQAccordion 
        title="Perguntas Frequentes sobre Busca e Apreensao"
        subtitle="Tire todas as suas duvidas"
        faqs={serviceFAQs}
      />
      
      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
            subheading="Cada hora conta. Preencha agora e veja suas opções sem compromisso."
            buttonText="Quero evitar a apreensão do meu veículo"
          />
        </div>
      </section>

      <CTASection 
        title="Evite Perder Seu Veiculo. Consulta Gratuita em 5 Minutos."
        subtitle="Sem compromisso. Resposta em ate 2 horas."
      />
      
      <TestimonialSlider 
        title="Casos de Sucesso em Busca e Apreensao"
        subtitle="Veja como ajudamos outros clientes"
      />
      
      <SEOContent 
        title="Entenda Seus Direitos na Busca e Apreensao de Veiculo Financiado"
        sections={seoSections}
      />
      
      <CTASection 
        title="Proteja Seu Veiculo Agora"
        subtitle="Nao espere o oficial de justica bater na sua porta."
        showForm={false}
      />
    </>
  )
}
