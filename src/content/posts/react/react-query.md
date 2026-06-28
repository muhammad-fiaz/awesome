---
title: TanStack Query - The Best Way to Fetch Data in React

description: Learn how to use TanStack Query (formerly React Query) to manage server state in your React applications.

summary: Master data fetching, caching, and synchronization with TanStack Query.

authors:
  - muhammad-fiaz

categories:
  - react
  - web-development

tags:
  - react
  - typescript
  - frontend

keywords:
  - tanstack query
  - react query
  - data fetching
  - server state

featured: false

draft: false

thumbnail: https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop
heroImage: https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop

links:
  website: https://tanstack.com/query
  github: https://github.com/TanStack/query
  documentation: https://tanstack.com/query/latest/docs/framework/react/overview
  npm: https://www.npmjs.com/package/@tanstack/react-query
  downloadUrl: https://www.npmjs.com/package/@tanstack/react-query

license: MIT

language: English
---

## What is TanStack Query?

TanStack Query (formerly React Query) is a powerful data-fetching and server-state management library for React.

## Installation

```bash
bun add @tanstack/react-query
```

## Basic Usage

```tsx
import { useQuery } from '@tanstack/react-query';

function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <ul>
      {data.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## Why Server State?

- **Caching** - Avoid unnecessary network requests
- **Background refetching** - Keep data fresh automatically
- **Optimistic updates** - Instant UI feedback

## Conclusion

TanStack Query is the gold standard for server state management in React applications.
