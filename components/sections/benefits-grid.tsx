import { Target, ShieldCheck, Zap, Eye, Globe, Award } from "lucide-react"

interface Benefit {
  title: string
  description: string
  icon: React.ReactNode
}

interface BenefitsGridProps {
  title?: string
  subtitle?: string
  benefits?: Benefit[]
}

const defaultBenefits: Benefit[] = [
  {
    title: "Especialização",
    description: "Foco exclusivo em defesa veicular e alienação fiduciária. Conhecemos todas as estratégias.",
    icon: <Target className="h-6 w-6" />
  },
  {
    title: "Sem Risco",
    description: "Você só paga se ganharmos. Success fee de apenas 10% do valor da causa.",
    icon: <ShieldCheck className="h-6 w-6" />
  },
  {
    title: "Agilidade",
    description: "Petições elaboradas em 24-48 horas. Urgência que seu caso merece.",
    icon: <Zap className="h-6 w-6" />
  },
  {
    title: "Transparência",
    description: "Acompanhe seu processo em tempo real. Sem surpresas, sem letras miúdas.",
    icon: <Eye className="h-6 w-6" />
  },
  {
    title: "Nacional",
    description: "Atuamos em todo o Brasil. Onde você estiver, podemos ajudar.",
    icon: <Globe className="h-6 w-6" />
  },
  {
    title: "Experiência",
    description: "Mais de 5 anos e 650+ casos resolvidos com sucesso.",
    icon: <Award className="h-6 w-6" />
  },
]

export function BenefitsGrid({ 
  title = "Por Que Escolher a Quitadoc",
  subtitle = "Confie em quem entende do assunto",
  benefits = defaultBenefits 
}: BenefitsGridProps) {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-foreground">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group rounded-xl bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                {benefit.icon}
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
