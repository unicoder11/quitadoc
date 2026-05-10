'use client'

import { FipeEmbedGenerator } from '@/components/fipe/fipe-embed-generator'

export default function EmbedGeneratorPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light py-12 md:py-20">
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-balance">
            Embed FIPE
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mt-4">
            Adicione a tabela FIPE ao seu site e gere tráfego de backlinks automaticamente
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <FipeEmbedGenerator />
        </div>
      </section>
    </main>
  )
}
