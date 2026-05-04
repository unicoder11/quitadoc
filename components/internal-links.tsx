'use client'

import Link from 'next/link'
import { InterlinkingLinks } from '@/lib/interlinking'

interface InternalLinksProps {
  links: InterlinkingLinks
  variant?: 'sidebar' | 'section' | 'related'
}

export default function InternalLinks({ links, variant = 'section' }: InternalLinksProps) {
  if (variant === 'sidebar') {
    return (
      <aside className="lg:col-span-1">
        <div className="sticky top-4 space-y-6">
          {/* Links Hierárquicos */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground mb-3">Categorias</h3>
            <nav className="space-y-2">
              {links.hierarquicos.map((href, i) => (
                <Link
                  key={i}
                  href={href}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors py-1"
                >
                  {formatarLink(href)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Links Laterais - Relacionadas */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground mb-3">Relacionadas</h3>
            <nav className="space-y-2">
              {links.laterais.slice(0, 5).map((href, i) => (
                <Link
                  key={i}
                  href={href}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors py-1 truncate"
                  title={href}
                >
                  {formatarLink(href)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    )
  }

  if (variant === 'related') {
    return (
      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">Páginas Relacionadas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {links.laterais.slice(0, 6).map((href, i) => (
            <Link
              key={i}
              href={href}
              className="group p-4 rounded-lg border border-border hover:border-accent bg-card hover:bg-accent/5 transition-colors"
            >
              <p className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                {formatarLink(href)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    )
  }

  // Default: section variant
  return (
    <section className="py-12 bg-muted/30 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-foreground mb-8">Navegação Interna</h2>

      {/* Hierárquicos */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-3">Categorias Principais</h3>
        <ul className="space-y-2 grid md:grid-cols-3 gap-4">
          {links.hierarquicos.map((href, i) => (
            <li key={i}>
              <Link
                href={href}
                className="text-accent hover:underline font-medium inline-flex items-center gap-1"
              >
                {formatarLink(href)}
                <span className="text-muted-foreground">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Laterais */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Páginas Semelhantes</h3>
        <ul className="space-y-2">
          {links.laterais.slice(0, 8).map((href, i) => (
            <li key={i}>
              <Link
                href={href}
                className="text-accent hover:underline text-sm"
              >
                {formatarLink(href)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function formatarLink(href: string): string {
  return href
    .replace(/^\/negociar-divida\//, '')
    .split('/')
    .map((part) => part.replace(/-/g, ' '))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' > ')
}
