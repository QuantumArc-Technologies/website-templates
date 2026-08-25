# Template Gallery

Static showcase of website templates. Vite + React + TypeScript + Tailwind v4, hosted on Netlify.

## Develop
```sh
npm install
npm run dev
```

## Add a template
1. Create `src/templates/<name>/index.tsx` exporting a default React component.
2. Add an entry to `src/templates/index.ts` (slug, name, tagline, category, accent, lazy import).

The first entry in the registry loads by default at `/`. Each template is also reachable at `/templates/<slug>`; add `?bare=1` to view it without the gallery chrome.

## Deploy (Netlify)
`netlify.toml` already sets build command (`npm run build`), publish dir (`dist`) and the SPA redirect. Either:
- connect this repo in the Netlify dashboard (Add new site → Import from Git), or
- `npx netlify-cli deploy --prod` from the project root.
