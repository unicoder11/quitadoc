'use client'

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [
    { label: "Home", href: "/" },
    ...items
  ]

  return (
    <nav className="py-4 text-sm" aria-label="Breadcrumb">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ol className="flex items-center gap-2 flex-wrap">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index === 0 ? (
                <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  {index === allItems.length - 1 ? (
                    <span className="text-foreground font-medium">{item.label}</span>
                  ) : (
                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
