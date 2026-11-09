# Modelo de amenazas — Guiller083/First-web

Web promocional estática de la esgrimista Lucía Martín-Portugués, publicada en `luciamartinportugues.com` (GitHub Pages, rama `main`, raíz). Sin build, sin backend propio, sin dependencias. Basado en el código (`index.html`, `js/main.js`, `docs/architecture.md`, `docs/NEWSLETTER_V1.md`, `README.md`) y en las respuestas del usuario (marcadas como **[usuario]**).

## Componentes

| Componente | Qué cubre |
|---|---|
| **Páginas estáticas** | `index.html`, `privacidad.html`, `suscripcion-confirmada.html`, `css/styles.css`, `assets/`, `favicon.svg` |
| **JS cliente** | `js/main.js` (menú, envío de formularios, modal y captcha) |
| **Formulario de mentorías** | `#mentoring-form` en `index.html` → Formspree `https://formspree.io/f/myeebnjr` → Gmail de Lucía |
| **Newsletter** | `#newsletter-modal` / `#newsletter-form` en `index.html` → Brevo `d9a076fe.sibforms.com/serve/…` (lista «Newsletter web», doble opt-in) |
| **Hosting y dominio** | GitHub Pages, `CNAME`, `.nojekyll`, DNS en Namecheap (A → IPs de GitHub, `www` CNAME), HTTPS de GitHub |
| **Repositorio y documentación** | `README.md`, `docs/`, `.gitignore`, historial git (repo **público**) |

## Fronteras de confianza y puntos de entrada

- Navegador del visitante ↔ GitHub Pages: cualquier visitante anónimo lee todo el contenido; no hay autenticación ni sesión.
- Navegador ↔ Formspree: POST público (`name`, `email`, `type`, `message`, `consent`, `_gotcha`), con `fetch` y fallback de POST nativo.
- Navegador ↔ Brevo: POST público `no-cors` (`EMAIL`, `OPT_IN`, `locale`, `email_address_check`, `captcha`, `_gotcha`). La respuesta es opaca: el sitio siempre muestra éxito.
- Navegador ↔ Google Fonts (CSS de terceros, sin SRI).
- Quien tenga escritura en el repo de GitHub publica directamente en producción al hacer merge a `main`.
- Paneles de Formspree, Brevo, GitHub y Namecheap: fuera del código, controlan los datos y el dominio.

## Activos

- **Datos personales de suscriptores y contactos** (emails, nombres, mensajes de mentorías) en Brevo, Formspree y Gmail — **crítico [usuario]**. Sujeto a RGPD (`privacidad.html`).
- **Cuentas de terceros** (GitHub, Formspree, Brevo, Namecheap) — **crítico [usuario]**: su compromiso da acceso a los datos o permite publicar/redirigir la web y el dominio.
- Integridad y reputación de la web (contenido, enlaces, marca de Lucía y del patrocinador) — importante (no seleccionado como prioritario por el usuario, pero no excluido).
- Email público `luciaesgrima@gmail.com` (publicado a propósito).

## Atacantes relevantes

- **Visitantes anónimos y bots de spam [usuario]**: abuso de los formularios (spam, altas falsas en la newsletter, envío de correos de confirmación a terceros, inyección de contenido en mensajes que llegan al email de Lucía).
- **Suplantación de Lucía [usuario]**: phishing con su marca, toma del dominio o subdominios (registros DNS colgantes, `CNAME`), envío de newsletters falsas, formularios clonados que capturen datos.
- Proveedor externo comprometido (Google Fonts, Formspree, Brevo): el usuario no lo marcó como prioritario, pero no lo excluyó.

## Controles existentes

- Sitio estático sin backend ni secretos; nota de seguridad en `docs/architecture.md` (repo público, nada de credenciales); `.gitignore` excluye `.env*`.
- Honeypots `_gotcha` (Formspree y propio) y `email_address_check` (Brevo); captcha de suma 1–10 **solo validado en cliente** (`js/main.js`).
- Consentimiento RGPD obligatorio y desmarcado; doble opt-in activado en Brevo; política de privacidad.
- HTTPS forzado por GitHub Pages; enlaces externos con `rel="noopener"`.
- El JS solo usa `textContent` para mensajes de estado (sin `innerHTML`).

## Fuera de alcance / riesgo aceptado

- **Nada [usuario]**: el usuario indica que todo cuenta, incluidos spam en formularios, cabeceras de seguridad que GitHub Pages no permite (CSP, etc.) y recursos externos sin SRI.

## Infraestructura

No hay repositorio de infraestructura **[usuario]**: GitHub Pages y Namecheap se configuran a mano en sus paneles, así que DNS, protección de rama y 2FA de cuentas no son verificables desde el código.

## Preguntas abiertas

- ¿Está activado 2FA en GitHub, Formspree, Brevo, Namecheap y Gmail? ¿Quién más tiene escritura en el repo?
- ¿Formspree tiene restricción de dominio de origen y reCAPTCHA activados en su panel?
- ¿Hay registros DNS o subdominios antiguos que apunten a servicios ya dados de baja?
