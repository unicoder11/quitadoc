import { Metadata } from "next"
import Link from "next/link"
import { getBlogPosts, getServices, getFeaturedPosts } from "@/lib/content"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"

export const metadata: Metadata = {
  title: "Blog | Artigos sobre Busca e Apreensão, Alienação Fiduciária e Direitos do Consumidor",
  description: "Conteúdo educativo sobre busca e apreensão, alienação fiduciária, juros abusivos, e direitos do consumidor em financiamentos de veículos.",
  keywords: ["blog defesa veicular", "artigos busca e apreensão", "direitos financiamento veículo", "juros abusivos artigos"],
  openGraph: {
    title: "Blog Quitadoc | Conteúdo sobre Defesa Veicular",
    description: "Artigos educativos sobre busca e apreensão, alienação fiduciária e direitos do consumidor.",
  },
  alternates: {
    canonical: "https://www.quitadoc.com.br/blog"
  }
}

export default function BlogPage() {
  const allPosts = getBlogPosts()
  const featuredPosts = getFeaturedPosts()
  const services = getServices()

  // Get unique categories from posts
  const categories = ["Todos", ...new Set(allPosts.map(p => p.category))]

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
            <BookOpen className="h-4 w-4" />
            <span>Blog Jurídico</span>
          </div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Blog Quitadoc</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Conteúdo educativo sobre busca e apreensão, alienação fiduciária, 
            juros abusivos e direitos do consumidor em financiamentos de veículos.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold">Artigos em Destaque</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts with Sidebar */}
      <section className="bg-secondary/30 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="shrink-0 lg:w-64">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-3 font-semibold">Buscar</h3>
                    <Input 
                      type="search" 
                      placeholder="Buscar artigos..." 
                    />
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-3 font-semibold">Categorias</h3>
                    <div className="flex flex-wrap gap-2">
                      {services.slice(0, 5).map((service) => (
                        <Link
                          key={service.slug}
                          href={`/${service.slug}`}
                          className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-white"
                        >
                          {service.shortName}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="border-primary bg-primary text-white">
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Precisa de Ajuda?</h3>
                    <p className="mt-2 text-sm text-white/80">
                      Consulta gratuita com especialistas em defesa veicular.
                    </p>
                    <Button asChild className="mt-4 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <Link href="/consulta-gratuita">
                        Consultar Agora
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* FAQ Link */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold">Dúvidas Frequentes</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Veja as perguntas mais comuns sobre financiamentos.
                    </p>
                    <Link
                      href="/faq"
                      className="inline-flex items-center text-sm font-medium text-primary"
                    >
                      Ver FAQ <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Posts Grid */}
            <div className="flex-1">
              <h2 className="mb-8 text-2xl font-bold">Todos os Artigos</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {allPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Pagination placeholder */}
              <div className="mt-12 flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Exibindo {allPosts.length} artigos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Nossos Serviços Jurídicos
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.filter(s => s.pillar).slice(0, 3).map((service) => (
              <Card key={service.slug} className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                    <Link href={`/${service.slug}`}>{service.name}</Link>
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    href={`/${service.slug}`}
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

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra se seu caso ainda tem solução"
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
            subheading="Avaliação em 30 segundos. Ver minhas opções sem compromisso."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>

      <CTASection />
    </main>
  )
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: number
  featured?: boolean
}

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className={`h-full transition-all hover:shadow-lg hover:border-primary/20 ${featured ? 'border-primary/10' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
              {post.category.replace("-", " ")}
            </span>
            {featured && (
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Destaque
              </span>
            )}
          </div>
          <h3 className="mt-4 font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min
            </span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Ler artigo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
