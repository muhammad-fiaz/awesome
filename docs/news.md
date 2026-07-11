# News Content Type

News articles are short, timely posts containing updates, product announcements, milestones, or community events. They are stored under the `src/content/news/` directory as standard Markdown (`.md`) files.

## News Front Matter

Every news file must begin with a front matter block enclosed by `---` lines.

```yaml
---
title: "Awesome Developer Platform Reaches Major Milestone"
description: "The Awesome platform has officially crossed its initial milestone of listing over 1,000 developer resources."
pubDate: "2026-07-11"
authors: ["muhammad-fiaz"]
organisations: ["google"]
category: "general"
tags: ["awesome", "milestone", "community"]
thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&h=450&q=80"
heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=450&q=80"
keywords: ["awesome developer", "milestone", "developer resources"]
draft: false
---
```

## Field Specifications

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | **Yes** | The headline of the news article. |
| `description` | string | **Yes** | A short, compelling teaser summary shown on list pages. |
| `pubDate` | date string | **Yes** | Publication date in `YYYY-MM-DD` format. |
| `authors` | array of strings | No | List of author slugs from `src/content/authors/`. Defaults to `['muhammad-fiaz']`. |
| `organisations` | array of strings | No | List of associated organisation slugs from `src/content/organisations/`. |
| `category` | string | No | Grouping category slug (e.g. `web-development`, `ai`, `general`). |
| `tags` | array of strings | No | Associated keywords or tag slugs. |
| `thumbnail` | string | **Yes** | URL or local path to thumbnail image (e.g., 800x450). |
| `heroImage` | string | **Yes** | URL or local path to banner image (e.g., 1200x450). |
| `keywords` | array of strings | No | Custom SEO keyword strings. |
| `draft` | boolean | No | Set to `true` to hide the post from the active feed. Defaults to `false`. |
