// ==UserScript==
// @name         AB-164: Variant 2
// @namespace    http://tampermonkey.net/
// @version      AB-164_variant_2
// @description  try to take over the world!
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials
// @require      file://C:\Users\1442718\Development\overrides\AB-164\Variant 2\main.js
// ==/UserScript==

console.log("***** AB-164 - VARIANT 2! ******");

document.documentElement.dataset.webAb164 = "2";

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
        let strapLineText = "";

        if (!priceSave && !priceWas) {
          return;
        }

        if (priceSave && priceSave.textContent.startsWith("Save")) {
          strapLineText = priceSave.textContent;
        }

        const priceTags = card.querySelectorAll(".price--was");
        const presentPriceEl = card.querySelector(".presentPrice");
        const presentPrice = presentPriceEl.ariaLabel;
        const nonMemberPrice =
          priceTags[1] && priceTags[1].textContent.match("\\$(.*)");
        const price = presentPrice.match(/\$([\d.]+)/)[1];

        if (nonMemberPrice && price) {
          const saving = Number(nonMemberPrice[1]) - Number(price);
          strapLineText = `Save $${saving.toFixed(2)}`;
        }

        strapLine.textContent = strapLineText;
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
