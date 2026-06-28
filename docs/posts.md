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
| `featured` | boolean | `false` | Show in featured section |
| `draft` | boolean | `true` | Exclude from production builds when `true` |
| `difficulty` | enum | — | One of: `beginner`, `intermediate`, `advanced`, `expert` |
| `summary` | string | — | Custom summary text |
| `keywords` | string[] | `[]` | Additional SEO keywords |
| `license` | string | — | Content license info |
| `language` | string | `"English"` | Content language |
| `links` | object | — | External links (website, github, documentation, demo, npm, crate, youtube, discord) |
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
---

# Getting Started with React Hooks

Your post content here...
```

## Creating via Decap CMS

1. Navigate to `/admin/`
2. Sign in with GitHub
3. Click "Posts" in the sidebar
4. Click "New Post"
5. Fill in the required fields
6. Save and publish

## Tips

- Use descriptive titles and summaries for better SEO
- Always add at least one category and relevant tags
- Set `featured: true` for your best content
- Keep `draft: true` until the post is ready for publication
- Use `difficulty` to help readers find appropriate content
