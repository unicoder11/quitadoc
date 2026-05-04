'use client';

import { useState, useEffect } from 'react';
import { ContentGenerator, PageContext, PageContent } from '@/lib/contentGenerator';
import { PagePreview } from '@/components/page-preview';

const DEMO_CONFIGS: PageContext[] = [
  { service: 'negociar-divida', institution: 'nubank' },
  { service: 'negociar-divida', institution: 'nubank', state: 'sp' },
  { service: 'negociar-divida', institution: 'nubank', state: 'sp', city: 'sao-paulo' },
  { service: 'cancelar-busca-apreensao', institution: 'itau', state: 'rj', city: 'rio-de-janeiro' },
  { service: 'reducao-juros', institution: 'bradesco', state: 'mg' },
];

export default function GeneratorDemo() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateContent() {
      setLoading(true);
      const generator = new ContentGenerator();
      const config = DEMO_CONFIGS[selectedIndex];
      
      try {
        const generated = await generator.generatePageContent(config);
        setContent(generated);
      } catch (error) {
        console.error('Erro ao gerar conteúdo:', error);
      } finally {
        setLoading(false);
      }
    }

    generateContent();
  }, [selectedIndex]);

  const currentConfig = DEMO_CONFIGS[selectedIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Content Generator Demo</h1>
          <p className="text-primary-foreground/80">
            Sistema de geração de conteúdo único com Spintax Engine
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {DEMO_CONFIGS.map((config, idx) => {
              const label = [
                config.service,
                config.productType,
                config.institution,
                config.state,
                config.city,
              ]
                .filter(Boolean)
                .slice(0, 2)
                .join(' + ');

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedIndex === idx
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {idx + 1}. {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-secondary/50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid md:grid-cols-5 gap-4 text-sm">
            <div>
              <p className="text-foreground/60 mb-1">Serviço</p>
              <p className="font-semibold text-foreground">{currentConfig.service}</p>
            </div>
            <div>
              <p className="text-foreground/60 mb-1">Instituição</p>
              <p className="font-semibold text-foreground">{currentConfig.institution}</p>
            </div>
            {currentConfig.productType && (
              <div>
                <p className="text-foreground/60 mb-1">Produto</p>
                <p className="font-semibold text-foreground">{currentConfig.productType}</p>
              </div>
            )}
            {currentConfig.state && (
              <div>
                <p className="text-foreground/60 mb-1">Estado</p>
                <p className="font-semibold text-foreground">{currentConfig.state.toUpperCase()}</p>
              </div>
            )}
            {currentConfig.city && (
              <div>
                <p className="text-foreground/60 mb-1">Cidade</p>
                <p className="font-semibold text-foreground">{currentConfig.city}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-foreground/60">Gerando conteúdo...</p>
            </div>
          </div>
        ) : content ? (
          <>
            <PagePreview content={content} />
            
            {/* Debug Info */}
            <div className="mt-12 p-6 bg-secondary/50 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">📊 Estatísticas</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-foreground/60">Caracteres (Intro)</p>
                  <p className="text-lg font-semibold text-foreground">{content.intro.length}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Benefícios</p>
                  <p className="text-lg font-semibold text-foreground">{content.benefits.length}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Total de Seções</p>
                  <p className="text-lg font-semibold text-foreground">6</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-foreground/60">
            Erro ao gerar conteúdo
          </div>
        )}
      </div>
    </div>
  );
}
