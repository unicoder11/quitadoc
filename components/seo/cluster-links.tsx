import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight, Shield, Scale, Banknote } from "lucide-react"

type Cluster = "penhora" | "execucao" | "bloqueio" | "defesa" | "financeiro"

interface ClusterLink {
  href: string
  title: string
  description?: string
  cluster: Cluster
}

interface ClusterLinksProps {
  currentCluster: Cluster
  currentSlug: string
  className?: string
}

const allLinks: ClusterLink[] = [
  // Penhora cluster
  { href: "/guias/como-evitar-penhora-de-bens", title: "Como Evitar Penhora de Bens", cluster: "penhora" },
  { href: "/guias/penhora-de-imovel-residencial", title: "Penhora de Imóvel Residencial", cluster: "penhora" },
  { href: "/guias/penhora-de-salario", title: "Penhora de Salário: Limites Legais", cluster: "penhora" },
  { href: "/guias/bens-impenhora-veis", title: "Bens Impenhoráveis por Lei", cluster: "penhora" },
  { href: "/duvidas/banco-pode-penhorar-meus-bens", title: "Banco Pode Penhorar Meus Bens?", cluster: "penhora" },
  
  // Execucao cluster
  { href: "/guias/defesa-em-execucao-fiscal", title: "Defesa em Execução Fiscal", cluster: "execucao" },
  { href: "/guias/embargos-a-execucao", title: "Embargos à Execução", cluster: "execucao" },
  { href: "/guias/prescricao-divida-bancaria", title: "Prescrição de Dívida Bancária", cluster: "execucao" },
  { href: "/duvidas/quanto-tempo-dura-execucao-judicial", title: "Quanto Tempo Dura Execução?", cluster: "execucao" },
  
  // Bloqueio cluster
  { href: "/guias/como-desbloquear-conta-judicial", title: "Como Desbloquear Conta Judicial", cluster: "bloqueio" },
  { href: "/guias/bloqueio-judicial-conta-bancaria", title: "Bloqueio Judicial de Conta", cluster: "bloqueio" },
  { href: "/duvidas/minha-conta-foi-bloqueada", title: "Minha Conta Foi Bloqueada, E Agora?", cluster: "bloqueio" },
  
  // Defesa cluster
  { href: "/cancelar-busca-apreensao", title: "Cancelar Busca e Apreensão", cluster: "defesa" },
  { href: "/defesa-alienacao-fiduciaria", title: "Defesa Alienação Fiduciária", cluster: "defesa" },
  { href: "/contestacao-leilao-veiculo", title: "Contestar Leilão de Veículo", cluster: "defesa" },
  
  // Financeiro cluster
  { href: "/revisao-contrato-financiamento", title: "Revisão de Contrato", cluster: "financeiro" },
  { href: "/reducao-juros-abusivos", title: "Redução de Juros Abusivos", cluster: "financeiro" },
  { href: "/calculadora-juros", title: "Calculadora de Juros", cluster: "financeiro" },
]

const clusterIcons: Record<Cluster, typeof Shield> = {
  penhora: Scale,
  execucao: Scale,
  bloqueio: Banknote,
  defesa: Shield,
  financeiro: Banknote,
}

const clusterNames: Record<Cluster, string> = {
  penhora: "Penhora",
  execucao: "Execução",
  bloqueio: "Bloqueio",
  defesa: "Defesa",
  financeiro: "Financeiro",
}

export function ClusterLinks({ currentCluster, currentSlug, className }: ClusterLinksProps) {
  // 2 links do mesmo cluster
  const sameClusterLinks = allLinks
    .filter(l => l.cluster === currentCluster && !l.href.includes(currentSlug))
    .slice(0, 2)
  
  // 1 link de defesa
  const defenseLink = allLinks
    .find(l => l.cluster === "defesa" && !l.href.includes(currentSlug))
  
  // 1 link de solução (financeiro)
  const solutionLink = allLinks
    .find(l => l.cluster === "financeiro" && !l.href.includes(currentSlug))

  const linksToShow = [
    ...sameClusterLinks,
    defenseLink,
    solutionLink,
  ].filter(Boolean) as ClusterLink[]

  if (linksToShow.length === 0) return null

  return (
    <nav 
      className={cn("my-8 rounded-xl bg-muted/50 p-6", className)}
      aria-label="Conteúdo relacionado"
    >
      <h3 className="mb-4 text-lg font-bold text-foreground">
        Conteúdo Relacionado
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {linksToShow.map((link) => {
          const Icon = clusterIcons[link.cluster]
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex-1">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {clusterNames[link.cluster]}
                </span>
                <p className="font-medium text-foreground group-hover:text-primary">
                  {link.title}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

interface InlineClusterLinkProps {
  href: string
  children: React.ReactNode
}

export function InlineClusterLink({ href, children }: InlineClusterLinkProps) {
  return (
    <Link 
      href={href}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
    >
      {children}
    </Link>
  )
}
