// ==UserScript==
// @name         AA-02: Variant 2
// @namespace    https://woolworths-agile.atlassian.net/browse/AA-02
// @version      AA-02_variant_2
// @description  AA-02 [SIT - DEV] - A/A Test for Web Experimentation (Tealium Events)
// @author       Wilson
// @match        https://wwwsit.woolworths.co.nz/
// @require      file://C:/Users/1442718/Development/overrides/AA-02/Variant-2/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(' >>>>>> AB-AA Running >>>>>>');

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAbAA = "2";

window.abAA = window.abAA || {};

window.abAA.dynamic =
  window.abAA.dynamic ||
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
    document.addEventListener("DOMContentLoaded", window.abAA.dynamic);
  } else {
    window.abAA.dynamic();
  }
} catch (error) {
  console.error("abAA:", error);
}
