import { z } from 'zod';

// Site configuration - no .env needed
export const SITE_URL = 'https://muhammad-fiaz.github.io';
export const BASE_PATH = '/awesome';
export const SITE_FULL_URL = `${SITE_URL}${BASE_PATH}`;

// Google Analytics and Google Tag Manager IDs
export const GA_ID = 'G-6BVYCRK57P';
export const GTM_ID = 'GTM-P4M9T8ZR';

// Google AdSense Client ID
export const ADSENSE_CLIENT_ID = 'ca-pub-2040560600290490';

// Schemas for validation
const SiteConfigSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.string(),
  baseUrl: z.string(),
  basePath: z.string(),
  version: z.string(),
  copyright: z.string(),
  defaultLocale: z.string(),
});

const OwnerSchema = z.object({
  name: z.string(),
  github: z.string().url(),
  twitter: z.string().url(),
  linkedin: z.string().url(),
  portfolio: z.string().url(),
  sponsor: z.string().url(),
  support: z.string().url(),
  email: z.string().email(),
  newPost: z.string().url(),
});

const GiscusSchema = z.object({
  repo: z.string(),
  repoId: z.string(),
  category: z.string(),
  categoryId: z.string(),
  mapping: z.enum(['pathname', 'url', 'title', 'og:title']),
  strict: z.enum(['0', '1']),
  reactionsEnabled: z.enum(['0', '1']),
  emitMetadata: z.enum(['0', '1']),
  inputPosition: z.enum(['top', 'bottom']),
  theme: z.string(),
  lang: z.string(),
  loading: z.enum(['lazy', 'eager']),
});

const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string(),
  external: z.boolean().optional(),
});

const NavLinksSchema = z.array(LinkSchema);

// Raw config data
const rawSiteConfig = {
  name: 'Awesome',
  tagline: 'Curated resources for developers',
  description:
    'A curated collection of awesome developer resources, tutorials, and tools, hand-picked by Muhammad Fiaz.',
  url: SITE_FULL_URL,
  baseUrl: SITE_URL,
  basePath: BASE_PATH,
  version: '1.0.0',
  copyright: `© ${new Date().getFullYear()} Awesome Dev Platform`,
  defaultLocale: 'en',
};

const rawOwner = {
  name: 'Muhammad Fiaz',
  github: 'https://github.com/muhammad-fiaz',
  twitter: 'https://x.com/muhammadfiaz_',
  linkedin: 'https://www.linkedin.com/in/muhammad-fiaz-/',
  portfolio: 'https://muhammadfiaz.com',
  sponsor: 'https://github.com/sponsors/muhammad-fiaz',
  support: 'https://pay.muhammadfiaz.com',
  email: 'contact@muhammadfiaz.com',
  newPost:
    'https://github.com/muhammad-fiaz/awesome/new/main/src/content/posts',
};

const rawGiscus = {
  repo: 'muhammad-fiaz/awesome',
  repoId: 'R_kgDOTBFW0A',
  category: 'Q&A',
  categoryId: 'DIC_kwDOTBFW0M4C_vrr',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'transparent_dark',
  lang: 'en',
  loading: 'lazy',
};

const rawNavLinks = [
  { label: 'Home', href: `${BASE_PATH}/`, icon: 'home' },
  { label: 'Explore', href: `${BASE_PATH}/explore/`, icon: 'explore' },
  { label: 'Posts', href: `${BASE_PATH}/posts/`, icon: 'article' },
  { label: 'News', href: `${BASE_PATH}/news/`, icon: 'news' },
  { label: 'Categories', href: `${BASE_PATH}/categories/`, icon: 'category' },
  { label: 'Tags', href: `${BASE_PATH}/tags/`, icon: 'sell' },
  { label: 'Authors', href: `${BASE_PATH}/authors/`, icon: 'person' },
  { label: 'Organisations', href: `${BASE_PATH}/organisations/`, icon: 'organisation' },
];

const rawDiscoverLinks = [
  { label: 'Featured', href: `${BASE_PATH}/featured/`, icon: 'star' },
  { label: 'Latest', href: `${BASE_PATH}/latest/`, icon: 'schedule' },
];

const rawCommunityLinks = [
  {
    label: 'Guide',
    href: `${BASE_PATH}/guide/`,
    icon: 'guide',
  },
  {
    label: 'RSS',
    href: `${BASE_PATH}/rss.xml`,
    icon: 'rss_feed',
    external: true,
  },
  {
    label: 'Sponsor',
    href: rawOwner.sponsor,
    icon: 'favorite',
    external: true,
  },
  { label: 'Support', href: rawOwner.support, icon: 'help', external: true },
  {
    label: 'Legal',
    href: `${BASE_PATH}/legal/privacy-policy/`,
    icon: 'policy',
  },
];

// Perform validations and export typed constants
export const SITE_CONFIG = SiteConfigSchema.parse(rawSiteConfig);
export const OWNER = OwnerSchema.parse(rawOwner);
export const GISCUS = GiscusSchema.parse(rawGiscus);
export const NAV_LINKS = NavLinksSchema.parse(rawNavLinks);
export const DISCOVER_LINKS = NavLinksSchema.parse(rawDiscoverLinks);
export const COMMUNITY_LINKS = NavLinksSchema.parse(rawCommunityLinks);

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type Owner = z.infer<typeof OwnerSchema>;
export type GiscusConfig = z.infer<typeof GiscusSchema>;
export type NavLink = z.infer<typeof LinkSchema>;
