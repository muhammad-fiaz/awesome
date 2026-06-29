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

## How to Create a Category

1. Fork the [repository](https://github.com/muhammad-fiaz/awesome)
2. Create a new `.md` file in `src/content/categories/`
3. Add front matter and optional body content (see template below)
4. Submit a Pull Request

See the [How to Publish](/awesome/guide/) guide for detailed instructions.

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

## File Naming Rules

- Use lowercase letters, numbers, and hyphens only
- Example: `react.md`, `web-development.md`, `systems-programming.md`
- Do NOT use spaces, underscores, or special characters
- The filename becomes the category slug used in posts: `categories: ["react"]`

## Tips

- Keep category names clear and descriptive
- Reference categories in posts: `categories: ["react"]`
- Categories should be broad enough to group multiple posts
