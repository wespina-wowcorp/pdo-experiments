// ==UserScript==
// @name         AB-168: Variant 1 - EDR
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-168
// @version      AB-168_variant_1_edr
// @description  Web Experimentation Tracking Implementation with GA4 and Tealium
// @author       Wilson
// @match        https://www.everydayrewards.co.nz/
// @require      file://C:/Users/1442718/Development/overrides/AB-168/Variant-1 EDR/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-168 EDR Running >>>>>>");

document.documentElement.dataset.webAb168 = "1";

function dynamic() {
  setTimeout(() => {
      if (utag && utag.view) {
        return utag.view({
          tealium_event: "ab_test",
          test_name: "AB-168",
          test_event: "page_view"
        });
      }
  }, 2000);
}

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", dynamic);
  } else {
    dynamic();
  }
} catch (error) {
  console.error("ab168:", error);
}
