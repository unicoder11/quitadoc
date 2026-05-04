import type { Metadata } from "next"
import Link from "next/link"
import { HelpCircle, Scale, AlertCircle, CheckCircle, ChevronRight, Search } from "lucide-react"
import { FormCTA } from "@/components/sections/form-cta"
import { getAllDuvidas } from "@/lib/seo-content"

export const metadata: Metadata = {
  title: "Duvidas Frequentes sobre Penhora e Bloqueio de Bens | Quitadoc",
  description: "Respostas claras e objetivas para as duvidas mais comuns sobre penhora, bloqueio judicial, execucao de dividas e direitos do devedor.",
  openGraph: {
    title: "Duvidas Frequentes sobre Penhora e Bloqueio de Bens",
    description: "Respostas claras e objetivas para as duvidas mais comuns sobre penhora, bloqueio judicial e direitos do devedor.",
    type: "website",
    url: "https://quitadoc.com.br/duvidas",
  },
  alternates: {
    canonical: "https://quitadoc.com.br/duvidas",
  },
}

const clusterInfo = {
  educational: { icon: HelpCircle, label: "Geral", color: "bg-blue-100 text-blue-800" },
  legal: { icon: Scale, label: "Juridico", color: "bg-purple-100 text-purple-800" },
  banking: { icon: AlertCircle, label: "Bancario", color: "bg-amber-100 text-amber-800" },
  defense: { icon: CheckCircle, label: "Defesa", color: "bg-green-100 text-green-800" },
}

export default function DuvidasPage() {
  const duvidas = getAllDuvidas()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Duvidas Frequentes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Respostas claras e objetivas para as perguntas mais comuns sobre penhora e execucao judicial.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar duvidas..."
              className="w-full rounded-lg border border-border bg-card pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* All Questions */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {duvidas.map((duvida) => {
              const info = clusterInfo[duvida.cluster as keyof typeof clusterInfo] || clusterInfo.educational
              const Icon = info.icon
              
              return (
                <Link
                  key={duvida.slug}
                  href={`/duvidas/${duvida.slug}`}
                  className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="shrink-0 mt-0.5">
                    <span className={`inline-flex items-center justify-center rounded-full p-2 ${info.color}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {duvida.h1}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {duvida.directAnswer}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Temas Mais Pesquisados
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Penhora de Salario", "Bloqueio de Conta", "Bem de Familia", "SISBAJUD", "Leilao Judicial", "Acordo de Divida"].map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Sua dúvida não está aqui?
          </h2>
          <p className="text-muted-foreground mb-6">
            Fale com nossa equipe e obtenha orientação especializada para seu caso.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/consulta-gratuita"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Agendar Consulta
            </Link>
            <a
              href="https://wa.me/5511925332215"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se seu caso tem solução"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu caso agora"
          />
        </div>
      </section>

      <section className="bg-background py-8">
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
