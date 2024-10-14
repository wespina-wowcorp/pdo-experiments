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


// @ts-ignore
GM_addStyle(`
  html:not(#ab169)[data-web-ab169="3"] cdx-card:has(product-stamp-grid .ab169-promoted) {
    background-color: pink;
  }
`);
