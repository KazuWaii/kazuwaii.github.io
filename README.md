# kazuwaii.github.io

Mathieu Bonneau's portfolio, in French (`/`) and English (`/en/`): [kazuwaii.github.io](https://kazuwaii.github.io).

Static site built with [Astro](https://astro.build), deployed to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

## Editing the content

All the text lives in [`src/data/content.ts`](src/data/content.ts), French and English side by side.
To add a project, add an entry to `projects` there; a screenshot goes in `src/assets/projects/` (16:10).

Each project with a live demo gets a **Try it here** button that opens the app in a window on the page.
For Streamlit Community Cloud apps, `embed` points at the app itself (`https://<app>.streamlit.app/~/+/?embed=true`):
the documented `?embed=true` wrapper keeps the app in a 150px-high frame.

The CVs offered for download are in `public/cv/` (no phone number: the site is public).

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```
