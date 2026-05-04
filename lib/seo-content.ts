import seoKeywords from "@/content/seo-keywords.json"

export interface SEOPage {
  slug: string
  title: string
  h1: string
  metaDescription: string
  cluster: string
  intent: string
  directAnswer: string
  bulletPoints: string[]
  relatedSlugs: string[]
  faq: { question: string; answer: string }[]
}

export function getGuia(slug: string): SEOPage | undefined {
  return seoKeywords.guias.find((g) => g.slug === slug)
}

export function getDuvida(slug: string): SEOPage | undefined {
  return seoKeywords.duvidas.find((d) => d.slug === slug)
}

export function getAllGuias(): SEOPage[] {
  return seoKeywords.guias
}

export function getAllDuvidas(): SEOPage[] {
  return seoKeywords.duvidas
}

export function getRelatedPages(slugs: string[], type: "guias" | "duvidas"): { title: string; href: string }[] {
  const source = type === "guias" ? seoKeywords.guias : seoKeywords.duvidas
  return slugs
    .map((slug) => {
      const page = source.find((p) => p.slug === slug)
      if (page) {
        return {
          title: page.h1,
          href: `/${type}/${page.slug}`,
        }
      }
      // Check the other type
      const otherSource = type === "guias" ? seoKeywords.duvidas : seoKeywords.guias
      const otherPage = otherSource.find((p) => p.slug === slug)
      if (otherPage) {
        return {
          title: otherPage.h1,
          href: `/${type === "guias" ? "duvidas" : "guias"}/${otherPage.slug}`,
        }
      }
      return null
    })
    .filter(Boolean) as { title: string; href: string }[]
}

export function getPagesByCluster(cluster: string, type: "guias" | "duvidas", limit = 3): SEOPage[] {
  const source = type === "guias" ? seoKeywords.guias : seoKeywords.duvidas
  return source.filter((p) => p.cluster === cluster).slice(0, limit)
}

export function generateInternalLinks(currentSlug: string, currentType: "guias" | "duvidas"): { title: string; href: string }[] {
  const currentPage = currentType === "guias" ? getGuia(currentSlug) : getDuvida(currentSlug)
  if (!currentPage) return []

  const links: { title: string; href: string }[] = []

  // 2 links from same cluster
  const sameCluster = getPagesByCluster(currentPage.cluster, currentType, 3)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 2)
  sameCluster.forEach((p) => {
    links.push({ title: p.h1, href: `/${currentType}/${p.slug}` })
  })

  // 1 link from defense/high intent
  const defensePages = getPagesByCluster("defense", currentType, 2)
    .filter((p) => p.slug !== currentSlug)
  if (defensePages.length > 0) {
    links.push({ title: defensePages[0].h1, href: `/${currentType}/${defensePages[0].slug}` })
  }

  // 1 link to conversion page
  links.push({ title: "Solicitar Consulta Gratuita", href: "/consulta-gratuita" })

  return links
}

export function generateFAQSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function generateArticleSchema(page: SEOPage, type: "guias" | "duvidas") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDescription,
    author: {
      "@type": "Organization",
      name: "Quitadoc",
      url: "https://quitadoc.com.br",
    },
    publisher: {
      "@type": "Organization",
      name: "Quitadoc",
      logo: {
        "@type": "ImageObject",
        url: "https://quitadoc.com.br/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://quitadoc.com.br/${type}/${page.slug}`,
    },
  }
}

export function generateBreadcrumbSchema(breadcrumbs: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `https://quitadoc.com.br${crumb.href}`,
    })),
  }
}
