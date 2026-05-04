import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Scale, AlertCircle, CheckCircle, ChevronRight } from "lucide-react"
import { getAllGuias } from "@/lib/seo-content"
import { FormCTA } from "@/components/sections/form-cta"

export const metadata: Metadata = {
  title: "Guias Completos sobre Penhora e Execução Judicial | Quitadoc",
  description: "Guias completos e atualizados sobre penhora, execução judicial, bloqueio de bens e direitos do devedor no Brasil. Informação jurídica acessível.",
  openGraph: {
    title: "Guias Completos sobre Penhora e Execução Judicial",
    description: "Guias completos e atualizados sobre penhora, execução judicial, bloqueio de bens e direitos do devedor no Brasil.",
    type: "website",
    url: "https://quitadoc.com.br/guias",
  },
  alternates: {
    canonical: "https://quitadoc.com.br/guias",
  },
}

const clusterInfo = {
  educational: { icon: FileText, label: "Educacional", color: "bg-blue-100 text-blue-800" },
  legal: { icon: Scale, label: "Jurídico", color: "bg-purple-100 text-purple-800" },
  banking: { icon: AlertCircle, label: "Bancário", color: "bg-amber-100 text-amber-800" },
  defense: { icon: CheckCircle, label: "Defesa", color: "bg-green-100 text-green-800" },
}

export default function GuiasPage() {
  const guias = getAllGuias()
  
  const guiasByCluster = guias.reduce((acc, guia) => {
    const cluster = guia.cluster as keyof typeof clusterInfo
    if (!acc[cluster]) acc[cluster] = []
    acc[cluster].push(guia)
    return acc
  }, {} as Record<string, typeof guias>)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Guias Completos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa saber sobre penhora, execução judicial e proteção de bens no Brasil.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          {Object.entries(guiasByCluster).map(([cluster, clusterGuias]) => {
            const info = clusterInfo[cluster as keyof typeof clusterInfo] || clusterInfo.educational
            const Icon = info.icon
            
            return (
              <div key={cluster} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${info.color}`}>
                    <Icon className="h-4 w-4" />
                    {info.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {clusterGuias.length} guias
                  </span>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {clusterGuias.map((guia) => (
                    <Link
                      key={guia.slug}
                      href={`/guias/${guia.slug}`}
                      className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {guia.h1}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {guia.metaDescription}
                      </p>
                      <div className="flex items-center text-sm text-primary font-medium">
                        Ler guia completo
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-muted-foreground mb-6">
            Nossa equipe pode analisar seu caso específico gratuitamente.
          </p>
          <Link
            href="/consulta-gratuita"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Solicitar Análise Gratuita
          </Link>
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
