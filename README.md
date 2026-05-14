# larsewi.com

Source for [larsewi.com](https://larsewi.com) — a React + TypeScript site built with Vite.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the built site locally
```

## Deploy

Edit the `DEPLOY_TARGET` in `deploy.sh` to point at the droplet, then:

```bash
./deploy.sh
```

The site is served as static files from Apache; no server-side runtime is required.
