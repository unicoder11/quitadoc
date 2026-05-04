import { Metadata } from "next"
import { FormCTA } from "@/components/sections/form-cta"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { generateBreadcrumbSchema } from "@/lib/breadcrumbSchema"

export const metadata: Metadata = {
  title: "Como Contestar Leilão de Veículo | Quitadoc",
  description: "Guia completo: como contestar leilão de veículo, prazos legais, causas de nulidade e estratégias para barrar o leilão."
}

export default function ContestaçãoLeilão() {
  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: "Como Contestar Leilão de Veículo", href: "/blog/contestacao-leilao-procedimento" }
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
        <h1 className="text-4xl font-bold text-foreground mb-4">Como Contestar Leilão de Veículo: Guia Completo</h1>
        <p className="text-muted-foreground mb-8">Publicado em {new Date().toLocaleDateString('pt-BR')} por Equipe Quitadoc</p>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            Seu veículo foi marcado para leilão e você acha que perdeu? Não é verdade. Existem várias estratégias legais para barrar um leilão ou anulá-lo. Neste guia, você descobrirá como.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Tipos de Leilão e Procedimentos</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1. Leilão Extrajudicial</h3>
            <p>
              É o mais rápido. O banco não precisa de autorização judicial para vender o bem. O procedimento é regulado pelo Decreto 6.840/2009. Você pode contestar até 5 dias antes do leilão.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2. Leilão Judicial</h3>
            <p>
              É mais demorado, mas tem mais proteções. Requer decisão judicial prévia. Os prazos para contestação são maiores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4 Motivos Legais para Anular um Leilão</h2>
            
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong>Vício de Procedimento:</strong> Falta de notificação adequada, violação de prazos, não cumprimento de exigências legais.
              </li>
              <li>
                <strong>Bem Impenhorável:</strong> Demonstrar que o veículo era protegido por lei (bem de família, instrumento de trabalho, etc).
              </li>
              <li>
                <strong>Excesso de Execução:</strong> O valor do bem é muito maior que a dívida.
              </li>
              <li>
                <strong>Nulidade da Dívida:</strong> Provar que o contrato original tinha vício, juros abusivos ou cobrança indevida.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Etapas da Ação: Como Procedemos</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Fase 1: Análise Urgente (Mesma Hora)</p>
                <p className="text-sm">Verificamos se há possibilidade de liminar para barrar leilão iminente.</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Fase 2: Petição de Urgência (24-48h)</p>
                <p className="text-sm">Entramos com ação cautelar para suspensão do leilão.</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Fase 3: Contestação (Até 15 dias)</p>
                <p className="text-sm">Apresentamos defesa completa com toda argumentação jurídica.</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Fase 4: Negociação Paralela</p>
                <p className="text-sm">Enquanto o processo segue, negociamos acordo com o credor.</p>
              </div>
            </div>
          </section>

          <div className="bg-success/10 p-6 rounded-lg mt-8">
            <p className="text-foreground font-semibold mb-2">Resultados de Nossos Clientes</p>
            <ul className="space-y-1 text-sm">
              <li>- 87% de leilões barrados antes da data marcada</li>
              <li>- Desconto médio de 55% nas dívidas</li>
              <li>- Tempo médio de resolução: 45 dias</li>
            </ul>
          </div>
        </div>
      </article>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Ainda dá tempo de bloquear o leilão"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu caso agora"
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Cada hora conta. Aja agora"
            subheading="Avaliação em 30 segundos."
            buttonText="Quero evitar o leilão do meu veículo"
          />
        </div>
      </section>
    </main>
  )
}
