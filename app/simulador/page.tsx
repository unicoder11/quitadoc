import { Metadata } from "next"
import SimuladorSection from "@/components/simulador/simulador-section"
import { CheckCircle2, Shield, Clock, TrendingDown, Users, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Simulador de Negociação de Dívidas | Descubra Quanto Pode Economizar",
  description: "Simule quanto você pode economizar na negociação da sua dívida. Descontos de até 90%. Resultado em 30 segundos.",
  keywords: ["simulador dívida", "negociar dívida", "desconto dívida", "quitar dívida", "renegociar"],
}

const PROVAS_SOCIAIS = [
  { icon: Users, valor: "12.847", label: "clientes atendidos" },
  { icon: TrendingDown, valor: "R$ 127M+", label: "em dívidas negociadas" },
  { icon: Star, valor: "98.7%", label: "taxa de sucesso" },
  { icon: Clock, valor: "4 min", label: "tempo médio de resposta" },
]

const BENEFICIOS = [
  "Simulação personalizada em segundos",
  "Resultado baseado em dados reais de mercado",
  "Descontos de até 90% em algumas dívidas",
  "Parcelamento em até 24x sem juros",
  "Atendimento especializado por advogados",
  "Mais de 12.000 clientes satisfeitos",
]

const CASOS_REAIS = [
  {
    nome: "Carlos M.",
    cidade: "Rio de Janeiro",
    antes: 45000,
    depois: 18000,
    tipo: "Financiamento Veicular",
    banco: "Santander",
  },
  {
    nome: "Maria S.",
    cidade: "São Paulo",
    antes: 28000,
    depois: 8400,
    tipo: "Cartão de Crédito",
    banco: "Nubank",
  },
  {
    nome: "Roberto L.",
    cidade: "Belo Horizonte",
    antes: 67000,
    depois: 26800,
    tipo: "Empréstimo Pessoal",
    banco: "Itaú",
  },
]

export default function SimuladorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero com Simulador */}
      <section className="relative bg-primary py-12 lg:py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Texto */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                847 pessoas simularam hoje
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
                Descubra quanto você pode{" "}
                <span className="text-accent">economizar</span> em 30 segundos
              </h1>
              
              <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl">
                Simule quanto você pode economizar na negociação com base em{" "}
                <strong className="text-primary-foreground">dados reais de mercado</strong>. 
                Nossos clientes economizam em media <strong className="text-accent">55%</strong> do valor total.
              </p>

              {/* Beneficios */}
              <ul className="mt-8 space-y-3 text-left">
                {BENEFICIOS.slice(0, 4).map((beneficio) => (
                  <li key={beneficio} className="flex items-center gap-3 text-primary-foreground/90">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>

              {/* Prova social mobile */}
              <div className="mt-8 grid grid-cols-2 gap-4 lg:hidden">
                {PROVAS_SOCIAIS.slice(0, 2).map((prova) => (
                  <div key={prova.label} className="text-center">
                    <p className="text-2xl font-bold text-accent">{prova.valor}</p>
                    <p className="text-xs text-primary-foreground/70">{prova.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulador */}
            <div id="simulador" className="lg:sticky lg:top-24">
              <SimuladorSection tipoPreSelecionado="" bancoPreSelecionado="" />
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social Desktop */}
      <section className="border-b border-border py-8 hidden lg:block">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-4 gap-8">
            {PROVAS_SOCIAIS.map((prova) => (
              <div key={prova.label} className="text-center">
                <prova.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{prova.valor}</p>
                <p className="text-sm text-muted-foreground">{prova.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos Reais */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Veja resultados <span className="text-primary">reais</span> de clientes
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Esses sao alguns dos milhares de clientes que ja economizaram com a Quitadoc
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CASOS_REAIS.map((caso, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{caso.nome[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{caso.nome}</p>
                    <p className="text-sm text-muted-foreground">{caso.cidade}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">{caso.tipo} - {caso.banco}</p>
                </div>

                <div className="flex items-end justify-between p-4 rounded-lg bg-success/10">
                  <div>
                    <p className="text-xs text-muted-foreground">Devia</p>
                    <p className="text-lg font-semibold text-destructive line-through">
                      R$ {caso.antes.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Pagou</p>
                    <p className="text-xl font-bold text-success">
                      R$ {caso.depois.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-center text-sm font-medium text-success">
                  Economia de R$ {(caso.antes - caso.depois).toLocaleString("pt-BR")} ({((1 - caso.depois/caso.antes) * 100).toFixed(0)}%)
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Como funciona a simulacao?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Informe o valor", desc: "Digite o valor aproximado da sua divida atual" },
              { step: "2", title: "Selecione o tipo", desc: "Escolha o tipo de divida e o banco/financeira" },
              { step: "3", title: "Veja o resultado", desc: "Receba a estimativa de desconto em segundos" },
              { step: "4", title: "Negocie conosco", desc: "Fale com um especialista para confirmar" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h2 className="text-2xl font-bold mb-4">Seus dados estão seguros</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            A simulação é personalizada e sem compromisso. Seus dados são protegidos e usados 
            apenas para calcular sua economia. Não compartilhamos com terceiros.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Pronto para descobrir quanto pode economizar?
          </h2>
          <p className="text-muted-foreground mb-8">
            Volte ao simulador acima e descubra em 30 segundos. Análise rápida e personalizada!
          </p>
          <a
            href="#simulador"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary-dark transition-colors"
          >
            Simular Minha Dívida
          </a>
        </div>
      </section>
    </div>
  )
}
