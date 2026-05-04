import servicesData from "@/content/services.json"
import citiesData from "@/content/cities.json"
import faqData from "@/content/faq.json"
import blogPostsData from "@/content/blog-posts.json"

// Types
export interface Service {
  slug: string
  name: string
  shortName: string
  description: string
  intent: string
  cluster: string
  pillar: boolean
  heroTitle: string
  heroSubtitle: string
  benefits: string[]
  keywords: string[]
  relatedServices: string[]
  faqs: { question: string; answer: string }[]
}

export interface City {
  slug: string
  name: string
  state: string
  region: string
  population: number
  priority: number
  tribunalName: string
  tribunalAcronym: string
  localInfo: string
}

export interface FAQ {
  slug: string
  question: string
  answer: string
  category: string
  relatedServices: string[]
  keywords: string[]
  intent: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  updatedAt: string
  readTime: number
  featured: boolean
  keywords: string[]
  content?: string
}

// Data accessors
export function getServices(): Service[] {
  return servicesData.services as Service[]
}

export function getService(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug)
}

export function getPillarServices(): Service[] {
  return getServices().filter((s) => s.pillar)
}

export function getCities(): City[] {
  return citiesData.cities as City[]
}

export function getCity(slug: string): City | undefined {
  return getCities().find((c) => c.slug === slug)
}

export function getCitiesByPriority(priority: number): City[] {
  return getCities().filter((c) => c.priority <= priority)
}

export function getCitiesByRegion(region: string): City[] {
  return getCities().filter((c) => c.region === region)
}

export function getFAQs(): FAQ[] {
  return faqData.faqs as FAQ[]
}

export function getFAQ(slug: string): FAQ | undefined {
  return getFAQs().find((f) => f.slug === slug)
}

export function getFAQsByCategory(category: string): FAQ[] {
  return getFAQs().filter((f) => f.category === category)
}

export function getBlogPosts(): BlogPost[] {
  return blogPostsData.posts as BlogPost[]
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug)
}

export function getFeaturedPosts(): BlogPost[] {
  return getBlogPosts().filter((p) => p.featured)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getBlogPosts().filter((p) => p.category === category)
}

// SEO Helpers
export function generateServiceCityTitle(service: Service, city: City): string {
  return `${service.name} em ${city.name} - ${city.state} | Advogado Especialista 2026`
}

export function generateServiceCityDescription(service: Service, city: City): string {
  return `${service.description} em ${city.name}, ${city.state}. Atendimento especializado no ${city.tribunalAcronym}. Consulta gratuita e análise do seu caso.`
}

export function generateServiceCityKeywords(service: Service, city: City): string[] {
  const baseKeywords = service.keywords.map((k) => `${k} ${city.name}`)
  const additionalKeywords = [
    `advogado ${service.shortName.toLowerCase()} ${city.name}`,
    `${service.shortName.toLowerCase()} ${city.state}`,
    `${city.tribunalAcronym} ${service.shortName.toLowerCase()}`,
  ]
  return [...baseKeywords, ...additionalKeywords]
}

// Interlinking helpers
export function getRelatedServices(serviceSlug: string): Service[] {
  const service = getService(serviceSlug)
  if (!service) return []
  return service.relatedServices
    .map((slug) => getService(slug))
    .filter((s): s is Service => s !== undefined)
}

export function getOtherCitiesForService(currentCitySlug: string, limit = 6): City[] {
  return getCities()
    .filter((c) => c.slug !== currentCitySlug)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit)
}

export function getRelatedFAQs(serviceSlug: string, limit = 4): FAQ[] {
  return getFAQs()
    .filter((f) => f.relatedServices.includes(serviceSlug))
    .slice(0, limit)
}

export function getRelatedPosts(category: string, currentSlug: string, limit = 3): BlogPost[] {
  return getBlogPosts()
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, limit)
}

// Static params generators for Next.js
export function generateServiceStaticParams() {
  return getServices().map((service) => ({
    service: service.slug,
  }))
}

export function generateServiceCityStaticParams() {
  const services = getServices()
  const cities = getCities()
  const params: { service: string; city: string }[] = []

  for (const service of services) {
    for (const city of cities) {
      params.push({
        service: service.slug,
        city: city.slug,
      })
    }
  }

  return params
}

export function generateFAQStaticParams() {
  return getFAQs().map((faq) => ({
    slug: faq.slug,
  }))
}

export function generateBlogStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }))
}

// Stats
export function getTotalPages(): number {
  const services = getServices().length
  const cities = getCities().length
  const faqs = getFAQs().length
  const posts = getBlogPosts().length

  // Service pages + Service x City combinations + FAQs + Blog posts
  return services + services * cities + faqs + posts
}
