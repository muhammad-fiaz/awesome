# Posts

Posts are the main content type. Each post is a developer resource (tutorial, tool, framework, guide, etc.).

## File Location

```
src/content/posts/<category>/<slug>.md
```

Example:
```
src/content/posts/react/learn-react.md
src/content/posts/rust/getting-started-with-rust.md
```

## Front Matter Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Post title (min 5 characters) |
| `description` | string | Short description for SEO and cards (min 20 characters) |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authors` | string[] | `[]` | Author slug(s) matching filenames in `src/content/authors/` |
| `categories` | string[] | `[]` | Category slug(s) matching filenames in `src/content/categories/` |
| `tags` | string[] | `[]` | Tag slug(s) matching filenames in `src/content/tags/` |
| `thumbnail` | string | — | Path to thumbnail image (relative to `public/` or full URL) |
| `heroImage` | string | — | Path to hero/banner image |
| `customOgImage` | string | — | Custom Open Graph image |
| `featured` | boolean | `false` | Show in featured section |
| `draft` | boolean | `false` | Exclude from production builds when `true` |
| `difficulty` | enum | — | One of: `beginner`, `intermediate`, `advanced`, `expert` |
| `summary` | string | — | Custom summary text |
| `keywords` | string[] | `[]` | Additional SEO keywords |
| `license` | string | — | Content license info |
| `language` | string | `"English"` | Content language |
| `links` | object | — | External links (website, github, documentation, demo, npm, crate, youtube, discord, downloadUrl) |
| `references` | string[] | `[]` | Reference URLs |

## Example Post

```markdown
---
title: "Getting Started with React Hooks"
description: "A comprehensive guide to understanding and using React Hooks in modern applications."
authors: ["muhammad-fiaz"]
categories: ["react"]
tags: ["javascript", "frontend", "hooks"]
thumbnail: "/images/posts/react-hooks-thumb.jpg"
featured: true
draft: false
difficulty: "intermediate"
date: 2025-01-15
links:
  website: "https://react.dev"
  github: "https://github.com/facebook/react"
  documentation: "https://react.dev/learn"
  downloadUrl: "https://example.com/download"
references:
  - "https://react.dev/reference"
---

# Getting Started with React Hooks

Your post content here...
```

## Creating via Pages CMS

1. Go to [app.pagescms.org](https://app.pagescms.org)
2. Sign in with your GitHub account
3. Install the Pages CMS GitHub App on your account
4. Select the `muhammad-fiaz/awesome` repository
5. Click "Posts" in the sidebar
6. Click "New"
7. Fill in the required fields
8. Save

## Tips

- Use descriptive titles and summaries for better SEO
- Always add at least one category and relevant tags
- Set `featured: true` for your best content
- Keep `draft: true` until the post is ready for publication
- Use `difficulty` to help readers find appropriate content
- Add `downloadUrl` if the resource has releases or downloads
