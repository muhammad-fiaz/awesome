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

## How to Create a Post

1. Fork the [repository](https://github.com/muhammad-fiaz/awesome)
2. Create a new `.md` file in `src/content/posts/your-category/`
3. Add front matter and content (see template below)
4. Submit a Pull Request

See the [How to Publish](/awesome/guide/) guide for detailed instructions.

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
| `links` | object | — | External links (see below) |
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

## File Naming Rules

- Use lowercase letters, numbers, and hyphens only
- Example: `react-hooks-guide.md`, `getting-started-with-rust.md`
- Do NOT use spaces, underscores, or special characters
- The filename becomes the URL slug

## Links Object

| Key | Type | Description |
|-----|------|-------------|
| `website` | string | Official website URL |
| `github` | string | GitHub repository URL |
| `documentation` | string | Documentation URL |
| `demo` | string | Live demo URL |
| `npm` | string | npm package URL |
| `crate` | string | Rust crate URL |
| `youtube` | string | YouTube video URL |
| `discord` | string | Discord invite URL |
| `downloadUrl` | string | Download URL (file or page) |

## Tips

- Use descriptive titles and summaries for better SEO
- Always add at least one category and relevant tags
- Set `featured: true` for your best content
- Keep `draft: true` until the post is ready for publication
- Use `difficulty` to help readers find appropriate content
- Add `downloadUrl` if the resource has releases or downloads
