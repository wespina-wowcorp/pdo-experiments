document.documentElement.dataset.webAb171 = "1";

window.ab171 = window.ab171 || {};

window.ab171.utagLink =
  window.ab171.utagLink ||
  ((tealiumEvent) => {
    if (utag && utag.link) return utag.link(tealiumEvent);
    return null;
  });

window.ab171.laundryTrackingObj = window.ab171.laundryTrackingObj || {
  tealium_event: "ab_test",
  test_name: "AB-171",
  test_event: "Click",
  test_component: "CIG Tile",
  test_content: "Laundry Powder Shop now",
};

window.ab171.toiletRollTrackingObj = window.ab171.toiletRollTrackingObj || {
  tealium_event: "ab_test",
  test_name: "AB-171",
  test_event: "Click",
  test_component: "CIG Tile",
  test_content: "Toilet Paper Shop now",
};

window.ab171.containsSearchTerm =
  window.ab171.containsSearchTerm ||
  ((searchTerms) => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search").toLowerCase();

    return searchTerms
      .map((terms) => terms.toLowerCase())
      .includes(searchParam);
  });

window.ab171.init =
  window.ab171.init ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/shop/searchproducts")) return;

      observer.disconnect();

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
        if (
          window.ab171.containsSearchTerm([
            "Laundry Detergents",
            "Laundry Liquid",
            "Laundry Powder",
            "Laundry Detergent",
            "Laundry Pod",
            "Laundry Capsule",
          ])
        ) {
          cigTile[0].addEventListener(
            "click",
            () => window.ab171.utagLink(window.ab171.laundryTrackingObj),
            { once: true }
          );
        } else if (
          window.ab171.containsSearchTerm([
            "Toilet Roll",
            "Toilet Rolls",
            "Toilet Paper",
          ])
        ) {
          cigTile[0].addEventListener(
            "click",
            () => window.ab171.utagLink(window.ab171.toiletRollTrackingObj),
            { once: true }
          );
        }

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
