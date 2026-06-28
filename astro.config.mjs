// @ts-check

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, svgoOptimizer } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import icon from 'astro-icon';
import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';
import { EventEmitter } from 'node:events';

EventEmitter.defaultMaxListeners = 20;

const SITE_URL = 'https://muhammad-fiaz.github.io';
const BASE_PATH = '/awesome';

function remarkReadingTime() {
  return (/** @type {import('mdast').Root} */ tree, /** @type {import('vfile').VFile & { data: { astro: { frontmatter: Record<string, unknown> } } }} */ file) => {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    file.data.astro.frontmatter.minutesRead = readingTime.text;
    file.data.astro.frontmatter.wordCount = readingTime.words;
  };
}

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    build: {
      commonjsOptions: {
        ignoreDynamicRequires: true,
      },
    },
    optimizeDeps: {
      exclude: ['@hugeicons/core-free-icons'],
    },
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
    react(),
    icon({
      include: {
        lucide: ['*'],
        mdi: ['*'],
      },
    }),
  ],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
    }),

    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});