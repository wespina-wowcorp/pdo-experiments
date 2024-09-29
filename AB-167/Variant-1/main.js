// ==UserScript==
// @name         AB-167: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-167
// @version      AB-167_variant_1
// @description  Cartology Personalization - Pet Segment
// @author       Wilson
// @match        https://www.woolworths.co.nz/
// @match        https://www.woolworths.co.nz/lists/myfavourites
// @require      file://C:/Users/1442718/Development/overrides/AB-167/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

document.documentElement.dataset.webAb167 = "1";

window.ab167 = window.ab167 || {};

window.ab135.dynamic =
  window.ab135.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {

      // if homepage - add banner
      // if my favourites page - add tile
        
    })
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab167.dynamic);
  } else {
    window.ab167.dynamic();
  }
} catch (error) {
  console.error("ab167:", error);
}
