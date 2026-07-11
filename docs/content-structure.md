# Content Structure

This directory contains all the content for the Awesome developer resources platform.

## Directory Layout

```
src/content/
├── posts/          # Developer resource posts (Markdown/MDX)
├── authors/        # Author profiles (Markdown)
├── organisations/  # Organisation profiles (Markdown)
├── categories/     # Category definitions (Markdown)
├── tags/           # Tag definitions (Markdown)
├── legal/          # Legal policy pages (Markdown)
└── README.md       # This file
```

## How to Create Content

All content is created by forking the repository and submitting a Pull Request:

1. **Fork** the [repository](https://github.com/muhammad-fiaz/awesome)
2. **Create** a Markdown (.md) file in the appropriate folder
3. **Add** front matter and content following the guidelines below
4. **Submit** a Pull Request

See the [How to Publish](/awesome/guide/) guide for detailed instructions.

## Content Types Overview

| Type | Folder | File Format | Key Fields |
|------|--------|-------------|------------|
| Posts | `posts/<category>/` | `.md` or `.mdx` | title, description, authors, organisations, categories, tags |
| Authors | `authors/` | `.md` | name, avatar, organisation, bio |
| Organisations | `organisations/` | `.md` | name, avatar, bio |
| Categories | `categories/` | `.md` | title, description |
| Tags | `tags/` | `.md` | title, description |
| Legal | `legal/` | `.md` | title, description |

## File Naming Rules

- Use lowercase letters, numbers, and hyphens only
- Do NOT use spaces, underscores, or special characters
- Examples: `react-hooks.md`, `john-doe.md`, `javascript.md`

## Publishing Workflow

1. Fork the repository
2. Create or edit Markdown files
3. Commit and push to your fork
4. Open a Pull Request to the main repository
5. Wait for review and merge
6. GitHub Actions automatically builds and deploys the site
7. Content appears on the live site within minutes

## Related Documentation

- [Posts](./posts.md) — How to create developer resource posts
- [Authors](./authors.md) — How to create author profiles
- [Organisations](./organisation.md) — How to create organisation profiles
- [Categories](./categories.md) — How to create categories
- [Tags](./tags.md) — How to create tags
- [How to Publish](/awesome/guide/) — Complete step-by-step guide
