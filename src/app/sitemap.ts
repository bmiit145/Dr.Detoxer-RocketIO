import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/#product`,
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/#ingredients`,
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/home/track-order`,
      lastModified: new Date('2026-03-13'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}