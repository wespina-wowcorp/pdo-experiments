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

// TODO - check tracking still works after swap

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "1";

/**
 * @typedef {object} Ab169Var1Object
 * @property {TileMapping} tileMapping
 * @property {ChangeContent} changeContent
 * @property {RemovePromotedTagFromTiles} removePromotedTagFromTiles
 * @property {AddPromotedTagToTiles} addPromotedTagToTiles
 * @property {ExchangeElements} exchangeElements
 * @property {Dynamic} dynamic
 */

/**
 * @typedef {Window & Ab169Var1Object} CustomWindow
 * @type {CustomWindow}
 */
const WINDOW = window["ab169"] || {};

/**
 * @typedef {Record<number, number>} TileMapping
 * @type {TileMapping}
 */
const tileMapping = {
  15: 0,
  16: 1,
  17: 2,
  18: 3,
  19: 10,
  20: 11,
  21: 12,
  22: 13,
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
  tiles.forEach((tile, index) => {
    const imageLink = tile.querySelector(
      ":scope product-stamp-grid .product-entry.product-cup a.productImage-container"
    );

    // TODO- remove this for post-prototype build
    // ************************
    if (tile) {
      const mediaQueryCondition = window.matchMedia("(min-width: 640px)");

      const addBackground = (matches) => {
        if (tile instanceof HTMLElement) {
          if (matches) {
            if (mediaQueryCondition.matches) {
              tile.style.backgroundRepeat = "no-repeat";
              tile.style.backgroundImage = `url(https://placehold.co/224x488/pink/grey?text=${
                index + 16
              })`;
            }
          } else {
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundImage = `url(https://placehold.co/402x223/pink/grey?text=${
              index + 16
          })`;
          }
        };
      };
      // tile.classList.add("ab-169-small-image");
      mediaQueryCondition.addEventListener("change", ({ matches }) =>
        addBackground(matches)
      );
      addBackground(mediaQueryCondition.matches);
    }
    // ************************

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

    // Assumes CPP tiles are in positions 16 - 24 in the API response
    const CPPTiles = Array.from(childNodes).slice(15, 23);

    WINDOW.removePromotedTagFromTiles(childNodes); // clean up before adding promoted tags

    if (!pageParam || pageParam === "1") {
      const mapping = WINDOW.tileMapping;
      for (const tile in mapping) {
        WINDOW.exchangeElements(childNodes[tile], childNodes[mapping[tile]]);
      }
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

WINDOW.tileMapping = WINDOW.tileMapping || tileMapping;
WINDOW.changeContent = WINDOW.changeContent || changeContent;
WINDOW.removePromotedTagFromTiles =
  WINDOW.removePromotedTagFromTiles || removePromotedTagFromTiles;
WINDOW.addPromotedTagToTiles =
  WINDOW.addPromotedTagToTiles || addPromotedTagToTiles;
WINDOW.exchangeElements = WINDOW.exchangeElements || exchangeElements;
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
