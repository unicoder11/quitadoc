import { Metadata } from "next"
import { FormCTA } from "@/components/sections/form-cta"
import Link from "next/link"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Como Evitar o Leilao do Seu Veiculo Financiado | Quitadoc",
  description: "Dicas praticas e estrategias juridicas para impedir que seu carro va a leilao. Saiba como agir antes que seja tarde.",
}

export default function BlogArticlePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: "Como Evitar Leilao" }]} />
      </div>
      
      <article className="py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Blog
          </Link>
          
          <header className="mb-8">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              Dicas
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Como Evitar o Leilao do Seu Veiculo Financiado
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Dicas praticas e estrategias juridicas para impedir que seu carro va a leilao. Saiba como agir antes que seja tarde.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Equipe Quitadoc
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                05 Jan 2025
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                8 min de leitura
              </span>
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <h2>Entenda o Processo de Leilao</h2>
            <p>
              Quando voce deixa de pagar as parcelas do financiamento, a financeira pode entrar com uma acao de busca e apreensao. Se o veiculo for apreendido, ele pode ser levado a leilao para quitar a divida.
            </p>
            
            <h2>Estrategias para Evitar o Leilao</h2>
            
            <h3>1. Negocie com a Financeira</h3>
            <p>
              Antes de chegar ao extremo do leilao, tente negociar com a financeira. Muitas vezes e possivel conseguir um acordo para parcelamento da divida ou reducao de juros.
            </p>
            
            <h3>2. Purgue a Mora</h3>
            <p>
              A purgacao da mora e o pagamento das parcelas atrasadas para evitar a perda do veiculo. Voce tem um prazo legal para fazer isso apos a citacao na acao de busca e apreensao.
            </p>
            
            <h3>3. Conteste Judicialmente</h3>
            <p>
              Se houver irregularidades no contrato, como juros abusivos ou cobrancas indevidas, voce pode contestar a acao judicialmente e ate conseguir a suspensao do leilao.
            </p>
            
            <h3>4. Solicite Liminar</h3>
            <p>
              Em casos urgentes, um advogado pode solicitar uma liminar para suspender o leilao ate que a situacao seja analisada pelo juiz.
            </p>
            
            <h2>Tempo e Essencial</h2>
            <p>
              Quanto mais cedo voce agir, maiores sao as chances de manter seu veiculo. Nao espere o ultimo momento para buscar ajuda juridica.
            </p>
          </div>
          
          <div className="mt-12 rounded-xl bg-primary p-8 text-primary-foreground">
            <h3 className="text-xl font-bold mb-2">Seu Veiculo Esta em Risco?</h3>
            <p className="text-primary-foreground/80 mb-4">
              Fale com nossos especialistas e descubra como proteger seu patrimonio.
            </p>
            <Link href="/consulta-gratuita">
              <Button className="bg-accent text-accent-foreground hover:bg-accent-light">
                Consulta Gratuita
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
            heading="Evite o leilão do seu veículo agora"
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
            buttonText="Quero evitar o leilão"
          />
        </div>
      </section>
    </>
  )
}
