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

// GM_addStyle(`
//   .carousel-list cdx-carousel2-item:nth-child(1) cdx-card a img {
//     --image-src: url("https://placehold.co/386x232");
//     content: var(--image-src);
//   }
// `);

console.log("***** AB-165  ******");

document.documentElement.dataset.webAb165 = "3";

window.ab165 = window.ab165 || {};

const IMAGE_PLACEHOLDER =
  "https://www.woolworths.co.nz/content/235884_valentines-day_specials-hub_article-tile_386x232.jpg";
const IMAGE_ALT_PLACEHOLDER = "Check out this week's Father's Day Specials";
const LINK_3 =
  "https://www.woolworths.co.nz/shop/browse/father-s-day?filters=Special;Special;Special;true;Specials&page=1&inStockProductsOnly=false";
const TITLE = "Father's Day Specials";

window.ab165.dynamic =
  window.ab165.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/shop/specials")) {
        return observer.disconnect();
      }

      const firstCarouselCard = document.querySelector(
        ".carousel-list cdx-carousel2-item:nth-child(1) cdx-card"
      );

      if (!firstCarouselCard) {
        return;
      }

      const cardImage = firstCarouselCard.querySelector(":scope a img");
      const cardLink = firstCarouselCard.querySelector(":scope a");
      const cardTitle = firstCarouselCard.querySelector(
        ":scope .article-title"
      );

      if (cardLink && cardImage && cardTitle && cardTitle.childNodes[0]) {
        cardImage.src = IMAGE_PLACEHOLDER;
        cardImage.alt = IMAGE_ALT_PLACEHOLDER;

        const updatedURL = LINK_3;
        cardLink.href = updatedURL;
        cardTitle.childNodes[0].textContent = TITLE;
      }

      observer.disconnect();
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  })3

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab165.dynamic);
  } else {
    window.ab165.dynamic();
  }
} catch (error) {
  console.error("ab165:", error);
}