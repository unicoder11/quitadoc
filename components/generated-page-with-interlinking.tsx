'use client'

import { useMemo } from 'react'
import {
  gerarLinks,
  inserirLinksNoTexto,
  rotacaoLinks,
  type InterlinkingConfig,
} from '@/lib/interlinking'
import InternalLinks from '@/components/internal-links'

interface GeneratedPageProps {
  config: InterlinkingConfig
  conteudo: string
  titulo: string
  seed?: number
}

/**
 * Componente que renderiza página gerada com interlinking automático
 * 
 * Exemplo de uso:
 * <GeneratedPageWithInterlinking 
 *   config={{ tipo: 'cartao-de-credito', empresa: 'nubank', estado: 'rj', cidade: 'rio-de-janeiro' }}
 *   conteudo="Conteúdo da página..."
 *   titulo="Título da página"
 * />
 */
export default function GeneratedPageWithInterlinking({
  config,
  conteudo,
  titulo,
  seed = 0,
}: GeneratedPageProps) {
  // Gera links com rotação automática (muda a cada página view baseado em seed)
  const links = useMemo(() => {
    const linksBase = gerarLinks(config)
    return rotacaoLinks(linksBase, seed)
  }, [config, seed])

  // Injeta links contextuais no conteúdo
  const conteudoComLinks = useMemo(() => {
    return inserirLinksNoTexto(conteudo, config)
  }, [conteudo, config])

  return (
    <article className="grid lg:grid-cols-3 gap-8">
      {/* Conteúdo Principal */}
      <div className="lg:col-span-2 space-y-6">
        <header>
          <h1 className="text-4xl font-bold text-foreground mb-4">{titulo}</h1>
          <p className="text-lg text-muted-foreground">
            Especialistas em negociação de dívida de {config.tipo.replace(/-/g, ' ')} com {config.empresa}
          </p>
        </header>

        {/* Conteúdo com links injetados */}
        <div
          className="prose prose-invert max-w-none space-y-4"
          dangerouslySetInnerHTML={{ __html: conteudoComLinks }}
        />

        {/* Páginas Relacionadas em seção separada */}
        <InternalLinks links={links} variant="related" />
      </div>

      {/* Sidebar com navegação interna */}
      <InternalLinks links={links} variant="sidebar" />
    </article>
  )
}

/**
 * Exemplo de teste com dados hardcoded
 */
export function GeneratedPageExample() {
  const config: InterlinkingConfig = {
    tipo: 'cartao-de-credito',
    empresa: 'nubank',
    estado: 'rj',
    cidade: 'rio-de-janeiro',
  }

  const conteudo = `
    <p>
      Se você tem dívida de cartão de crédito no Nubank e mora no Rio de Janeiro,
      você não está sozinho. Milhares de pessoas enfrentam essa situação todos os dias.
    </p>
    <p>
      O Nubank é uma das maiores instituições financeiras do Brasil, e sua taxa de juros
      pode chegar a 400% ao ano. Mas existe uma solução: negociar sua dívida.
    </p>
    <h2>Como funciona a negociação?</h2>
    <p>
      A negociação de dívida é um processo legal que permite reduzir o valor devido
      em até 90%. No Rio de Janeiro, temos especialistas que entendem as particularidades
      de cada estado e instituição.
    </p>
    <p>
      Se sua dívida for de cartão de crédito, veja também outras opções de negociação
      com diferentes bancos e instituições financeiras.
    </p>
  `

  return (
    <GeneratedPageWithInterlinking
      config={config}
      conteudo={conteudo}
      titulo="Negociar Dívida de Cartão de Crédito Nubank no Rio de Janeiro"
      seed={Math.random()}
    />
  )
}
