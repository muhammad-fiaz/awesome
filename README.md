# Awesome

> [!NOTE]
> This project is currently in active development. Some content and features are placeholders that will be replaced with real posts and functionality as we approach launch.

A curated collection of developer resources, tutorials, tools, and open-source projects.

## Live Site

**[muhammad-fiaz.github.io/awesome](https://muhammad-fiaz.github.io/awesome)**

## Features

- Modern Astro 7 + React stack with Tailwind CSS v4
- Full-text search powered by Pagefind
- Pages CMS for visual content editing
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
| [Pages CMS](https://pagescms.org) | Visual content management |
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
└── .pages.yml           # Pages CMS configuration
```

## Content Management

### Using Pages CMS (Recommended)

1. Go to [app.pagescms.org](https://app.pagescms.org)
2. Sign in with your GitHub account
3. Install the Pages CMS GitHub App on your account
4. Select the `muhammad-fiaz/awesome` repository
5. Start editing content through the visual editor

### Manual Editing

Create Markdown files directly in `src/content/`. See the [docs/](./docs/) folder for detailed documentation on each content type.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute.

## License

[MIT](./LICENSE)

## Author

**Muhammad Fiaz** — [GitHub](https://github.com/muhammad-fiaz) · [Twitter](https://x.com/muhammadfiaz_) · [Website](https://muhammadfiaz.com)
