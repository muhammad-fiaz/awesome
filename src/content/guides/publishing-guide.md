---
title: "How to Publish a Post"
description: "Step-by-step guide to publishing developer resources on the Awesome platform by creating a Markdown file and submitting a Pull Request."
keywords: "publishing guide, GitHub submission, pull request, developer resources, content management"
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&h=420&q=80"
authors: ["muhammad-fiaz"]
organisations: []
datePublished: "2025-01-01"
dateModified: "2026-07-12"
---

## Overview

Publishing on Awesome is simple: create a Markdown (.md) file with your content
and submit it via a GitHub Pull Request. Once reviewed and merged, your post goes live automatically.

## Quick Start

Already familiar with GitHub? Here's the short version:

1. Fork [muhammad-fiaz/awesome](https://github.com/muhammad-fiaz/awesome)
2. Create a new `.md` file in `src/content/posts/your-category/`
3. Add front matter (title, description, authors, categories, tags) and your content
4. Submit a Pull Request

## Step-by-Step Guide

### Step 1: Fork the Repository

1. Go to [github.com/muhammad-fiaz/awesome](https://github.com/muhammad-fiaz/awesome)
2. Click **"Fork"** in the top right corner
3. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/awesome.git
   cd awesome
   ```
4. Install dependencies:
   ```bash
   bun install
   ```

### Step 2: Create Your Post

Create a new Markdown file in the appropriate category folder:
```bash
src/content/posts/your-category/your-post-slug.md
```

**File naming rules:**
- Use lowercase letters, numbers, and hyphens only
- Example: `react-hooks-guide.md`, `getting-started-with-rust.md`
- Do NOT use spaces, underscores, or special characters

### Step 3: Add Front Matter and Content

Every post requires YAML front matter at the top of the file, followed by your Markdown content:
```yaml
---
title: "Your Post Title"
description: "A clear description of what this resource covers (min 20 characters)."
authors: ["your-author-slug"]
categories: ["your-category"]
tags: ["tag1", "tag2"]
thumbnail: "/images/posts/your-thumb.jpg"
featured: false
draft: false
difficulty: "intermediate"
license: "MIT"
language: "English"
links:
  website: "https://example.com"
  github: "https://github.com/org/repo"
  downloadUrl: "https://example.com/download"
references:
  - "https://example.com/reference1"
keywords:
  - "keyword1"
  - "keyword2"
---

# Your Post Title

Write your content here using Markdown.

## Introduction

Explain what this resource is about.

## Getting Started

Provide step-by-step instructions.

## Conclusion

Summarize the key points.
```

### Step 4: Submit a Pull Request

1. Commit your changes:
   ```bash
   git add .
   git commit -m "add: Your Post Title"
   ```
2. Push to your fork:
   ```bash
   git push origin main
   ```
3. Go to your fork on GitHub
4. Click **"Contribute"** → **"Open pull request"**
5. Fill in the PR description explaining your post
6. Click **"Create pull request"**
7. Wait for review and merge

Once merged, GitHub Actions automatically builds and deploys the site. Your post will be live within minutes.

## Front Matter Reference

### Required Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Post title (min 5 characters) |
| `description` | string | SEO description (min 20 characters) |

### Optional Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `summary` | string | — | Short summary for cards and previews |
| `authors` | string[] | `[]` | Author slug(s) from `src/content/authors/` |
| `organisations` | string[] | `[]` | Organisation slug(s) from `src/content/organisations/` |
| `categories` | string[] | `[]` | Category slug(s) from `src/content/categories/` |
| `tags` | string[] | `[]` | Tag slug(s) from `src/content/tags/` |
| `keywords` | string[] | `[]` | SEO keywords for search indexing |
| `thumbnail` | string | — | Thumbnail image path or URL |
| `heroImage` | string | — | Hero banner image path or URL |
| `customOgImage` | string | — | Custom Open Graph image for social sharing |
| `featured` | boolean | `false` | Show in featured section |
| `draft` | boolean | `false` | Keep as draft until ready |
| `difficulty` | enum | — | `beginner`, `intermediate`, `advanced`, or `expert` |
| `links` | object | — | External links (see below) |
| `references` | string[] | `[]` | Reference URLs cited in the post |
| `license` | string | — | License identifier (e.g. MIT, Apache-2.0) |
| `language` | string | `English` | Content language |

### News Fields Reference

News articles are created as Markdown files under `src/content/news/`.

| Field | Type | Default | Description |
|---|---|---|---|
| `title` | string | — | Title of the news article (Required) |
| `description` | string | — | Short description of the news article (Required) |
| `pubDate` | date | — | Publication date in `YYYY-MM-DD` format (Required) |
| `authors` | string[] | `[]` | Author slugs from `src/content/authors/` |
| `organisations` | string[] | `[]` | Linked organisation slugs from `src/content/organisations/` |
| `category` | string | — | Article category (e.g. `web-development`, `ai`, `general`) |
| `tags` | string[] | `[]` | Tag slugs |
| `thumbnail` | string | — | Thumbnail image path |
| `heroImage` | string | — | Hero image path |
| `draft` | boolean | `false` | Keep as draft until ready |
| `keywords` | string[] | `[]` | Search indexing keywords |

### Links Object

| Key | Type | Description |
|---|---|---|
| `website` | string | Official website URL |
| `github` | string | GitHub repository URL |
| `documentation` | string | Documentation URL |
| `demo` | string | Live demo URL |
| `npm` | string | npm package URL |
| `crate` | string | Rust crate URL |
| `youtube` | string | YouTube video URL |
| `discord` | string | Discord invite URL |
| `downloadUrl` | string | Download URL (file or page) |

## Content Structure

```text
src/content/
├── posts/
│   ├── react/
│   │   └── learn-react.md
│   ├── rust/
│   │   └── getting-started-with-rust.md
│   └── astro/
│       └── build-your-first-astro-site.md
├── authors/
│   └── muhammad-fiaz.md
├── organisations/
│   └── google.md
├── categories/
│   ├── react.md
│   ├── rust.md
│   └── astro.md
├── tags/
│   ├── javascript.md
│   ├── frontend.md
│   └── systems-programming.md
└── legal/
    ├── privacy-policy.md
    └── terms-of-service.md
```

## Rules & Guidelines

- **One post per resource** — Do not combine multiple resources in one post
- **Original content** — Your post must be your own work or properly attributed
- **No spam** — Posts promoting spam, scams, or low-quality content will be rejected
- **Working links** — All URLs must be valid and accessible
- **Correct category** — Place your post in the appropriate category folder
- **Valid front matter** — All required fields must be present and correctly formatted
- **Markdown only** — Use standard Markdown syntax (no HTML unless necessary)
- **English content** — Posts should be written in English

## Tips & Best Practices

- **Write clear titles:** Make your title descriptive and specific
- **Add a good description:** This appears in search results and social shares
- **Use relevant tags:** Help readers find your content through multiple paths
- **Set difficulty level:** Helps readers find content appropriate for their skill level
- **Add thumbnails:** Visual content gets more engagement
- **Start with drafts:** Keep `draft: true` until your post is polished
- **Link to sources:** Reference official documentation and original projects
- **Add download links:** If your resource has releases, add a `downloadUrl` pointing to the file or page
- **Use Markdown features:** Code blocks, tables, and lists make content scannable

### Need Help?

If you have questions about publishing, reach out via:
- [GitHub Issues](https://github.com/muhammad-fiaz)
- [contact@muhammadfiaz.com](mailto:contact@muhammadfiaz.com)
