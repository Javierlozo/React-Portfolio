import { MetadataRoute } from 'next'
import { LABS, getLabPath } from '../data/labs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.luislozoya.com'

  const labEntries = LABS.filter((l) => !l.comingSoon).map((lab) => ({
    url: `${baseUrl}${getLabPath(lab)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...labEntries,
  ]
}
