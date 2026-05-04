# Sistema de Interlinking Automático

## Visão Geral

Sistema de 3 níveis de interlinking que garante que **toda página criada nasce com autoridade interna automática**.

## Arquitetura

### 1. Interlinking.ts - Engine Principal

Funções:
- `gerarLinks()` - Cria 3 níveis de links (hierárquico, lateral, contextual)
- `inserirLinksNoTexto()` - Injeta links contextuais no HTML
- `gerarLinksRelacionadas()` - Seção "Páginas Relacionadas"
- `rotacaoLinks()` - Link rotation para aumentar cobertura SEO

### 2. Componentes

#### InternalLinks.tsx
- Renderiza links em 3 variantes: `sidebar`, `section`, `related`
- Responsivo e acessível
- Integrável em qualquer página

#### GeneratedPageWithInterlinking.tsx
- Template completo com interlinking automático
- Exemplo de uso real

### 3. Link Injection

Utilitários em `lib/link-injection.ts`:
- `injetarLinksContextuais()` - Injeta em parágrafo específico
- `extrairKeywords()` - Extrai termos para link automático
- `validarLink()` - Valida links antes de injetar

## 3 Níveis de Interlinking

### Nível 1: HIERÁRQUICO (Base)
```
/negociar-divida/cartao-de-credito/nubank/rj/rio-de-janeiro

Linka para:
→ /negociar-divida/nubank
→ /negociar-divida/cartao-de-credito
→ /negociar-divida/rj
```

**Impacto**: Define estrutura, organiza crawl, distribui Page Rank

### Nível 2: LATERAL (Semelhantes)
```
Links para:
→ /negociar-divida/cartao-de-credito/itau/rj/rio-de-janeiro (outro banco)
→ /negociar-divida/cartao-de-credito/nubank/sp/sao-paulo (outra cidade)
→ /negociar-divida/emprestimo-pessoal/nubank/rj/rio-de-janeiro (outro tipo)
```

**Impacto**: Conecta páginas semelhantes, aumenta relevância temática

### Nível 3: CONTEXTUAL (O Mais Forte)
```
Links no texto:
"Se sua dívida for do Nubank..." → /negociar-divida/nubank
"negociar dívida de cartão" → /negociar-divida/cartao-de-credito
```

**Impacto**: +50% ranking (links contextuais valem 10x mais que links em sidebar)

## Como Usar

### Básico
```tsx
import { gerarLinks, inserirLinksNoTexto } from '@/lib/interlinking'

const links = gerarLinks({
  tipo: 'cartao-de-credito',
  empresa: 'nubank',
  estado: 'rj',
  cidade: 'rio-de-janeiro'
})

const conteudoComLinks = inserirLinksNoTexto(conteudo, config)
```

### Com Componente
```tsx
import InternalLinks from '@/components/internal-links'

<InternalLinks links={links} variant="sidebar" />
<InternalLinks links={links} variant="related" />
```

### Template Completo
```tsx
import GeneratedPageWithInterlinking from '@/components/generated-page-with-interlinking'

<GeneratedPageWithInterlinking 
  config={config}
  conteudo={conteudo}
  titulo="Título da página"
  seed={seed}
/>
```

## Resultados Esperados

- **+50% indexação** (links automáticos aceleram crawl)
- **+30-100% ranking** (links contextuais impactam diretamente)
- **+crawl rate** (Google rasteja mais rápido estruturas internas)
- **Crescimento exponencial** (nova página → recebe links → passa autoridade → outras crescem)

## Regras de Ouro

✅ Cada página tem:
- 3 links hierárquicos
- 5-10 links laterais
- 2-5 links contextuais

❌ Não fazer:
- Links quebrados
- Links irrelevantes
- Repetir os mesmos links sempre

## Link Rotation

A função `rotacaoLinks()` oferece variação dinâmica:
- Embaralha links laterais baseado em seed
- Mantém hierárquicos fixos (base importante)
- Muda contextuais aleatoriamente

Isso aumenta cobertura SEO e evita padrão artificial detectável por Google.

## Integração com Geração em Massa

Quando criar 10.000 páginas:
```
Nova página criada
    ↓
Recebe links automáticos (3 níveis)
    ↓
É indexada mais rápido
    ↓
Passa autoridade para relacionadas
    ↓
Crescimento exponencial
```

Cada página é um nó em rede coesa de interlinking.
