import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  blockedRoutes,
  crawlableRoutes,
  getBuildTimeSiteUrl,
  resolveAbsoluteUrl,
  siteConfig,
} from '../src/lib/siteConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.resolve(__dirname, '..', 'public');
const siteUrl = getBuildTimeSiteUrl();
const generationDate = new Date().toISOString();
const hostname = new URL(siteUrl).hostname;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${crawlableRoutes
  .map(
    (route) => `  <url>
    <loc>${resolveAbsoluteUrl(route.path, siteUrl)}</loc>
    <lastmod>${generationDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const hostLine = hostname === 'localhost' ? [] : [`Host: ${hostname}`];

const robotsTxt = [
  'User-agent: *',
  'Allow: /',
  ...blockedRoutes.map((route) => `Disallow: ${route}`),
  '',
  `Sitemap: ${resolveAbsoluteUrl('/sitemap.xml', siteUrl)}`,
  ...hostLine,
  '',
].join('\n');

const webManifest = {
  name: siteConfig.legalName,
  short_name: siteConfig.shortName,
  description: siteConfig.description,
  start_url: '/',
  display: 'standalone',
  background_color: siteConfig.themeColor,
  theme_color: siteConfig.themeColor,
  icons: [
    {
      src: siteConfig.images.logo,
      sizes: '1024x1024',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
};

if (hostname === 'localhost') {
  console.warn(
    '[seo] Using localhost as the site URL. Set VITE_SITE_URL in production so canonical URLs, sitemap.xml, and robots.txt point at the real domain.',
  );
}

await mkdir(publicDirectory, { recursive: true });

await Promise.all([
  writeFile(path.join(publicDirectory, 'sitemap.xml'), sitemapXml, 'utf8'),
  writeFile(path.join(publicDirectory, 'robots.txt'), robotsTxt, 'utf8'),
  writeFile(
    path.join(publicDirectory, 'site.webmanifest'),
    `${JSON.stringify(webManifest, null, 2)}\n`,
    'utf8',
  ),
]);

console.log(`[seo] Generated sitemap.xml, robots.txt, and site.webmanifest for ${siteUrl}`);
