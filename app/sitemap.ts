import { MetadataRoute } from "next"
import {
  getServices,
  getCities,
  getFAQs,
  getBlogPosts,
} from "@/lib/content"
import { getAllGuias, getAllDuvidas } from "@/lib/seo-content"

const BASE_URL = "https://www.quitadoc.com.br"

// Generated pages tier structure for programmatic SEO
const GENERATED_SERVICES = [
  'negociar-divida',
  'cancelar-busca-apreensao',
  'revisao-contrato',
  'reducao-juros',
  'contestacao-leilao',
]

const GENERATED_INSTITUTIONS = [
  'nubank', 'inter', 'c6', 'neon', 'picpay',
  'itau', 'bradesco', 'santander', 'bb', 'caixa',
  'safra', 'bmg', 'pan', 'votorantim', 'original',
]

const GENERATED_STATES = [
  'rj', 'sp', 'mg', 'rs', 'pr', 'sc', 'ba', 'pe',
]

const TOP_CITIES: Record<string, string[]> = {
  'sp': ['sao-paulo', 'campinas', 'santos'],
  'rj': ['rio-de-janeiro', 'niteroi'],
  'mg': ['belo-horizonte', 'uberlandia'],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices()
  const cities = getCities()
  const faqs = getFAQs()
  const posts = getBlogPosts()
  const guias = getAllGuias()
  const duvidas = getAllDuvidas()

  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/consulta-gratuita`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/como-funciona`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/casos-de-sucesso`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/calculadora-juros`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guias`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/duvidas`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  // Service pillar pages (high priority)
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: service.pillar ? 0.9 : 0.8,
  }))

  // Service + City pages (programmatic SEO - highest volume)
  const serviceCityPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    cities.map((city) => ({
      url: `${BASE_URL}/${service.slug}/${city.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      // Higher priority for capital cities
      priority: city.priority === 1 ? 0.8 : city.priority === 2 ? 0.7 : 0.6,
    }))
  )

  // PHASE 1: Generated Hub Pages (Service + Institution)
  const generatedHubPages: MetadataRoute.Sitemap = GENERATED_SERVICES.flatMap((service) =>
    GENERATED_INSTITUTIONS.map((institution) => ({
      url: `${BASE_URL}/${service}/${institution}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  )

  // PHASE 2: Generated State Pages (Service + Institution + State)
  const generatedStatePages: MetadataRoute.Sitemap = GENERATED_SERVICES.flatMap((service) =>
    GENERATED_INSTITUTIONS.slice(0, 10).flatMap((institution) =>
      GENERATED_STATES.map((state) => ({
        url: `${BASE_URL}/${service}/${institution}/${state}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    )
  )

  // PHASE 3: Generated City Pages (Service + Institution + City)
  const generatedCityPages: MetadataRoute.Sitemap = GENERATED_SERVICES.flatMap((service) =>
    GENERATED_INSTITUTIONS.slice(0, 8).flatMap((institution) =>
      Object.entries(TOP_CITIES).flatMap(([state, citySlugs]) =>
        citySlugs.map((city) => ({
          url: `${BASE_URL}/${service}/${institution}/${state}/${city}`,
          lastModified: currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.65,
        }))
      )
    )
  )

  // FAQ pages
  const faqPages: MetadataRoute.Sitemap = faqs.map((faq) => ({
    url: `${BASE_URL}/faq/${faq.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.7 : 0.6,
  }))

  // Guias pages (Featured Snippet optimized - high priority)
  const guiasPages: MetadataRoute.Sitemap = guias.map((guia) => ({
    url: `${BASE_URL}/guias/${guia.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: guia.cluster === "defense" ? 0.9 : 0.85,
  }))

  // Duvidas pages (FAQ optimized)
  const duvidasPages: MetadataRoute.Sitemap = duvidas.map((duvida) => ({
    url: `${BASE_URL}/duvidas/${duvida.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: duvida.intent === "transactional" ? 0.85 : 0.8,
  }))

  // Rotas dinâmicas programáticas de negociação de dívida
  let negociarPages: MetadataRoute.Sitemap = []
  try {
    const dinamicasRoutes = require("@/data/cache/dynamic-routes.json")
    negociarPages = dinamicasRoutes.map((route: any) => ({
      url: `${BASE_URL}${route.path}`,
      lastModified: currentDate,
      changeFrequency: route.changefreq as const,
      priority: parseFloat(route.priority),
    }))
  } catch (error) {
    console.warn("Cache de rotas dinâmicas não encontrado - usando fallback")
  }

  return [
    ...staticPages,
    ...servicePages,
    ...serviceCityPages,
    ...generatedHubPages,
    ...generatedStatePages,
    ...generatedCityPages,
    ...faqPages,
    ...blogPages,
    ...guiasPages,
    ...duvidasPages,
    ...negociarPages,
  ]
}
