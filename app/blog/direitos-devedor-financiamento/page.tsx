import { Metadata } from "next"
import { FormCTA } from "@/components/sections/form-cta"
import Link from "next/link"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Direitos do Devedor em Financiamento de Veiculo | Quitadoc",
  description: "Conheca todos os seus direitos como consumidor ao financiar um veiculo. O CDC protege voce contra abusos das financeiras.",
}

export default function BlogArticlePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: "Direitos do Devedor" }]} />
      </div>
      
      <article className="py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Blog
          </Link>
          
          <header className="mb-8">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              Direitos
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Direitos do Devedor em Financiamento de Veiculo
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Conheca todos os seus direitos como consumidor ao financiar um veiculo. O CDC protege voce contra abusos das financeiras.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Equipe Quitadoc
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                10 Jan 2025
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                10 min de leitura
              </span>
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <h2>Introducao</h2>
            <p>
              Muitos consumidores desconhecem seus direitos ao financiar um veiculo. O Codigo de Defesa do Consumidor (CDC) oferece diversas protecoes que podem ser usadas a seu favor em caso de problemas com a financeira.
            </p>
            
            <h2>Principais Direitos do Devedor</h2>
            
            <h3>1. Direito a Informacao Clara</h3>
            <p>
              A financeira e obrigada a fornecer todas as informacoes sobre o contrato de forma clara e compreensivel, incluindo taxa de juros, CET (Custo Efetivo Total), e todas as tarifas cobradas.
            </p>
            
            <h3>2. Direito a Revisao Contratual</h3>
            <p>
              Voce tem o direito de solicitar a revisao de clausulas abusivas ou juros acima da media de mercado. Tribunais frequentemente reduzem parcelas em casos de juros abusivos.
            </p>
            
            <h3>3. Direito a Defesa em Busca e Apreensao</h3>
            <p>
              Mesmo com parcelas atrasadas, voce tem o direito de se defender em uma acao de busca e apreensao. Ha prazos legais que devem ser respeitados pela financeira.
            </p>
            
            <h3>4. Direito a Purgacao da Mora</h3>
            <p>
              Voce pode quitar as parcelas atrasadas e manter o veiculo, desde que faca isso dentro do prazo legal estabelecido pelo juiz.
            </p>
            
            <h3>5. Direito a Devolucao de Valores</h3>
            <p>
              Se o veiculo for apreendido e vendido por valor superior a divida, voce tem direito a receber a diferenca.
            </p>
            
            <h2>Como Proteger Seus Direitos</h2>
            <p>
              A melhor forma de proteger seus direitos e contar com assessoria juridica especializada. Advogados experientes em defesa veicular conhecem todas as estrategias para proteger seu patrimonio.
            </p>
          </div>
          
          <div className="mt-12 rounded-xl bg-primary p-8 text-primary-foreground">
            <h3 className="text-xl font-bold mb-2">Precisa de Ajuda com Seu Financiamento?</h3>
            <p className="text-primary-foreground/80 mb-4">
              Nossa equipe de especialistas pode analisar seu caso.
            </p>
            <Link href="/consulta-gratuita">
              <Button className="bg-accent text-accent-foreground hover:bg-accent-light">
                Agendar Consulta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Conheça seus direitos e proteja seu veículo"
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
            buttonText="Ver minhas opções sem compromisso"
          />
        </div>
      </section>
    </>
  )
}
