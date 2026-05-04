import { Metadata } from "next"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsCards } from "@/components/sections/stats-cards"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { FAQAccordion } from "@/components/sections/faq-accordion"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Car, Banknote, TrendingUp, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Cancelar Busca e Apreensao em Sao Paulo | Atuacao em Todos os Foruns SP",
  description: "Defesa especializada em busca e apreensao veicular em Sao Paulo. 180+ casos resolvidos em SP. Atuacao no TJ-SP, foruns regionais e varas civeis. Consulta gratuita.",
  keywords: ["busca e apreensao sao paulo", "cancelar busca apreensao sp", "advogado busca apreensao sp", "defesa veicular sao paulo", "alienacao fiduciaria sp"],
  openGraph: {
    title: "Cancelar Busca e Apreensao em Sao Paulo | Quitadoc",
    description: "Defesa especializada em busca e apreensao veicular em Sao Paulo. 180+ casos resolvidos em SP.",
    images: ["/og-sao-paulo.jpg"],
  },
  alternates: {
    canonical: "https://www.quitadoc.com.br/busca-apreensao-sao-paulo"
  }
}

const spFAQs = [
  {
    question: "Voces atuam em toda Grande Sao Paulo?",
    answer: "Sim! Atuamos em todos os foruns da capital e Grande Sao Paulo, incluindo Santo Andre, Sao Bernardo, Sao Caetano, Guarulhos, Osasco, e todas as demais cidades da regiao metropolitana."
  },
  {
    question: "Qual o tempo medio de tramitacao no TJ-SP?",
    answer: "O Tribunal de Justica de Sao Paulo e um dos mais ageis do pais. Conseguimos liminares em 24-72 horas e a resolucao definitiva costuma ocorrer em 60-90 dias, dependendo da comarca."
  },
  {
    question: "Preciso ir ate o escritorio em Sao Paulo?",
    answer: "Nao e necessario. Todo o atendimento pode ser feito de forma remota, por WhatsApp, videochamada ou telefone. Documentos sao enviados digitalmente. Voce so precisa comparecer se houver audiencia presencial."
  },
  {
    question: "Qual o custo para defesa em Sao Paulo?",
    answer: "Trabalhamos no modelo Success Fee em todo o Brasil, incluindo Sao Paulo. Voce so paga 10% do valor da causa se ganharmos. A consulta inicial e gratuita."
  },
  {
    question: "Voces conhecem as particularidades do TJ-SP?",
    answer: "Sim! Nossa equipe tem ampla experiencia no TJ-SP, conhecendo os entendimentos predominantes das diferentes camaras de direito privado, o que aumenta significativamente as chances de sucesso."
  },
  {
    question: "Atendem casos urgentes em Sao Paulo?",
    answer: "Sim! Temos plantao 24 horas para casos urgentes. Se seu veiculo esta prestes a ser apreendido ou ja foi, entre em contato imediatamente que iniciaremos a defesa no mesmo dia."
  },
]

const spStats = [
  { value: 180, suffix: "+", label: "Casos em SP", icon: <Car className="h-8 w-8" /> },
  { value: 4.2, prefix: "R$ ", suffix: "M", label: "Economizados em SP", icon: <Banknote className="h-8 w-8" /> },
  { value: 89, suffix: "%", label: "Sucesso no TJ-SP", icon: <TrendingUp className="h-8 w-8" /> },
  { value: 15, suffix: "+", label: "Comarcas Atendidas", icon: <MapPin className="h-8 w-8" /> },
]

const foruns = [
  "Foro Central Civel Joao Mendes Jr.",
  "Foro Regional de Santo Amaro",
  "Foro Regional de Pinheiros",
  "Foro Regional da Lapa",
  "Foro Regional de Santana",
  "Foro Regional de Vila Prudente",
  "Foro de Guarulhos",
  "Foro de Osasco",
  "Foro de Santo Andre",
  "Foro de Sao Bernardo do Campo",
]

export default function BuscaApreensaoSaoPauloPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Quitadoc Sao Paulo",
            "description": "Servico juridico especializado em cancelamento de busca e apreensao veicular em Sao Paulo e Grande SP",
            "url": "https://www.quitadoc.com.br/busca-apreensao-sao-paulo",
            "telephone": "+55-11-92533-2215",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sao Paulo",
              "addressRegion": "SP",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-23.5505",
              "longitude": "-46.6333"
            },
            "areaServed": {
              "@type": "City",
              "name": "Sao Paulo"
            },
            "serviceType": "Defesa em Busca e Apreensao Veicular"
          })
        }}
      />
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Regioes" },
          { label: "Sao Paulo" }
        ]} />
      </div>
      
      <HeroSection
        title="Cancelar Busca e Apreensao em Sao Paulo"
        subtitle="Atuacao especializada no TJ-SP e em todos os foruns da Grande Sao Paulo. 180+ casos resolvidos na regiao com 89% de taxa de sucesso."
        badges={[
          { icon: <MapPin className="h-4 w-4" />, text: "Atuacao em Todo SP" },
          { icon: <TrendingUp className="h-4 w-4" />, text: "89% Sucesso TJ-SP" },
          { icon: <Car className="h-4 w-4" />, text: "180+ Casos em SP" },
        ]}
      />
      
      <StatsCards stats={spStats} />
      
      {/* Foruns Section */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-foreground">Foruns de Atuacao em Sao Paulo</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Conhecemos todos os foruns da capital e Grande SP
            </p>
          </div>
          
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {foruns.map((forum, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="font-medium text-foreground">{forum}</span>
              </div>
            ))}
          </div>
          
          <p className="mt-8 text-center text-muted-foreground">
            E mais: atuamos em todas as comarcas do interior paulista
          </p>
        </div>
      </section>
      
      <ProcessTimeline 
        title="Como Atuamos em Sao Paulo"
        subtitle="Processo adaptado a realidade do TJ-SP"
      />
      
      {/* Local Expertise Section */}
      <section className="bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-center text-foreground">
            Por Que Contratar Especialista em Sao Paulo
          </h2>
          
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              O <strong>Tribunal de Justica de Sao Paulo (TJ-SP)</strong> e o maior tribunal do pais, 
              com mais de 300 comarcas e milhares de processos de busca e apreensao tramitando 
              simultaneamente. Conhecer as particularidades de cada vara e camara e fundamental 
              para obter resultados positivos.
            </p>
            <p>
              Nossa equipe possui ampla experiencia no sistema judiciario paulista, conhecendo 
              os entendimentos predominantes das diferentes camaras de direito privado do TJ-SP, 
              os prazos medios de tramitacao em cada comarca e as melhores estrategias para 
              cada tipo de situacao.
            </p>
            <p>
              Alem disso, o <strong>volume de financiamentos</strong> em Sao Paulo e o maior do Brasil, 
              o que significa que os bancos tem estruturas robustas para cobrar inadimplentes. 
              Por isso, contar com defesa especializada e ainda mais importante na capital e 
              Grande SP.
            </p>
            <p>
              Nossos advogados acompanham constantemente as decisoes mais recentes do TJ-SP em 
              materia de alienacao fiduciaria, garantindo que sua defesa utilize as teses mais 
              atuais e com maior chance de acolhimento.
            </p>
          </div>
        </div>
      </section>
      
      <BenefitsGrid 
        title="Vantagens da Quitadoc em Sao Paulo"
        subtitle="Conhecimento local + experiencia nacional"
      />
      
      <FAQAccordion 
        title="Duvidas sobre Atuacao em Sao Paulo"
        subtitle="Perguntas especificas sobre nossa atuacao em SP"
        faqs={spFAQs}
      />
      
      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se pode cancelar a busca e apreensão em SP"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Verificar se posso evitar a busca e apreensão"
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir em São Paulo"
            subheading="Cada hora conta. Veja suas opções sem compromisso."
            buttonText="Quero evitar a apreensão do meu veículo"
          />
        </div>
      </section>

      <CTASection 
        title="Proteja Seu Veiculo em Sao Paulo"
        subtitle="Consulta gratuita. Atendimento imediato para toda Grande SP."
      />
    </>
  )
}
