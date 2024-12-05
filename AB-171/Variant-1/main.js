document.documentElement.dataset.webAb171 = "1";

window.ab171 = window.ab171 || {};

window.ab171.utils = window.ab171.utils || window.optimizely.get("utils");

window.ab171.waitForElement =
  window.ab171.waitForElement ||
  ((selector) => window.ab171.utils.waitForElement(selector));

window.ab171.showTile =
  window.ab171.showTile ||
  ((targetElement) => {
    if (!targetElement) return;

    targetElement.style.display = "block";
  });

window.ab171.init =
  window.ab171.init ||
  (() => {
    if (!location.pathname.startsWith("/shop/searchproducts")) return;

    window.ab171
      .waitForElement(
        "wnz-content .main wnz-search .search-results .contentContainer-main product-grid"
      )
      .then((productGrid) => {
        const cdxCtaElement = productGrid.querySelectorAll(":scope cdx-cta");

        if (cdxCtaElement.length === 1) { // TODO - check position is 5?
          window.ab171.showTile(cdxCtaElement[0]);
        }
      });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab171.init);
  } else {
    window.ab171.init();
  }
} catch (error) {
  console.error("ab171:", error);
}
