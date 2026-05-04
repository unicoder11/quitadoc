import { Metadata } from "next"
import Link from "next/link"
import { getFAQs, getServices } from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { ArrowRight, HelpCircle, Search } from "lucide-react"
import { FormCTA } from "@/components/sections/form-cta"

export const metadata: Metadata = {
  title: "Perguntas Frequentes | FAQ | Quitadoc",
  description:
    "Encontre respostas para as perguntas mais comuns sobre busca e apreensão, juros abusivos, revisão de contrato e mais.",
  keywords: [
    "FAQ busca e apreensão",
    "perguntas frequentes financiamento",
    "dúvidas juros abusivos",
  ],
}

export default function FAQIndexPage() {
  const faqs = getFAQs()
  const services = getServices()

  // Group FAQs by category
  const faqsByCategory = faqs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = []
      }
      acc[faq.category].push(faq)
      return acc
    },
    {} as Record<string, typeof faqs>
  )

  // Schema.org FAQ structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
              <HelpCircle className="h-4 w-4" />
              <span>Central de Ajuda</span>
            </div>
            <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl">
              Perguntas Frequentes
            </h1>
            <p className="text-lg text-white/90">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços
              jurídicos em financiamentos de veículos.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(faqsByCategory).map((category) => {
              const service = services.find((s) => s.cluster === category || s.slug === category)
              return (
                <a
                  key={category}
                  href={`#${category}`}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white"
                >
                  {service?.shortName || category.replace("-", " ")}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-12">
            {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => {
              const service = services.find(
                (s) => s.cluster === category || s.slug === category
              )
              return (
                <div key={category} id={category} className="scroll-mt-24">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold capitalize">
                      {service?.shortName || category.replace("-", " ")}
                    </h2>
                    {service && (
                      <Link
                        href={`/${service.slug}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Ver serviço completo
                      </Link>
                    )}
                  </div>
                  <div className="space-y-4">
                    {categoryFaqs.map((faq) => (
                      <Link
                        key={faq.slug}
                        href={`/faq/${faq.slug}`}
                        className="group block"
                      >
                        <Card className="transition-all hover:border-primary hover:shadow-md">
                          <CardContent className="flex items-center justify-between p-5">
                            <span className="font-medium group-hover:text-primary">
                              {faq.question}
                            </span>
                            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Can't find answer */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-4 text-2xl font-bold">
              Não encontrou sua resposta?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Nossa equipe está pronta para esclarecer todas as suas dúvidas.
              Entre em contato para uma consulta gratuita.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/consulta-gratuita">Falar com Advogado</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="https://wa.me/5511925332215" target="_blank">
                  WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Ainda tem dúvidas sobre seu caso?"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu caso agora"
          />
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
            subheading="Avaliação em 30 segundos. Ver minhas opções sem compromisso."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>

      <CTASection />
    </main>
  )
}
