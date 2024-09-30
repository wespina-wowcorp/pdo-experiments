// ==UserScript==
// @name         AB-169: Control
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-169
// @version      AB-169control
// @description  CPP Reconfiguration V4
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @require      file://C:/Users/1442718/Development/overrides/AB-169/Control/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-169 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "0";

/**
 * @typedef {object} Ab169Object
 * @property {ChangeContent} changeContent
 * @property {RemovePromotedTagFromTiles} removePromotedTagFromTiles
 * @property {AddPromotedTagToTiles} addPromotedTagToTiles
 * @property {PlaceElementAtIndex} placeElementAtIndex
 * @property {Dynamic} dynamic
 */

/**
 * @typedef {Window & Ab169Object} CustomWindow
 * @type {CustomWindow}
 */
const WINDOW = window["ab169"] || {};

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

// TODO- remove this for post-prototype build
// ************************
/**
 * @typedef {(tiles: Element[]) => void} AddPromotedTagToTiles
 * @type {AddPromotedTagToTiles}
 */
const addPromotedTagToTiles = (tiles) => {
  tiles.forEach((tile, index) => {
    if (tile) {
      if (tile instanceof HTMLElement) {
        tile.style.backgroundImage = `url(https://placehold.co/224x488/plum/grey?text=${
          index + 1
        })`;
        tile.style.backgroundRepeat = "no-repeat";
      }
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
  const gridItem = array[index];
  const promotedTag = element.querySelector(":scope product-stamp-grid");
  if (!element || !promotedTag) return;
  if (gridItem && gridItem.parentNode) {
    gridItem.parentNode.insertBefore(element, gridItem);
  }
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

    // TODO - Verify more business rules
    // - Which filters will show the CPP tiles in the feed?
    if (!!promotedTag && (!pageParam || pageParam === "1")) {
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const childNodes = specialsProductGrid.children; // does not include comment elements

    // Assumes CPP tiles are in positions 0 - 8 in the API response
    const CPPTiles = Array.from(childNodes).slice(0, 8);

    WINDOW.removePromotedTagFromTiles(childNodes); // clean up before adding promoted tags

    if (!pageParam || pageParam === "1") {
      // Move first tile to last position x 8 times
      WINDOW.placeElementAtIndex(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndex(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndex(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndex(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndex(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndex(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndex(childNodes[0], childNodes, 23);
      WINDOW.placeElementAtIndex(childNodes[0], childNodes, 23);
      // Move last tile before all CPP tiles
      WINDOW.placeElementAtIndex(childNodes[23], childNodes, 15);

      // TODO - remove this for post-prototype build
      WINDOW.addPromotedTagToTiles(CPPTiles);
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

WINDOW.changeContent = WINDOW.changeContent || changeContent;
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
  html:not(#ab169)[data-web-ab169="0"] cdx-card:has(product-stamp-grid .ab169-promoted) {
    background-color: pink;
  }
`);

// TODO - Add check to see if tag exists before moving it
