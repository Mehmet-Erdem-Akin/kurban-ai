import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://kurban-ai.vercel.app',
            lastModified: '2024-12-20',
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://kurban-ai.vercel.app/analyze',
            lastModified: '2024-12-20',
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://kurban-ai.vercel.app/demo',
            lastModified: '2024-12-20',
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://kurban-ai.vercel.app/contact',
            lastModified: '2024-12-20',
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://kurban-ai.vercel.app/privacy',
            lastModified: '2024-12-20',
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://kurban-ai.vercel.app/terms',
            lastModified: '2024-12-20',
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://kurban-ai.vercel.app/kvkk',
            lastModified: '2024-12-20',
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]
} 