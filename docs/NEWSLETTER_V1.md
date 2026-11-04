# Consentimiento de la newsletter — versión 1

- **Fecha:** noviembre de 2026
- **Dónde se muestra:** modal de suscripción del footer (`#newsletter-modal` en `index.html`).
- **Proveedor:** Brevo (formulario `Newsletter web`, alta inmediata sin confirmación por email).

## Texto del consentimiento

> He leído y acepto recibir por correo electrónico la newsletter de Lucía Martín-Portugués, que podrá incluir contenidos editoriales, novedades, recomendaciones e información comercial y promociones sobre productos y servicios propios y de terceros. Entiendo que los envíos serán esporádicos y que puedo darme de baja en cualquier momento. He leído la Política de privacidad (`privacidad.html`).

## Reglas de implementación

- La casilla es obligatoria y aparece desmarcada por defecto (sin casillas premarcadas).
- La baja es gratuita mediante el enlace incluido en cada correo de Brevo.
- Las marcas anunciadas en la newsletter no reciben la lista de suscriptores ni pueden contactar directamente con ellos.
- Anti-spam: suma matemática aleatoria en el modal + honeypot `_gotcha`.
