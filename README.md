# MEBS — Nevermore Ordinary

A one-page hype site for Mebs: Johns Hopkins University, summa cum laude, DECA
champion, engineer. Ravens, skulls, blood-red type, and a sky full of drifting
feathers.

## Stack

- **React 18 + Vite** — static build, no server, no router. Deploys to GitHub
  Pages as-is.
- **Hand-written CSS** — one stylesheet, custom properties for the palette.
- **Inline SVG art** — the raven, skull, feather, and sigil are drawn in
  `src/components/Art.jsx`. No image assets to host or break.
- Only external dependency at runtime is Google Fonts (Cinzel, Cormorant
  Garamond, JetBrains Mono, UnifrakturMaguntia); the page degrades to system
  serif/mono if they fail to load.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/mebs-emo-site/
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages.

One-time setup in the repo: **Settings → Pages → Build and deployment → Source:
GitHub Actions**. This must be done by a repo admin in the UI — the workflow's
`GITHUB_TOKEN` is not permitted to create the Pages site, so the first run fails
with `Create Pages site failed / Resource not accessible by integration` until
the toggle is set. Re-run the workflow afterwards.

The site is then served at `https://<user>.github.io/mebs-emo-site/`.

> **Renaming the repo?** The Vite `base` in `vite.config.js` and the favicon
> path in `index.html` both hard-code `/mebs-emo-site/`. Update both, or the
> assets will 404 on Pages.

## Editing the content

All the copy — accolades, skill bars, timeline, marquee — lives in
`src/data.js`. Change it there; the components render whatever is in the arrays.

## Accessibility notes

- The decorative art is `aria-hidden`.
- Everything animated respects `prefers-reduced-motion`: the feather fall is
  removed entirely and all transitions collapse.
