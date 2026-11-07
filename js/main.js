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
          status.textContent = "No se pudo enviar. Inténtalo de nuevo o escribe a luciaesgrima@gmail.com.";
        }
      }).catch(function () {
        status.textContent = "No se pudo enviar. Inténtalo de nuevo o escribe a luciaesgrima@gmail.com.";
      });
    });
  }

  // Newsletter modal: abrir/cerrar, captcha de suma y envío a Brevo.
  // El endpoint público del formulario va en el `action` del formulario.
  var nlOpen = document.querySelectorAll("[data-newsletter-open]");
  var nlModal = document.getElementById("newsletter-modal");
  var nlForm = document.getElementById("newsletter-form");
  var nlStatus = document.getElementById("nl-status");
  var nlEmail = document.getElementById("nl-email");
  var nlCaptcha = document.getElementById("nl-captcha");
  var nlCaptchaQ = document.getElementById("nl-captcha-q");
  var nlGotcha = document.getElementById("nl-gotcha");
  var nlAnswer = 0;

  function newCaptcha() {
    var a = 1 + Math.floor(Math.random() * 10);
    var b = 1 + Math.floor(Math.random() * 10);
    nlAnswer = a + b;
    if (nlCaptchaQ) {
      nlCaptchaQ.textContent = a + " + " + b;
    }
    if (nlCaptcha) {
      nlCaptcha.value = "";
    }
  }

  if (nlOpen && nlModal && nlForm && nlStatus) {
    newCaptcha();

    nlOpen.forEach(function (button) {
      button.addEventListener("click", function () {
        if (nav && nav.classList.contains("is-open")) {
          setNav(false);
        }
        newCaptcha();
        nlStatus.textContent = "";
        nlModal.showModal();
        if (nlEmail) {
          nlEmail.focus();
        }
      });
    });

    var nlClose = nlModal.querySelector(".modal-close");
    if (nlClose) {
      nlClose.addEventListener("click", function () {
        nlModal.close();
      });
    }

    // Clic en el backdrop (fuera de la tarjeta) cierra el modal
    nlModal.addEventListener("click", function (event) {
      if (event.target === nlModal) {
        nlModal.close();
      }
    });

    nlForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!nlForm.reportValidity()) {
        return;
      }

      // Bots que rellenan el honeypot: éxito falso sin enviar nada
      if (nlGotcha && nlGotcha.value !== "") {
        nlStatus.textContent = "¡Ya estás dentro! Recibirás la newsletter cuando publiquemos nuevos contenidos o novedades.";
        nlForm.reset();
        return;
      }

      if (parseInt(nlCaptcha.value, 10) !== nlAnswer) {
        nlStatus.textContent = "La suma no es correcta. Inténtalo de nuevo.";
        newCaptcha();
        nlCaptcha.focus();
        return;
      }

      nlStatus.textContent = "Enviando…";
      // El endpoint de Brevo (sibforms) no devuelve cabeceras CORS, así que
      // la respuesta llega opaca: se asume éxito si el envío no falla en red.
      fetch(nlForm.action, {
        method: "POST",
        body: new FormData(nlForm),
        mode: "no-cors"
      }).then(function () {
        nlStatus.textContent = "¡Ya estás dentro! Recibirás la newsletter cuando publiquemos nuevos contenidos o novedades. ¡Gracias por acompañarnos!";
        nlForm.reset();
        newCaptcha();
      }).catch(function () {
        nlStatus.textContent = "No hemos podido completar tu suscripción. Comprueba que tu dirección de correo electrónico es correcta e inténtalo de nuevo. Si el problema continúa, escribe a luciaesgrima@gmail.com.";
      });
    });
  }

  // Keep footer year current
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
