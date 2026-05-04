export function generateBreadcrumbSchema(items: { label: string; href: string }[]) {
  const baseUrl = "https://www.quitadoc.com.br"
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${baseUrl}${item.href}`
    }))
  }
}
