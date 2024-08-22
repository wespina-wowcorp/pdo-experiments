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

window.ab165.tileDetails =
  window.ab165.tileDetails || {
    imageSrc: "https://www.woolworths.co.nz/content/f25wk9-fathersday-yellow-big.jpg",
    tileLink: "https://www.woolworths.co.nz/shop/content/fathers-day?variation=3",
    altText: "Check out this week's Father's Day Specials",
    title: "Father's Day Specials"
  }

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
        cardImage.alt = window.ab165.tileDetails.altText;
        cardTitle.childNodes[0].textContent = window.ab165.tileDetails.title;
        cardImage.src = window.ab165.tileDetails.imageSrc;
        cardLink.href = window.ab165.tileDetails.tileLink;

        // a click event listener is being added in the app so this overwrites the listener
        // https://stackoverflow.com/questions/68938727/remove-event-listener-without-knowing-what-the-call-back-function-is

        cardLink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          e.stopPropagation();
        }, true);
      }

      observer.disconnect();
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  })

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab165.dynamic);
  } else {
    window.ab165.dynamic();
  }
} catch (error) {
  console.error("ab165:", error);
}