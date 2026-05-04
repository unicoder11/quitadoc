import Link from "next/link"
import {
  getServices,
  getCities,
  getRelatedServices,
  getOtherCitiesForService,
  getRelatedFAQs,
  getRelatedPosts,
  Service,
  City,
} from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MapPin, HelpCircle, FileText, Scale } from "lucide-react"

interface RelatedServicesProps {
  currentServiceSlug: string
  currentCitySlug?: string
}

export function RelatedServicesLinks({
  currentServiceSlug,
  currentCitySlug,
}: RelatedServicesProps) {
  const relatedServices = getRelatedServices(currentServiceSlug)

  if (relatedServices.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <Scale className="h-5 w-5 text-primary" />
        Serviços Relacionados
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {relatedServices.map((service) => (
          <Link
            key={service.slug}
            href={currentCitySlug ? `/${service.slug}/${currentCitySlug}` : `/${service.slug}`}
            className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
          >
            <span className="font-medium group-hover:text-primary">
              {service.shortName}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  )
}

interface RelatedCitiesProps {
  serviceSlug: string
  currentCitySlug: string
  limit?: number
}

export function RelatedCitiesLinks({
  serviceSlug,
  currentCitySlug,
  limit = 8,
}: RelatedCitiesProps) {
  const cities = getOtherCitiesForService(currentCitySlug, limit)

  if (cities.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <MapPin className="h-5 w-5 text-primary" />
        Outras Cidades
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${serviceSlug}/${city.slug}`}
            className="group flex items-center gap-2 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary hover:shadow-md"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium group-hover:text-primary">
              {city.name} - {city.state}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

interface RelatedFAQsProps {
  serviceSlug: string
  limit?: number
}

export function RelatedFAQsLinks({ serviceSlug, limit = 4 }: RelatedFAQsProps) {
  const faqs = getRelatedFAQs(serviceSlug, limit)

  if (faqs.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <HelpCircle className="h-5 w-5 text-primary" />
        Perguntas Relacionadas
      </h3>
      <div className="space-y-2">
        {faqs.map((faq) => (
          <Link
            key={faq.slug}
            href={`/faq/${faq.slug}`}
            className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
          >
            <span className="text-sm font-medium group-hover:text-primary line-clamp-1">
              {faq.question}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  )
}

interface RelatedPostsProps {
  category: string
  currentSlug?: string
  limit?: number
}

export function RelatedPostsLinks({
  category,
  currentSlug = "",
  limit = 3,
}: RelatedPostsProps) {
  const posts = getRelatedPosts(category, currentSlug, limit)

  if (posts.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <FileText className="h-5 w-5 text-primary" />
        Artigos Relacionados
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="group transition-shadow hover:shadow-lg">
            <CardContent className="p-4">
              <h4 className="font-medium group-hover:text-primary line-clamp-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h4>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-flex items-center text-sm font-medium text-primary"
              >
                Ler mais <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Wikipedia-style contextual link component
interface ContextualLinkProps {
  service?: string
  city?: string
  children: React.ReactNode
}

export function ContextualLink({ service, city, children }: ContextualLinkProps) {
  const href = city ? `/${service}/${city}` : `/${service}`
  
  return (
    <Link
      href={href}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
    >
      {children}
    </Link>
  )
}

// SEO footer with comprehensive interlinking
export function SEOFooterLinks() {
  const services = getServices()
  const cities = getCities().slice(0, 10)

  return (
    <section className="border-t border-border bg-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold">Nossos Serviços</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h4 className="mb-4 font-semibold">Principais Cidades</h4>
            <ul className="space-y-2">
              {cities.slice(0, 8).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/busca-e-apreensao/${city.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {city.name} - {city.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/calculadora-juros" className="text-sm text-muted-foreground hover:text-primary">
                  Calculadora de Juros
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-primary">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/casos-de-sucesso" className="text-sm text-muted-foreground hover:text-primary">
                  Casos de Sucesso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">Contato</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/consulta-gratuita" className="text-sm text-muted-foreground hover:text-primary">
                  Consulta Gratuita
                </Link>
              </li>
              <li>
                <Link href="https://wa.me/5511925332215" className="text-sm text-muted-foreground hover:text-primary">
                  WhatsApp
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  contato@quitadoc.com.br
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO text */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            A Quitadoc é especializada em defesa jurídica para financiamentos de veículos,
            atuando em todo o Brasil com serviços de cancelamento de busca e apreensão,
            revisão de juros abusivos, e contestação de contratos. Atendemos em São Paulo,
            Rio de Janeiro, Belo Horizonte, Salvador, Curitiba, Fortaleza e mais de 30 cidades.
          </p>
        </div>
      </div>
    </section>
  )
}
