// ==UserScript==
// @name         AB-164: Variant 1
// @namespace    http://tampermonkey.net/
// @version      AB-164_variant_1
// @description  try to take over the world!
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials
// @require      file://C:\Users\1442718\Development\overrides\AB-164\Variant 1\main.js
// ==/UserScript==

// console.log("***** AB-164  ******");

document.documentElement.dataset.webAb164 = "1";

window.ab164 = window.ab164 || {};

window.ab164.dynamic =
  window.ab164.dynamic ||
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
    document.addEventListener("DOMContentLoaded", window.ab164.dynamic);
  } else {
    window.ab164.dynamic();
  }
} catch (error) {
  console.error("ab164:", error);
}
