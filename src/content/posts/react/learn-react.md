---
title: Learn React in 10 Minutes

description: A beginner-friendly guide to getting started with React. Hooks, components, and JSX explained simply.

summary: Learn React fundamentals quickly with practical examples and clear explanations.

authors:
  - muhammad-fiaz

categories:
  - react
  - web-development

tags:
  - react
  - javascript
  - frontend

keywords:
  - react
  - hooks
  - jsx
  - components

featured: true

draft: false

thumbnail: https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop

heroImage: https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop

references:
  - https://react.dev

links:
  website: https://react.dev
  github: https://github.com/facebook/react
  documentation: https://react.dev/learn
  downloadUrl: https://github.com/facebook/react/archive/refs/tags/v18.2.0.zip

license: MIT

language: English
---

## Introduction

React is a JavaScript library for building user interfaces. It was created by Facebook and is maintained by Meta and a large open-source community.

## Why React?

React makes it painless to create **interactive UIs**. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

## Core Concepts

### Components

Everything in React is a **component** — a reusable, self-contained piece of UI.

```tsx
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}
```

### JSX

JSX is a syntax extension for JavaScript that looks similar to HTML.

```tsx
const element = <h1>Hello, world!</h1>;
```

### Hooks

Hooks let you use React features like state and lifecycle methods in function components.

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useEffect

The `useEffect` hook lets you perform side effects in your components.

```tsx
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

## Conclusion

React is powerful, flexible, and has a massive ecosystem. Start with the [official docs](https://react.dev) and build something small today!
