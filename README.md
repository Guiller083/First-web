# First-web
Internet web page about Lucía Martín-Portugues a professional fencer. The aim of the web is to promote Lucia's internet profile, gathering all the relevant information about her sports carrer in the same space. In a second phase to create a lead magnet, with a dashboard and monetize it.

## Project structure

```
.
├── index.html       # Landing page
├── css/styles.css   # Mobile-first styles
├── js/main.js       # Minimal JS (mobile nav toggle, Formspree form submit)
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

The site is static, at the repo root, with no build step (a `.nojekyll` file disables Jekyll processing). To publish it on **GitHub Pages**:

1. Go to **Settings → Pages**.
2. Under *Build and deployment*, choose **Source: Deploy from a branch**.
3. Select branch **`main`** and folder **`/ (root)`** and save.
4. After a minute the site is live at **<https://guiller083.github.io/First-web/>**.

## Mentoring form (Formspree)

The contact form in `index.html` posts to **Formspree**, so submissions arrive by email (no backend needed). To activate it:

The endpoint is already configured: `https://formspree.io/f/myeebnjr` (in the form's `action` in `index.html`). Submissions go to the email verified on that Formspree account.

To point it at a different form later, create the form in Formspree and replace the `action` URL. The form includes a `_gotcha` honeypot field for spam and works without JS via a normal POST.

## Architecture

Formulario, dominio, DNS y flujo de datos: [docs/architecture.md](docs/architecture.md).

## Content sources

- Photos of Lucía: from her Instagram [@luciamartinpb](https://www.instagram.com/luciamartinpb/), credited in the footer. Assumes Lucía has approved their use on the site.
- Site copy is in Spanish. Results and upcoming competitions: [FIE](https://fie.org/athletes/10145) and [Wikipedia](https://es.wikipedia.org/wiki/Luc%C3%ADa_Mart%C3%ADn-Portugu%C3%A9s). The competitions list and the ranking chart (inline SVG, percentile = 100 × (1 − (rank − 1) / ranked fencers), from FIE season rankings) are static and need manual updates.
- About text and quotes: interviews in ¡HOLA!, El Mundo, ABC and Women's Health (2024), linked on the page.
- The mentoring form posts to Formspree; see "Mentoring form (Formspree)" for activation.

- Typography: Montserrat (Google Fonts). Sponsor: Iberdrola logo from Lucía's assets.
