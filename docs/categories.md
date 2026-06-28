# Categories

Categories group posts by topic or technology area.

## File Location

```
src/content/categories/<slug>.md
```

The filename (without `.md`) becomes the category slug.

Example:
```
src/content/categories/react.md
src/content/categories/rust.md
```

## Front Matter Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Category display name |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `description` | string | — | Short description of the category |
| `thumbnail` | string | — | Category thumbnail image |
| `heroImage` | string | — | Category hero/banner image |
| `customOgImage` | string | — | Custom Open Graph image |
| `featured` | boolean | `false` | Feature this category on the homepage |

## Example Category

```markdown
---
title: "React"
description: "Modern React development with hooks, components, and the React ecosystem."
thumbnail: "/images/categories/react.jpg"
featured: true
---

Optional markdown body for extended category description.
```

## Creating via Decap CMS

1. Navigate to `/admin/`
2. Sign in with GitHub
3. Click "Categories" in the sidebar
4. Click "New Category"
5. Fill in the required fields
6. Save and publish

## Tips

- Use lowercase slug names (e.g., `react`, `javascript`, `devops`)
- Keep category names clear and descriptive
- Reference categories in posts: `categories: ["react"]`
- Set `featured: true` for main categories shown on the homepage
