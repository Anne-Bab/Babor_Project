document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var msg = form.querySelector("#message");
      var valid = true;

      if (!name || !name.value.trim()) {
        status.textContent = "Please enter your name.";
        status.classList.add("error");
        valid = false;
      } else if (!email || !/\\S+@\\S+\\.\\S+/.test(email.value.trim())) {
        status.textContent = "Please enter a valid email.";
        status.classList.add("error");
        valid = false;
      } else if (!msg || !msg.value.trim()) {
        status.textContent = "Please enter a message.";
        status.classList.add("error");
        valid = false;
      }

      if (!valid) return;

      status.textContent = "Thanks! Your message has been received.";
      status.classList.add("success");
      form.reset();
    });
  }
});
