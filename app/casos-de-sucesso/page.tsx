import { Metadata } from "next"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"
import { StatsCards } from "@/components/sections/stats-cards"
import { Quote, Car, MapPin, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Casos de Sucesso | Depoimentos de Clientes Quitadoc",
  description: "Conheca historias reais de clientes que cancelaram busca e apreensao e economizaram milhares de reais com a Quitadoc.",
  alternates: {
    canonical: "https://www.quitadoc.com.br/casos-de-sucesso"
  }
}

const casos = [
  {
    nome: "Joao Silva",
    cidade: "Sao Paulo, SP",
    veiculo: "Honda Civic 2018",
    situacao: "Busca e apreensao por 5 parcelas atrasadas",
    resultado: "Cancelamento da busca e apreensao + renegociacao da divida",
    economia: "R$ 38.000",
    depoimento: "Estava desesperado achando que ia perder meu carro. A Quitadoc conseguiu cancelar a busca e apreensao em menos de 48 horas. Hoje estou com as parcelas em dia e meu veiculo seguro."
  },
  {
    nome: "Maria Santos",
    cidade: "Rio de Janeiro, RJ",
    veiculo: "Toyota Corolla 2020",
    situacao: "Juros abusivos no contrato de financiamento",
    resultado: "Revisao contratual com reducao de juros",
    economia: "R$ 15.000",
    depoimento: "Minha parcela caiu de R$ 1.200 para R$ 780 apos a revisao. Nao sabia que podia questionar os juros do banco. Recomendo muito!"
  },
  {
    nome: "Carlos Oliveira",
    cidade: "Belo Horizonte, MG",
    veiculo: "Volkswagen Polo 2019",
    situacao: "Veiculo ja havia sido apreendido",
    resultado: "Recuperacao do veiculo + indenizacao",
    economia: "R$ 25.000",
    depoimento: "Meu carro ja estava no patio ha 3 dias quando procurei a Quitadoc. Conseguiram reverter a situacao e ainda ganhei indenizacao por danos."
  },
  {
    nome: "Ana Paula Costa",
    cidade: "Curitiba, PR",
    veiculo: "Hyundai HB20 2021",
    situacao: "Leilao marcado para 5 dias",
    resultado: "Suspensao do leilao + acordo judicial",
    economia: "R$ 28.000",
    depoimento: "O leilao estava marcado e eu achava que nao tinha mais jeito. A equipe agiu rapido e conseguiu suspender tudo. Estou muito grata!"
  },
  {
    nome: "Roberto Mendes",
    cidade: "Brasilia, DF",
    veiculo: "Chevrolet Onix 2020",
    situacao: "Cobranca de taxas abusivas",
    resultado: "Anulacao de taxas ilegais + restituicao",
    economia: "R$ 8.500",
    depoimento: "Descobri que estava pagando varias taxas que nao deveria. A Quitadoc conseguiu anular e ainda me devolveram o que paguei a mais."
  },
  {
    nome: "Fernanda Lima",
    cidade: "Salvador, BA",
    veiculo: "Fiat Argo 2022",
    situacao: "Busca e apreensao por falta de notificacao",
    resultado: "Extincao do processo por irregularidade",
    economia: "R$ 32.000",
    depoimento: "O banco nunca me notificou corretamente. A Quitadoc identificou isso e o processo foi extinto. Consegui negociar diretamente depois."
  },
]

export default function CasosDeSucessoPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[{ label: "Casos de Sucesso" }]} />
      </div>
      
      {/* Hero */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="text-primary-foreground">Casos de Sucesso</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Conheca historias reais de pessoas que protegeram seus veiculos e 
            economizaram milhares de reais com a Quitadoc.
          </p>
        </div>
      </section>
      
      <StatsCards />
      
      {/* Cases Grid */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {casos.map((caso, index) => (
              <div 
                key={index}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <Quote className="h-8 w-8 text-accent" />
                
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {`"${caso.depoimento}"`}
                </p>
                
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    {caso.nome.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{caso.nome}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {caso.cidade}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3 rounded-lg bg-secondary p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{caso.veiculo}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{caso.situacao}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-foreground">{caso.resultado}</span>
                  </div>
                </div>
                
                <div className="mt-4 rounded-lg bg-success/10 px-4 py-3 text-center">
                  <p className="text-sm text-muted-foreground">Economia</p>
                  <p className="font-mono text-2xl font-bold text-success">{caso.economia}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="text-foreground">Numeros que Falam por Si</h2>
          
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <p className="font-mono text-4xl font-bold text-accent">650+</p>
              <p className="mt-2 text-sm text-muted-foreground">Veiculos Salvos</p>
            </div>
            <div>
              <p className="font-mono text-4xl font-bold text-accent">87%</p>
              <p className="mt-2 text-sm text-muted-foreground">Taxa de Sucesso</p>
            </div>
            <div>
              <p className="font-mono text-4xl font-bold text-accent">R$12M+</p>
              <p className="mt-2 text-sm text-muted-foreground">Economizados</p>
            </div>
            <div>
              <p className="font-mono text-4xl font-bold text-accent">5+</p>
              <p className="mt-2 text-sm text-muted-foreground">Anos de Atuacao</p>
            </div>
          </div>
          
          <p className="mt-12 text-muted-foreground max-w-2xl mx-auto">
            Esses resultados sao fruto de anos de especializacao em defesa veicular. 
            Cada caso e unico, mas nossa experiencia aumenta significativamente suas 
            chances de sucesso.
          </p>
        </div>
      </section>
      
      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se seu caso tem solução como estes"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu caso agora"
          />
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
            subheading="Cada hora conta. Veja suas opções sem compromisso."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>

      <CTASection 
        title="Sua Historia Pode Ser a Proxima"
        subtitle="Consulta gratuita. Vamos analisar seu caso e mostrar como podemos ajudar."
      />
    </>
  )
}
