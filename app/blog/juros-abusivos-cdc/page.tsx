import { Metadata } from "next"
import Link from "next/link"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormCTA } from "@/components/sections/form-cta"

export const metadata: Metadata = {
  title: "Juros Abusivos em Financiamento: Como Identificar e Revisar | Quitadoc",
  description: "Aprenda a identificar juros abusivos no seu contrato de financiamento e como reduzir o valor das parcelas com revisao judicial.",
}

export default function BlogArticlePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: "Juros Abusivos" }]} />
      </div>
      
      <article className="py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Blog
          </Link>
          
          <header className="mb-8">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              Financas
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Juros Abusivos em Financiamento: Como Identificar e Revisar
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Aprenda a identificar juros abusivos no seu contrato de financiamento e como reduzir o valor das parcelas com revisao judicial.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Equipe Quitadoc
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                28 Dez 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                15 min de leitura
              </span>
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <h2>O Que Sao Juros Abusivos?</h2>
            <p>
              Juros abusivos sao taxas de juros que excedem significativamente a media de mercado praticada pelo sistema financeiro. O Banco Central publica regularmente as taxas medias de mercado que servem como referencia.
            </p>
            
            <h2>Como Identificar Juros Abusivos</h2>
            
            <h3>1. Compare com a Media de Mercado</h3>
            <p>
              Consulte o site do Banco Central para verificar a taxa media de juros para financiamento de veiculos. Se sua taxa for muito superior, pode ser considerada abusiva.
            </p>
            
            <h3>2. Analise o CET (Custo Efetivo Total)</h3>
            <p>
              O CET inclui todos os custos do financiamento, nao apenas os juros. Compare o CET do seu contrato com ofertas de outras instituicoes.
            </p>
            
            <h3>3. Verifique Tarifas Ocultas</h3>
            <p>
              Algumas financeiras incluem tarifas abusivas ou duplicadas no contrato. Analise cada item cobrado.
            </p>
            
            <h2>Como Revisar o Contrato</h2>
            
            <h3>Acao de Revisao Contratual</h3>
            <p>
              Voce pode entrar com uma acao judicial pedindo a revisao das clausulas abusivas. O juiz pode determinar a reducao dos juros para a media de mercado.
            </p>
            
            <h3>Resultados Possiveis</h3>
            <ul>
              <li>Reducao da taxa de juros</li>
              <li>Diminuicao do valor das parcelas</li>
              <li>Restituicao de valores pagos a mais</li>
              <li>Recalculo do saldo devedor</li>
            </ul>
            
            <h2>Use Nossa Calculadora</h2>
            <p>
              Utilize nossa calculadora de juros para simular quanto voce pode economizar com uma revisao contratual.
            </p>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/calculadora-juros" className="flex-1">
              <Button variant="outline" className="w-full">
                Acessar Calculadora
              </Button>
            </Link>
            <Link href="/consulta-gratuita" className="flex-1">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
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
            heading="Descubra se você está pagando juros abusivos"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu contrato agora"
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de recuperar o que pagou a mais"
            subheading="Avaliação em 30 segundos."
            buttonText="Ver minhas opções sem compromisso"
          />
        </div>
      </section>
    </>
  )
}
