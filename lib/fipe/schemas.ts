// JSON-LD schemas for FIPE data
import { FipePrice } from './mock-data'

export function generateFipeSchema(price: FipePrice) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    'name': `${price.brand} ${price.model} ${price.year}`,
    'brand': {
      '@type': 'Brand',
      'name': price.brand,
    },
    'model': price.model,
    'modelDate': price.year,
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'BRL',
      'price': price.price.toString(),
      'url': `https://www.quitadoc.com.br/fipe?search=${price.brand}+${price.model}`,
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  }
}

export function generateFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'O que é a tabela FIPE?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A tabela FIPE é o referencial oficial de preços de veículos no Brasil, elaborada pela Fundação Instituto de Pesquisas Econômicas.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Com que frequência a tabela FIPE é atualizada?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A tabela FIPE é atualizada diariamente com os preços mais recentes do mercado automotivo.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Como usar os dados FIPE?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Os dados FIPE podem ser usados para negociar preços na compra ou venda de um veículo, solicitar indenizações de seguradoras, e tomar decisões informadas sobre o seu patrimônio.',
        },
      },
    ],
  }
}

export function generateProductSchema(brand: string, model: string, year: number, price: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `${brand} ${model} ${year}`,
    'brand': {
      '@type': 'Brand',
      'name': brand,
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'BRL',
      'price': price.toString(),
      'availability': 'https://schema.org/InStock',
    },
    'category': 'Automotive',
  }
}
