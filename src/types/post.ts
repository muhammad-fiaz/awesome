// Post frontmatter types - aligned with content.config.ts schema
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface PostLinks {
  website?: string;
  github?: string;
  documentation?: string;
  demo?: string;
  npm?: string;
  crate?: string;
  youtube?: string;
  discord?: string;
  downloadUrl?: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  summary?: string;
  authors: string[];
  organisations: string[];
  categories: string[];
  tags: string[];
  keywords: string[];
  featured: boolean;
  draft: boolean;
  thumbnail?: string;
  heroImage?: string;
  customOgImage?: string;
  references: string[];
  links?: PostLinks;
  license?: string;
  language: string;
  difficulty?: Difficulty;
}
