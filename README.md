# Template Gallery

Static showcase of website templates. Vite + React + TypeScript + Tailwind v4, hosted on Netlify.

## Develop
```sh
npm install
npm run dev
```

## Add a template
Templates are self-contained HTML files served verbatim inside an iframe, so they render exactly as the original file.

1. Drop the `.html` into `public/templates/`.
2. Add an entry to `src/templates/index.ts` (slug, name, tagline, category, accent, file path).

The first entry in the registry loads by default at `/`. Each template is reachable at `/templates/<slug>` in the gallery, or at its raw file path (e.g. `/templates/liftflow-home.html`) standalone.

## Deploy (Netlify)
`netlify.toml` already sets build command (`npm run build`), publish dir (`dist`) and the SPA redirect. Either:
- connect this repo in the Netlify dashboard (Add new site → Import from Git), or
- `npx netlify-cli deploy --prod` from the project root.
