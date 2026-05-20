import { MetadataRoute } from 'next'
import { samplePosts } from '@/lib/data'
import { services } from '@/lib/data'
import { marketplaceProducts } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.blockframe.cloud'
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = ['', '/services', '/ai-news', '/guides', '/marketplace', '/videos'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'daily' : 
                     route === '/ai-news' ? 'daily' : 
                     route === '/guides' ? 'weekly' : 
                     route === '/services' ? 'weekly' : 
                     route === '/marketplace' ? 'weekly' : 
                     'monthly',
    priority: route === '' ? 1.0 : 
              route === '/services' || route === '/ai-news' ? 0.8 : 
              route === '/guides' || route === '/marketplace' || route === '/videos' ? 0.7 : 
              0.5,
  }))

  // Blog posts routes
  const blogRoutes: MetadataRoute.Sitemap = samplePosts
    .filter(post => post.status === 'approved')
    .map(post => ({
      url: `${baseUrl}/${post.categorySlug}/${post.id}`,
      lastModified: new Date(post.date).toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  // Marketplace product routes (individual products)
  const productRoutes: MetadataRoute.Sitemap = marketplaceProducts.map(product => ({
    url: `${baseUrl}/marketplace/products/${product.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...blogRoutes, ...productRoutes]
}