(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A" && nav.classList.contains("is-open")) {
        setNav(false);
      }
    });
  }

  // Mentoring form: submit to Formspree via fetch, with a normal POST as fallback
  // (without JS the form still submits natively to the same endpoint).
  var form = document.getElementById("mentoring-form");
  var status = document.getElementById("mf-status");
  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) {
        return;
      }
      status.textContent = "Enviando…";
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (response) {
        if (response.ok) {
          status.textContent = "¡Gracias! Tu solicitud se ha enviado.";
          form.reset();
        } else {
          status.textContent = "No se pudo enviar. Inténtalo de nuevo o escribe a luciamartinportugues@gmail.com.";
        }
      }).catch(function () {
        status.textContent = "No se pudo enviar. Inténtalo de nuevo o escribe a luciamartinportugues@gmail.com.";
      });
    });
  }

  // Keep footer year current
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
