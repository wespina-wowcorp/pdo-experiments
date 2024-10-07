// ==UserScript==
// @name         AB-168: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-168
// @version      AB-168_variant_1
// @description  Web Experimentation Tracking Implementation with GA4 and Tealium
// @author       Wilson
// @match        https://www.woolworths.co.nz/
// @require      file://C:/Users/1442718/Development/overrides/AB-168/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-168 Running >>>>>>");

document.documentElement.dataset.webAb168 = "1";

function dynamic() {
  new MutationObserver((mutationList, observer) => {
    const mutationRecord = mutationList.filter(
      (mutation) =>
        mutation.type === "childList" &&
        mutation.target.matches("div") &&
        "addedNodes" in mutation &&
        mutation.addedNodes.length > 0 &&
        mutation.addedNodes[0].localName === "global-nav-search"
    )[0];
    if (mutationRecord == null) return;
    observer.disconnect();

    mutationRecord.target
      .querySelector(":scope .search-box-layout")
      .addEventListener(
        "click",
        function () {
          if (utag) {
            return utag.link({
              tealium_event: "ab_test",
              test_name: "AB-168",
              test_event: "aa_test",
              test_component: "ab_search",
              test_content: "Clicked",
            });
          }
        },
        { once: true }
      );

    observer.observe(document.body, { childList: true, subtree: true });
  }).observe(document.body, { childList: true, subtree: true });
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
