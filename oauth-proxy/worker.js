/**
 * Cloudflare Worker — GitHub OAuth Proxy for Decap CMS
 *
 * This worker handles the OAuth flow for Decap CMS on GitHub Pages.
 * GitHub requires a server-side component for OAuth — this is it.
 *
 * Deploy: https://dash.cloudflare.com → Workers & Pages → Create Worker
 * Name: awesome-oauth
 *
 * Environment Variables (set in Worker Settings → Variables and Secrets):
 *   GITHUB_CLIENT_ID      — from your GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  — from your GitHub OAuth App
 *
 * GitHub OAuth App setup: https://github.com/settings/developers
 *   Homepage URL: https://muhammad-fiaz.github.io/awesome/
 *   Callback URL: https://awesome-oauth.<your-subdomain>.workers.dev/callback
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      return handleAuth(request, env);
    }
    if (url.pathname === '/callback') {
      return handleCallback(request, env);
    }
    return new Response('Not found', { status: 404 });
  },
};

function handleAuth(request, env) {
  const url = new URL(request.url);
  const client_id = url.searchParams.get('client_id');
  const origin = url.searchParams.get('origin') || url.origin;

  if (!client_id) {
    return new Response(JSON.stringify({ error: 'client_id required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const state = btoa(JSON.stringify({ origin }));

  const githubUrl = new URL('https://github.com/login/oauth/authorize');
  githubUrl.searchParams.set('client_id', client_id);
  githubUrl.searchParams.set('scope', 'repo,user');
  githubUrl.searchParams.set('state', state);

  return Response.redirect(githubUrl.toString(), 302);
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return new Response('Missing code or state', { status: 400 });
  }

  let origin;
  try {
    origin = JSON.parse(atob(state)).origin;
  } catch {
    return new Response('Invalid state', { status: 400 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      state,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return new Response(JSON.stringify({ error: tokenData.error_description }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const html = `<!DOCTYPE html>
<html><head><title>Authenticating...</title></head>
<body><script>
(function(){
  if(window.opener){
    window.opener.postMessage('authorization:github:success:github:${tokenData.access_token}','*');
    window.close();
  }
})();
</script></body></html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
