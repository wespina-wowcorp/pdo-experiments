// ==UserScript==
// @name         AB-169: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-169
// @version      AB-169_variant_1
// @description  CPP Reconfiguration V4
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials
// @require      file://C:/Users/1442718/Development/overrides/AB-169/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-169 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb169 = "1";

window.ab169 = window.ab169 || {};

window.ab169.dynamic =
  window.ab169.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      /* INSERT CODE HERE */
    });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab169.dynamic);
  } else {
    window.ab169.dynamic();
  }
} catch (error) {
  console.error("ab169:", error);
}
