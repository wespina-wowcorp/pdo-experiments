// @ts-check

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

console.log(" >>>>>> AB-169 Variant 1 Running >>>>>>");

// TODO - check tracking still works after swap

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "1";

/**
 * @typedef {object} Ab169Object
 * @property {NumberOfCPPTiles} numberOfCPPTiles
 * @property {TileMapping} tileMapping
 * @property {ChangeContent} changeContent
 * @property {RemovePromotedTagFromTiles} removePromotedTagFromTiles
 * @property {AddPromotedTagToTiles} addPromotedTagToTiles
 * @property {ExchangeElements} exchangeElements
 * @property {HasShuffled} hasShuffled
 * @property {Dynamic} dynamic
 */

/**
 * @typedef {Window & Ab169Object} CustomWindow
 * @type {CustomWindow}
 */
const WINDOW = window["ab169"] || {};

/**
 * @typedef {number} NumberOfCPPTiles
 * @type {NumberOfCPPTiles}
 */
const numberOfCPPTiles = 8;

/**
 * @typedef {Record<number, number>} TileMapping
 * @type {TileMapping}
 */
const tileMapping = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 10,
  5: 11,
  6: 12,
  7: 13,
};

/**
 * @typedef {(targetElement: HTMLElement, html: string) => void} ChangeContent
 * @type {ChangeContent}
 */
const changeContent = (targetElement, html) => {
  const documentFragment = document
    .createRange()
    .createContextualFragment(html);
  targetElement.replaceWith(documentFragment);
};

/**
 * @typedef {(tiles: HTMLCollection) => void} RemovePromotedTagFromTiles
 * @type {RemovePromotedTagFromTiles}
 */
const removePromotedTagFromTiles = (grid) => {
  Array.from(grid).forEach((tile) => {
    const promotedTag = tile.querySelector(
      ":scope product-stamp-grid .ab169-promoted"
    );
    if (promotedTag) {
      promotedTag.remove();
    }
  });
};

/**
 * @typedef {(tiles: Element[]) => void} AddPromotedTagToTiles
 * @type {AddPromotedTagToTiles}
 */
const addPromotedTagToTiles = (tiles) => {
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
};

/**
 * Swaps two DOM elements while keeping their event listeners attached.
 *
 * @typedef {(element1: Element, element2: Element) => void} ExchangeElements
 * @type {ExchangeElements}
 */
const exchangeElements = (element1, element2) => {
  if (element1 === element2 || !element1 || !element2) return;

  const parent1 = element1.parentNode;
  const sibling1 =
    element1.nextSibling === element2 ? element1 : element1.nextSibling;

  const parent2 = element2.parentNode;
  const sibling2 =
    element2.nextSibling === element1 ? element2 : element2.nextSibling;

  if (parent1 && parent2) {
    parent1.insertBefore(element2, sibling1);
    parent2.insertBefore(element1, sibling2);
  }
};

/**
 * @typedef {boolean} HasShuffled
 * @type {HasShuffled}
 */
let hasShuffled = false;

/**
 * @typedef {() => void} Dynamic
 * @type {Dynamic}
 */
const dynamic = () => {
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

    if (!specialsProductGrid || hasShuffled) return;
    const childNodes = specialsProductGrid.children; // does not include comment elements

    const CPPTiles = Array.from(childNodes).slice(0, WINDOW.numberOfCPPTiles);
    const mapping = WINDOW.tileMapping;

    WINDOW.removePromotedTagFromTiles(childNodes); // clean up before adding promoted tags
    WINDOW.addPromotedTagToTiles(CPPTiles);

    for (const tile in mapping) {
      WINDOW.exchangeElements(childNodes[tile], childNodes[mapping[tile]]);
    }

    hasShuffled = true;

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
};

WINDOW.numberOfCPPTiles = WINDOW.numberOfCPPTiles || numberOfCPPTiles;
WINDOW.tileMapping = WINDOW.tileMapping || tileMapping;
WINDOW.changeContent = WINDOW.changeContent || changeContent;
WINDOW.removePromotedTagFromTiles =
  WINDOW.removePromotedTagFromTiles || removePromotedTagFromTiles;
WINDOW.addPromotedTagToTiles =
  WINDOW.addPromotedTagToTiles || addPromotedTagToTiles;
WINDOW.exchangeElements = WINDOW.exchangeElements || exchangeElements;
WINDOW.dynamic = WINDOW.dynamic || dynamic;
WINDOW.hasShuffled = WINDOW.hasShuffled || hasShuffled;

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
  html:not(#ab169)[data-web-ab169="1"] cdx-card:has(product-stamp-grid .ab169-promoted) {
    background-color: pink;
  }
`);
