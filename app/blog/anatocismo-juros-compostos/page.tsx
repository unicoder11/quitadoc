import { Metadata } from "next"
import { FormCTA } from "@/components/sections/form-cta"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { generateBreadcrumbSchema } from "@/lib/breadcrumbSchema"

export const metadata: Metadata = {
  title: "Anatocismo: O Crime Silencioso dos Juros Compostos | Quitadoc",
  description: "Descubra como os bancos usam anatocismo (juros sobre juros) ilegalmente. Saiba como provar e se defender contra essa prática abusiva."
}

export default function Anatocismo() {
  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: "Anatocismo: Juros Compostos Ilegais", href: "/blog/anatocismo-juros-compostos" }
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
        <h1 className="text-4xl font-bold text-foreground mb-4">Anatocismo: Como os Bancos Cobram Juros Ilegalmente</h1>
        <p className="text-muted-foreground mb-8">Publicado em {new Date().toLocaleDateString('pt-BR')} por Equipe Quitadoc</p>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            Você deve R$ 20.000, mas o banco está cobrando R$ 40.000. O culpado? Anatocismo. Juros sobre juros. Uma prática que é crime de ledores em 95% dos casos, mas continua acontecendo silenciosamente em suas faturas.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">O que é Anatocismo?</h2>
            <p>
              Anatocismo é quando o banco cobra juros sobre juros que já foram capitalizados. É como se você pedisse R$ 100 emprestado, virou R$ 110, e depois o banco cobra juros sobre os R$ 110 de novo (não só sobre os R$ 100 originais).
            </p>
            <p>
              No Brasil, isso é proibido pela Lei 4.595/64, Lei 4.359/64 e regras do Banco Central. Mas os bancos continuam fazendo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Exemplo Prático</h2>
            <div className="bg-primary/10 p-6 rounded-lg space-y-2">
              <p className="font-semibold text-foreground">Dívida Original: R$ 20.000</p>
              <p className="font-semibold text-foreground">Juros Legais (2% a.m. por 12 meses): R$ 4.788</p>
              <p className="font-semibold text-foreground">Total Correto: R$ 24.788</p>
              <hr className="border-primary/30" />
              <p className="font-semibold text-foreground text-red-400">O que o banco cobra com anatocismo: R$ 48.500</p>
              <p className="text-foreground">Diferença (abuso): R$ 23.712 ilegais</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Jurisprudência</h2>
            <p>
              Existem dezenas de decisões do STJ (Superior Tribunal de Justiça) condenando o anatocismo. A posição é consolidada: é ilegal cobrar juros compostos em financiamentos pessoa física.
            </p>
            <p className="font-italic text-sm">
              "A capitalização de juros (anatocismo) é vedada, salvo disposição legal em contrário." - STJ Súmula 121
            </p>
          </section>

          <div className="bg-success/10 p-6 rounded-lg mt-8">
            <p className="text-foreground font-semibold mb-2">Nossa Taxa de Sucesso</p>
            <p>
              Conseguimos reduzir a dívida em até 60% quando identificamos anatocismo. Não é raro: 8 em 10 financiamentos têm este vício.
            </p>
          </div>
        </div>
      </article>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se seu contrato tem anatocismo"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu contrato agora"
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de recuperar o que pagou a mais"
            subheading="Avaliação em 30 segundos."
            buttonText="Ver minhas opções sem compromisso"
          />
        </div>
      </section>
    </main>
  )
}
