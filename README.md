# MEBS — Nevermore Ordinary

A one-page hype site for Mebs: Johns Hopkins University, summa cum laude, DECA
champion, engineer. Ravens, skulls, blood-red type, and a sky full of drifting
feathers.

## What's on it

- **The Cold Open** — a curtain that raises once per visitor. Skippable, and
  never shown under reduced motion.
- **The Dial of Nevermore** — a 1–11 hype control in the nav that scales grain,
  animation speed, glitch, feather and flock counts. At 11 the page picks up a
  blood vignette and a shake.
- **The Oracle** — ask the raven a question, get an answer that always rules in
  her favour. Rigged, and deterministic: the same question always draws the same
  line.
- **The Reckoning** — five questions and a standing (Peasant / Acolyte /
  Raven-Sworn), shareable through the URL hash. Not a quiz: no score, no ticks.
- **Certificate of Nevermore** — put your name to the record and download it as
  a PNG or an SVG.
- **The Raven, Revised** — Poe's stanza rewritten, typed out line by line.
- **Ambience** — an organ drone, occasional ravens and distant thunder, all
  synthesized in Web Audio. Off by default.
- **RAVENSTORM** — type `NEVERMORE` anywhere.
- A raven that rides the gutter as a scroll indicator, cards that flip to a
  sealed back, and a title that leans toward the cursor.

## Stack

- **React 18 + Vite** — static build, no server, no router. Deploys to GitHub
  Pages as-is.
- **Hand-written CSS** — one stylesheet, custom properties for the palette.
- **Inline SVG art** — the raven, skull, feather, sigil, wreath and seal are
  drawn in `src/components/Art.jsx`. No image assets to host or break.
- **Synthesized audio** — no audio files either. The drone, caws and thunder are
  built at runtime in `src/lib/useAmbience.js`.
- **No dependencies beyond React.** Everything above is hand-rolled on purpose.
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

If a deploy job ever fails after ~2 seconds with **no steps and no logs**, it was
rejected by an environment rule before it ran. Two separate settings control
this, and both matter:

1. **Settings → Pages → Source: GitHub Actions.** Without it, `configure-pages`
   fails in the *build* job (`Create Pages site failed`). The workflow token
   cannot turn this on itself.
2. **Settings → Environments → `github-pages` → Deployment branches and tags.**
   This is pinned to whatever the default branch was when Pages was first
   enabled, and it does *not* follow later changes to the default branch. If it
   names an old branch, deploys from `main` are refused with no logs.

One-time setup in the repo: **Settings → Pages → Build and deployment → Source:
GitHub Actions**. This must be done by a repo admin in the UI — the workflow's
`GITHUB_TOKEN` is not permitted to create the Pages site, so the first run fails
with `Create Pages site failed / Resource not accessible by integration` until
the toggle is set. Re-run the workflow afterwards.

The site is then served at `https://<user>.github.io/mebs-emo-site/`.

> **Renaming the repo?** The Vite `base` in `vite.config.js` and the favicon
> path in `index.html` both hard-code `/mebs-emo-site/`. Update both, or the
> assets will 404 on Pages.

## Layout

```
src/
  App.jsx          composition only
  sections/        one file per section of the page
  components/      reusable pieces (art, reveal, dial, ambient layers)
  lib/             shared hooks: the hype context, the single rAF loop,
                   the single scroll sampler, storage, audio, certificate
  data.js          accolades, skills, timeline, marquees
  data/            oracle answers, reckoning questions, the stanza
```

## Editing the content

The main copy — accolades, skill bars, timeline, marquee — lives in
`src/data.js`. Change it there; the components render whatever is in the arrays.
The interactive pieces have their own files under `src/data/`: `oracle.js`,
`reckoning.js` and `stanza.js`.

## Performance notes

Everything animated shares **one** `requestAnimationFrame` loop
(`src/lib/useRafLoop.js`) and **one** scroll listener
(`src/lib/useScrollProgress.js`). Add new animation by subscribing to those
rather than starting a loop of your own.

The hype dial does its work by writing CSS custom properties onto `<html>`, so
dragging it repaints rather than re-rendering the page. Only element *counts*
(feathers, flock) go through React. If you add something that should scale with
the dial, read `--hype-speed`, `--hype-grain`, `--hype-glitch` or `--hype-shake`
in CSS instead of subscribing to the context.

## Accessibility notes

- The decorative art is `aria-hidden`.
- Everything animated respects `prefers-reduced-motion`: the cold open never
  mounts, the feather fall and ravenstorm are removed, the stanza appears fully
  typed, the magnetic hero is neutralised, and all transitions collapse. The
  hype dial still changes density and colour — it just stops moving anything.
- The dial is a real `<input type="range">` and the reckoning's options are real
  radios, restyled rather than reimplemented, so keyboard and screen reader
  behaviour come free.
- The stanza is in the DOM as visually-hidden text in full, so nothing depends
  on watching it type.
- Sound is off by default and never starts without a click. A remembered "on"
  preference arms the *next* interaction rather than claiming to play at load,
  which browsers would refuse.
