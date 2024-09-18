// ==UserScript==
// @name         AB-172: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-172
// @version      AB-172_variant_1
// @description  Encouraging Log in on Specials Page
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @require      file://C:/Users/1442718/Development/overrides/AB-172/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-172 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb172 = "1";

window.ab172 = window.ab172 || {};

window.ab172.dynamic =
  window.ab172.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      /* INSERT CODE HERE */

      const dynamicContent = document.querySelector(
        "#dynamic-content-secondary-panel"
      );

      const includesDynamicContent = mutationList.some(
        (mutation) => mutation.target === dynamicContent
      );

      if (!includesDynamicContent) {
        return;
      }

      observer.disconnect();

      console.log("🚀 ~ newMutationObserver ~ dynamicContent:", dynamicContent);

      const navLoginLink = document.querySelector(
        "global-nav-quick-nav button"
      );

      // Not sure why the queryselector
      setTimeout(() => {
        const subheading = dynamicContent.querySelector(
          ':scope .dynamic-content-row dc-html p[style="text-align:center"]'
        );
        if (subheading) {
          subheading.textContent = "THIS IS A TEST";
        }
      }, 0);

      // requestAnimationFrame(() => {
      //   const subheading = dynamicContent.querySelector(
      //     ':scope .dynamic-content-row dc-html p[style="text-align:center"]'
      //   );
      //   if (subheading) {
      //     subheading.textContent = "THIS IS A TEST WITH RAF";
      //   }
      // })

      // if (subheading) {
      //   subheading.textContent = "THIS IS A TEST";
      // }
      // create p tag document fragment
      // hide first tag with aria-hidden and display none

      observer.observe(document.body, { childList: true, subtree: true });
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab172.dynamic);
  } else {
    window.ab172.dynamic();
  }
} catch (error) {
  console.error("ab172:", error);
}
