# Contributing to Awesome

Thank you for your interest in contributing to Awesome! This guide will help you get started.

## Ways to Contribute

### 1. Submit a Developer Resource

1. Fork the [repository](https://github.com/muhammad-fiaz/awesome)
2. Create a new branch: `git checkout -b add-my-resource`
3. Add your post in `src/content/posts/<category>/`
4. Submit a Pull Request

See [docs/posts.md](./docs/posts.md) for the full field reference and the [How to Publish](https://muhammad-fiaz.github.io/awesome/guide/) guide for step-by-step instructions.

### 2. Fix Errors or Improve Content

1. Fork the repository
2. Make your changes
3. Submit a Pull Request with a clear description

## Content Guidelines

### Post Requirements

- **Title:** Clear and descriptive (min 5 characters)
- **Description:** Accurate summary for SEO (min 20 characters)
- **Category:** Must match an existing category slug
- **Tags:** Use relevant tags (max 5 recommended)
- **Difficulty:** Set appropriately (`beginner`, `intermediate`, `advanced`, `expert`)

### Quality Standards

- Content must be **accurate** and **up-to-date**
- Links must be **working** and **relevant**
- No spam, duplicates, or low-quality submissions
- Respect the [Code of Conduct](#code-of-conduct)

### Content Structure

```
src/content/posts/<category>/<slug>.md
```

Example:
```
src/content/posts/react/hooks-guide.md
```

## Development Setup

### Prerequisites

- [Bun](https://bun.sh)
- Node.js 22+

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/awesome.git
cd awesome

# Install dependencies
bun install

# Start dev server
bun run dev
```

The site will be available at `http://localhost:4321/awesome/`

### Available Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Build for production |
| `bun run lint` | Lint with Biome |
| `bun run lint:fix` | Lint and auto-fix |

### Project Structure

```
awesome/
├── src/
│   ├── components/      # UI components
│   ├── content/         # Markdown content
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── lib/             # Utilities
│   └── stores/          # State management
├── public/              # Static assets
└── docs/                # Documentation
```

## Commit Messages

Use clear, descriptive commit messages:

```
add: React Hooks Guide
fix: Broken link in Rust post
update: Categories documentation
remove: Deprecated tag
```

## Pull Request Process

1. **Create a descriptive title** — e.g., "add: Next.js 15 Guide"
2. **Fill in the PR template** — describe what you changed and why
3. **Check the preview** — verify your content looks correct
4. **Wait for review** — a maintainer will review and merge

## Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/muhammad-fiaz/awesome/issues/new/choose) with:

- Clear description
- Steps to reproduce (for bugs)
- Screenshots (if applicable)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- No spam or self-promotion beyond relevant contributions

## Questions?

- [GitHub Discussions](https://github.com/muhammad-fiaz/awesome/discussions)
- [Email](mailto:contact@muhammadfiaz.com)

Thank you for contributing!
