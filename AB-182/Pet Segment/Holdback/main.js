// ==UserScript==
// @name         AB-182: Holdback
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-182
// @version      AB-182_variant_holdback
// @description  Cartology Personalization on Homepage
// @author       Wilson
// @match        https://www.woolworths.co.nz/
// @require      file://C:/Users/1442718/Development/overrides/AB-182/Variant-3/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(' >>>>>> AB-182 Running >>>>>>');

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb182 = "3";

window.ab182 = window.ab182 || {};

window.ab182.dynamic =
  window.ab182.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {

      /* INSERT CODE HERE */

    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab182.dynamic);
  } else {
    window.ab182.dynamic();
  }
} catch (error) {
  console.error("ab182:", error);
}
