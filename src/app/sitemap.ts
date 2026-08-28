import { MetadataRoute } from 'next'
import { LABS, getLabPath } from '../data/labs'
import { getStandalonePosts } from '../lib/blog-mdx'
import { getAllNoteParams } from '../lib/notes-mdx'
import { NOTES_REPOS } from '../data/notes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.luislozoya.com'

  const labEntries = LABS.filter((l) => !l.comingSoon).map((lab) => ({
    url: `${baseUrl}${getLabPath(lab)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const standalonePostEntries = getStandalonePosts().map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
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
    {
      url: `${baseUrl}/ai-playground`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/llm-audit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Low priority, but listed: a privacy page nothing points at from the
    // index is one a reader has to already know about.
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...NOTES_REPOS.map((r) => ({
      url: `${baseUrl}/notes/${r.repoName}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...getAllNoteParams().map((p) => ({
      url: `${baseUrl}/notes/${p.repo}/${p.section}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...standalonePostEntries,
    ...labEntries,
  ]
}
