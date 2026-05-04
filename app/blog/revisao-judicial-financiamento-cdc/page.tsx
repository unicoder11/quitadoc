import { Metadata } from "next"
import { FormCTA } from "@/components/sections/form-cta"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { generateBreadcrumbSchema } from "@/lib/breadcrumbSchema"

export const metadata: Metadata = {
  title: "Revisão Judicial de Financiamento | Quitadoc",
  description: "Como revisar financiamento de carro ou imóvel judicialmente. Reduza ou cancele juros abusivos com base no CDC (Código de Defesa do Consumidor)."
}

export default function RevisãoFinanciamento() {
  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: "Revisão de Financiamento pelo CDC", href: "/blog/revisao-judicial-financiamento-cdc" }
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
        <h1 className="text-4xl font-bold text-foreground mb-4">Como Revisar um Financiamento Judicialmente</h1>
        <p className="text-muted-foreground mb-8">Publicado em {new Date().toLocaleDateString('pt-BR')} por Equipe Quitadoc</p>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            Você está pagando juros acima do mercado? Tem cláusulas abusivas no seu contrato? Pode revisar judicialmente. Este artigo explica como.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Bases Legais para Revisão</h2>
            <p>
              A revisão de financiamento se apoia em:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li><strong>CDC (Lei 8.078/90):</strong> Artigo 6º garante direito a revisão de cláusulas abusivas</li>
              <li><strong>CPC (Lei 13.105/15):</strong> Ação de revisão contratual é cabível</li>
              <li><strong>Jurisprudência STJ:</strong> Consolidada quanto a juros abusivos</li>
              <li><strong>Normas do Banco Central:</strong> Limites de juros para pessoa física</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Vícios Comuns em Contratos</h2>
            <ul className="space-y-3">
              <li>
                <strong>Juros Acima do Mercado:</strong> Se você paga 25% e o mercado oferece 8-12%, há abuso
              </li>
              <li>
                <strong>Anatocismo:</strong> Juros sobre juros (já falamos sobre isso)
              </li>
              <li>
                <strong>Taxas Ocultas:</strong> Seguro obrigatório, taxa de processamento não informadas
              </li>
              <li>
                <strong>Falta de Transparência:</strong> Contrato que não deixa claro os custos totais
              </li>
              <li>
                <strong>Cláusulas Abusivas:</strong> Prazos desproporcionais, penalidades excessivas
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Processo de Revisão</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Fase 1: Análise Contratual (1-2 dias)</p>
                <p className="text-sm">Analisamos cada detalhe do contrato para identificar abusos</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Fase 2: Cálculo de Impacto</p>
                <p className="text-sm">Calculamos quanto você pode economizar com a revisão</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Fase 3: Negociação Extrajudicial</p>
                <p className="text-sm">Tentamos resolver com o banco antes de processar</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Fase 4: Ação Judicial (se necessário)</p>
                <p className="text-sm">Pedimos revisão, redução e devolução de valores pagos indevidamente</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Resultados Típicos</h2>
            <div className="bg-success/10 p-6 rounded-lg">
              <p className="font-semibold text-foreground mb-3">Economias Típicas de Nossos Clientes:</p>
              <ul className="space-y-2 text-sm">
                <li>- Redução de juros: 30-50%</li>
                <li>- Reembolso de valores pagos indevidamente: até R$ 50.000</li>
                <li>- Prazo médio até acordo: 60-90 dias</li>
                <li>- Taxa de sucesso: 87%</li>
              </ul>
            </div>
          </section>

          <div className="bg-accent/10 p-6 rounded-lg mt-8">
            <p className="text-foreground font-semibold mb-2">Próximo Passo</p>
            <p>
              Se você tem um financiamento, reserve 10 minutos para analisarmos seu contrato. Pode haver economia significativa esperando por você.
            </p>
          </div>
        </div>
      </article>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se pode revisar seu financiamento"
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
