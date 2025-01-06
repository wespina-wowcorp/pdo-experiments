document.documentElement.dataset.webAb171 = "0";

window.ab171 = window.ab171 || {};

window.ab171.hideTile =
  window.ab171.hideTile ||
  ((targetElement) => {
    if (!targetElement) return;

    targetElement.style.display = "none";
  });

window.ab171.init =
  window.ab171.init ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      observer.disconnect();

      if (!location.pathname.startsWith("/shop/searchproducts")) return;

      const productGrid = document.querySelector(
        "wnz-content .main wnz-search .search-results .contentContainer-main product-grid"
      );

      if (!productGrid) {
        return observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }

      // convert node lists to arrays
      const cigTiles = productGrid.querySelectorAll(":scope cdx-cta");
      const cigTile = [...cigTiles];
      const tiles = [...productGrid.children];

      // check it's position 5
      if (tiles.indexOf(cigTile[0]) === 4) {
        window.ab171.hideTile(cigTile[0]);
        return;
      }

      observer.observe(document.body, { childList: true, subtree: true });
    }).observe(document.body, {
      childList: true,
      subtree: true,
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
