import { Metadata } from "next"
import Link from "next/link"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"
import { Calendar, Clock, ArrowRight, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "O Que e Busca e Apreensao de Veiculo? Guia Completo 2025",
  description: "Entenda como funciona a busca e apreensao, seus direitos, prazos legais e como se defender. Guia atualizado com a legislacao de 2025.",
  keywords: ["o que e busca e apreensao", "busca e apreensao veiculo", "como funciona busca apreensao", "defesa busca apreensao", "prazos busca apreensao"],
  openGraph: {
    type: "article",
    title: "O Que e Busca e Apreensao de Veiculo? Guia Completo 2025",
    description: "Entenda como funciona a busca e apreensao, seus direitos, prazos legais e como se defender.",
    images: ["/og-busca-apreensao-guia.jpg"],
    publishedTime: "2025-01-15T00:00:00Z",
    modifiedTime: "2025-01-15T00:00:00Z",
    authors: ["Quitadoc"],
    tags: ["busca e apreensao", "alienacao fiduciaria", "defesa veicular"]
  },
  alternates: {
    canonical: "https://www.quitadoc.com.br/blog/o-que-e-busca-e-apreensao"
  }
}

const tableOfContents = [
  { id: "introducao", title: "Introducao" },
  { id: "o-que-e", title: "O Que e Busca e Apreensao" },
  { id: "alienacao-fiduciaria", title: "Alienacao Fiduciaria" },
  { id: "quando-banco-pode", title: "Quando o Banco Pode Pedir" },
  { id: "processo-passo-passo", title: "Processo Passo a Passo" },
  { id: "prazos-legais", title: "Prazos Legais" },
  { id: "seus-direitos", title: "Seus Direitos" },
  { id: "como-se-defender", title: "Como Se Defender" },
  { id: "conclusao", title: "Conclusao" },
]

const relatedPosts = [
  {
    title: "Direitos do Devedor em Financiamento",
    href: "/blog/direitos-devedor-financiamento",
    category: "Direitos"
  },
  {
    title: "Como Evitar o Leilao do Veiculo",
    href: "/blog/como-evitar-leilao-veiculo",
    category: "Dicas"
  },
  {
    title: "Prazos para Defesa em Busca e Apreensao",
    href: "/blog/prazo-defesa-busca-apreensao",
    category: "Prazos"
  },
]

export default function OQueEBuscaApreensaoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "O Que e Busca e Apreensao de Veiculo? Guia Completo 2025",
            "description": "Entenda como funciona a busca e apreensao, seus direitos, prazos legais e como se defender.",
            "image": "https://www.quitadoc.com.br/og-busca-apreensao-guia.jpg",
            "datePublished": "2025-01-15T00:00:00Z",
            "dateModified": "2025-01-15T00:00:00Z",
            "author": {
              "@type": "Organization",
              "name": "Quitadoc"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Quitadoc",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.quitadoc.com.br/logo.png"
              }
            }
          })
        }}
      />
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Blog", href: "/blog" },
          { label: "O Que e Busca e Apreensao" }
        ]} />
      </div>
      
      {/* Article Hero */}
      <section className="bg-background py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Educativo
          </span>
          <h1 className="mt-4 text-foreground">
            O Que e Busca e Apreensao de Veiculo? Guia Completo 2025
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Entenda como funciona a busca e apreensao, seus direitos, prazos legais e como se defender. 
            Guia atualizado com a legislacao de 2025.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              15 de janeiro de 2025
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              12 minutos de leitura
            </span>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="bg-background pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Sidebar - TOC */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-semibold text-foreground">Indice do Artigo</h3>
                  <nav className="mt-4">
                    <ul className="space-y-2">
                      {tableOfContents.map((item) => (
                        <li key={item.id}>
                          <a 
                            href={`#${item.id}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                {/* CTA Box */}
                <div className="rounded-xl bg-primary p-4 text-primary-foreground">
                  <h3 className="font-semibold">Precisa de Ajuda?</h3>
                  <p className="mt-2 text-sm text-primary-foreground/80">
                    Recebeu notificacao de busca e apreensao? Consulte nossos especialistas.
                  </p>
                  <Link href="/consulta-gratuita">
                    <Button className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent-light">
                      Agendar Consulta
                    </Button>
                  </Link>
                </div>
                
                {/* Related Posts */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-semibold text-foreground">Artigos Relacionados</h3>
                  <ul className="mt-4 space-y-3">
                    {relatedPosts.map((post, index) => (
                      <li key={index}>
                        <Link 
                          href={post.href}
                          className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
                          <span>{post.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
            
            {/* Article Body */}
            <article className="flex-1 max-w-3xl">
              <div className="prose prose-lg max-w-none">
                {/* Intro */}
                <section id="introducao" className="scroll-mt-24">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Se voce financiou um veiculo e esta com dificuldades para pagar as parcelas, 
                    provavelmente ja ouviu falar em <strong>busca e apreensao</strong>. Esse e um 
                    dos maiores medos de quem tem um carro financiado, mas poucos conhecem seus 
                    direitos e as formas de se defender.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Neste guia completo, vamos explicar tudo o que voce precisa saber sobre busca 
                    e apreensao de veiculo financiado: o que e, como funciona, quais sao seus 
                    direitos e, principalmente, como se defender.
                  </p>
                </section>

                {/* Warning Box */}
                <div className="my-8 rounded-xl bg-destructive/10 p-6 border-l-4 border-destructive">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
                    <div>
                      <h4 className="font-semibold text-destructive">Atencao!</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Se voce ja recebeu uma notificacao de busca e apreensao ou o oficial de 
                        justica ja foi ate sua casa, <strong>o tempo e crucial</strong>. Entre em 
                        contato imediatamente com um especialista para avaliar seu caso.
                      </p>
                    </div>
                  </div>
                </div>

                {/* O Que E */}
                <section id="o-que-e" className="scroll-mt-24 mt-12">
                  <h2 className="text-foreground">O Que e Busca e Apreensao de Veiculo</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A <strong>busca e apreensao</strong> e uma acao judicial que permite ao credor 
                    (banco ou financeira) retomar um veiculo dado em garantia quando o devedor 
                    deixa de pagar as parcelas do financiamento.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Essa acao e regulada pelo <strong>Decreto-Lei 911/69</strong>, que estabelece 
                    as regras para a alienacao fiduciaria de bens moveis. O procedimento e 
                    relativamente rapido porque o credor ja tem a propriedade do bem - voce, 
                    enquanto devedor, tem apenas a posse.
                  </p>
                </section>

                {/* Alienacao Fiduciaria */}
                <section id="alienacao-fiduciaria" className="scroll-mt-24 mt-12">
                  <h2 className="text-foreground">Entendendo a Alienacao Fiduciaria</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Quando voce financia um veiculo, o contrato geralmente preve a 
                    <strong>alienacao fiduciaria</strong> como garantia. Isso significa que:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>O <strong>banco e o proprietario</strong> do veiculo ate a quitacao total</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>Voce tem a <strong>posse direta</strong> - pode usar o carro normalmente</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>O veiculo fica com <strong>gravame</strong> no documento (restricao de venda)</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>Em caso de inadimplencia, o banco pode <strong>retomar o bem</strong> mais facilmente</span>
                    </li>
                  </ul>
                </section>

                {/* Quando o banco pode pedir */}
                <section id="quando-banco-pode" className="scroll-mt-24 mt-12">
                  <h2 className="text-foreground">Quando o Banco Pode Pedir Busca e Apreensao</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O banco pode ajuizar acao de busca e apreensao quando:
                  </p>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Ha atraso no pagamento das parcelas do financiamento</li>
                    <li>O devedor foi devidamente notificado sobre a mora (atraso)</li>
                    <li>O prazo para regularizacao nao foi cumprido</li>
                  </ul>
                  
                  {/* Info Box */}
                  <div className="my-8 rounded-xl bg-primary/5 p-6 border-l-4 border-primary">
                    <div className="flex gap-3">
                      <Info className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h4 className="font-semibold text-primary">Importante!</h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          A <strong>notificacao previa</strong> e requisito obrigatorio. Se o banco 
                          nao comprovou que voce foi notificado, a busca e apreensao pode ser anulada.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Processo Passo a Passo */}
                <section id="processo-passo-passo" className="scroll-mt-24 mt-12">
                  <h2 className="text-foreground">O Processo de Busca e Apreensao Passo a Passo</h2>
                  <div className="space-y-6">
                    <div className="rounded-lg border border-border p-4">
                      <h4 className="font-semibold text-foreground">1. Notificacao Extrajudicial</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        O banco envia carta ou notificacao informando o atraso e dando prazo para pagamento.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <h4 className="font-semibold text-foreground">2. Ajuizamento da Acao</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Nao havendo pagamento, o banco entra com acao de busca e apreensao na Justica.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <h4 className="font-semibold text-foreground">3. Concessao de Liminar</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        O juiz pode conceder liminar para apreensao imediata do veiculo, mesmo sem ouvir o devedor.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <h4 className="font-semibold text-foreground">4. Cumprimento da Liminar</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Oficial de justica vai ate seu endereco para apreender o veiculo.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <h4 className="font-semibold text-foreground">5. Prazo para Defesa</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Voce tem 5 dias apos a execucao da liminar para apresentar defesa judicial.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Prazos Legais */}
                <section id="prazos-legais" className="scroll-mt-24 mt-12">
                  <h2 className="text-foreground">Prazos Legais que Voce Precisa Conhecer</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-3 text-left font-semibold text-foreground">Situacao</th>
                          <th className="py-3 text-left font-semibold text-foreground">Prazo</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-border">
                          <td className="py-3">Defesa apos apreensao</td>
                          <td className="py-3 font-mono text-accent">5 dias</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3">Purgacao da mora (pagar e recuperar)</td>
                          <td className="py-3 font-mono text-accent">5 dias</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3">Leilao apos consolidacao</td>
                          <td className="py-3 font-mono text-accent">15-30 dias</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-3">Recurso contra sentenca</td>
                          <td className="py-3 font-mono text-accent">15 dias</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Seus Direitos */}
                <section id="seus-direitos" className="scroll-mt-24 mt-12">
                  <h2 className="text-foreground">Seus Direitos como Devedor</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Mesmo em situacao de inadimplencia, voce tem direitos protegidos pelo 
                    <strong>Codigo de Defesa do Consumidor</strong> e pela jurisprudencia dos tribunais:
                  </p>
                  <ul className="space-y-3 text-muted-foreground mt-4">
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>Direito a <strong>notificacao previa</strong> antes da acao judicial</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>Direito de <strong>purgar a mora</strong> (pagar e recuperar o veiculo)</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>Direito a <strong>revisao de clausulas abusivas</strong> do contrato</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>Direito a <strong>contestar juros acima da media</strong> de mercado</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>Direito a <strong>acompanhar o leilao</strong> e receber eventual saldo</span>
                    </li>
                  </ul>
                </section>

                {/* Como Se Defender */}
                <section id="como-se-defender" className="scroll-mt-24 mt-12">
                  <h2 className="text-foreground">Como Se Defender da Busca e Apreensao</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Existem diversas teses juridicas que podem ser utilizadas na defesa contra 
                    busca e apreensao. As principais sao:
                  </p>
                  <div className="space-y-4 mt-6">
                    <div className="rounded-lg bg-secondary p-4">
                      <h4 className="font-semibold text-foreground">Falta de Notificacao</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Se o banco nao comprovou a notificacao previa, a acao pode ser extinta.
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <h4 className="font-semibold text-foreground">Juros Abusivos</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Taxas acima da media de mercado podem ser revisadas, reduzindo a divida.
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <h4 className="font-semibold text-foreground">Capitalizacao Ilegal</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Cobranca de juros sobre juros (anatocismo) pode ser questionada.
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <h4 className="font-semibold text-foreground">Clausulas Abusivas</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Taxas e encargos nao autorizados podem ser anulados.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Conclusao */}
                <section id="conclusao" className="scroll-mt-24 mt-12">
                  <h2 className="text-foreground">Conclusao</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A busca e apreensao e uma situacao seria, mas nao significa que voce nao tem 
                    opcoes. Com a defesa adequada, e possivel <strong>cancelar a apreensao, 
                    reduzir a divida ou negociar melhores condicoes</strong> de pagamento.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    O mais importante e <strong>agir rapidamente</strong>. Os prazos sao curtos e 
                    cada dia conta. Se voce esta enfrentando essa situacao, procure ajuda 
                    especializada o quanto antes.
                  </p>
                </section>

                {/* CTA Box */}
                <div className="my-12 rounded-xl bg-accent/10 p-6 border border-accent/20">
                  <h3 className="font-bold text-foreground">Recebeu Notificacao de Busca e Apreensao?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Nossa equipe de especialistas pode analisar seu caso gratuitamente e indicar 
                    a melhor estrategia de defesa. Nao espere - o tempo e crucial.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <Link href="/consulta-gratuita">
                      <Button className="bg-accent text-accent-foreground hover:bg-accent-light">
                        Consulta Gratuita
                      </Button>
                    </Link>
                    <Link href="/cancelar-busca-apreensao">
                      <Button variant="outline">
                        Saiba Mais sobre o Servico
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      
      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se o seu caso tem solução"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Verificar se posso evitar a busca e apreensão"
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
            subheading="Avaliação em 30 segundos. Ver minhas opções sem compromisso."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>

      <CTASection 
        title="Proteja Seu Veiculo Agora"
        subtitle="Consulta gratuita com especialistas. Resposta em ate 2 horas."
      />
    </>
  )
}
