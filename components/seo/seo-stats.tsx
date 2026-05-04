"use client"

import { getTotalPages, getServices, getCities, getFAQs, getBlogPosts } from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, MapPin, HelpCircle, Newspaper, Globe } from "lucide-react"

export function SEOStats() {
  const services = getServices()
  const cities = getCities()
  const faqs = getFAQs()
  const posts = getBlogPosts()
  const totalPages = getTotalPages()

  const stats = [
    {
      icon: Globe,
      label: "Total de Páginas",
      value: totalPages,
      description: "Páginas indexáveis",
    },
    {
      icon: FileText,
      label: "Serviços",
      value: services.length,
      description: "Áreas de atuação",
    },
    {
      icon: MapPin,
      label: "Cidades",
      value: cities.length,
      description: "Cobertura nacional",
    },
    {
      icon: HelpCircle,
      label: "FAQs",
      value: faqs.length,
      description: "Perguntas respondidas",
    },
    {
      icon: Newspaper,
      label: "Artigos",
      value: posts.length,
      description: "Conteúdo educativo",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <stat.icon className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
