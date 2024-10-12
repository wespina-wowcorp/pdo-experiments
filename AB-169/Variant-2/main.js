// ==UserScript==
// @name         AB-169: Variant 2
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-169
// @version      AB-169_variant_2
// @description  CPP Reconfiguration V4
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @match        https://wwwsit.woolworths.co.nz/shop/specials
// @require      file:///Users/wilsonespina/Development/woolworths/pdo-experiments/AB-169/Variant-2/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-169 Variant 2 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "2";

/**
 * @typedef {object} Ab169Object
 * @property {ChangeContent} changeContent
 * @property {RemovePromotedTagFromTile} removePromotedTagFromTile
 * @property {RemovePromotedTagFromTiles} removePromotedTagFromTiles
 * @property {AddPromotedTagToTiles} addPromotedTagToTiles
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
      imageLink.appendChild(div);
      WINDOW.changeContent(
        div,
        `<div _ngcontent-app-c4204720579="" class="promoted ng-star-inserted ab169-promoted">Promoted</div>`
      );
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
  if (!element) return;
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
  WINDOW.removePromotedTagFromTile(element);
  WINDOW.placeElementAtIndex(element, array, index);
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

    const childNodes = specialsProductGrid.children; // does not include comment

    // Assumes CPP tiles are in positions 0 - 8 in the API response
    const CPPTiles = Array.from(childNodes).slice(0, 7);

    // WINDOW.removePromotedTagFromTiles(childNodes); // clean up before adding promoted tags

    if (!pageParam || pageParam === "1") {
      // TODO - remove after pre-build
      // ************************
       WINDOW.addPromotedTagToTiles(CPPTiles);
      // ************************
      WINDOW.placeElementAtIndexWithoutTag(
        childNodes[5],
        childNodes,
        childNodes.length - 1
      );
      WINDOW.placeElementAtIndexWithoutTag(
        childNodes[5],
        childNodes,
        childNodes.length - 1
      );
      WINDOW.placeElementAtIndexWithoutTag(
        childNodes[5],
        childNodes,
        childNodes.length - 1
      );
      WINDOW.placeElementAtIndexWithoutTag(
        childNodes[childNodes.length - 1],
        childNodes,
        childNodes.length - 4
      );

      WINDOW.placeElementAtIndex(childNodes[1], childNodes, 8);
      WINDOW.placeElementAtIndex(childNodes[1], childNodes, 12);
      WINDOW.placeElementAtIndex(childNodes[1], childNodes, 16);
      WINDOW.placeElementAtIndex(childNodes[1], childNodes, 20);

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
WINDOW.removePromotedTagFromTile =
  WINDOW.removePromotedTagFromTile || removePromotedTagFromTile;
WINDOW.addPromotedTagToTiles =
  WINDOW.addPromotedTagToTiles || addPromotedTagToTiles;
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
  html:not(#ab169)[data-web-ab169="2"] cdx-card:has(product-stamp-grid .ab169-promoted) {
    background-color: pink;
  }

  html:not(#ab169)[data-web-ab169="2"] .dynamic-content-row {
    display:none;
  }
`);
