import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/*?*sort=', '/*?*filter='],
        crawlDelay: 1,
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/*?*sort=', '/*?*filter='],
        crawlDelay: 2,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/checkout/', '/*?*sort=', '/*?*filter='],
        crawlDelay: 3,
      },
    ],
    sitemap: 'https://www.quitadoc.com.br/sitemap.xml',
    host: 'https://www.quitadoc.com.br',
  }
}
