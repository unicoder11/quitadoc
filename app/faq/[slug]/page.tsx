import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  getFAQ,
  getFAQs,
  getService,
  getRelatedFAQs,
  generateFAQStaticParams,
} from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"
import { ArrowRight, Clock, Tag, HelpCircle, MessageCircle, Phone } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return generateFAQStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const faq = getFAQ(slug)

  if (!faq) {
    return { title: "Pergunta não encontrada" }
  }

  return {
    title: `${faq.question} | FAQ | Quitadoc`,
    description: faq.answer.slice(0, 160),
    keywords: faq.keywords,
    openGraph: {
      title: faq.question,
      description: faq.answer.slice(0, 160),
      type: "article",
    },
  }
}

export default async function FAQPage({ params }: Props) {
  const { slug } = await params
  const faq = getFAQ(slug)

  if (!faq) {
    notFound()
  }

  const relatedService = getService(faq.relatedServices[0])
  const otherFAQs = getFAQs()
    .filter((f) => f.slug !== slug && f.category === faq.category)
    .slice(0, 5)

  // Schema.org FAQ structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      },
    ],
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
          { label: faq.question.slice(0, 30) + "...", href: `/faq/${faq.slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
              <HelpCircle className="h-4 w-4" />
              <span>Perguntas Frequentes</span>
            </div>
            <h1 className="text-2xl font-bold text-white md:text-4xl text-balance">
              {faq.question}
            </h1>
          </div>
        </div>
      </section>

      {/* Answer Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-border pb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span className="capitalize">{faq.category.replace("-", " ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>2 min de leitura</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-foreground">{faq.answer}</p>

                  {relatedService && (
                    <div className="mt-8 rounded-lg bg-secondary/50 p-6">
                      <h3 className="mb-2 text-lg font-semibold">
                        Precisa de ajuda com {relatedService.name.toLowerCase()}?
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        Nossa equipe de advogados especializados pode ajudar você.
                        Entre em contato para uma consulta gratuita.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild>
                          <Link href={`/${relatedService.slug}`}>
                            Saiba mais sobre {relatedService.shortName}
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/consulta-gratuita">Consulta Gratuita</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row">
                  <Button asChild className="flex-1">
                    <Link href="/consulta-gratuita">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Falar com Advogado
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="https://wa.me/11925332215" target="_blank">
                      <Phone className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related FAQs */}
      {otherFAQs.length > 0 && (
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Perguntas Relacionadas
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              {otherFAQs.map((relatedFaq) => (
                <Link
                  key={relatedFaq.slug}
                  href={`/faq/${relatedFaq.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                >
                  <span className="font-medium group-hover:text-primary">
                    {relatedFaq.question}
                  </span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/faq">Ver todas as perguntas</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedService && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Serviços Relacionados
            </h2>
            <div className="mx-auto max-w-md">
              <Card className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
                    <Link href={`/${relatedService.slug}`}>
                      {relatedService.name}
                    </Link>
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    {relatedService.description}
                  </p>
                  <Link
                    href={`/${relatedService.slug}`}
                    className="inline-flex items-center font-medium text-primary"
                  >
                    Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

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

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
            subheading="Avaliação em 30 segundos."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>

      <CTASection />
    </main>
  )
}
