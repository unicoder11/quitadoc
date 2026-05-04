import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  getBlogPost,
  getBlogPosts,
  getService,
  getRelatedPosts,
  getRelatedFAQs,
  generateBlogStaticParams,
} from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { FormCTA } from "@/components/sections/form-cta"
import {
  ArrowRight,
  Clock,
  Calendar,
  Tag,
  User,
  Share2,
  MessageCircle,
  Phone,
} from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return generateBlogStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return { title: "Artigo não encontrado" }
  }

  return {
    title: `${post.title} | Blog Quitadoc`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedService = getService(post.category)
  const relatedPosts = getRelatedPosts(post.category, slug, 3)
  const relatedFAQs = getRelatedFAQs(post.category, 4)

  // Schema.org Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "Quitadoc",
      logo: {
        "@type": "ImageObject",
        url: "https://quitadoc.com.br/logo.png",
      },
    },
  }

  // Use real AI-generated content if available, otherwise fall back to placeholder
  const contentSections: { title: string; content: string }[] = post.content
    ? post.content
        .split(/\n\n+/)
        .filter((p) => p.trim())
        .map((para) => {
          const lines = para.trim().split('\n')
          const isHeading = lines[0].match(/^[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ][^a-z]{8,}$/) || lines[0].endsWith(':')
          if (isHeading && lines.length > 1) {
            return { title: lines[0].replace(/:$/, ''), content: lines.slice(1).join(' ') }
          }
          return { title: '', content: para.trim() }
        })
    : [
    {
      title: "Introdução",
      content: `${post.excerpt} Neste artigo, vamos explorar todos os aspectos importantes deste tema para que você possa entender seus direitos e tomar as melhores decisões.`,
    },
    {
      title: "O que você precisa saber",
      content:
        "É fundamental entender que o Código de Defesa do Consumidor protege seus direitos em relação a financiamentos de veículos. Os bancos e financeiras devem seguir regras específicas, e qualquer violação pode ser contestada judicialmente.",
    },
    {
      title: "Seus direitos",
      content:
        "Como consumidor, você tem direito à informação clara sobre todas as condições do contrato, taxas de juros praticadas e encargos cobrados. Além disso, pode solicitar revisão de valores considerados abusivos.",
    },
    {
      title: "Como proceder",
      content:
        "O primeiro passo é buscar orientação jurídica especializada. Nossa equipe de advogados pode analisar seu caso gratuitamente e indicar a melhor estratégia para proteger seus direitos.",
    },
    {
      title: "Conclusão",
      content:
        "Não deixe de buscar seus direitos. Com a orientação jurídica adequada, é possível reverter situações desfavoráveis e garantir condições mais justas em seu financiamento.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title.slice(0, 30) + "...", href: `/blog/${post.slug}` },
        ]}
      />

      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12">
              {relatedService && (
                <Link
                  href={`/${relatedService.slug}`}
                  className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <Tag className="h-4 w-4" />
                  {relatedService.shortName}
                </Link>
              )}
              <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl text-balance">
                {post.title}
              </h1>
              <p className="mb-6 text-lg text-muted-foreground">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min de leitura</span>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {contentSections.map((section, index) => (
                <section key={index} className="mb-8">
                  {section.title && <h2 className="text-2xl font-bold">{section.title}</h2>}
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </section>
              ))}

              {/* CTA Box */}
              <div className="my-12 rounded-xl bg-primary/5 p-8 not-prose">
                <h3 className="mb-4 text-xl font-bold">
                  Precisa de ajuda com seu caso?
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Nossa equipe de advogados especializados está pronta para
                  analisar seu caso gratuitamente. Entre em contato e proteja
                  seus direitos.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/consulta-gratuita">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Consulta Gratuita
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="https://wa.me/5511925332215" target="_blank">
                      <Phone className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
              <div className="text-sm text-muted-foreground">
                Última atualização:{" "}
                {new Date(post.updatedAt).toLocaleDateString("pt-BR")}
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related FAQs */}
      {relatedFAQs.length > 0 && (
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Perguntas Relacionadas
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              {relatedFAQs.map((faq) => (
                <Link
                  key={faq.slug}
                  href={`/faq/${faq.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                >
                  <span className="font-medium group-hover:text-primary">
                    {faq.question}
                  </span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Artigos Relacionados
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.slug}
                  className="group transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{relatedPost.readTime} min</span>
                    </div>
                    <h3 className="mb-2 font-semibold group-hover:text-primary">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary"
                    >
                      Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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
            subheading="Avaliação em 30 segundos."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>

      <CTASection />
    </main>
  )
}
