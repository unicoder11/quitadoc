import Link from "next/link"
import { ArrowRight, Car, FileText, Calculator, Gavel, Scale, AlertTriangle } from "lucide-react"

const services = [
  {
    title: "Cancelar Busca e Apreensão",
    description: "Defesa especializada para impedir ou reverter a apreensão do seu veículo financiado.",
    href: "/cancelar-busca-apreensao",
    icon: <Car className="h-6 w-6" />,
    highlight: true
  },
  {
    title: "Defesa Alienação Fiduciária",
    description: "Proteção jurídica em contratos de alienação fiduciária com cláusulas abusivas.",
    href: "/defesa-alienacao-fiduciaria",
    icon: <FileText className="h-6 w-6" />,
    highlight: false
  },
  {
    title: "Revisão de Contrato",
    description: "Análise e revisão de contratos de financiamento para identificar abusos.",
    href: "/revisao-contrato-financiamento",
    icon: <Scale className="h-6 w-6" />,
    highlight: false
  },
  {
    title: "Redução de Juros",
    description: "Ação revisional para reduzir juros abusivos e taxas ilegais do seu financiamento.",
    href: "/reducao-juros-abusivos",
    icon: <Calculator className="h-6 w-6" />,
    highlight: false
  },
  {
    title: "Contestação de Leilão",
    description: "Defesa para impedir ou anular leilão de veículo realizado de forma irregular.",
    href: "/contestacao-leilao-veiculo",
    icon: <Gavel className="h-6 w-6" />,
    highlight: false
  },
  {
    title: "Urgências",
    description: "Atendimento emergencial para casos de busca e apreensão iminente.",
    href: "/consulta-gratuita",
    icon: <AlertTriangle className="h-6 w-6" />,
    highlight: true
  },
]

export function ServicesSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-foreground">Nossos Serviços</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluções jurídicas completas para defesa veicular
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group">
              <div className={`h-full rounded-xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${
                service.highlight 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-border hover:border-primary/20"
              }`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                  service.highlight 
                    ? "bg-primary-foreground/10 text-primary-foreground" 
                    : "bg-primary/10 text-primary group-hover:bg-accent group-hover:text-accent-foreground"
                } transition-colors`}>
                  {service.icon}
                </div>
                <h3 className={`mt-4 font-semibold ${
                  service.highlight ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {service.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${
                  service.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  {service.description}
                </p>
                <span className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${
                  service.highlight ? "text-accent-light" : "text-primary"
                }`}>
                  Saiba mais
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
