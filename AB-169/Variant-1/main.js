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

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "1";

window["ab168"] = window["ab168"] || {};

window["ab168"].numberOfCPPTiles = window["ab168"].numberOfCPPTiles || 8;

/**
  @typedef Mapping
  @type {Record<number, number>}
 /

/** @type Mapping */
const mapping = {
  0: 0,
  1: "1",
  2: 2,
  3: 3,
  4: 10,
  5: 11,
  6: 12,
  7: 13,
};



window["ab168"].tileMapping = 
/** @type {Mapping} */

{
    0: 0,
    1: "n1",
    2: 2,
    3: 3,
    4: 10,
    5: 11,
    6: 12,
    7: 13,
  };

window["ab168"].changeContent =
  window["ab168"].changeContent ||
  ((targetElement, html) => {
    const documentFragment = document
      .createRange()
      .createContextualFragment(html);
    targetElement.replaceWith(documentFragment);
  });

window["ab168"].addPromotedTagToTiles =
  window["ab168"].addPromotedTagToTiles ||
  ((tiles) => {
    tiles.forEach((tile) => {
      const imageLink = tile.querySelector(
        ":scope product-stamp-grid .product-entry.product-cup a.productImage-container"
      );

      if (imageLink) {
        const div = document.createElement("div");
        imageLink.appendChild(div);
        window["ab168"].changeContent(
          div,
          `<div _ngcontent-app-c4204720579="" class="promoted ng-star-inserted ab169-promoted">Promoted</div>`
        );
      }
    });
  });

window["ab168"].exchangeElements =
  window["ab168"].exchangeElements ||
  ((element1, element2) => {
    if (element1 === element2) return;

    const clonedElement1 = element1.cloneNode(true);
    const clonedElement2 = element2.cloneNode(true);

    element2.parentNode.replaceChild(clonedElement1, element2);
    element1.parentNode.replaceChild(clonedElement2, element1);

    return clonedElement1;
  });

window["ab168"].dynamic =
  window["ab168"].dynamic ||
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
      const CPPTiles = Array.from(childNodes).slice(
        0,
        window["ab168"].numberOfCPPTiles
      );
      const mapping = window["ab168"].tileMapping;

      window["ab168"].addPromotedTagToTiles(CPPTiles);

      for (const tile in mapping) {
        window["ab168"].exchangeElements(
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
    document.addEventListener("DOMContentLoaded", window["ab168"].dynamic);
  } else {
    window["ab168"].dynamic();
  }
} catch (error) {
  console.error("ab169:", error);
}

// @ts-ignore
GM_addStyle(`
  html:not(#ab135)[data-web-ab169="1"] cdx-card:has(product-stamp-grid .ab169-promoted) {
    background-color: pink;
  }
`);
