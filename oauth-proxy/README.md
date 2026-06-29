# OAuth Proxy for Decap CMS

GitHub Pages is static — no server. GitHub OAuth requires a server. This Cloudflare Worker is that server.

## Setup

### 1. Create GitHub OAuth App

Go to https://github.com/settings/developers → **New OAuth App**

- **Application name:** `Awesome CMS`
- **Homepage URL:** `https://muhammad-fiaz.github.io/awesome/`
- **Authorization callback URL:** `https://awesome-oauth.muhammad-fiaz.workers.dev/callback`

Click **Register application** → copy **Client ID** → **Generate a new client secret** → copy it.

### 2. Deploy

```bash
cd oauth-proxy
bun install
bun run login       # authenticate with Cloudflare
bun run deploy      # deploy the worker
```

### 3. Set Client Secret

```bash
bun run wrangler secret put GITHUB_CLIENT_SECRET
# paste your GitHub OAuth App client secret when prompted
```

### 4. Access Admin

Visit `https://muhammad-fiaz.github.io/awesome/admin/`
