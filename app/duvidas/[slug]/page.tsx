import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { FeaturedSnippetTemplate } from "@/components/seo/featured-snippet-template"
import {
  getDuvida,
  getAllDuvidas,
  generateInternalLinks,
  generateFAQSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo-content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const duvidas = getAllDuvidas()
  return duvidas.map((duvida) => ({
    slug: duvida.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const duvida = getDuvida(slug)

  if (!duvida) {
    return {
      title: "Pagina nao encontrada",
    }
  }

  return {
    title: duvida.title,
    description: duvida.metaDescription,
    openGraph: {
      title: duvida.title,
      description: duvida.metaDescription,
      type: "article",
      url: `https://quitadoc.com.br/duvidas/${duvida.slug}`,
      siteName: "Quitadoc",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: duvida.title,
      description: duvida.metaDescription,
    },
    alternates: {
      canonical: `https://quitadoc.com.br/duvidas/${duvida.slug}`,
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

export default async function DuvidaPage({ params }: PageProps) {
  const { slug } = await params
  const duvida = getDuvida(slug)

  if (!duvida) {
    notFound()
  }

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Duvidas Frequentes", href: "/duvidas" },
    { label: duvida.h1, href: `/duvidas/${duvida.slug}` },
  ]

  const relatedLinks = generateInternalLinks(duvida.slug, "duvidas")

  const faqSchema = generateFAQSchema(duvida.faq)
  const articleSchema = generateArticleSchema(duvida, "duvidas")
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  // Generate contextual content
  const expandedContent = generateExpandedContent(duvida)
  const legalContext = generateLegalContext(duvida)
  const whatToDo = generateWhatToDo(duvida)

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
        h1={duvida.h1}
        directAnswer={duvida.directAnswer}
        bulletPoints={duvida.bulletPoints}
        expandedContent={expandedContent}
        legalContext={legalContext}
        whatToDo={whatToDo}
        faq={duvida.faq}
        relatedLinks={relatedLinks}
        breadcrumbs={breadcrumbs}
        cluster={duvida.cluster}
        slug={duvida.slug}
        secondaryQuestion={{
          question: "O que fazer se minha conta foi bloqueada?",
          answer: "Identifique o processo que originou o bloqueio, verifique se os valores sao impenhоrаveis e entre com peticao de desbloqueio atraves de advogado.",
          highlight: "Identifique o processo"
        }}
        relatedQuestion={{
          question: "Quanto tempo demora para desbloquear?",
          answer: "O prazo varia de 5 a 30 dias dependendo da complexidade do caso e da resposta do juiz. Com documentacao correta, pode ser mais rapido.",
          highlight: "O prazo varia"
        }}
        conditions={[
          { condition: "Bloqueio por ordem judicial", description: "Sistema SISBAJUD executa automaticamente" },
          { condition: "Penhora de valores em conta", description: "Dinheiro fica indisponivel para saque" },
          { condition: "Necessidade de peticao", description: "Advogado deve protocolar pedido de desbloqueio" },
          { condition: "Comprovacao de origem", description: "Demonstrar que valores sao impenhоrаveis" },
        ]}
      />
    </>
  )
}

function generateExpandedContent(duvida: ReturnType<typeof getDuvida>): string {
  if (!duvida) return ""
  
  const contentMap: Record<string, string> = {
    "banco-pode-bloquear-conta-sem-aviso": "Muitas pessoas se surpreendem ao descobrir que sua conta foi bloqueada sem qualquer aviso prévio. Isso acontece porque a lei determina que o bloqueio judicial seja feito de forma sigilosa, para evitar que o devedor transfira os valores antes da penhora. O banco não pode avisar porque estaria descumprindo a ordem judicial.",
    "podem-penhorar-unico-imovel": "A proteção do bem de família é uma das mais importantes garantias do devedor no Brasil. A Lei 8.009/90 estabelece que o imóvel residencial próprio da família não pode ser penhorado para pagar dívidas, garantindo que a família mantenha sua moradia mesmo em situações de inadimplência.",
    "salario-pode-ser-penhorado": "A questão da penhorabilidade do salário gera muitas dúvidas. A regra geral do CPC é clara: salários são impenhoráveis. Porém, a jurisprudência tem evoluído para permitir exceções em casos de devedores com alta renda, aplicando o princípio da proporcionalidade.",
    "pix-pode-ser-penhorado": "Com a popularização do PIX, muitas pessoas se perguntam se valores recebidos por essa modalidade podem ser penhorados. A resposta é sim, mas o que importa não é o meio de transferência e sim a origem do dinheiro.",
    "carro-financiado-pode-ser-penhorado": "Veículos financiados têm uma característica especial: pertencem ao banco até a quitação do financiamento (alienação fiduciária). Isso afeta diretamente a possibilidade de penhora por outros credores.",
  }
  
  return contentMap[duvida.slug] || `Esta é uma dúvida muito comum entre pessoas que enfrentam processos de execução. Entender como funciona o sistema jurídico brasileiro nesse aspecto é fundamental para proteger seus direitos.`
}

function generateLegalContext(duvida: ReturnType<typeof getDuvida>): string {
  if (!duvida) return ""
  
  if (duvida.cluster === "legal") {
    return "O Código de Processo Civil e outras leis específicas regulam essa questão de forma detalhada. É importante conhecer a legislação para saber exatamente quais são seus direitos e como exercê-los."
  }
  
  if (duvida.cluster === "banking") {
    return "As regras sobre bloqueios e penhoras bancárias são definidas pelo CPC e regulamentadas pelo Banco Central. Os bancos devem cumprir ordens judiciais, mas você tem direito de contestar bloqueios indevidos."
  }
  
  return "A legislação brasileira equilibra o direito do credor de cobrar suas dívidas com a proteção da dignidade do devedor. Conhecer esses limites é essencial."
}

function generateWhatToDo(duvida: ReturnType<typeof getDuvida>): string {
  if (!duvida) return ""
  
  if (duvida.intent === "transactional" || duvida.cluster === "defense") {
    return "Diante dessa situacao, o mais importante e agir rapidamente. Quanto antes voce buscar orientacao especializada, maiores as chances de proteger seus direitos e encontrar a melhor solucao."
  }
  
  return "Se voce esta passando por essa situacao ou tem duvidas sobre seu caso especifico, nossa equipe de especialistas pode ajudar. Oferecemos uma analise gratuita para entender sua situacao e orientar sobre os proximos passos."
}
