// @ts-check

// ==UserScript==
// @name         AB-169: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-169
// @version      AB-169_variant_1
// @description  CPP Reconfiguration V4
// @author       Wilson
// @match        https://wwWINDOW.woolworths.co.nz/shop/specials*
// @require      file://C:/Users/1442718/Development/overrides/AB-169/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-169 Variant 1 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "1";


/**
 * @typedef {object} Ab169Object
 * @property {number} numberOfCPPTiles
 * @property {Record<number, number>} tileMapping // TODO - why does this not error?
 * @property {(_: string, __: string) => void} changeContent
 * @property {() => void} addPromotedTagToTiles
 * @property {() => void} exchangeElements
 * @property {() => void} dynamic
 */

/**
 * @typedef {Window & Ab169Object} CustomWindow
 */

/** @type {CustomWindow} */
const WINDOW = window["ab169"] || {};

WINDOW.numberOfCPPTiles = WINDOW.numberOfCPPTiles || 8;

WINDOW.tileMapping = WINDOW.tileMapping || {
  0: 0,
  1: "n1",
  2: null,
  3: 3,
  4: 10,
  5: 11,
  6: 12,
  7: 13,
};

/**
 * @typedef {object} ChangeContent
 * @param {string} targetElement
 * @param {string} html
 * @return void
 */
WINDOW.changeContent =
  WINDOW.changeContent ||
  ((targetElement, html) => {
    const documentFragment = document
      .createRange()
      .createContextualFragment(html);
    targetElement.replaceWith(documentFragment);
  });

WINDOW.addPromotedTagToTiles =
  WINDOW.addPromotedTagToTiles ||
  ((/** @type {HTMLElement[]} */ tiles) => {
    tiles.forEach((tile) => {
      const imageLink = tile.querySelector(
        ":scope product-stamp-grid .product-entry.product-cup a.productImage-container"
      );

      if (imageLink) {
        const div = document.createElement("div");
        imageLink.appendChild(div);
        WINDOW.changeContent(
          div,
          `<div _ngcontent-app-c4204720579="" class="promoted ng-star-inserted ab169-promoted">Promoted</div>`
        );
      }
    });
  });

WINDOW.exchangeElements =
  WINDOW.exchangeElements ||
  ((element1, element2) => {
    if (element1 === element2) return;

    const clonedElement1 = element1.cloneNode(true);
    const clonedElement2 = element2.cloneNode(true);

    element2.parentNode.replaceChild(clonedElement1, element2);
    element1.parentNode.replaceChild(clonedElement2, element1);

    return clonedElement1;
  });

WINDOW.dynamic =
  WINDOW.dynamic ||
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

      if (!specialsProductGrid) return;
      const childNodes = specialsProductGrid.children; // does not include comment elements
      const CPPTiles = Array.from(childNodes).slice(0, WINDOW.numberOfCPPTiles);
      const mapping = WINDOW.tileMapping;

      WINDOW.addPromotedTagToTiles(CPPTiles);

      for (const tile in mapping) {
        WINDOW.exchangeElements(childNodes[tile], childNodes[mapping[tile]]);
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
    document.addEventListener("DOMContentLoaded", WINDOW.dynamic);
  } else {
    WINDOW.dynamic();
  }
} catch (error) {
  console.error("ab169:", error);
}

// @ts-ignore
GM_addStyle(`
  html:not(#ab135)[data-web-ab169="1"] cdx-card:has(product-stamp-grid ['ab169']-promoted) {
    background-color: pink;
  }
`);
