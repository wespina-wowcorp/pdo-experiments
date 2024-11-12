document.documentElement.dataset.webAb167 = "1";

window.ab167 = window.ab167 || {};

window.ab167.showTile =
  window.ab167.showTile ||
  ((targetElement) => {
    if (!targetElement) return;

    targetElement.style.display = "block";
  });

window.ab167.addAriaLabel =
  window.ab167.addAriaLabel ||
  ((targetElement) => {
    if (!targetElement) return;

    targetElement.ariaHidden = true;
  });

window.ab167.dynamic =
  window.ab167.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/lists/myfavourites")) {
        return observer.disconnect();
      }

      const productGrid = document.querySelector(
        ".contentContainer-main product-grid"
      );
      const includesProductsGrid = mutationList.some(
        (mutation) => mutation.target === productGrid
      );

      if (!includesProductsGrid) {
        return observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }

      observer.disconnect();

      const cdxCtaElements = productGrid.querySelectorAll(":scope cdx-cta");

      if (cdxCtaElements.length === 3) {
        const GENERIC_TILE = cdxCtaElements[0];
        const PET_TILE = cdxCtaElements[1];
        const BABY_TILE = cdxCtaElements[2];

        window.ab167.showTile(GENERIC_TILE);
        window.ab167.addAriaLabel(PET_TILE);
        window.ab167.addAriaLabel(BABY_TILE);
      }

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab167.dynamic);
  } else {
    window.ab167.dynamic();
  }
} catch (error) {
  console.error("ab167:", error);
}
