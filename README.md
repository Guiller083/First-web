# First-web
Internet web page about Lucía Martín-Portugues a professional fencer. The aim of the web is to promote Lucia's internet profile, gathering all the relevant information about her sports carrer in the same space. In a second phase to create a lead magnet, with a dashboard and monetize it.

## Project structure

```
.
├── index.html       # Landing page
├── css/styles.css   # Mobile-first styles
├── js/main.js       # Minimal JS (mobile nav toggle, inactive form guard)
├── favicon.svg
└── assets/img/      # Photos
```

## Getting started

This is a plain static site with no build step and no dependencies.

- **Open directly:** double-click `index.html` (or open it from your browser).
- **Serve locally:** from the project root run

  ```bash
  python -m http.server 8000
  ```

  then visit <http://localhost:8000>.

## Deployment

The site can be deployed with **GitHub Pages**: in the repository go to *Settings → Pages*, choose *Deploy from a branch*, select `main` and the `/ (root)` folder, and save. The site will be published at `https://<username>.github.io/First-web/`.

## Content sources

- Photos of Lucía: from her Instagram [@luciamartinpb](https://www.instagram.com/luciamartinpb/), credited in the footer. Assumes Lucía has approved their use on the site.
- Site copy is in Spanish. Results and upcoming competitions: [FIE](https://fie.org/athletes/10145) and [Wikipedia](https://es.wikipedia.org/wiki/Luc%C3%ADa_Mart%C3%ADn-Portugu%C3%A9s). The competitions list and the ranking chart (inline SVG, percentile = 100 × (1 − (rank − 1) / ranked fencers), from FIE season rankings) are static and need manual updates.
- About text and quotes: interviews in ¡HOLA!, El Mundo, ABC and Women's Health (2024), linked on the page.
- The mentoring form in `index.html` is intentionally inactive (no `action`, submit button disabled).

- Typography: Montserrat (Google Fonts). Sponsor: Iberdrola logo from Lucía's assets.
