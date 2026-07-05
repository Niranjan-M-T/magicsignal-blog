import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magicsignal.online'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Hide Sanity studio from search engines
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
