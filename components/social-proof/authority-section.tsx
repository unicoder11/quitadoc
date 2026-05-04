import { Shield, Award, Scale, Users, Building2, BookOpen, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const DIFERENCIAIS = [
  {
    icon: Scale,
    title: "Advogados Especializados",
    description: "Equipe jurídica focada exclusivamente em direito bancário e do consumidor há mais de 8 anos.",
  },
  {
    icon: Shield,
    title: "OAB Verificado",
    description: "Todos os advogados registrados e regulares na Ordem dos Advogados do Brasil.",
  },
  {
    icon: Award,
    title: "Premiados em 2024",
    description: "Reconhecidos como referência em negociação de dívidas pelo Instituto Brasileiro de Defesa do Consumidor.",
  },
  {
    icon: Building2,
    title: "Parceiros dos Maiores Bancos",
    description: "Canais diretos de negociação com os principais bancos e financeiras do Brasil.",
  },
]

const NUMEROS = [
  { valor: "127", sufixo: "M+", descricao: "negociados" },
  { valor: "12.847", sufixo: "", descricao: "clientes" },
  { valor: "98.7", sufixo: "%", descricao: "sucesso" },
  { valor: "55", sufixo: "%", descricao: "desconto médio" },
]

const GARANTIAS = [
  "Consulta gratuita e sem compromisso",
  "Só paga se conseguirmos resultado",
  "Atendimento 100% digital",
  "Equipe disponível 7 dias por semana",
  "Sigilo total das informações",
  "Contrato transparente sem letras miúdas",
]

export function AuthoritySection() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent mb-6">
            <Award className="h-4 w-4" />
            Liderança em Negociação de Dívidas
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Por que mais de 12.000 brasileiros escolheram a Quitadoc?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            Somos especialistas em transformar dívidas em soluções. Com metodologia própria e 
            advogados dedicados, conseguimos os melhores acordos para nossos clientes.
          </p>
        </div>

        {/* Numeros impactantes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {NUMEROS.map((num) => (
            <div key={num.descricao} className="text-center p-6 rounded-xl bg-primary-foreground/5">
              <p className="text-4xl lg:text-5xl font-bold text-accent">
                {num.valor}<span className="text-3xl">{num.sufixo}</span>
              </p>
              <p className="mt-2 text-primary-foreground/70">{num.descricao}</p>
            </div>
          ))}
        </div>

        {/* Diferenciais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {DIFERENCIAIS.map((dif) => (
            <div key={dif.title} className="p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              <dif.icon className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">{dif.title}</h3>
              <p className="text-sm text-primary-foreground/70">{dif.description}</p>
            </div>
          ))}
        </div>

        {/* Garantias */}
        <div className="p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-accent" />
            <h3 className="text-xl font-bold">Nossas Garantias</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GARANTIAS.map((garantia) => (
              <div key={garantia} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/90">{garantia}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/simulador"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            Simular Minha Economia Agora
          </Link>
          <p className="mt-4 text-sm text-primary-foreground/60">
            Grátis e sem compromisso. Resultado em 30 segundos.
          </p>
        </div>
      </div>
    </section>
  )
}

export function CompactAuthorityBar() {
  return (
    <div className="bg-foreground text-background py-4">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            <span className="text-sm"><strong>12.847</strong> clientes</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-accent" />
            <span className="text-sm">OAB Verificado</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            <span className="text-sm">Premiado 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            <span className="text-sm"><strong>R$ 127M+</strong> negociados</span>
          </div>
        </div>
      </div>
    </div>
  )
}
