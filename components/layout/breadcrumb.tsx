import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://www.quitadoc.com.br${item.href}` : undefined
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="flex items-center hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span className="sr-only">Inicio</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
