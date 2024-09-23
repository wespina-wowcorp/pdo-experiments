// ==UserScript==
// @name         AB-170: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-170
// @version      AB-170_variant_1
// @description  Father's Day Tile Engagement
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @require      file://C:\Users\1442718\Development\overrides\AB-170\Variant 1\main.js
// @grant        GM_addStyle
// ==/UserScript==

// GM_addStyle(`
//   .carousel-list cdx-carousel2-item:nth-child(1) cdx-card a img {
//     --image-src: url("https://placehold.co/386x232");
//     content: var(--image-src);
//   }
// `);

console.log("***** AB-170  ******");

document.documentElement.dataset.webAb170 = "2";

window.ab170 = window.ab170 || {};

window.ab170.tileDetails =
  window.ab170.tileDetails || {
    imageSrc: "https://www.woolworths.co.nz/content/f25wk9-fathersday-yellow-big.jpg",
    tileLink: "https://www.woolworths.co.nz/shop/browse/father-s-day?filters=Specials;Specials;Specials;true;Specials&page=1&inStockProductsOnly=false&variation=2"
  };

window.ab170.dynamic =
  window.ab170.dynamic ||
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

      observer.disconnect();

      const cardImage = firstCarouselCard.querySelector(":scope a img");
      const cardLink = firstCarouselCard.querySelector(":scope a");
      const cardTitle = firstCarouselCard.querySelector(
        ":scope .article-title"
      );

      if (cardLink && cardImage && cardTitle && cardTitle.childNodes[0]) {
        cardImage.src = window.ab170.tileDetails.imageSrc;
        cardLink.href = window.ab170.tileDetails.tileLink;

        // a click event listener is being added in the app so this overwrites the listener
        // https://stackoverflow.com/questions/68938727/remove-event-listener-without-knowing-what-the-call-back-function-is

        cardLink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          e.stopPropagation();
        }, true);
      }

      observer.observe(document.body, { childList: true, subtree: true });

    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab170.dynamic);
  } else {
    window.ab170.dynamic();
  }
} catch (error) {
  console.error("ab170:", error);
}