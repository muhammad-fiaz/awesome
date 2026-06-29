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

## Example Category

```markdown
---
title: "React"
description: "Modern React development with hooks, components, and the React ecosystem."
thumbnail: "/images/categories/react.jpg"
---

Optional markdown body for extended category description.
```

## Creating via Pages CMS

1. Go to [app.pagescms.org](https://app.pagescms.org)
2. Sign in with your GitHub account
3. Install the Pages CMS GitHub App on your account
4. Select the `muhammad-fiaz/awesome` repository
5. Click "Categories" in the sidebar
6. Click "New"
7. Fill in the required fields
8. Save

## Tips

- Use lowercase slug names (e.g., `react`, `javascript`, `devops`)
- Keep category names clear and descriptive
- Reference categories in posts: `categories: ["react"]`
