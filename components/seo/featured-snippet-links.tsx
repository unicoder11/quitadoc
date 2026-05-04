'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RelatedLink {
  href: string
  title: string
  type: 'guide' | 'faq' | 'service'
}

interface FeaturedSnippetLinksProps {
  currentSlug: string
  relatedLinks: RelatedLink[]
  className?: string
}

export function FeaturedSnippetLinks({
  currentSlug,
  relatedLinks,
  className,
}: FeaturedSnippetLinksProps) {
  if (!relatedLinks || relatedLinks.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'mt-12 rounded-lg border border-secondary bg-card/50 p-6',
        className
      )}
    >
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Conteúdo Relacionado
      </h3>
      <div className="space-y-2">
        {relatedLinks.slice(0, 5).map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-secondary"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'inline-block rounded px-2 py-1 text-xs font-medium',
                  link.type === 'guide'
                    ? 'bg-blue-100 text-blue-700'
                    : link.type === 'faq'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-purple-100 text-purple-700'
                )}
              >
                {link.type === 'guide'
                  ? 'Guia'
                  : link.type === 'faq'
                    ? 'FAQ'
                    : 'Serviço'}
              </span>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">
                {link.title}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  )
}
