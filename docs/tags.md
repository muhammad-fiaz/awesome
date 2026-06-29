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

## Creating via Pages CMS

1. Go to [app.pagescms.org](https://app.pagescms.org)
2. Sign in with your GitHub account
3. Install the Pages CMS GitHub App on your account
4. Select the `muhammad-fiaz/awesome` repository
5. Click "Tags" in the sidebar
6. Click "New"
7. Fill in the required fields
8. Save

## Tips

- Use lowercase slug names (e.g., `javascript`, `hooks`, `api`)
- Tags are more specific than categories
- Reference tags in posts: `tags: ["javascript", "hooks"]`
- Keep tag names short and recognizable
