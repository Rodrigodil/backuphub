(() => {
  "use strict";

  const body = document.body;
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const desktopBreakpoint = window.matchMedia("(min-width: 960px)");

  function setMenu(open) {
    if (!menuToggle || !menu) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
    body.classList.toggle("menu-open", open && !desktopBreakpoint.matches);
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  menu?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setMenu(false);
    }
  });

  desktopBreakpoint.addEventListener("change", () => setMenu(false));

  const showcaseSelectors = Array.from(
    document.querySelectorAll("[data-showcase-select]")
  );
  const showcasePreview = document.querySelector("[data-showcase-preview]");
  const showcaseAvif = document.querySelector("[data-showcase-avif]");
  const showcaseWebp = document.querySelector("[data-showcase-webp]");
  const showcaseImage = document.querySelector("[data-showcase-image]");
  const showcaseTitle = document.querySelector("[data-showcase-title]");
  const showcaseDescription = document.querySelector(
    "[data-showcase-description]"
  );
  const showcaseCounter = document.querySelector("[data-showcase-counter]");

  function selectShowcase(selector, index) {
    if (
      !(selector instanceof HTMLButtonElement) ||
      !(showcasePreview instanceof HTMLButtonElement) ||
      !(showcaseImage instanceof HTMLImageElement)
    ) {
      return;
    }

    const { png, webp, avif, title, description, alt, width, height } =
      selector.dataset;

    if (!png || !webp || !avif || !title || !description || !alt) {
      return;
    }

    showcaseSelectors.forEach((button) => {
      const isActive = button === selector;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    showcaseAvif?.setAttribute("srcset", avif);
    showcaseWebp?.setAttribute("srcset", webp);
    showcaseImage.src = png;
    showcaseImage.alt = alt;

    if (width && height) {
      showcaseImage.width = Number(width);
      showcaseImage.height = Number(height);
    }

    showcasePreview.dataset.image = png;
    showcasePreview.dataset.alt = alt;
    showcasePreview.setAttribute("aria-label", `Ampliar ${title.toLowerCase()}`);

    if (showcaseTitle) {
      showcaseTitle.textContent = title;
    }

    if (showcaseDescription) {
      showcaseDescription.textContent = description;
    }

    if (showcaseCounter) {
      showcaseCounter.textContent =
        `${String(index + 1).padStart(2, "0")} / ` +
        String(showcaseSelectors.length).padStart(2, "0");
    }
  }

  showcaseSelectors.forEach((selector, index) => {
    selector.addEventListener("click", () => selectShowcase(selector, index));
  });

  const dialog = document.querySelector("[data-lightbox]");
  const dialogImage = document.querySelector("[data-lightbox-image]");
  const dialogCaption = document.querySelector("[data-lightbox-caption]");
  const dialogClose = document.querySelector("[data-lightbox-close]");
  let lightboxTrigger = null;

  function closeLightbox() {
    if (!(dialog instanceof HTMLDialogElement) || !dialog.open) {
      return;
    }

    dialog.close();
  }

  document.querySelectorAll("[data-gallery-open]").forEach((button) => {
    button.addEventListener("click", () => {
      if (
        !(dialog instanceof HTMLDialogElement) ||
        !(dialogImage instanceof HTMLImageElement)
      ) {
        return;
      }

      const image = button.getAttribute("data-image");
      const alt = button.getAttribute("data-alt");

      if (!image || !alt) {
        return;
      }

      lightboxTrigger = button;
      dialogImage.src = image;
      dialogImage.alt = alt;

      if (dialogCaption) {
        dialogCaption.textContent = alt;
      }

      body.classList.add("lightbox-open");
      dialog.showModal();
      dialogClose?.focus();
    });
  });

  dialogClose?.addEventListener("click", closeLightbox);

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeLightbox();
    }
  });

  dialog?.addEventListener("close", () => {
    body.classList.remove("lightbox-open");
    dialogImage?.removeAttribute("src");

    if (lightboxTrigger instanceof HTMLElement) {
      lightboxTrigger.focus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (dialog instanceof HTMLDialogElement && dialog.open) {
      closeLightbox();
      return;
    }

    setMenu(false);
  });
})();
