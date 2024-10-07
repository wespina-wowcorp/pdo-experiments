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
  console.log('>>>>> PAGE LOADED >>>>>')
  // new MutationObserver((mutationList, observer) => {
  //   const mutationRecord = mutationList.filter(
  //     (mutation) =>
  //       mutation.type === "childList" &&
  //       mutation.target.matches("div") &&
  //       "addedNodes" in mutation &&
  //       mutation.addedNodes.length > 0 &&
  //       mutation.addedNodes[0].childNodes.length > 0 &&
  //       mutation.addedNodes[0].childNodes[0].className === "header__logo"
  //   )[0];
  //   if (mutationRecord == null) return;
  //   observer.disconnect();
  //   mutationRecord.target.querySelector(":scope > a").addEventListener(
  //     "click",
  //     () => {
  //       console.log("<<<<<AB-168>>>>>: A/A Test - Image Clicked");
  //       return utag.link({
  //         tealium_event: "ab_test",
  //         test_name: "AB-168",
  //         test_event: "aa_test",
  //         test_component: "ab_search",
  //         test_content: "Clicked",
  //       });
  //     },
  //     // window.dataLayer.push({
  //     //   event: "notification_event",
  //     //   notification_type: "aa_test",
  //     //   name: "Search Input",
  //     //   value: "Clicked",
  //     // }),
  //     { once: true }
  //   );

  //   observer.observe(document.body, { childList: true, subtree: true });
  // }).observe(document.body, { childList: true, subtree: true });
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
