// @ts-check

// ==UserScript==
// @name         AB-169: Control
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-169
// @version      AB-169_control
// @description  CPP Reconfiguration V4
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @match        https://wwwsit.woolworths.co.nz/shop/specials*
// @require      file://C:/Users/1442718/Development/overrides/AB-169/Control/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-169 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "0";

/**
 * @typedef {object} Ab169Object
 * @property {RemovePromotedTagFromTile} removePromotedTagFromTile
 * @property {RemovePromotedTagFromTiles} removePromotedTagFromTiles
 * @property {PlaceElementAtIndex} placeElementAtIndex
 * @property {PlaceElementAtIndexWithoutTag} placeElementAtIndexWithoutTag
 * @property {Dynamic} dynamic
 */

/**
 * @typedef {Window & Ab169Object} CustomWindow
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
    const filtersParam = params.get("filters");
    const sortParam = params.get("sort");
    const specialsProductGrid = document.querySelector(
      "wnz-search .contentContainer-main product-grid"
    );

    if (!specialsProductGrid) {
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    observer.disconnect();

    const childNodes = specialsProductGrid.children; // does not include comment elements

    const isSpecialsPageOneWithDefaultFilters =
      (pageParam === null || pageParam === "1") &&
      filtersParam === null &&
      (sortParam === null ||
        sortParam === "BrowseRelevance");

    if (!isSpecialsPageOneWithDefaultFilters) {
      WINDOW.removePromotedTagFromTiles(childNodes);
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    } else {
      WINDOW.placeElementAtIndexWithoutTag(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndexWithoutTag(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndexWithoutTag(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndexWithoutTag(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndexWithoutTag(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndexWithoutTag(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndexWithoutTag(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndexWithoutTag(childNodes[0], childNodes, 23);
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
WINDOW.removePromotedTagFromTile =
  WINDOW.removePromotedTagFromTile || removePromotedTagFromTile;
WINDOW.placeElementAtIndex = WINDOW.placeElementAtIndex || placeElementAtIndex;
WINDOW.placeElementAtIndexWithoutTag =
  WINDOW.placeElementAtIndexWithoutTag || placeElementAtIndexWithoutTag;
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
  html:not(#ab169)[data-web-ab169="0"] cdx-card:has(product-stamp-grid .ab169-promoted) {
    background-color: pink;
  }
`);
