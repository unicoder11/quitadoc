import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  getService,
  getServices,
  getCities,
  getRelatedServices,
  getRelatedFAQs,
  getPostsByCategory,
  generateServiceStaticParams,
} from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import {
  CheckCircle,
  MapPin,
  ArrowRight,
  Phone,
  FileText,
  Scale,
  Shield,
  Clock,
  MessageCircle,
} from "lucide-react"

interface Props {
  params: Promise<{ service: string }>
}

export async function generateStaticParams() {
  return generateServiceStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug } = await params
  const service = getService(serviceSlug)

  if (!service) {
    return { title: "Página não encontrada" }
  }

  return {
    title: `${service.heroTitle} | Guia Completo 2026 | Quitadoc`,
    description: `${service.description}. Advogados especializados com mais de 15.000 casos resolvidos. Consulta gratuita.`,
    keywords: service.keywords,
    openGraph: {
      title: `${service.heroTitle} | Quitadoc`,
      description: service.description,
      type: "website",
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { service: serviceSlug } = await params
  const service = getService(serviceSlug)

  if (!service) {
    notFound()
  }

  const cities = getCities().slice(0, 12)
  const relatedServices = getRelatedServices(serviceSlug)
  const relatedFAQs = getRelatedFAQs(serviceSlug)
  const relatedPosts = getPostsByCategory(service.cluster).slice(0, 3)

  const processSteps = [
    {
      icon: Phone,
      title: "Consulta Gratuita",
      description: "Entre em contato para uma análise inicial do seu caso sem compromisso.",
    },
    {
      icon: FileText,
      title: "Análise do Contrato",
      description: "Nossa equipe analisa seu contrato identificando irregularidades.",
    },
    {
      icon: Scale,
      title: "Ação Judicial",
      description: "Entramos com a ação judicial adequada ao seu caso.",
    },
    {
      icon: Shield,
      title: "Proteção Garantida",
      description: "Acompanhamos todo o processo até a resolução definitiva.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: service.name, href: `/${service.slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl text-balance">
              {service.heroTitle}
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              {service.heroSubtitle}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Link href="/consulta-gratuita">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consulta Gratuita
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="https://wa.me/5511925332215" target="_blank">
                  <Phone className="mr-2 h-5 w-5" />
                  WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
            Por que escolher nossos serviços?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <CheckCircle className="h-6 w-6 shrink-0 text-secondary" />
                  <span className="font-medium">{benefit}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
              O que é {service.name}?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>{service.description}</p>
              <p>
                Nossa equipe de advogados especializados atua há mais de 10 anos na área,
                com milhares de casos resolvidos com sucesso em todo o Brasil. Oferecemos
                atendimento personalizado e acompanhamento completo do seu processo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
            Como Funciona o Processo
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-primary/20 lg:block" />
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section - Interlinking */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
            {service.name} por Cidade
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Atendemos em todas as capitais e principais cidades do Brasil
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${service.slug}/${city.slug}`}
                className="group flex items-center gap-2 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium group-hover:text-primary">
                  {city.name} - {city.state}
                </span>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Atendimento em mais de {getCities().length} cidades em todo o Brasil
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
            Perguntas Frequentes sobre {service.name}
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {relatedFAQs.length > 0 && (
            <div className="mt-8 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                Veja mais perguntas relacionadas:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {relatedFAQs.map((faq) => (
                  <Link
                    key={faq.slug}
                    href={`/faq/${faq.slug}`}
                    className="rounded-full bg-card px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-white"
                  >
                    {faq.question.slice(0, 40)}...
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Services - Interlinking */}
      {relatedServices.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              Serviços Relacionados
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedServices.map((related) => (
                <Card key={related.slug} className="group transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                      <Link href={`/${related.slug}`}>{related.name}</Link>
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {related.description}
                    </p>
                    <Link
                      href={`/${related.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary"
                    >
                      Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blog Posts - Interlinking */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              Artigos Relacionados
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <Card key={post.slug} className="group transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {post.readTime} min de leitura
                      </span>
                    </div>
                    <h3 className="mb-2 font-semibold group-hover:text-primary">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      {/* SEO Content Footer */}
      <section className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground">
            <p>
              A Quitadoc é especializada em {service.name.toLowerCase()} e atua em todo o
              território nacional. Nossa equipe de advogados especializados já ajudou
              milhares de clientes a resolverem seus problemas com financiamentos de
              veículos. Entre em contato para uma consulta gratuita.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
