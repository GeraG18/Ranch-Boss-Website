export default function robots() {
  /*
    Hiding every blog editor path for search engines
  */
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: [
          '/blog/editor/*',
      ],
    },
    sitemap: 'https://horizontrailers.com/sitemap.xml',
  }
}