# Authors

Each author is a Markdown file defining a contributor profile.

## File Location

```
src/content/authors/<slug>.md
```

The filename (without `.md`) becomes the author slug used in post front matter.

Example:
```
src/content/authors/muhammad-fiaz.md
```

## Front Matter Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Author's display name |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `avatar` | string | — | Path to profile image (relative to `public/` or full URL) |
| `banner` | string | — | Path to banner/cover image |
| `bio` | string | — | Short biography |
| `title` | string | — | Job title or role |
| `location` | string | — | Geographic location |
| `website` | string | — | Personal website URL |
| `github` | string | — | GitHub profile URL |
| `twitter` | string | — | Twitter/X profile URL |
| `linkedin` | string | — | LinkedIn profile URL |
| `portfolio` | string | — | Portfolio URL |
| `sponsor` | string | — | Sponsor/donation URL |
| `support` | string | — | Support page URL |
| `featured` | boolean | `false` | Feature this author on the homepage |

## Example Author

```markdown
---
name: "Muhammad Fiaz"
avatar: "/images/authors/muhammad-fiaz.jpg"
bio: "Full-stack developer passionate about open source and developer tools."
location: "Pakistan"
github: "https://github.com/muhammad-fiaz"
twitter: "https://x.com/muhammadfiaz_"
linkedin: "https://www.linkedin.com/in/muhammad-fiaz-/"
portfolio: "https://muhammadfiaz.com"
featured: true
---

Optional markdown body content for extended author bio.
```

## Creating via Decap CMS

1. Navigate to `/admin/`
2. Sign in with GitHub
3. Click "Authors" in the sidebar
4. Click "New Author"
5. Fill in the required fields
6. Save and publish

## Tips

- Use the author slug in post front matter: `authors: ["your-slug"]`
- Add a clear avatar image for recognition
- Include social links for discoverability
- Set `featured: true` for main contributors
