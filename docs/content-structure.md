# Content Structure

This directory contains all the content for the Awesome developer resources platform.

## Directory Layout

```
src/content/
├── posts/          # Developer resource posts (Markdown/MDX)
├── authors/        # Author profiles (Markdown)
├── categories/     # Category definitions (Markdown)
├── tags/           # Tag definitions (Markdown)
├── legal/          # Legal policy pages (Markdown)
└── README.md       # This file
```

## Creating Content

You can create content in two ways:

1. **Via Pages CMS (Recommended):** Go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, and use the visual editor to create and edit content. No server setup required.

2. **Manually:** Create Markdown files directly in the appropriate folder following the structure documented in each folder's README.

## Content Types Overview

| Type | Folder | File Format | Key Fields |
|------|--------|-------------|------------|
| Posts | `posts/` | `.md` or `.mdx` | title, description, authors, categories, tags |
| Authors | `authors/` | `.md` | name, avatar, bio |
| Categories | `categories/` | `.md` | title, description |
| Tags | `tags/` | `.md` | title, description |
| Legal | `legal/` | `.md` | title, description |

## Publishing Workflow

1. Create content via Pages CMS or manually
2. Commit and push to the `main` branch
3. GitHub Actions automatically builds and deploys the site
4. Content appears on the live site within minutes

See the [How to Publish](/awesome/guide/) page for detailed instructions.
