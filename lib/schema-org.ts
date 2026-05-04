export function generateFAQSchema(faqs: Array<{
  question: string
  answer: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateHowToSchema(steps: Array<{
  name: string
  text: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

export function generateBreadcrumbSchema(items: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified: string
  author: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    url: article.url,
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quitadoc',
    url: 'https://www.quitadoc.com.br',
    logo: 'https://www.quitadoc.com.br/logo.png',
    description:
      'Consultoria jurídica especializada em busca e apreensão, penhora e bloqueio de bens.',
    sameAs: [
      'https://www.facebook.com/quitadoc',
      'https://www.instagram.com/quitadoc',
      'https://www.linkedin.com/company/quitadoc',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+55-11-99999-9999',
      email: 'contato@quitadoc.com.br',
    },
  }
}
