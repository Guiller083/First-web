# Arquitectura

Sitio estático sin build ni backend propio: HTML + CSS + JS servidos por GitHub Pages. Los únicos servicios externos son Formspree (formulario de mentorías), Brevo (newsletter) y Google Fonts (tipografía).

## Formulario de mentorías (Formspree)

- **Ubicación:** sección `#mentoring`, dentro de `.mentoring-form-row > .form-wrap` (`index.html`).
- **Endpoint:** `action="https://formspree.io/f/myeebnjr"`, `method="POST"`.
- **Email receptor:** se configura en el dashboard de Formspree (*Settings → Target email*), **no en el código**.
- **Campos:** `name`, `email`, `type` (select: athlete/club/company/other), `message`, `consent` (checkbox), `_gotcha` (honeypot oculto anti-spam, `.hp-field` fuera de pantalla).
- **Flujo de envío:** `js/main.js` intercepta el `submit`, valida con `reportValidity()` y hace `fetch` con `Accept: application/json`; muestra confirmación o error en `#mf-status`. Sin JS, el formulario hace un POST nativo al mismo endpoint (fallback).

## Newsletter (Brevo)

- **Ubicación:** botón «Suscribirme» del footer (`.footer-panel`) abre el modal `#newsletter-modal` (`index.html`), un `<dialog>` nativo.
- **Gestión:** Brevo gestiona la lista `Newsletter web`, las altas, las bajas (enlace en cada correo) y las campañas. **No se guardan claves API en el repo**: la suscripción usa la URL pública del formulario de Brevo.
- **Endpoint:** `action` del `<form id="newsletter-form">`. Mientras no exista la cuenta de Brevo queda el placeholder `PENDIENTE-ENDPOINT-BREVO`, que `js/main.js` detecta para mostrar un aviso en vez de enviar. Para activarlo: Brevo → *Marketing → Formularios* → código de inserción → copiar la URL del `<form>` generado.
- **Campos:** `EMAIL`, `captcha` (suma matemática aleatoria 1–10 generada en `js/main.js`), `consent` (checkbox obligatorio y desmarcado; texto versionado en `docs/NEWSLETTER_V1.md`), `_gotcha` (honeypot oculto).
- **Flujo de envío:** `js/main.js` abre/cierra el modal (botón, ×, backdrop, Escape nativo del `<dialog>`), genera la suma al cargar y al abrir, valida con `reportValidity()`, descarta bots que rellenen el honeypot, comprueba la suma y hace `fetch` con `Accept: application/json`. Sin JS el modal no se abre (el botón queda inerte).
- **Privacidad:** `privacidad.html` (responsable, finalidades, base jurídica, proveedores, conservación, derechos) enlazada desde el consentimiento del modal y desde el footer.

## Dominio y despliegue

- **Hosting:** GitHub Pages, rama `main`, carpeta `/ (root)`. `.nojekyll` desactiva el procesado de Jekyll.
- **Dominio:** comprado en Namecheap. GitHub genera el archivo `CNAME` en el repo al configurar el dominio en *Settings → Pages*.
- **DNS (Namecheap):**
  - 4 registros `A` hacia las IPs de GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
  - `CNAME` de `www` → `guiller083.github.io`.
- **HTTPS:** gestionado por GitHub con Let's Encrypt (opción *Enforce HTTPS* en Settings → Pages).

## Flujo

```mermaid
flowchart LR
    U[Usuario] --> P[GitHub Pages<br/>guiller083.github.io/First-web]
    P --> F[Formulario mentorías<br/>index.html]
    F --> FS[Formspree<br/>/f/myeebnjr]
    FS --> G[Gmail de Lucía]
    P --> N[Modal newsletter<br/>index.html]
    N --> B[Brevo<br/>lista Newsletter web]
    B --> S[Suscriptores]
```

## Nota de seguridad

El repo es público: no incluir credenciales, API keys ni datos sensibles en el código. Todo lo publicado aquí es visible por cualquiera.
