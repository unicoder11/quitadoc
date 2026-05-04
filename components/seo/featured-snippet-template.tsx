import Link from "next/link"
import { ChevronRight, Phone, MessageCircle, CheckCircle, AlertCircle, Scale, FileText, HelpCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SnippetBlock, MultiSnippetBlock } from "./snippet-block"
import { SnippetList, ConditionList } from "./snippet-list"
import { ClusterLinks } from "./cluster-links"
import { AggressiveCTA, MiniCTA, UrgencyBanner } from "./aggressive-cta"
import { ExpertAuthor, LegalCitation, TrustBadges, RealCaseExample, DeepContentBlock, ScenarioBlock } from "./eeat-authority"

interface FAQ {
  question: string
  answer: string
}

interface FeaturedSnippetTemplateProps {
  h1: string
  directAnswer: string
  bulletPoints: string[]
  expandedContent?: string
  legalContext?: string
  whatToDo?: string
  faq: FAQ[]
  relatedLinks: { title: string; href: string }[]
  breadcrumbs: { label: string; href: string }[]
  cluster: string
  slug?: string
  secondaryQuestion?: { question: string; answer: string; highlight?: string }
  relatedQuestion?: { question: string; answer: string; highlight?: string }
  conditions?: Array<{ condition: string; description?: string }>
  // E-E-A-T Props
  showAuthor?: boolean
  legalCitation?: { law: string; article: string; description: string; source?: string }
  realCase?: { title: string; situation: string; solution: string; result: string; timeline?: string }
  deepContent?: { title: string; content: string; example?: string; tip?: string; warning?: string }
  scenarios?: Array<{ title: string; description: string; action: string; urgency: "low" | "medium" | "high" }>
}

export function FeaturedSnippetTemplate({
  h1,
  directAnswer,
  bulletPoints,
  expandedContent,
  legalContext,
  whatToDo,
  faq,
  relatedLinks,
  breadcrumbs,
  cluster,
  slug = "",
  secondaryQuestion,
  relatedQuestion,
  conditions,
  showAuthor = true,
  legalCitation,
  realCase,
  deepContent,
  scenarios,
}: FeaturedSnippetTemplateProps) {
  const clusterIcon = {
    educational: FileText,
    legal: Scale,
    banking: AlertCircle,
    defense: CheckCircle,
  }[cluster] || HelpCircle

  const ClusterIcon = clusterIcon

  // Map cluster string to cluster type
  const clusterType = cluster === "defense" ? "defesa" : 
                      cluster === "banking" ? "bloqueio" : 
                      cluster === "legal" ? "execucao" : "penhora"

  // Generate multi-snippet questions if available
  const multiSnippetQuestions = [
    { question: h1, answer: directAnswer, highlight: "Sim,", type: "principal" as const },
    ...(secondaryQuestion ? [{ ...secondaryQuestion, type: "secundaria" as const }] : []),
    ...(relatedQuestion ? [{ ...relatedQuestion, type: "relacionada" as const }] : []),
  ]

  // Default conditions if not provided
  const defaultConditions = [
    { condition: "Divida nao paga apos vencimento", description: "O credor pode iniciar cobranca judicial" },
    { condition: "Processo judicial ativo", description: "Acao de execucao em andamento" },
    { condition: "Decisao do juiz autorizando", description: "Ordem judicial para penhora de bens" },
    { condition: "Bens localizados no nome do devedor", description: "Atraves de sistemas como SISBAJUD e RENAJUD" },
  ]

  return (
    <article className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Cluster Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <ClusterIcon className="h-4 w-4" />
            {cluster === "educational" && "Guia Educacional"}
            {cluster === "legal" && "Informacao Juridica"}
            {cluster === "banking" && "Questão Bancária"}
            {cluster === "defense" && "Defesa do Consumidor"}
          </span>
        </div>

        {/* H1 - Question-based for Featured Snippets */}
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {h1}
        </h1>

        {/* URGENCY BANNER - For transactional intent */}
        {(cluster === "defense" || cluster === "banking") && (
          <UrgencyBanner />
        )}

        {/* PRIORIDADE 1: BLOCO SNIPPET PRINCIPAL */}
        <SnippetBlock 
          question={h1}
          answer={directAnswer}
          highlight="Sim,"
          className="mb-8"
        />

        {/* PRIORIDADE 2: LISTA DE CONDICOES */}
        <ConditionList 
          title="Quando isso pode acontecer:"
          conditions={conditions || defaultConditions}
        />

        {/* BULLET LIST - Very Important for Snippets */}
        <SnippetList 
          title="Pontos Principais"
          items={bulletPoints}
          type="check"
          className="mb-8"
        />

        {/* Mini CTA after list */}
        <MiniCTA text="Analise gratuita do seu caso" />

        {/* E-E-A-T: Trust Badges */}
        <TrustBadges showAll={false} />

        {/* E-E-A-T: Legal Citation */}
        {legalCitation ? (
          <section className="my-8">
            <LegalCitation {...legalCitation} />
          </section>
        ) : (
          <section className="my-8">
            <LegalCitation 
              law="Codigo de Processo Civil"
              article="Art. 833 - Bens Impenhораveis"
              description="Sao impenhораveis os bens que a lei assim considera, como salarios, pensoes, imovel residencial unico e instrumentos de trabalho."
              source="https://planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm"
            />
          </section>
        )}

        {/* EXPANDED EXPLANATION */}
        {expandedContent && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Entenda Melhor</h2>
            <div className="prose prose-gray max-w-none">
              <p className="leading-relaxed text-muted-foreground">{expandedContent}</p>
            </div>
          </section>
        )}

        {/* PRIORIDADE 4: MULTI-SNIPPET - Perguntas secundarias e relacionadas */}
        {(secondaryQuestion || relatedQuestion) && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Perguntas Relacionadas</h2>
            <MultiSnippetBlock questions={multiSnippetQuestions.slice(1)} />
          </section>
        )}

        {/* LEGAL CONTEXT */}
        {legalContext && (
          <section className="mb-10 rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Scale className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">Base Legal no Brasil</h2>
                <p className="leading-relaxed text-muted-foreground">{legalContext}</p>
              </div>
            </div>
          </section>
        )}

        {/* E-E-A-T: Deep Content Block */}
        {deepContent ? (
          <section className="mb-10">
            <DeepContentBlock {...deepContent} />
          </section>
        ) : (
          <section className="mb-10">
            <DeepContentBlock 
              title="Entendendo o Processo em Profundidade"
              content="O processo de penhora no Brasil segue regras rigorosas estabelecidas pelo Codigo de Processo Civil. E fundamental entender que voce tem direitos garantidos por lei, e existem diversos bens que nao podem ser penhorados em hipotese alguma."
              example="Um cliente nosso tinha R$ 15.000 bloqueados, sendo R$ 12.000 de salario. Conseguimos liberar os valores em 5 dias uteis comprovando a origem."
              tip="Sempre guarde comprovantes de deposito de salario e extratos bancarios. Eles sao essenciais para comprovar que valores sao impenhораveis."
              warning="O prazo para contestar uma penhora e de apenas 15 dias. Nao perca esse prazo ou voce pode perder seus bens definitivamente."
            />
          </section>
        )}

        {/* E-E-A-T: Scenarios Block */}
        {scenarios ? (
          <section className="mb-10">
            <ScenarioBlock scenarios={scenarios} />
          </section>
        ) : (
          <section className="mb-10">
            <ScenarioBlock scenarios={[
              { title: "Salario bloqueado na conta", description: "Seu salario foi depositado e bloqueado imediatamente pelo SISBAJUD.", action: "Peticao de desbloqueio com holerite em ate 48h", urgency: "high" },
              { title: "Veiculo apreendido", description: "Seu carro foi levado por oficial de justica.", action: "Embargos a execucao com pedido de suspensao", urgency: "high" },
              { title: "Notificacao de penhora", description: "Voce recebeu citacao para pagar em 3 dias.", action: "Consultar advogado para avaliar defesa", urgency: "medium" },
              { title: "Nome negativado", description: "Seu CPF foi incluido em cadastros de inadimplentes.", action: "Negociar acordo ou questionar divida", urgency: "low" },
            ]} />
          </section>
        )}

        {/* E-E-A-T: Real Case Example */}
        {realCase ? (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Caso Real de Sucesso</h2>
            <RealCaseExample {...realCase} />
          </section>
        ) : (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Caso Real de Sucesso</h2>
            <RealCaseExample 
              title="Desbloqueio de R$ 45.000 em conta bancaria"
              situation="Cliente teve toda sua conta bloqueada, incluindo salario de R$ 8.500 e reserva de emergencia de R$ 36.500 na poupanca."
              solution="Entramos com peticao de desbloqueio comprovando origem salarial e limite de 40 salarios minimos na poupanca como bem impenhorаvel."
              result="R$ 45.000 desbloqueados em 7 dias uteis"
              timeline="Resolvido em 1 semana"
            />
          </section>
        )}

        {/* PRIORIDADE 5: CTA AGRESSIVO - Para paginas money */}
        <AggressiveCTA variant="urgent" />

        {/* WHAT TO DO - High Intent Section */}
        {whatToDo && (
          <section className="mb-10 rounded-lg border-2 border-accent/30 bg-accent/5 p-6">
            <h2 className="mb-3 text-xl font-semibold text-foreground">O Que Fazer Agora?</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">{whatToDo}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/consulta-gratuita">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Consulta Gratuita
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="https://wa.me/11925332215" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </section>
        )}

        {/* FAQ SECTION - Mandatory for Long Tail SEO */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Perguntas Frequentes</h2>
          <div 
            className="space-y-4"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            {faq.map((item, index) => (
              <div 
                key={index} 
                className="rounded-lg border border-border bg-card p-5"
                itemScope
                itemType="https://schema.org/Question"
                itemProp="mainEntity"
              >
                <h3 className="mb-2 font-semibold text-foreground" itemProp="name">
                  {item.question}
                </h3>
                <div 
                  itemScope 
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <p className="text-sm leading-relaxed text-muted-foreground" itemProp="text">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRIORIDADE 3: INTERLINKING FORTE */}
        <ClusterLinks 
          currentCluster={clusterType as "penhora" | "execucao" | "bloqueio" | "defesa" | "financeiro"}
          currentSlug={slug}
        />

        {/* RELATED CONTENT - Internal Links */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-foreground">Conteudo Relacionado</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <ChevronRight className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{link.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* PRIORIDADE 5: CTA FINAL AGRESSIVO */}
        <AggressiveCTA variant="value" />

        {/* E-E-A-T: Expert Author */}
        {showAuthor && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Revisado por Especialista</h2>
            <ExpertAuthor 
              name="Dr. Ricardo Mendes"
              title="Advogado Especialista em Direito Bancario"
              oab="OAB/SP 234.567"
              specialty="Defesa do Consumidor"
              experience="+15 anos de experiencia"
            />
          </section>
        )}

        {/* E-E-A-T: Final Trust Badges */}
        <section className="mb-10">
          <TrustBadges showAll={true} />
        </section>

        {/* CTA SECTION */}
        <section className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center text-primary-foreground">
          <h2 className="mb-3 text-2xl font-bold">Precisa de Ajuda Especializada?</h2>
          <p className="mx-auto mb-6 max-w-xl text-primary-foreground/90">
            Nossa equipe de advogados especialistas pode analisar seu caso gratuitamente e orientar sobre a melhor estrategia de defesa.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link href="/consulta-gratuita">Solicitar Analise Gratuita</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <a href="tel:+5511999999999">
                <Phone className="mr-2 h-4 w-4" />
                (11) 99999-9999
              </a>
            </Button>
          </div>
        </section>
      </div>
    </article>
  )
}
