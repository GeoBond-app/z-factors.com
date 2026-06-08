import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.z-factors.com',
      lastModified: new Date(),
    },
    {
      url: 'https://www.z-factors.com/archive',
      lastModified: new Date(),
    },
    {
      url: 'https://www.z-factors.com/analysis/TA-001',
      lastModified: new Date(),
    },
  ];
}
