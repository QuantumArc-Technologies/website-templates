# Template Gallery

Static showcase of website templates. Vite + React + TypeScript + Tailwind v4, hosted on Netlify.

## Develop
```sh
npm install
npm run dev
```

## Templates
Each template started life as a Claude Design bundled `.html` page. `scripts/build-templates.sh` unpacks it
(`scripts/unbundle.py`), writes its media to `public/templates/<slug>/assets/`, and compiles the `<x-dc>` markup +
logic class into a plain React component at `src/templates/<slug>/Page.tsx` (`scripts/convert.py`). The tiny
`src/dc/runtime.tsx` reproduces the original runtime semantics, so pages render pixel-identical but are bundled by
Vite — no iframe, no runtime interpreter, ~10–18 KB gzipped JS per template.

To refresh from updated source files:
```sh
./scripts/build-templates.sh "/path/to/Lift Flow"
```
To add a sixth template: add a `build <slug> "<file>.html"` line to that script and an entry in `src/templates/index.ts`.

The first registry entry loads at `/`; each template is at `/templates/<slug>`. Use ← / → to switch.

## Deploy (Netlify)
`netlify.toml` already sets build command (`npm run build`), publish dir (`dist`) and the SPA redirect. Either:
- connect this repo in the Netlify dashboard (Add new site → Import from Git), or
- `npx netlify-cli deploy --prod` from the project root.
