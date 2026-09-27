(function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    let hidden = false;
    const hidePreloader = () => {
      if (hidden) return;
      hidden = true;
      preloader.classList.add("is-hidden", "fade-out");
      setTimeout(() => {
        if (preloader && preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        } else if (preloader) {
          preloader.style.display = "none";
        }
      }, 350);
    };

    const minDisplayPromise = new Promise((resolve) => setTimeout(resolve, 1200));
    const pageLoadPromise = new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    });

    Promise.all([minDisplayPromise, pageLoadPromise]).then(hidePreloader);
    setTimeout(hidePreloader, 2800);
  }

  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-panel");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const year = document.getElementById("year");
  const interestField = document.getElementById("interest");

  if (year) year.textContent = String(new Date().getFullYear());

  const params = new URLSearchParams(window.location.search);
  const interestParam = params.get("interest");
  if (interestField && interestParam) {
    const options = Array.from(interestField.options).map((o) => o.value);
    if (options.includes(interestParam)) interestField.value = interestParam;
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const overlay = document.getElementById("nav-overlay");

  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-visible");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
    if (overlay) overlay.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    if (overlay) overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  document.querySelectorAll(".nav-dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      btn.parentElement.classList.toggle("is-open", !expanded);
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  document.querySelectorAll(".team-photo").forEach((img) => {
    const hide = () => img.classList.add("is-missing");
    img.addEventListener("error", hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = ["name", "email", "organisation", "interest", "message"];
      let valid = true;

      fields.forEach((id) => {
        const field = form.querySelector("#" + id);
        const error = form.querySelector('[data-error-for="' + id + '"]');
        if (!field || !error) return;
        const value = field.value.trim();
        let message = "";

        if (!value) message = "This field is required.";
        else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Enter a valid email address.";
        }

        error.textContent = message;
        if (message) valid = false;
      });

      if (!valid) return;

      form.reset();
      status.classList.add("is-visible");
      status.focus();
    });
  }

  // Mouse 3D Hero Tilt Effect
  const heroBanner = document.querySelector(".hero-banner");
  const heroInner = document.querySelector(".hero-banner-inner");
  if (heroBanner && heroInner) {
    heroBanner.addEventListener("mousemove", (e) => {
      const rect = heroBanner.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 8;
      const rotateY = (x / rect.width) * 8;
      heroInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });

    heroBanner.addEventListener("mouseleave", () => {
      heroInner.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }

  // Page Load Optimization: Instant Link Prefetching on Hover
  const prefetched = new Set();
  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !prefetched.has(href)) {
        prefetched.add(href);
        const linkElem = document.createElement("link");
        linkElem.rel = "prefetch";
        linkElem.href = href;
        document.head.appendChild(linkElem);
      }
    }, { passive: true });
  });
})();
