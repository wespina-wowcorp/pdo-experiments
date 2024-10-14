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

document.documentElement.dataset.webAb169 = "1";

/**
 * @typedef {object} Ab169Var1Object
 * @property {RemovePromotedTagFromTile} removePromotedTagFromTile
 * @property {RemovePromotedTagFromTiles} removePromotedTagFromTiles
 * @property {AddPromotedTagToTiles} addPromotedTagToTiles
 * @property {PlaceElementAtIndex} placeElementAtIndex
 * @property {PlaceElementAtIndexWithoutTag} placeElementAtIndexWithoutTag
 * @property {Dynamic} dynamic
 */

/**
 * @typedef {Window & Ab169Var1Object} CustomWindow
 * @type {CustomWindow}
 */
const WINDOW = window["ab169"] || {};

/**
 * @typedef {(tile: Element) => void} RemovePromotedTagFromTile
 * @type {RemovePromotedTagFromTile}
 */
const removePromotedTagFromTile = (tile) => {
  const promotedTag = tile.querySelector(":scope product-stamp-grid .promoted");
  if (promotedTag) {
    promotedTag.remove();
  }
};

/**
 * @typedef {(tiles: HTMLCollection) => void} RemovePromotedTagFromTiles
 * @type {RemovePromotedTagFromTiles}
 */
const removePromotedTagFromTiles = (grid) => {
  Array.from(grid).forEach((tile) => {
    WINDOW.removePromotedTagFromTile(tile);
  });
};

// TODO- remove this for post-prototype build
// ************************
/**
 * @typedef {(tiles: Element[]) => void} AddPromotedTagToTiles
 * @type {AddPromotedTagToTiles}
 */
const addPromotedTagToTiles = (tiles) => {
  tiles.forEach((tile, index) => {
    const imageLink = tile.querySelector(
      ":scope product-stamp-grid .product-entry.product-cup a.productImage-container"
    );

    if (tile) {
      if (tile instanceof HTMLElement) {
        tile.style.backgroundImage = `url(https://placehold.co/224x488/pink/grey?text=${
          index + 1
        })`;
        tile.style.backgroundRepeat = "no-repeat";
      }
    }

    if (imageLink) {
      const div = document.createElement("div");
      div.classList.add("promoted");
      imageLink.appendChild(div);
    }
  });
};
// ************************

/**
 * Places DOM element at index while keeping their event listeners attached.
 *
 * @typedef {(element: Element, array: HTMLCollection, index: number) => void} PlaceElementAtIndex
 * @type {PlaceElementAtIndex}
 */
const placeElementAtIndex = (element, array, index) => {
  if (!element) return;

  const promotedTag = element.querySelector(
    ":scope product-stamp-grid .promoted"
  );

  if (!promotedTag) {
    return;
  }

  if (!element.classList.contains("ab-169-moved")) {
    element.classList.add("ab-169-moved");
  }

  const gridItem = array[index];

  if (gridItem !== null && gridItem.parentNode && gridItem.nextSibling) {
    gridItem.parentNode.insertBefore(element, gridItem.nextSibling);
  }
};

/**
 * Places DOM element at index while keeping their event listeners attached.
 *
 * @typedef {(element: Element, array: HTMLCollection, index: number) => void} PlaceElementAtIndexWithoutTag
 * @type {PlaceElementAtIndexWithoutTag}
 */
const placeElementAtIndexWithoutTag = (element, array, index) => {
  const gridItem = array[index];
  if (!element || !gridItem) return;
  let gridIndex = index;
  if (!gridItem) {
    gridIndex = array.length - 1;
  }
  WINDOW.placeElementAtIndex(element, array, gridIndex);
  WINDOW.removePromotedTagFromTile(element);
};

/**
 * @typedef {() => void} Dynamic
 * @type {Dynamic}
 */
const dynamic = () => {
  new MutationObserver((mutationList, observer) => {
    if (!location.pathname.startsWith("/shop/specials")) {
      return observer.disconnect();
    }

    const params = new URLSearchParams(document.location.search);
    const pageParam = params.get("page");

    const specialsProductGrid = document.querySelector(
      "wnz-search .contentContainer-main product-grid"
    );
    const includesSpecialsGrid = mutationList.some(
      (mutation) => mutation.target === specialsProductGrid
    );

    if (!includesSpecialsGrid || !specialsProductGrid) {
      return;
    }

    observer.disconnect();

    const promotedTag = specialsProductGrid.querySelector(
      ":scope product-stamp-grid .ab169-promoted"
    );

    if (!!promotedTag && (!pageParam || pageParam === "1")) {
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const childNodes = specialsProductGrid.children; // does not include comment elements

    if (!pageParam || pageParam === "1") {
      // TODO - remove after pre-build
      // ************************
      // Assumes CPP tiles are in positions 1 - 8 in the API response
      const CPPTiles = Array.from(childNodes).slice(0, 8);
      WINDOW.addPromotedTagToTiles(CPPTiles);
      // ************************

      WINDOW.placeElementAtIndex(childNodes[4], childNodes, 13);
      WINDOW.placeElementAtIndex(childNodes[4], childNodes, 13);
      WINDOW.placeElementAtIndex(childNodes[4], childNodes, 13);
      WINDOW.placeElementAtIndex(childNodes[4], childNodes, 13);
    }

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
};

WINDOW.removePromotedTagFromTiles =
  WINDOW.removePromotedTagFromTiles || removePromotedTagFromTiles;
WINDOW.addPromotedTagToTiles =
  WINDOW.addPromotedTagToTiles || addPromotedTagToTiles;
WINDOW.placeElementAtIndex = WINDOW.placeElementAtIndex || placeElementAtIndex;
WINDOW.dynamic = WINDOW.dynamic || dynamic;

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

  html:not(#ab169)[data-web-ab169="1"] .dynamic-content-row {
    display:none;
  }
`);
