// ==UserScript==
// @name         AB-165: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-165
// @version      AB-165_variant_1
// @description  Father's Day Tile Engagement
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @require      file://C:\Users\1442718\Development\overrides\AB-165\Variant 1\main.js
// ==/UserScript==

// console.log("***** AB-165  ******");

document.documentElement.dataset.webAb165 = "1";

window.ab165 = window.ab165 || {};

window.ab165.dynamic =
  window.ab165.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/shop/specials"))
        return observer.disconnect();
      // Stop observing and start making changes here.
      observer.disconnect();

      const productCards = document.querySelectorAll(
        "cdx-card.card.ng-star-inserted"
      );

      productCards.forEach((card) => {
        const strapLine = card.querySelector(".productStrap-text");
        const priceWas = card.querySelector(".price--was");
        const priceSave = card.querySelector(".price--save");
        const fullPrice = priceWas && priceWas.textContent.match("\\$(.*)");
        const savedPrice = priceSave && priceSave.textContent.match("\\$(.*)");
        let percentage = 0;

        if (fullPrice !== null && savedPrice !== null) {
          percentage = Math.round(
            (Number(savedPrice[1]) / Number(fullPrice[1])) * 100
          );
        } else {
          const priceTags = card.querySelectorAll(".price--was");
          const presentPriceEl = card.querySelector(".presentPrice");
          const presentPrice = presentPriceEl.ariaLabel;
          const nonMemberPrice =
            priceTags[1] && priceTags[1].textContent.match("\\$(.*)");
          const price = presentPrice.match(/\$([\d.]+)/)[1];

          if (nonMemberPrice && price) {
            percentage =
              100 -
              Math.round((Number(price) / Number(nonMemberPrice[1])) * 100);
          }
        }

        if (
          (strapLine.textContent.startsWith("Save") ||
            strapLine.textContent === "") &&
          percentage !== 0
        ) {
          strapLine.textContent = `${percentage}% Off`;
        }
      });

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
