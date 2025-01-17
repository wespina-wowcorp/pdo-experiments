document.documentElement.dataset.webAb171 = "0";

window.ab171 = window.ab171 || {};

window.ab171.utils = window.ab171.utils || window.optimizely.get("utils");

window.ab171.waitForElement =
  window.ab171.waitForElement ||
  ((selector) => window.ab171.utils.waitForElement(selector));

window.ab171.hideTile =
  window.ab171.hideTile ||
  ((targetElement) => {
    if (!targetElement) return;

    targetElement.style.display = "none";
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
        const cigTile = productGrid.querySelectorAll(":scope cdx-cta");

        if (cigTile.length === 1) { // TODO - check position is 5?
          window.ab171.hideTile(cigTile[0]);
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
