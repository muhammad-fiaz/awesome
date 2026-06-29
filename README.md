# Awesome

> [!NOTE]
> This project is currently in active development. Some content and features are placeholders that will be replaced with real posts and functionality as we approach launch.

A curated collection of developer resources, tutorials, tools, and open-source projects.

## Live Site

**[muhammad-fiaz.github.io/awesome](https://muhammad-fiaz.github.io/awesome)**

## Features

- Modern Astro 7 + React stack with Tailwind CSS v4
- Full-text search powered by Pagefind
- GitHub-based content management via Pull Requests
- Dark/Light theme with daily.dev-style green brand
- SEO optimized with JSON-LD schemas, Open Graph, and Twitter Cards
- Responsive design with collapsible sidebar
- Giscus comments on posts
- Google Analytics, GTM, and AdSense integration
- RSS feed and sitemap
- PWA manifest support

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (package manager)
- Node.js 22+

### Installation

```bash
# Clone the repository
git clone https://github.com/muhammad-fiaz/awesome.git
cd awesome

# Install dependencies
bun install

# Start dev server
bun run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run dev:full` | Build site + Pagefind index + dev server |
| `bun run build` | Build for production (includes Pagefind indexing) |
| `bun run preview` | Preview production build |
| `bun run lint` | Lint with Biome |
| `bun run lint:fix` | Lint and auto-fix |
| `bun run check` | Type check with Biome |

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Astro 7](https://astro.build) | Static site generation |
| [React 19](https://react.dev) | Interactive UI components |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Pagefind](https://pagefind.app) | Static full-text search |
| [Giscus](https://giscus.app) | GitHub-powered comments |
| [Biome](https://biomejs.dev) | Linting and formatting |
| [Zustand](https://zustand-demo.pmnd.rs) | State management |
| [TanStack Query](https://tanstack.com/query) | React data fetching |

## Project Structure

```
awesome/
├── public/              # Static assets
├── src/
│   ├── components/      # React and Astro components
│   │   ├── layout/      # Layout components (sidebar, header, footer)
│   │   ├── post/        # Post-related components
│   │   ├── search/      # Search components
│   │   ├── listing/     # List/feed components
│   │   ├── common/      # Shared components
│   │   └── ui/          # shadcn UI primitives
│   ├── content/         # Markdown content
│   │   ├── posts/       # Developer resource posts
│   │   ├── authors/     # Author profiles
│   │   ├── categories/  # Category definitions
│   │   ├── tags/        # Tag definitions
│   │   └── legal/       # Legal policy pages
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── lib/             # Utility functions
│   ├── stores/          # Zustand state stores
│   ├── types/           # TypeScript types
│   └── styles/          # Global CSS
├── docs/                # Project documentation
└── .pages.yml           # Content management configuration
```

## Content Management

All content is managed through GitHub. To add or edit content, fork the repository and submit a Pull Request.

### Add a Resource

1. Fork the [repository](https://github.com/muhammad-fiaz/awesome)
2. Create a new `.md` file in `src/content/posts/your-category/`
3. Add front matter and your content
4. Submit a Pull Request

See the **[How to Publish](https://muhammad-fiaz.github.io/awesome/guide/)** guide for step-by-step instructions.

### Documentation

| Doc | Description |
|-----|-------------|
| [Posts](./docs/posts.md) | How to create developer resource posts |
| [Authors](./docs/authors.md) | How to create author profiles |
| [Categories](./docs/categories.md) | How to create categories |
| [Tags](./docs/tags.md) | How to create tags |
| [Content Structure](./docs/content-structure.md) | Directory layout and file naming rules |

### Quick Template

```markdown
---
title: "Your Resource Title"
description: "A clear description of what this resource covers."
authors: ["your-author-slug"]
categories: ["your-category"]
tags: ["tag1", "tag2"]
thumbnail: "/images/posts/your-thumb.jpg"
difficulty: "intermediate"
links:
  website: "https://example.com"
  github: "https://github.com/org/repo"
---

# Your Resource Title

Write your content here...
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute.

## License

[MIT](./LICENSE)

## Author

**Muhammad Fiaz** — [GitHub](https://github.com/muhammad-fiaz) · [Twitter](https://x.com/muhammadfiaz_) · [Website](https://muhammadfiaz.com)
