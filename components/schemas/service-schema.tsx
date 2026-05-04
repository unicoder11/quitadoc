export function ServiceSchema({ service }: { service: {name: string, description: string} }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "LegalService",
      "name": "Quitadoc",
      "url": "https://www.quitadoc.com.br"
    },
    "areaServed": "BR",
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "BRL",
        "price": "10% do valor da causa",
        "description": "Success fee - pague apenas se vencer"
      }
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
