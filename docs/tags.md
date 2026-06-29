# Tags

Tags provide fine-grained classification for posts.

## File Location

```
src/content/tags/<slug>.md
```

The filename (without `.md`) becomes the tag slug.

Example:
```
src/content/tags/javascript.md
src/content/tags/frontend.md
```

## How to Create a Tag

1. Fork the [repository](https://github.com/muhammad-fiaz/awesome)
2. Create a new `.md` file in `src/content/tags/`
3. Add front matter and optional body content (see template below)
4. Submit a Pull Request

See the [How to Publish](/awesome/guide/) guide for detailed instructions.

## Front Matter Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Tag display name |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `description` | string | — | Short description of the tag |
| `thumbnail` | string | — | Tag thumbnail image |
| `customOgImage` | string | — | Custom Open Graph image |

## Example Tag

```markdown
---
title: "JavaScript"
description: "JavaScript programming language and its ecosystem."
---
```

## File Naming Rules

- Use lowercase letters, numbers, and hyphens only
- Example: `javascript.md`, `hooks.md`, `api-design.md`
- Do NOT use spaces, underscores, or special characters
- The filename becomes the tag slug used in posts: `tags: ["javascript"]`

## Tips

- Tags are more specific than categories
- Reference tags in posts: `tags: ["javascript", "hooks"]`
- Keep tag names short and recognizable
- Use tags for specific technologies, concepts, or patterns
