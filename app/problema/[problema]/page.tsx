import { Metadata } from "next"
import Link from "next/link"
import { SimuladorDivida } from "@/components/simulador/simulador-divida"
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  Shield,
  Zap
} from "lucide-react"
import { notFound } from "next/navigation"

import { FormCTA } from "@/components/sections/form-cta"
import problemasData from "@/data/problemas-especificos.json"
import tiposData from "@/data/tipos-divida.json"
import empresasData from "@/data/empresas.json"

const WHATSAPP = "5511925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

interface PageProps {
  params: Promise<{ problema: string }>
}

const CONTEUDO_PROBLEMAS: Record<string, {
  titulo: string
  subtitulo: string
  urgente: boolean
  tempoResposta: string
  introducao: string
  oquee: string
  consequencias: string[]
  solucoes: { titulo: string; descricao: string }[]
  prazos: { situacao: string; prazo: string }[]
  faq: { p: string; r: string }[]
}> = {
  "carro-apreendido": {
    titulo: "Carro Apreendido",
    subtitulo: "Recupere seu veículo em até 24 horas",
    urgente: true,
    tempoResposta: "24 horas",
    introducao: "Seu carro foi apreendido por dívida de financiamento? Você tem direitos e pode recuperar o veículo mesmo após a apreensão. Atuamos com medidas judiciais urgentes para devolver seu bem.",
    oquee: "A apreensão de veículo ocorre quando o financiado deixa de pagar as parcelas e o banco ou financeira aciona a justiça para retomar o bem. Isso acontece por meio de uma ação de busca e apreensão.",
    consequencias: [
      "Perda imediata do uso do veículo",
      "Cobrança do saldo devedor total",
      "Veículo pode ir a leilão em poucos dias",
      "Dívida pode continuar mesmo após leilão",
      "Negativação no SPC/Serasa",
    ],
    solucoes: [
      { titulo: "Embargos à Execução", descricao: "Contestamos a apreensão com base em irregularidades do contrato" },
      { titulo: "Pedido de Devolução", descricao: "Entramos com ação para devolver o veículo imediatamente" },
      { titulo: "Purgação da Mora", descricao: "Pagamento das parcelas atrasadas para suspender a ação" },
      { titulo: "Negociação de Acordo", descricao: "Negociamos com o banco para reduzir o valor e devolver o carro" },
    ],
    prazos: [
      { situacao: "Apreensão há menos de 5 dias", prazo: "Alta chance de recuperação" },
      { situacao: "Veículo ainda não foi a leilão", prazo: "Possível reverter" },
      { situacao: "Leilão marcado", prazo: "Urgente - agir imediatamente" },
      { situacao: "Após leilão", prazo: "Possível contestar em alguns casos" },
    ],
    faq: [
      { p: "Posso recuperar meu carro após a apreensão?", r: "Sim, em muitos casos é possível recuperar o veículo através de medidas judiciais ou acordo com o banco." },
      { p: "Quanto tempo tenho após a apreensão?", r: "O ideal é agir nas primeiras 24-48 horas. Após isso, o veículo pode ser encaminhado para leilão." },
      { p: "Se o carro for a leilão, a dívida acaba?", r: "Não necessariamente. Se o valor do leilão não cobrir a dívida, você continua devendo a diferença." },
    ],
  },
  "conta-bloqueada": {
    titulo: "Conta Bloqueada",
    subtitulo: "Desbloqueie sua conta em até 48 horas",
    urgente: true,
    tempoResposta: "48 horas",
    introducao: "Acordou com a conta zerada? Bloqueio judicial pode ser revertido. Atuamos com petições urgentes para liberar seu dinheiro, especialmente se for salário ou verba alimentar.",
    oquee: "O bloqueio de conta bancária acontece quando um credor consegue uma ordem judicial para penhorar valores em suas contas. O sistema SISBAJUD permite bloqueios instantâneos.",
    consequencias: [
      "Impossibilidade de pagar contas",
      "Cheques devolvidos",
      "Débitos automáticos recusados",
      "Prejuízo na vida financeira",
      "Constrangimento no comércio",
    ],
    solucoes: [
      { titulo: "Petição de Desbloqueio", descricao: "Pedido urgente para liberar valores impenhoráveis (salário)" },
      { titulo: "Acordo com Credor", descricao: "Negociamos para liberar parte dos valores mediante acordo" },
      { titulo: "Substituição de Penhora", descricao: "Oferecemos outro bem como garantia para liberar a conta" },
      { titulo: "Impugnação à Penhora", descricao: "Contestamos a legalidade do bloqueio" },
    ],
    prazos: [
      { situacao: "Bloqueio de salário", prazo: "Desbloqueio em 24-72h" },
      { situacao: "Bloqueio de poupança até 40 SM", prazo: "Impenhorável por lei" },
      { situacao: "Outros valores", prazo: "Depende de negociação/ação" },
    ],
    faq: [
      { p: "Podem bloquear meu salário inteiro?", r: "Não. O salário é impenhorável. Se bloquearam, podemos pedir o desbloqueio imediato." },
      { p: "E se bloquearam minha poupança?", r: "Poupança até 40 salários mínimos é impenhorável. Podemos contestar." },
      { p: "Quanto tempo leva para desbloquear?", r: "Com petição urgente, conseguimos desbloqueio em 24 a 72 horas na maioria dos casos." },
    ],
  },
  "nome-sujo": {
    titulo: "Nome Sujo",
    subtitulo: "Limpe seu nome e volte a ter crédito",
    urgente: false,
    tempoResposta: "15 dias",
    introducao: "Ter o nome negativado no SPC ou Serasa impede financiamentos, cartões de crédito e até empregos. Ajudamos a limpar seu nome negociando dívidas com descontos de até 90%.",
    oquee: "Nome sujo é a expressão popular para negativação nos órgãos de proteção ao crédito (SPC, Serasa, Boa Vista). Isso acontece quando uma dívida não é paga e o credor registra o débito.",
    consequencias: [
      "Recusa de crédito em lojas e bancos",
      "Impossibilidade de financiar bens",
      "Dificuldade para alugar imóveis",
      "Problemas em processos seletivos",
      "Constrangimento em compras",
    ],
    solucoes: [
      { titulo: "Negociação de Dívida", descricao: "Acordo com desconto para quitar e limpar o nome" },
      { titulo: "Contestação de Negativação", descricao: "Se a dívida for indevida, pedimos exclusão" },
      { titulo: "Prescrição de Dívida", descricao: "Dívidas com mais de 5 anos podem ser prescritas" },
      { titulo: "Acordo Serasa Limpa Nome", descricao: "Utilizamos campanhas de negociação com descontos" },
    ],
    prazos: [
      { situacao: "Após pagar acordo", prazo: "Nome limpo em 5 dias úteis" },
      { situacao: "Dívida indevida", prazo: "Exclusão em 5-10 dias" },
      { situacao: "Dívida prescrita", prazo: "Exclusão imediata" },
    ],
    faq: [
      { p: "Quanto tempo leva para limpar o nome?", r: "Após o pagamento do acordo, o credor tem 5 dias úteis para remover a negativação." },
      { p: "Dívida antiga sai do SPC automaticamente?", r: "Após 5 anos, a negativação é excluída automaticamente, mas a dívida pode continuar existindo." },
      { p: "Posso contestar uma dívida que não reconheço?", r: "Sim. Se você não reconhece a dívida, podemos entrar com ação para excluir a negativação." },
    ],
  },
  "juros-abusivos": {
    titulo: "Juros Abusivos",
    subtitulo: "Reduza sua dívida contestando juros ilegais",
    urgente: false,
    tempoResposta: "30 dias",
    introducao: "Juros de cartão de crédito acima de 400% ao ano? Cheque especial cobrando taxas absurdas? Você pode contestar e reduzir significativamente o valor da sua dívida.",
    oquee: "Juros abusivos são taxas de juros que excedem a média de mercado ou os limites legais. O CDC (Código de Defesa do Consumidor) proíbe a cobrança de juros excessivos.",
    consequencias: [
      "Dívida que nunca para de crescer",
      "Parcelas impagáveis",
      "Ciclo de endividamento",
      "Comprometimento total da renda",
    ],
    solucoes: [
      { titulo: "Revisão de Contrato", descricao: "Análise do contrato para identificar cláusulas abusivas" },
      { titulo: "Ação Revisional", descricao: "Processo judicial para reduzir juros à taxa média de mercado" },
      { titulo: "Recálculo da Dívida", descricao: "Refazemos os cálculos com juros legais" },
      { titulo: "Negociação com Base Legal", descricao: "Usamos as irregularidades para conseguir descontos" },
    ],
    prazos: [
      { situacao: "Cartão de crédito", prazo: "Redução de até 70% da dívida" },
      { situacao: "Cheque especial", prazo: "Redução de até 80% da dívida" },
      { situacao: "Financiamento", prazo: "Redução de até 50% das parcelas" },
    ],
    faq: [
      { p: "Como sei se os juros são abusivos?", r: "Compare a taxa cobrada com a média do Banco Central. Se for muito acima, provavelmente é abusiva." },
      { p: "Posso contestar juros de dívida antiga?", r: "Sim, mesmo dívidas antigas podem ter os juros revisados judicialmente." },
      { p: "Se eu contestar, vou parar de ser cobrado?", r: "Podemos pedir liminar para suspender as cobranças enquanto a ação tramita." },
    ],
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { problema } = await params
  const conteudo = CONTEUDO_PROBLEMAS[problema]
  
  if (!conteudo) {
    return { title: "Problema não encontrado" }
  }

  return {
    title: `${conteudo.titulo} - Como Resolver | Quitadoc`,
    description: `${conteudo.introducao.substring(0, 155)}...`,
    openGraph: {
      title: `Como Resolver ${conteudo.titulo}`,
      description: conteudo.subtitulo,
    },
  }
}

export async function generateStaticParams() {
  const problemas = problemasData as { slug: string }[]
  return problemas.slice(0, 20).map((p) => ({ problema: p.slug }))
}

export default async function ProblemaPage({ params }: PageProps) {
  const { problema } = await params
  const conteudo = CONTEUDO_PROBLEMAS[problema]
  const problemaData = (problemasData as any[]).find(p => p.slug === problema)

  if (!conteudo) {
    notFound()
  }

  const tiposRelacionados = problemaData?.tipos || []

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className={`py-12 lg:py-20 ${conteudo.urgente ? "bg-destructive" : "bg-primary"} text-white`}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {conteudo.urgente && (
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium mb-6">
                  <Zap className="h-4 w-4" />
                  URGENTE - Atendimento Prioritario
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {conteudo.titulo}
              </h1>
              <p className="mt-4 text-xl text-white/90">{conteudo.subtitulo}</p>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">{conteudo.introducao}</p>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>Resposta em {conteudo.tempoResposta}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>98.7% de sucesso</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`URGENTE: Preciso de ajuda com ${conteudo.titulo}`)}`}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Urgente
                </a>
                <a href={`tel:${WHATSAPP}`} className="flex items-center justify-center gap-2 rounded-full bg-white/20 px-6 py-3 font-semibold">
                  <Phone className="h-5 w-5" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <SimuladorDivida />
            </div>
          </div>
        </div>
      </section>

      {/* O que e */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">O que e {conteudo.titulo}?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{conteudo.oquee}</p>
          </div>
        </div>
      </section>

      {/* Consequencias */}
      <section className="py-16 lg:py-24 bg-destructive/5">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            <AlertTriangle className="h-8 w-8 text-destructive inline mr-3" />
            Consequencias se nao agir
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conteudo.consequencias.map((c, i) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-destructive/20">
                <p className="text-foreground">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solucoes */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            <CheckCircle2 className="h-8 w-8 text-success inline mr-3" />
            Como Podemos Ajudar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {conteudo.solucoes.map((s, i) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-2">{s.titulo}</h3>
                <p className="text-muted-foreground">{s.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prazos */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Prazos e Expectativas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {conteudo.prazos.map((p, i) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <p className="text-sm text-muted-foreground mb-2">{p.situacao}</p>
                <p className="font-semibold text-primary">{p.prazo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Duvidas Frequentes</h2>
          <div className="max-w-3xl space-y-4">
            {conteudo.faq.map((item, i) => (
              <details key={i} className="group p-6 rounded-xl bg-card border border-border">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {item.p}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-muted-foreground">{item.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Links Relacionados */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Veja tambem</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tiposRelacionados.slice(0, 3).map((tipoSlug: string) => {
              const tipo = (tiposData as any[]).find(t => t.slug === tipoSlug)
              if (!tipo) return null
              return (
                <Link key={tipoSlug} href={`/negociar-divida/${tipoSlug}`} className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors">
                  <p className="font-medium text-primary">Negociar {tipo.nome}</p>
                </Link>
              )
            })}
            <Link href="/simulador" className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors">
              <p className="font-medium text-primary">Simulador de Divida</p>
            </Link>
            <Link href="/negociar-divida" className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors">
              <p className="font-medium text-primary">Todos os Tipos de Divida</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 lg:py-24 ${conteudo.urgente ? "bg-destructive" : "bg-primary"} text-white`}>
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {conteudo.urgente ? "Nao espere mais - cada hora conta!" : "Resolva seu problema agora"}
          </h2>
          <p className="text-white/80 mb-8">Atendimento {conteudo.urgente ? "urgente" : "especializado"} em {conteudo.tempoResposta}</p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Preciso de ajuda com ${conteudo.titulo}`)}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white text-lg"
          >
            <MessageCircle className="h-6 w-6" />
            Falar com Especialista Agora
          </a>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se seu caso ainda tem solução"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu caso agora"
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
                subheading="Avaliação em 30 segundos."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>
    </div>
  )
}
