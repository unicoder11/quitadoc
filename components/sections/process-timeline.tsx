import { Search, FileText, BarChart3, Trophy } from "lucide-react"

interface Step {
  title: string
  description: string
  icon: React.ReactNode
  time?: string
}

interface ProcessTimelineProps {
  title?: string
  subtitle?: string
  steps?: Step[]
  orientation?: "horizontal" | "vertical"
}

const defaultSteps: Step[] = [
  {
    title: "Análise Gratuita",
    description: "Enviamos seu caso para nossa equipe jurídica avaliar as chances de sucesso.",
    icon: <Search className="h-6 w-6" />,
    time: "Até 2h"
  },
  {
    title: "Petição Judicial",
    description: "Elaboramos a defesa com base na jurisprudência favorável ao consumidor.",
    icon: <FileText className="h-6 w-6" />,
    time: "24-48h"
  },
  {
    title: "Acompanhamento",
    description: "Monitoramos seu processo e mantemos você informado de cada movimentação.",
    icon: <BarChart3 className="h-6 w-6" />,
    time: "Contínuo"
  },
  {
    title: "Resultado",
    description: "Cancelamento da busca e apreensão ou redução significativa da dívida.",
    icon: <Trophy className="h-6 w-6" />,
    time: "30-90 dias"
  },
]

export function ProcessTimeline({ 
  title = "Como Funciona Nosso Processo",
  subtitle = "4 passos simples para proteger seu veículo",
  steps = defaultSteps,
  orientation = "horizontal" 
}: ProcessTimelineProps) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-foreground">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className={`mt-12 ${orientation === "horizontal" ? "hidden lg:block" : ""}`}>
          {/* Horizontal Timeline (Desktop) */}
          {orientation === "horizontal" && (
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-0 right-0 top-12 h-1 bg-muted hidden lg:block" />
              
              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative flex flex-col items-center text-center">
                    {/* Step Number */}
                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      {step.icon}
                      <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-mono text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="mt-6">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      {step.time && (
                        <span className="mt-1 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                          {step.time}
                        </span>
                      )}
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Timeline (Mobile or when orientation is vertical) */}
        <div className={orientation === "horizontal" ? "lg:hidden" : ""}>
          <div className="relative mt-12">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted" />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Step Circle */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    {step.icon}
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground font-mono text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    {step.time && (
                      <span className="mt-1 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        {step.time}
                      </span>
                    )}
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
