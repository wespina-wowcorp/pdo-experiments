// ==UserScript==
// @name         AB-169: Variant 3
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-169
// @version      AB-169_variant_3
// @description  CPP Reconfiguration V4
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials
// @require      file://C:/Users/1442718/Development/overrides/AB-169/Variant-3/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-169 Variant 3 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "3";

/**
 * @typedef {object} Ab169Object
 * @property {ChangeContent} changeContent
 * @property {RemovePromotedTagFromTiles} removePromotedTagFromTiles
 * @property {AddPromotedTagToTiles} addPromotedTagToTiles
 * @property {PlaceElementInIndex} placeElementInIndex
 * @property {Dynamic} dynamic
 */

/**
 * @typedef {Window & Ab169Object} CustomWindow
 * @type {CustomWindow}
 */
const WINDOW = window["ab169"] || {};

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

    // - Which filters will show the CPP tiles in the feed?
    if (!!promotedTag && (!pageParam || pageParam === "1")) {
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const childNodes = specialsProductGrid.children; // does not include comment elements

    // WINDOW.removePromotedTagFromTiles(childNodes); // clean up before adding promoted tags

    if (!pageParam || pageParam === "1") {
      // TODO - remove after pre-build
      // ************************
      // Assumes CPP tiles are in positions 16 - 24 in the API response
      const CPPTiles = Array.from(childNodes).slice(0, 8);
      WINDOW.addPromotedTagToTiles(CPPTiles);
      // ************************
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

WINDOW.addPromotedTagToTiles =
  WINDOW.addPromotedTagToTiles || addPromotedTagToTiles;
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
  html:not(#ab169)[data-web-ab169="3"] cdx-card:has(product-stamp-grid .ab169-promoted) {
    background-color: pink;
  }
`);
