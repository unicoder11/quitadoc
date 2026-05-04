import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  getService,
  getCity,
  getRelatedServices,
  getOtherCitiesForService,
  getRelatedFAQs,
  generateServiceCityStaticParams,
  generateServiceCityTitle,
  generateServiceCityDescription,
  generateServiceCityKeywords,
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
  Building2,
  Scale,
  Shield,
  Clock,
  MessageCircle,
  Users,
} from "lucide-react"

interface Props {
  params: Promise<{ service: string; city: string }>
}

export async function generateStaticParams() {
  return generateServiceCityStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params
  const service = getService(serviceSlug)
  const city = getCity(citySlug)

  if (!service || !city) {
    return { title: "Página não encontrada" }
  }

  return {
    title: generateServiceCityTitle(service, city),
    description: generateServiceCityDescription(service, city),
    keywords: generateServiceCityKeywords(service, city),
    openGraph: {
      title: `${service.name} em ${city.name} | Quitadoc`,
      description: generateServiceCityDescription(service, city),
      type: "website",
    },
  }
}

export default async function ServiceCityPage({ params }: Props) {
  const { service: serviceSlug, city: citySlug } = await params
  const service = getService(serviceSlug)
  const city = getCity(citySlug)

  if (!service || !city) {
    notFound()
  }

  const otherCities = getOtherCitiesForService(citySlug, 8)
  const relatedServices = getRelatedServices(serviceSlug)
  const relatedFAQs = getRelatedFAQs(serviceSlug, 4)

  const localStats = [
    {
      icon: Users,
      value: "500+",
      label: `Clientes atendidos em ${city.name}`,
    },
    {
      icon: Scale,
      value: "95%",
      label: "Taxa de sucesso",
    },
    {
      icon: Clock,
      value: "24h",
      label: "Resposta inicial",
    },
    {
      icon: Shield,
      value: "15+",
      label: "Anos de experiência",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: service.name, href: `/${service.slug}` },
          { label: city.name, href: `/${service.slug}/${city.slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
              <MapPin className="h-4 w-4" />
              <span>{city.name}, {city.state}</span>
            </div>
            <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl text-balance">
              {service.name} em {city.name}
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              {service.heroSubtitle}. Atendimento especializado com atuação no {city.tribunalAcronym}.
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

      {/* Local Stats */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {localStats.map((stat, index) => (
              <Card key={index} className="border-none text-center shadow-md">
                <CardContent className="p-6">
                  <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
            {service.name} em {city.name}: Nossos Diferenciais
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

      {/* Local Content */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
              {service.name} em {city.name}, {city.state}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                {city.name} é {city.localInfo}. Nossa equipe de advogados especializados
                em {service.name.toLowerCase()} atua diretamente no {city.tribunalName} ({city.tribunalAcronym}),
                garantindo agilidade e eficiência no acompanhamento do seu processo.
              </p>
              <p>
                Se você está em {city.name} ou região metropolitana e precisa de assistência
                jurídica especializada em {service.name.toLowerCase()}, conte com a Quitadoc.
                Oferecemos consulta gratuita para análise do seu caso.
              </p>

              <h3 className="mt-8 text-xl font-semibold text-foreground">
                Por que escolher a Quitadoc em {city.name}?
              </h3>
              <ul className="space-y-2">
                <li>Advogados com experiência no {city.tribunalAcronym}</li>
                <li>Atendimento presencial e online para {city.name} e região</li>
                <li>Acompanhamento processual em tempo real</li>
                <li>Consulta inicial gratuita e sem compromisso</li>
                <li>Mais de 500 clientes atendidos na região {city.region}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tribunal Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Building2 className="h-10 w-10 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">
                      Atuação no {city.tribunalAcronym}
                    </h3>
                    <p className="text-muted-foreground">
                      Nossa equipe possui ampla experiência em processos no {city.tribunalName}.
                      Conhecemos as particularidades do tribunal e as melhores estratégias
                      para defender seus direitos em casos de {service.name.toLowerCase()}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
            Dúvidas sobre {service.name} em {city.name}
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
                    {faq.question.slice(0, 35)}...
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Other Cities - Interlinking */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
            {service.name} em Outras Cidades
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Também atendemos em outras capitais e cidades do Brasil
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {otherCities.map((otherCity) => (
              <Link
                key={otherCity.slug}
                href={`/${service.slug}/${otherCity.slug}`}
                className="group flex items-center gap-2 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium group-hover:text-primary">
                  {otherCity.name} - {otherCity.state}
                </span>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services - Interlinking */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              Outros Serviços em {city.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedServices.map((related) => (
                <Card key={related.slug} className="group transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                      <Link href={`/${related.slug}/${city.slug}`}>
                        {related.name} em {city.name}
                      </Link>
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {related.description}
                    </p>
                    <Link
                      href={`/${related.slug}/${city.slug}`}
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

      <CTASection />

      {/* SEO Content Footer */}
      <section className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground">
            <p>
              A Quitadoc é especializada em {service.name.toLowerCase()} em {city.name}, {city.state}.
              Atendemos clientes em toda a região metropolitana com atuação direta no {city.tribunalAcronym}.
              Nossa equipe de advogados já ajudou centenas de clientes em {city.name} a resolverem
              seus problemas com financiamentos de veículos. Entre em contato para uma consulta gratuita.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
