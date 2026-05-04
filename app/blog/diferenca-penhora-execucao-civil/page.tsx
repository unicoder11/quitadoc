import { Metadata } from "next"
import { FormCTA } from "@/components/sections/form-cta"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { generateBreadcrumbSchema } from "@/lib/breadcrumbSchema"

export const metadata: Metadata = {
  title: "Penhora vs Execução: Qual a Diferença? | Quitadoc",
  description: "Entenda a diferença entre penhora e execução civil. Saiba como cada processo funciona e como se defender em cada situação."
}

export default function PenhoraExecução() {
  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: "Penhora vs Execução Civil", href: "/blog/diferenca-penhora-execucao-civil" }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumb items={breadcrumbs} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Qual é a Diferença Entre Penhora e Execução?</h1>
        <p className="text-muted-foreground mb-8">Publicado em {new Date().toLocaleDateString('pt-BR')} por Equipe Quitadoc</p>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            Muitas pessoas usam os termos "penhora" e "execução" como sinônimos. Mas são conceitos diferentes. Entender a diferença pode ser a chave para sua defesa.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Definições Claras</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Penhora</h3>
            <p>
              Penhora é o ato de apreender ou bloquear um bem específico para garantir o pagamento de uma dívida. É uma medida de garantia, não de punição. Exemplos: bloqueio de conta bancária, apreensão de veículo, bloqueio de imóvel.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Execução</h3>
            <p>
              Execução é o processo judicial completo para cobrar uma dívida. A penhora é apenas uma PARTE da execução. Na execução, o juiz autoriza todas as medidas necessárias para cobrar, incluindo penhoras, bloqueios e leilões.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Relação Entre os Conceitos</h2>
            <p>
              Pense assim:
            </p>
            <div className="bg-primary/10 p-6 rounded-lg">
              <p className="font-mono">Execução = Processo Judicial (Todo)</p>
              <p className="font-mono">Penhora = Medida dentro da Execução (Parte)</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Defesa em Cada Situação</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Se você recebeu penhora:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm mt-2">
                  <li>Identifique se é abusiva</li>
                  <li>Comprove valores impenhóráveis</li>
                  <li>Peça desbloqueio imediato</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <p className="font-semibold text-foreground">Se você foi executado:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm mt-2">
                  <li>Apresente defesa no prazo (15 dias)</li>
                  <li>Questione a validade do título</li>
                  <li>Negocie antes que bens sejam leiloados</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-success/10 p-6 rounded-lg mt-8">
            <p className="text-foreground font-semibold mb-2">Ponto-chave</p>
            <p>
              Entender se está sofrendo uma penhora isolada ou dentro de um processo de execução muda completamente sua estratégia de defesa. Este é um detalhe que 90% dos devedores não entendem corretamente.
            </p>
          </div>
        </div>
      </article>

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
    </main>
  )
}
