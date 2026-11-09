(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js-ready");

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const backToTop = document.querySelector("[data-back-to-top]");

  const closeMenu = () => {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  };

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      primaryNav.classList.toggle("is-open", !isOpen);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const updateScrollState = () => {
    const hasScrolled = window.scrollY > 12;
    if (header) header.classList.toggle("is-scrolled", hasScrolled);
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 450);
  };
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  document.querySelectorAll("[data-current-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        item.classList.add("is-visible");
      } else {
        revealObserver.observe(item);
      }
    });
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectGrid = document.querySelector("[data-project-grid]");
  if (filterButtons.length && projectGrid) {
    const projects = Array.from(projectGrid.querySelectorAll(".project-card"));
    const emptyMessage = document.querySelector("[data-filter-empty]");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.filter;
        let visibleCount = 0;
        filterButtons.forEach((filterButton) => {
          const selected = filterButton === button;
          filterButton.classList.toggle("is-selected", selected);
          filterButton.setAttribute("aria-pressed", String(selected));
        });
        projects.forEach((project) => {
          const categories = (project.dataset.category || "").split(/\s+/);
          const isVisible = category === "all" || categories.includes(category);
          project.hidden = !isVisible;
          if (isVisible) visibleCount += 1;
        });
        if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
      });
    });
  }

  const slides = Array.from(document.querySelectorAll("[data-testimonial-slide]"));
  if (slides.length) {
    let activeSlide = slides.findIndex((slide) => slide.classList.contains("is-current"));
    if (activeSlide < 0) activeSlide = 0;
    const currentCount = document.querySelector("[data-slide-current]");
    const totalCount = document.querySelector("[data-slide-total]");
    if (totalCount) totalCount.textContent = String(slides.length).padStart(2, "0");

    const showSlide = (nextIndex) => {
      activeSlide = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const isCurrent = index === activeSlide;
        slide.hidden = !isCurrent;
        slide.classList.toggle("is-current", isCurrent);
      });
      if (currentCount) currentCount.textContent = String(activeSlide + 1).padStart(2, "0");
    };

    document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => showSlide(activeSlide - 1));
    document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => showSlide(activeSlide + 1));
    showSlide(activeSlide);
  }

  const form = document.querySelector("#contact-form");
  if (form) {
    const status = form.querySelector("[data-form-status]");
    const fields = [
      { input: form.elements.namedItem("name"), error: form.querySelector("#name-error"), message: "Please enter your name (at least 2 characters)." },
      { input: form.elements.namedItem("email"), error: form.querySelector("#email-error"), message: "Please enter a valid email address." },
      { input: form.elements.namedItem("message"), error: form.querySelector("#message-error"), message: "Please tell us a little more (at least 10 characters)." }
    ];

    const validateField = ({ input, error, message }) => {
      const valid = input.checkValidity();
      input.setAttribute("aria-invalid", String(!valid));
      error.textContent = valid ? "" : message;
      return valid;
    };

    fields.forEach((field) => {
      field.input.addEventListener("input", () => {
        if (field.input.hasAttribute("aria-invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (status) {
        status.textContent = "";
        status.classList.remove("is-success");
      }
      const invalidFields = fields.filter((field) => !validateField(field));
      if (invalidFields.length) {
        invalidFields[0].input.focus();
        if (status) status.textContent = "Please review the highlighted fields.";
        return;
      }
      if (status) {
        status.textContent = "Your details look good. This demo form isn’t connected yet; please email [Add company email] to reach us.";
        status.classList.add("is-success");
      }
    });
  }
})();
