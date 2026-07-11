# Organisations

Each organisation is a Markdown file defining an associated organisation profile.

## File Location

```
src/content/organisations/<slug>.md
```

The filename (without `.md`) becomes the organisation slug used in post front matter and author profiles.

Example:
```
src/content/organisations/google.md
```

## How to Create an Organisation

1. Fork the [repository](https://github.com/muhammad-fiaz/awesome)
2. Create a new `.md` file in `src/content/organisations/`
3. Add front matter and optional body content (see template below)
4. Submit a Pull Request

See the [How to Publish](/awesome/guide/) guide for detailed instructions.

## Front Matter Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Organisation's display name |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `avatar` | string | — | Path to logo/profile image (relative to `public/` or full URL) |
| `bio` | string | — | Short description of the organisation |
| `title` | string | — | Tagline or industry |
| `location` | string | — | Geographic headquarters location |
| `website` | string | — | Official website URL |
| `github` | string | — | GitHub profile/org URL |
| `twitter` | string | — | Twitter/X profile URL |
| `linkedin` | string | — | LinkedIn page URL |
| `portfolio` | string | — | Portfolio/About page URL |

## Example Organisation

```markdown
---
name: "Google"
title: "Technology & AI Company"
avatar: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
bio: "Google LLC is an American multinational technology company focusing on artificial intelligence."
location: "Mountain View, CA"
website: "https://google.com"
github: "https://github.com/google"
twitter: "https://x.com/Google"
linkedin: "https://www.linkedin.com/company/google"
portfolio: "https://about.google/"
---

Google is an American multinational technology company.
```

## File Naming Rules

- Use lowercase letters, numbers, and hyphens only
- Example: `google.md`, `meta.md`
- Do NOT use spaces, underscores, or special characters
- The filename becomes the organisation slug: `organisations: ["google"]`
