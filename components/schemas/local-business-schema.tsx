export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "name": "Quitadoc",
    "alternateName": "Quitadoc - Especialistas em Cancelamento de Busca e Apreensão",
    "description": "Especialistas em defesa veicular com mais de 5 anos de experiência. Cancelamento de busca e apreensão, revisão de contratos e redução de juros abusivos.",
    "url": "https://www.quitadoc.com.br",
    "logo": "https://www.quitadoc.com.br/logo.png",
    "image": "https://www.quitadoc.com.br/logo.png",
    "telephone": "+5511925332215",
    "email": "contato@quitadoc.com.br",
    "priceRange": "Success fee 10%",
    "paymentAccepted": "Pix, Transferência Bancária, Cartão de Crédito",
    "currenciesAccepted": "BRL",
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-13:00"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR",
      "postalCode": "20000-000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-22.9068",
      "longitude": "-43.1729"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Brasil"
      },
      {
        "@type": "State",
        "name": "Rio de Janeiro"
      },
      {
        "@type": "State",
        "name": "São Paulo"
      },
      {
        "@type": "State",
        "name": "Minas Gerais"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-22.9068",
        "longitude": "-43.1729"
      },
      "geoRadius": "5000000"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Jurídicos Veiculares",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cancelamento de Busca e Apreensão",
            "description": "Defesa especializada para impedir ou reverter a apreensão do seu veículo financiado"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Defesa em Alienação Fiduciária",
            "description": "Proteção jurídica em contratos de alienação fiduciária com cláusulas abusivas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Revisão de Contrato de Financiamento",
            "description": "Análise e revisão de contratos de financiamento para identificar abusos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Redução de Juros Abusivos",
            "description": "Ação revisional para reduzir juros abusivos e taxas ilegais do seu financiamento"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Contestação de Leilão de Veículo",
            "description": "Defesa para impedir ou anular leilão de veículo realizado de forma irregular"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/quitadoc",
      "https://www.instagram.com/quitadoc",
      "https://www.linkedin.com/company/quitadoc",
      "https://www.wikidata.org/wiki/Q130901234",
      "https://www.crunchbase.com/organization/quitadoc"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
    "telephone": "+5511925332215",
      "contactType": "customer service",
      "areaServed": "BR",
      "availableLanguage": ["Portuguese", "pt-BR"]
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quitadoc",
    "url": "https://www.quitadoc.com.br",
    "logo": "https://www.quitadoc.com.br/logo.png",
    "description": "Especialistas em Cancelamento de Busca e Apreensão de Veículos",
    "foundingDate": "2020",
    "slogan": "Proteja seu patrimônio com quem entende do assunto",
    "email": "contato@quitadoc.com.br",
    "telephone": "+5511925332215",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    },
    "sameAs": [
      "https://www.facebook.com/quitadoc",
      "https://www.instagram.com/quitadoc",
      "https://www.linkedin.com/company/quitadoc"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Quitadoc",
    "url": "https://www.quitadoc.com.br",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.quitadoc.com.br/busca?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://www.quitadoc.com.br/"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é busca e apreensão de veículo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Busca e apreensão é um procedimento judicial que permite ao credor (banco ou financeira) retomar a posse do veículo financiado quando há inadimplência no pagamento das parcelas. É regulado pelo Decreto-Lei 911/69 e ocorre em contratos com alienação fiduciária."
        }
      },
      {
        "@type": "Question",
        "name": "Posso cancelar a busca e apreensão depois de notificado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Mesmo após ser notificado, você tem direito de defesa. Podemos contestar a ação identificando irregularidades no contrato, juros abusivos, falhas na notificação ou outras ilegalidades. A Quitadoc tem 87% de taxa de sucesso nesses casos."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto custa o serviço da Quitadoc?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabalhamos com success fee de apenas 10% do valor da causa. Você só paga se ganharmos o caso. Não há custos iniciais, apenas após o resultado positivo."
        }
      },
      {
        "@type": "Question",
        "name": "Vocês atuam em qual estado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atuamos em todo o Brasil. Temos experiência em todas as varas cíveis do país e podemos defender seu caso independentemente do estado onde você mora."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto tempo leva para resolver meu caso?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O prazo médio é de 30 a 90 dias, dependendo da complexidade do caso e da vara judicial. A análise inicial é feita em até 2 horas e a petição é elaborada em 24-48 horas."
        }
      },
      {
        "@type": "Question",
        "name": "Preciso pagar as parcelas atrasadas para me defender?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não necessariamente. Nossa estratégia é contestar as irregularidades do contrato primeiro. Em muitos casos, conseguimos reduzir o valor da dívida em 40-80% devido a juros abusivos e cobranças ilegais."
        }
      },
      {
        "@type": "Question",
        "name": "O que é alienação fiduciária?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É uma garantia do financiamento onde o veículo permanece em nome do banco até a quitação total. Você tem a posse do bem, mas a propriedade só é transferida após o pagamento completo. Consta no documento do veículo."
        }
      },
      {
        "@type": "Question",
        "name": "Quais são os juros máximos permitidos por lei?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não há limite fixo, mas o STJ considera abusivos juros muito acima da média de mercado (normalmente acima de 2% ao mês). Também são ilegais: TAC, taxa de cadastro, seguros duplicados e outras cobranças não previstas inicialmente."
        }
      },
      {
        "@type": "Question",
        "name": "É possível impedir o leilão do meu veículo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Podemos entrar com ação para suspender o leilão e contestar sua legalidade. Se o leilão já ocorreu de forma irregular, também é possível anulá-lo judicialmente e recuperar o veículo."
        }
      },
      {
        "@type": "Question",
        "name": "Meu veículo já foi apreendido. Ainda posso recuperar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Você tem 5 dias para purgar a mora (pagar a dívida) ou 15 dias para apresentar defesa judicial. Mesmo após esse prazo, podemos contestar irregularidades e buscar a devolução do veículo."
        }
      },
      {
        "@type": "Question",
        "name": "O que acontece se eu ignorar a notificação de busca e apreensão?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ignorar a notificação é muito arriscado. O banco pode obter liminar de apreensão imediata e você perderá o direito de defesa. A dívida continuará crescendo com juros e multas. É essencial agir rapidamente."
        }
      },
      {
        "@type": "Question",
        "name": "Como funciona a revisão de contrato de financiamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Analisamos seu contrato em busca de cláusulas abusivas: juros excessivos, TAC, taxas ilegais, seguros duplicados. Se encontrarmos irregularidades, entramos com ação revisional para reduzir as parcelas e reaver valores pagos indevidamente."
        }
      },
      {
        "@type": "Question",
        "name": "Vocês também atuam em financiamentos de imóveis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nosso foco é exclusivamente em financiamento de veículos (carros, motos, caminhões). Essa especialização nos permite ter 87% de taxa de sucesso, pois conhecemos profundamente as particularidades desse tipo de contrato."
        }
      },
      {
        "@type": "Question",
        "name": "Preciso ir ao escritório presencialmente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não! Todo o processo pode ser feito 100% online. Consulta, análise de documentos, assinatura de contratos e acompanhamento do processo são feitos remotamente por WhatsApp, e-mail e telefone."
        }
      },
      {
        "@type": "Question",
        "name": "Quais documentos preciso para a consulta gratuita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para análise inicial: documento do veículo (CRLV), contrato de financiamento e notificação de busca e apreensão (se houver). Podemos começar a análise mesmo se você não tiver todos os documentos em mãos."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre busca e apreensão e execução de dívida?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Busca e apreensão visa recuperar o bem dado em garantia (veículo). Execução de dívida busca receber o valor devido, podendo penhorar outros bens. Às vezes o banco faz ambas simultaneamente."
        }
      },
      {
        "@type": "Question",
        "name": "Posso contestar uma dívida que já foi para o SPC/Serasa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Se a dívida tem origem em contrato com irregularidades, podemos contestar a negativação e solicitar a retirada do seu nome dos cadastros de inadimplentes, além de buscar indenização por danos morais."
        }
      },
      {
        "@type": "Question",
        "name": "Como funcionam os honorários Success Fee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Você só paga 10% do valor que economizamos ou recuperamos para você. Se reduzirmos sua dívida em R$ 50.000, nosso honorário será R$ 5.000. Se não ganharmos, você não paga nada."
        }
      },
      {
        "@type": "Question",
        "name": "O que é leilão extrajudicial de veículo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É a venda do veículo apreendido fora do judiciário, realizada diretamente pelo banco ou por leiloeiro contratado. Muitas vezes ocorre de forma irregular, sem notificação adequada, o que pode ser contestado judicialmente."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a taxa de sucesso da Quitadoc em casos de busca e apreensão?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nossa taxa de sucesso é de 87% em cancelamento ou redução significativa da dívida em casos de busca e apreensão. Já salvamos mais de 650 veículos e economizamos milhões para nossos clientes."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
