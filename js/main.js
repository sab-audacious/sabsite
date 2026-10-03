/* Sabahat Naureen — site behaviour. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  /* ---- Nav: solid background after scroll, mobile menu toggle ---- */
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("is-open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Freebie form(s): static front-end only. ----
     No backend is wired up yet — swap the <form> action / add a real
     submit handler once an ESP (ConvertKit, Mailchimp, etc.) is chosen. */
  document.querySelectorAll("[data-freebie-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (input && !input.checkValidity()) {
        input.reportValidity();
        return;
      }
      var success = form.parentElement.querySelector(".freebie-success");
      form.classList.add("is-hidden");
      if (success) success.classList.add("is-visible");
      if (input) input.value = "";
    });
  });

  /* ---- Placeholder external links: honest, on-brand toast instead of a dead link ---- */
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  var toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  document.querySelectorAll("[data-todo-link]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showToast(link.getAttribute("data-todo-link") || "That link isn't wired up yet — even multi-hyphenates have TODOs.");
    });
  });

  /* ---- "Grab the guide" CTA: scroll to hero form and focus it ---- */
  document.querySelectorAll("[data-scroll-to-freebie]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var target = document.getElementById("freebie");
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      var input = target.querySelector('input[type="email"]');
      if (input) setTimeout(function () { input.focus(); }, 500);
    });
  });
})();
