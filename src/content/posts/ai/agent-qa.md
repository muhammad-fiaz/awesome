---
title: Agent QA - Natural-Language Application Testing

description: Agent QA is a source-available QA agent for running natural-language web and mobile application tests.

summary: Run repeatable application tests through a CLI, MCP server, or portable Agent Skills while retaining test memory between runs.

categories:
  - ai
  - web-development

tags:
  - typescript

keywords:
  - agent qa
  - end-to-end testing
  - regression testing
  - model context protocol

featured: false

draft: false

links:
  website: https://github.com/vostride/agent-qa
  github: https://github.com/vostride/agent-qa
  documentation: https://vostride.com/docs/agent-qa
  npm: https://www.npmjs.com/package/agent-qa

license: FSL-1.1-ALv2

language: English
---

## What is Agent QA?

[Agent QA](https://github.com/vostride/agent-qa) is a self-improving QA agent for software teams. It turns natural-language web and mobile test definitions into repeatable application checks and retains scoped test memory between runs.

## Interfaces

- An npm-distributed CLI for authoring, validating, running, and inspecting tests.
- An MCP server for operating the same QA workflow from compatible coding agents.
- Portable Agent Skills for test authoring, result investigation, and evidence-backed fixes.

Test runs can retain verified observations, artifacts, and failure context. Self-healing flows help a test adapt to application changes while keeping the resulting evidence available for review.

## Installation

```bash
npm install -D agent-qa
```

Full test execution requires a supported model configuration. Model-provider accounts and usage charges are separate from the Agent QA package; local or OpenAI-compatible endpoints are also supported.

## License

The current release uses FSL-1.1-ALv2. It is source-available rather than OSI open source, and each release converts to Apache-2.0 after two years.
