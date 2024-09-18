// ==UserScript==
// @name         AB-169: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-169
// @version      AB-169_variant_1
// @description  CPP Reconfiguration V4
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @require      file://C:/Users/1442718/Development/overrides/AB-169/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-169 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "1";

window.ab169 = window.ab169 || {};

window.ab169.numberOfCPPTiles = window.ab169.numberOfCPPTiles || 8;

window.ab169.tileMapping = window.ab169.tileMapping || {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 10,
  5: 11,
  6: 12,
  7: 13,
};

window.ab169.changeContent =
  window.ab169.changeContent ||
  ((targetElement, html) => {
    const documentFragment = document
      .createRange()
      .createContextualFragment(html);
    targetElement.replaceWith(documentFragment);
  });

window.ab169.addPromotedTagToTiles =
  window.ab169.addPromotedTagToTiles ||
  ((tiles) => {
    tiles.forEach((tile) => {
      const imageLink = tile.querySelector(
        ":scope product-stamp-grid .product-entry.product-cup a.productImage-container"
      );

      if (imageLink) {
        const div = document.createElement("div");
        imageLink.appendChild(div);
        window.ab169.changeContent(
          div,
          `<div _ngcontent-app-c4204720579="" class="promoted ng-star-inserted">Promoted</div>`
        );
      }
    });
  });

window.ab169.exchangeElements =
  window.ab169.exchangeElements ||
  ((element1, element2) => {
    if (element1 === element2) return;

    const clonedElement1 = element1.cloneNode(true);
    const clonedElement2 = element2.cloneNode(true);

    element2.parentNode.replaceChild(clonedElement1, element2);
    element1.parentNode.replaceChild(clonedElement2, element1);

    return clonedElement1;
  });

window.ab169.dynamic =
  window.ab169.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/shop/specials")) {
        return observer.disconnect();
      }

      const specialsProductGrid = document.querySelector(
        "wnz-search .contentContainer-main product-grid"
      );
      const includesSpecialsGrid = mutationList.some(
        (mutation) => mutation.target === specialsProductGrid
      );

      if (!includesSpecialsGrid) {
        return;
      }

      observer.disconnect();

      const childNodes = specialsProductGrid.children; // does not include comment elements
      const CPPTiles = Array.from(childNodes).slice(
        0,
        window.ab169.numberOfCPPTiles
      );

      window.ab169.addPromotedTagToTiles(CPPTiles);

      const mapping = window.ab169.tileMapping;

      for (const tile in mapping) {
        window.ab169.exchangeElements(
          childNodes[tile],
          childNodes[mapping[tile]]
        );
      }

      // TODO - check tracking still works after swap

      /* INSERT CODE HERE */

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
    document.addEventListener("DOMContentLoaded", window.ab169.dynamic);
  } else {
    window.ab169.dynamic();
  }
} catch (error) {
  console.error("ab169:", error);
}
