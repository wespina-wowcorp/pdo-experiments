// ==UserScript==
// @name         AB-165: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-165
// @version      AB-165_variant_1
// @description  Father's Day Tile Engagement
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @require      file://C:\Users\1442718\Development\overrides\AB-165\Variant 1\main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log("***** AB-165!!  ******");

document.documentElement.dataset.webAb165 = "1";

window.ab165 = window.ab165 || {};

GM_addStyle(`
  .carousel-list cdx-carousel2-item:nth-child(1) cdx-card a img {
    --image-src: url("https://placehold.co/386x232");
    content: var(--image-src);
  }
`);

window.ab165.dynamic =
  window.ab165.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/shop/specials")) {
        return observer.disconnect();
      }
      // Stop observing and start making changes here.

      const carouselCard = document.querySelector('.carousel-list cdx-carousel2-item:nth-child(1) cdx-card');
      console.log("🚀 ~ newMutationObserver ~ carouselList:", carouselCard)

      // TODO - change URL link href

      observer.disconnect();

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
    document.addEventListener("DOMContentLoaded", window.ab165.dynamic);
  } else {
    window.ab165.dynamic();
  }
} catch (error) {
  console.error("ab165:", error);
}
