import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const analysisDir = path.join(process.cwd(), 'app/analysis');
  
  let articleUrls: MetadataRoute.Sitemap = [];
  try {
    const folders = fs.readdirSync(analysisDir)
      .filter(f => f.match(/^ta-\d+$/i))
      .sort((a, b) => parseInt(a.replace(/ta-/i,'')) - parseInt(b.replace(/ta-/i,'')));
    
    articleUrls = folders.map(folder => ({
      url: `https://www.z-factors.com/analysis/${folder.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {}

  return [
    {
      url: 'https://www.z-factors.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: 'https://www.z-factors.com/archive',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.z-factors.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://www.z-factors.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...articleUrls,
  ];
}
