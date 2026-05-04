import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { FeaturedSnippetTemplate } from "@/components/seo/featured-snippet-template"
import {
  getGuia,
  getAllGuias,
  generateInternalLinks,
  generateFAQSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo-content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const guias = getAllGuias()
  return guias.map((guia) => ({
    slug: guia.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guia = getGuia(slug)

  if (!guia) {
    return {
      title: "Página não encontrada",
    }
  }

  return {
    title: guia.title,
    description: guia.metaDescription,
    openGraph: {
      title: guia.title,
      description: guia.metaDescription,
      type: "article",
      url: `https://quitadoc.com.br/guias/${guia.slug}`,
      siteName: "Quitadoc",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: guia.title,
      description: guia.metaDescription,
    },
    alternates: {
      canonical: `https://quitadoc.com.br/guias/${guia.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  }
}

export default async function GuiaPage({ params }: PageProps) {
  const { slug } = await params
  const guia = getGuia(slug)

  if (!guia) {
    notFound()
  }

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Guias", href: "/guias" },
    { label: guia.h1, href: `/guias/${guia.slug}` },
  ]

  const relatedLinks = generateInternalLinks(guia.slug, "guias")

  const faqSchema = generateFAQSchema(guia.faq)
  const articleSchema = generateArticleSchema(guia, "guias")
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  // Generate expanded content based on cluster
  const expandedContent = generateExpandedContent(guia)
  const legalContext = generateLegalContext(guia)
  const whatToDo = generateWhatToDo(guia)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FeaturedSnippetTemplate
        h1={guia.h1}
        directAnswer={guia.directAnswer}
        bulletPoints={guia.bulletPoints}
        expandedContent={expandedContent}
        legalContext={legalContext}
        whatToDo={whatToDo}
        faq={guia.faq}
        relatedLinks={relatedLinks}
        breadcrumbs={breadcrumbs}
        cluster={guia.cluster}
        slug={guia.slug}
        secondaryQuestion={guia.secondaryQuestion || {
          question: "Quais bens não podem ser penhorados?",
          answer: "A lei protege bens essenciais como imóvel de moradia (bem de família), salários até 40 salários mínimos em poupança, instrumentos de trabalho e bens de uso pessoal.",
          highlight: "A lei protege"
        }}
        relatedQuestion={guia.relatedQuestion || {
          question: "Como se defender de uma penhora?",
          answer: "Você pode apresentar embargos à execução, demonstrar que os bens são impenhoráveis ou negociar um acordo de pagamento. O prazo para defesa geralmente é de 15 dias.",
          highlight: "Você pode"
        }}
        legalCitation={guia.legalCitation}
        realCase={guia.realCase}
        deepContent={guia.deepContent}
        scenarios={guia.scenarios}
        conditions={[
          { condition: "Dívida não paga após vencimento", description: "Credor pode iniciar ação judicial" },
          { condition: "Processo de execução em andamento", description: "Citação do devedor para pagamento" },
          { condition: "Ordem judicial de penhora", description: "Juiz autoriza apreensão de bens" },
          { condition: "Localização de bens pelo sistema", description: "SISBAJUD, RENAJUD identificam ativos" },
        ]}
      />
    </>
  )
}

function generateExpandedContent(guia: ReturnType<typeof getGuia>): string {
  if (!guia) return ""
  
  const contentMap: Record<string, string> = {
    "o-que-e-penhora": "A penhora é um procedimento previsto no Código de Processo Civil (CPC) que permite ao credor satisfazer seu crédito através da apreensão de bens do devedor. O processo começa quando o credor ajuiza uma ação de execução, e após a citação do devedor para pagamento voluntário, não havendo quitação, o juiz determina a localização e apreensão de bens suficientes para cobrir a dívida.",
    "como-funciona-penhora-judicial": "O procedimento de penhora judicial segue um rito bem definido pela legislação brasileira. Primeiro, o credor precisa ter um título executivo (judicial ou extrajudicial) que comprove a existência da dívida. Com esse título, ele ingressa com ação de execução, e o devedor é intimado para pagar. Se não pagar, começa a fase de localização de bens, que hoje é facilitada por sistemas eletrônicos como SISBAJUD e RENAJUD.",
    "bens-impenhоrаveis-lista-completa": "O Código de Processo Civil, em seu artigo 833, estabelece uma lista de bens que não podem ser penhorados para proteger a dignidade do devedor e sua família. Essa proteção visa garantir que, mesmo devendo, a pessoa mantenha condições mínimas de subsistência e trabalho.",
    "penhora-conta-bancaria-bloqueio": "O bloqueio de conta bancária por ordem judicial ocorre através do sistema SISBAJUD (antigo BACENJUD), que permite aos juízes enviar ordens de bloqueio diretamente para todas as instituições financeiras do país. O sistema funciona 24 horas e o bloqueio é praticamente instantâneo.",
    "penhora-online-sisbajud": "O SISBAJUD (Sistema de Busca de Ativos do Poder Judiciário) é a ferramenta que substituiu o BACENJUD em 2020. Ele permite que juízes de todo o Brasil bloqueiem valores em contas bancárias de devedores de forma instantânea e automatizada, aumentando significativamente a eficiência das execuções judiciais.",
    "como-desbloquear-conta-penhorada": "O desbloqueio de valores penhorados depende de demonstrar ao juiz que os valores bloqueados são impenhoráveis. A forma mais comum é comprovar que se trata de salário, aposentadoria ou poupança até 40 salários mínimos. O pedido deve ser feito por petição nos autos do processo.",
    "penhora-salario-limite-legal": "A regra geral é que o salário é absolutamente impenhorável, conforme artigo 833, IV do CPC. Porém, a jurisprudência tem evoluído para permitir penhora parcial quando o devedor possui renda elevada, aplicando o princípio da proporcionalidade.",
    "bem-de-familia-protecao": "A Lei 8.009/90 estabelece a impenhorabilidade do bem de família, que é o imóvel residencial próprio do casal ou da entidade familiar. A proteção é automática e não depende de nenhum registro ou declaração, bastando que o imóvel seja utilizado como residência.",
    "excecoes-bem-de-familia": "Embora a proteção do bem de família seja ampla, a própria Lei 8.009/90 estabelece exceções em que o imóvel pode ser penhorado. Essas exceções visam equilibrar a proteção da moradia com outros direitos igualmente importantes.",
    "como-evitar-penhora-bens": "Existem estratégias legais para evitar ou minimizar os efeitos da penhora. O mais importante é agir rapidamente após receber a citação da execução, buscando acordo ou demonstrando a impenhorabilidade dos bens.",
  }
  
  return contentMap[guia.slug] || `Este guia aborda especificamente ${guia.h1.toLowerCase()}, um tema fundamental para quem enfrenta processos de execução no Brasil. Entender seus direitos e as opções disponíveis é essencial para tomar as melhores decisões.`
}

function generateLegalContext(guia: ReturnType<typeof getGuia>): string {
  if (!guia) return ""
  
  if (guia.cluster === "legal") {
    return "A legislação brasileira, especialmente o Código de Processo Civil (CPC) de 2015 e a Lei 8.009/90, estabelece regras claras sobre o que pode e o que não pode ser penhorado. É fundamental conhecer essas regras para exercer adequadamente seus direitos de defesa."
  }
  
  if (guia.cluster === "defense") {
    return "O devedor tem direito à ampla defesa garantido pela Constituição Federal. Isso inclui o direito de contestar valores cobrados indevidamente, demonstrar a impenhorabilidade de bens e negociar acordos de pagamento."
  }
  
  if (guia.cluster === "banking") {
    return "As operações bancárias relacionadas à penhora são reguladas pelo Banco Central e pelo Código de Processo Civil. Os bancos são obrigados a cumprir ordens judiciais, mas o cliente tem direito de contestar bloqueios de valores impenhoráveis."
  }
  
  return "A legislação brasileira busca equilibrar o direito do credor de receber o que lhe é devido com a proteção da dignidade do devedor. Conhecer esses direitos é fundamental para uma defesa eficaz."
}

function generateWhatToDo(guia: ReturnType<typeof getGuia>): string {
  if (!guia) return ""
  
  if (guia.intent === "transactional" || guia.cluster === "defense") {
    return "Se você está enfrentando uma situação de penhora ou execução judicial, o primeiro passo é buscar orientação jurídica especializada. Um advogado pode analisar seu caso específico e indicar a melhor estratégia de defesa."
  }
  
  return "Entender seus direitos é o primeiro passo. Se você está com dúvidas sobre sua situação específica ou precisa de orientação sobre como proceder, nossa equipe pode ajudar com uma análise gratuita do seu caso."
}
