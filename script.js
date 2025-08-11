(() => {
  "use strict";

  // Mobile nav
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // CTA (Razorpay link from your original Hero)
  const BUY_URL = "https://rzp.io/rzp/qlBAO86N";
  document.querySelectorAll("[data-action='buy']").forEach(btn => {
    btn.addEventListener("click", () => window.open(BUY_URL, "_blank", "noopener"));
  });

  // Year
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // FAQ accordion (accessible)
  document.querySelectorAll(".ac-item").forEach(item => {
    const trigger = item.querySelector(".ac-trigger");
    const panel = item.querySelector(".ac-panel");
    if (!trigger || !panel) return;

    const set = (exp) => {
      trigger.setAttribute("aria-expanded", String(exp));
      item.setAttribute("aria-expanded", String(exp));
    };

    trigger.addEventListener("click", () => {
      const now = trigger.getAttribute("aria-expanded") === "true";
      set(!now);
    });

    // Start collapsed
    set(false);
  });

  // Smooth in-page anchor scroll (respects reduced motion)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (prefersReduced) { el.scrollIntoView(); return; }
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: "smooth" });
      // close mobile menu after nav
      nav?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Progressive image: if you add data-src later, this will lazy swap
  const swapLazy = (img) => {
    const src = img.getAttribute("data-src");
    if (src) { img.src = src; img.removeAttribute("data-src"); }
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { swapLazy(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "200px" });
    document.querySelectorAll("img[data-src]").forEach(img => io.observe(img));
  }
})();
