// @ts-check

// ==UserScript==
// @name         AB-169: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-169
// @version      AB-169_variant_1
// @description  CPP Reconfiguration V4
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @require      file:///Users/wilsonespina/Development/woolworths/pdo-experiments/AB-169/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-169 Variant 1 Running >>>>>>");

document.documentElement.dataset.webAb169 = "1";

/**
 * @typedef {object} Ab169Var1Object
 * @property {ChangeContent} changeContent
 * @property {RemovePromotedTagFromTiles} removePromotedTagFromTiles
 * @property {AddPromotedTagToTiles} addPromotedTagToTiles
 * @property {PlaceElementAtIndex} placeElementAtIndex
 * @property {Dynamic} dynamic
 */

/**
 * @typedef {Window & Ab169Var1Object} CustomWindow
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
    const imageLink = tile.querySelector(
      ":scope product-stamp-grid .product-entry.product-cup a.productImage-container"
    );

    if (tile) {
      const mediaQueryCondition = window.matchMedia("(min-width: 640px)");

      const addBackground = (matches) => {
        if (tile instanceof HTMLElement) {
          if (matches) {
            if (mediaQueryCondition.matches) {
              tile.style.backgroundRepeat = "no-repeat";
              tile.style.backgroundImage = `url(https://placehold.co/224x488/pink/grey?text=${
                index + 1
              })`;
            }
          } else {
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundImage = `url(https://placehold.co/402x223/pink/grey?text=${
              index + 1
            })`;
          }
        }
      };
      // tile.classList.add("ab-169-small-image");
      mediaQueryCondition.addEventListener("change", ({ matches }) =>
        addBackground(matches)
      );
      addBackground(mediaQueryCondition.matches);
    }

    // if (imageLink) {
    //   const div = document.createElement("div");
    //   imageLink.appendChild(div);
    //   WINDOW.changeContent(
    //     div,
    //     `<div _ngcontent-app-c929548239="" attr.aria-label="Promoted" class="promoted ng-star-inserted ab169-promoted">Promoted</div>`
    //   );
    // }
  });
};
// ************************

/**
 * Places DOM element at index while keeping their event listeners attached.
 *
 * @typedef {(element: Element, array: HTMLCollection, index: number) => void | Element} PlaceElementAtIndex
 * @type {PlaceElementAtIndex}
 */
const placeElementAtIndex = (element, array, index) => {
  const gridItem = array[index];
  const promotedTag = element.querySelector(":scope product-stamp-grid .promoted");
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

    if (!!promotedTag && (!pageParam || pageParam === "1")) {
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const childNodes = specialsProductGrid.children; // does not include comment elements

    // Assumes CPP tiles are in positions 1 - 8 in the API response
    const CPPTiles = Array.from(childNodes).slice(0, 8);

    WINDOW.removePromotedTagFromTiles(childNodes); // clean up before adding promoted tags

    if (!pageParam || pageParam === "1") {
      // TODO - remove after pre-build
      // ************************
      WINDOW.addPromotedTagToTiles(CPPTiles);
      // ************************

      WINDOW.placeElementAtIndex(childNodes[4], childNodes, 14);
      WINDOW.placeElementAtIndex(childNodes[4], childNodes, 14);
      WINDOW.placeElementAtIndex(childNodes[4], childNodes, 14);
      WINDOW.placeElementAtIndex(childNodes[4], childNodes, 14);
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
  html:not(#ab169)[data-web-ab169="1"] cdx-card:has(product-stamp-grid .ab169-promoted) {
    background-color: pink;
  }

  html:not(#ab169)[data-web-ab169="1"] .dynamic-content-row {
    display:none;
  }
`);
