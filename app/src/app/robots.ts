import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Disallow admin or private paths if they exist
    },
    sitemap: 'https://www.risece.in/sitemap.xml',
  };
}
