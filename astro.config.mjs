// @ts-check

import react from '@astrojs/react';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
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
  return (/** @type {any} */ tree, /** @type {any} */ file) => {
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
      exclude: ['@hugeicons/core-free-icons', '@hugeicons/react'],
      include: ['use-sync-external-store/shim', 'use-sync-external-store', '@tanstack/react-virtual'],
    },
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft/') && !page.includes('/admin/'),
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url.endsWith('/')) {
          item.priority = 1.0;
        } else if (/\/posts\/|\/categories\/|\/tags\/|\/authors\/|\/organisations\//.test(item.url)) {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.9;
        }
        return item;
      },
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
