import { Metadata } from 'next'

export interface PageConfig {
  service: string
  institution: string
  productType?: string
  state?: string
  city?: string
}

interface PageData {
  slug: string
  metadata: Metadata
  content: string
  internalLinks: string[]
  schema: any
}

const SERVICES_MAP: Record<string, { display: string; description: string }> = {
  'negociar-divida': { display: 'Negociar Dívida', description: 'negociação de dívida' },
  'cancelar-busca-apreensao': { display: 'Cancelar Busca e Apreensão', description: 'cancelamento de busca e apreensão' },
  'revisao-contrato': { display: 'Revisão de Contrato', description: 'revisão de contrato' },
  'reducao-juros': { display: 'Redução de Juros', description: 'redução de juros abusivos' },
  'contestacao-leilao': { display: 'Contestação de Leilão', description: 'contestação de leilão' },
}

const INSTITUTIONS_MAP: Record<string, string> = {
  'nubank': 'Nubank',
  'inter': 'Inter',
  'c6': 'C6 Bank',
  'neon': 'Neon',
  'picpay': 'PicPay',
  'itau': 'Itaú',
  'bradesco': 'Bradesco',
  'santander': 'Santander',
  'bb': 'Banco do Brasil',
  'caixa': 'Caixa Econômica',
  'safra': 'Banco Safra',
  'bmg': 'BMG',
  'pan': 'PAN',
  'votorantim': 'Votorantim',
  'original': 'Original',
}

const STATES_MAP: Record<string, string> = {
  'rj': 'Rio de Janeiro',
  'sp': 'São Paulo',
  'mg': 'Minas Gerais',
  'rs': 'Rio Grande do Sul',
  'pr': 'Paraná',
  'sc': 'Santa Catarina',
  'ba': 'Bahia',
  'pe': 'Pernambuco',
  'ce': 'Ceará',
  'pa': 'Pará',
}

const CITIES_MAP: Record<string, string> = {
  'rio-de-janeiro': 'Rio de Janeiro',
  'sao-paulo': 'São Paulo',
  'belo-horizonte': 'Belo Horizonte',
  'porto-alegre': 'Porto Alegre',
  'curitiba': 'Curitiba',
  'brasilia': 'Brasília',
  'salvador': 'Salvador',
  'recife': 'Recife',
}

export function generatePageContent(config: PageConfig): PageData {
  const service = SERVICES_MAP[config.service] || { display: config.service, description: config.service }
  const institution = INSTITUTIONS_MAP[config.institution] || config.institution
  const state = config.state ? STATES_MAP[config.state] || config.state : null
  const city = config.city ? CITIES_MAP[config.city] || config.city : null
  const location = city || state || 'Brasil'

  const slug = generateSlug(config)
  const metadata = generateMetadata(config, service, institution, location)
  const content = generateContent(config, service, institution, location)
  const internalLinks = generateInternalLinks(config)
  const schema = generateSchema(config, slug, service, institution, location)

  return {
    slug,
    metadata,
    content,
    internalLinks,
    schema,
  }
}

function generateSlug(config: PageConfig): string {
  const parts = [
    config.service,
    config.productType,
    config.institution,
    config.state,
    config.city,
  ].filter(Boolean)

  return `/${parts.join('/')}`
}

function generateMetadata(config: PageConfig, service: any, institution: string, location: string): Metadata {
  const title = `${service.display} com ${institution} | ${location} | Quitadoc`
  const description = `Especialistas em ${service.description} com ${institution} em ${location}. Economia de até 80%. Taxa de sucesso 87%. Consulta gratuita em 2h.`

  return {
    title,
    description,
    keywords: [
      `${service.description} ${institution}`,
      `como ${service.description.toLowerCase()} ${institution.toLowerCase()}`,
      `${service.description} ${location}`,
      `negociar ${institution.toLowerCase()}`,
      `defesa contra ${institution.toLowerCase()}`,
    ],
  }
}

function generateContent(config: PageConfig, service: any, institution: string, location: string): string {
  const intro = generateIntro(config, service, institution, location)
  const process = generateProcess(config, service, institution)
  const benefits = generateBenefits(config, service, institution)
  const testimonials = generateTestimonials(config, location)
  const faq = generateFAQ(config, service, institution)

  return `
<article className="prose prose-lg max-w-4xl mx-auto">
  <h1>${service.display} com ${institution} em ${location}</h1>
  
  <section className="my-8">
    <p className="lead">${intro}</p>
  </section>
  
  <section className="my-8">
    <h2>Como Funciona o ${service.display}</h2>
    ${process}
  </section>
  
  <section className="my-8">
    <h2>Por Que Escolher Nossos Serviços?</h2>
    ${benefits}
  </section>
  
  <section className="my-8">
    <h2>Casos de Sucesso em ${location}</h2>
    ${testimonials}
  </section>
  
  <section className="my-8">
    <h2>Dúvidas Frequentes</h2>
    ${faq}
  </section>
  
  <section className="my-8 p-6 bg-primary/10 rounded-lg">
    <h2>Comece Agora Gratuitamente</h2>
    <p>Consulta completa e sem compromisso com nossos especialistas. Resultado em até 2 horas.</p>
  </section>
</article>
  `
}

function generateIntro(config: PageConfig, service: any, institution: string, location: string): string {
  const intros = [
    `Se você está enfrentando dificuldades com ${service.description.toLowerCase()} com ${institution} em ${location}, saiba que existem soluções legais que podem reduzir significativamente o valor devido. Nossa equipe especializada em defesa do consumidor já ajudou mais de 650 clientes em situações similares com taxa de sucesso de 87%.`,

    `Dívidas com ${institution} podem conter irregularidades como juros abusivos, taxas ilegais e cobranças indevidas. Através de análise técnica do contrato, conseguimos identificar essas falhas e executar o ${service.description.toLowerCase()} de forma legal e eficaz para clientes em ${location}.`,

    `O ${institution} é uma das instituições financeiras mais procuradas para produtos financeiros no Brasil. Quando surgem dificuldades de pagamento, muitos clientes desconhecem seus direitos legais. Nossa especialização em ${service.description.toLowerCase()} já resultou em economia de milhões de reais para nossos clientes em todo o Brasil, inclusive em ${location}.`,
  ]

  return intros[Math.floor(Math.random() * intros.length)]
}

function generateProcess(config: PageConfig, service: any, institution: string): string {
  return `
<ol className="space-y-4">
  <li><strong>Análise Gratuita:</strong> Avaliamos seu caso com ${institution} sem custo ou compromisso</li>
  <li><strong>Identificação de Irregularidades:</strong> Encontramos falhas no contrato que aumentam seu poder de negociação</li>
  <li><strong>Negociação Estratégica:</strong> Apresentamos as irregularidades ao ${institution} para conseguir redução significativa</li>
  <li><strong>Acordo Formalizado:</strong> Você recebe documento oficial garantindo a redução de até 80% da dívida</li>
  <li><strong>Suporte Contínuo:</strong> Acompanhamos todo o processo até a quitação final</li>
</ol>
  `
}

function generateBenefits(config: PageConfig, service: any, institution: string): string {
  return `
<ul className="space-y-3">
  <li>✓ Redução de até 80% do valor original da dívida</li>
  <li>✓ Parcelamento em até 24x sem juros</li>
  <li>✓ Especialistas focados em ${institution}</li>
  <li>✓ Atendimento 100% digital e remoto</li>
  <li>✓ Sem custos iniciais - você só paga após o resultado</li>
  <li>✓ Taxa de sucesso comprovada de 87%</li>
  <li>✓ Negociação direta com os maiores bancos</li>
</ul>
  `
}

function generateTestimonials(config: PageConfig, location: string): string {
  return `
<div className="space-y-6">
  <div className="border-l-4 border-primary pl-4">
    <p className="italic">"Economizei mais de R$ 30.000 com a ajuda da Quitadoc. Processo rápido e seguro."</p>
    <p className="mt-2 font-semibold">- Carlos M., ${location}</p>
  </div>
  
  <div className="border-l-4 border-primary pl-4">
    <p className="italic">"Meu nome estava negativado e conseguiram resolver tudo em 15 dias. Recomendo!"</p>
    <p className="mt-2 font-semibold">- Maria S., ${location}</p>
  </div>
  
  <div className="border-l-4 border-primary pl-4">
    <p className="italic">"Achei que ia perder meu carro. Eles cancelaram a busca e apreensão."</p>
    <p className="mt-2 font-semibold">- Roberto L., ${location}</p>
  </div>
</div>
  `
}

function generateFAQ(config: PageConfig, service: any, institution: string): string {
  return `
<div className="space-y-6">
  <div>
    <h3 className="font-semibold mb-2">Quanto posso economizar?</h3>
    <p>A economia média é de 50-80% do valor total da dívida. Uma dívida de R$ 30.000 pode ser quitada por apenas R$ 9.000 a R$ 15.000.</p>
  </div>
  
  <div>
    <h3 className="font-semibold mb-2">Quanto tempo leva?</h3>
    <p>O processo médio leva 30-60 dias. Casos urgentes podem ser resolvidos em 24-48 horas com medidas liminares.</p>
  </div>
  
  <div>
    <h3 className="font-semibold mb-2">Preciso pagar algo adiantado?</h3>
    <p>Não. A consulta, análise e negociação são 100% gratuitas. Você só paga 10% do valor economizado após o acordo.</p>
  </div>
  
  <div>
    <h3 className="font-semibold mb-2">Funcionará com meu contrato?</h3>
    <p>Analisamos o seu caso específico gratuitamente. A maioria dos contratos tem irregularidades que podemos explorar legalmente.</p>
  </div>
</div>
  `
}

function generateInternalLinks(config: PageConfig): string[] {
  const links: string[] = []

  // Link to service hub
  links.push(`/${config.service}`)

  // Link to institution hub
  links.push(`/${config.service}/${config.institution}`)

  // Link to product type if applicable
  if (config.productType) {
    links.push(`/${config.service}/${config.productType}`)
  }

  // Link to state if applicable
  if (config.state) {
    links.push(`/${config.service}/${config.state}`)
  }

  // Related services
  links.push('/negociar-divida')
  links.push('/cancelar-busca-apreensao')
  links.push('/revisao-contrato')

  return links
}

function generateSchema(config: PageConfig, slug: string, service: any, institution: string, location: string): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${service.display} com ${institution}`,
    description: `Serviço de ${service.description} especializado em ${institution} em ${location}`,
    url: `https://www.quitadoc.com.br${slug}`,
    telephone: '+55-11-92533-2215',
    email: 'contato@quitadoc.com.br',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: config.state || 'RJ',
    },
    areaServed: location,
    serviceType: service.display,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '650',
    },
  }
}
