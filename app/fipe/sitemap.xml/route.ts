import { FIPE_CATEGORIES, FIPE_BRANDS, FIPE_MODELS } from '@/lib/fipe/mock-data'

export async function GET() {
  const baseUrl = 'https://www.quitadoc.com.br'
  const currentDate = new Date().toISOString().split('T')[0]

  const urls = [
    // Main FIPE page
    {
      loc: `${baseUrl}/fipe`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0',
    },
    // Category pages
    ...FIPE_CATEGORIES.map(cat => ({
      loc: `${baseUrl}/fipe/${cat.slug}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9',
    })),
    // Brand pages
    ...FIPE_BRANDS.map(brand => ({
      loc: `${baseUrl}/fipe/carros/${brand.slug}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8',
    })),
    // Model pages
    ...FIPE_MODELS.map(model => {
      const brand = FIPE_BRANDS.find(b => b.id === model.brandId)
      return {
        loc: `${baseUrl}/fipe/carros/${brand?.slug}/${model.slug}`,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: '0.7',
      }
    }),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
  `
    )
    .join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
