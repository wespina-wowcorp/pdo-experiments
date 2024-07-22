// ==UserScript==
// @name         AB-158: Variant 1
// @namespace    http://tampermonkey.net/
// @version      AB-158_variant_1
// @description  EDR site - Swap Product and Basket & Category Boosts
// @author       Wilson
// @match        https://www.everydayrewards.co.nz/boosts*
// @require      file://C:\Users\1442718\Development\overrides\AB-158\Variant 1\main.js
// @grant        GM_addStyle
// ==/UserScript==

document.documentElement.dataset.webAb158 = "1";

window.ab158 = window.ab158 || {};

window.ab158.dynamic =
  window.ab158.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/boosts")) {
        return observer.disconnect();
      }

      const edrGridContainer = document.querySelector("edr-dc-dynamic-content");

      const boostsSection = document.querySelector(
        "edr-dc-dynamic-content edr-section:nth-of-type(2)"
      );

      const moreBoostsSection = document.querySelector(
        "edr-dc-dynamic-content edr-section:nth-of-type(3)"
      );

      if (boostsSection && moreBoostsSection) {
        const boostsHeadingEl = boostsSection.querySelector('edr-heading h3');
        const boostsSubheadingEl = boostsSection.querySelector('edr-contentful-rich-text p');
        const ctaContainer = boostsSection.querySelector('edr-app-container');
        const moreBoostsHeadingEl = moreBoostsSection.querySelector('edr-heading h3');
        const moreBoostsSubheadingEl = moreBoostsSection.querySelector('edr-contentful-rich-text p');
        let container = moreBoostsSection.querySelector('section .section__content edr-app-boost-offers-grid > div');


        if (moreBoostsHeadingEl && boostsHeadingEl) {
          moreBoostsHeadingEl.textContent = boostsHeadingEl.textContent;
          boostsHeadingEl.style.display = 'none';
        }
        if (moreBoostsSubheadingEl && boostsSubheadingEl) {
          moreBoostsSubheadingEl.textContent = boostsSubheadingEl.textContent;
          boostsSubheadingEl.style.display = 'none';
        }
        if (container && ctaContainer) {
          container.append(ctaContainer);
        }
      }

      // TODO - confirm what this no boosts section looks like
      const noBoostsSection = document.querySelector(
        "section:has(edr-no-boost-offers)"
      );

      const topSection = noBoostsSection || boostsSection;

      if (edrGridContainer && topSection) {

        edrGridContainer.insertBefore(moreBoostsSection, topSection);

        return observer.disconnect();
      }

      // Finish making changes and resume observing here.
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

// Main function and starting point of the experiment.
try {
  if (document.body == null) {
    // This happens when the experiment loads before the web page finishes loading.
    document.addEventListener("DOMContentLoaded", window.ab158.dynamic);
  } else {
    window.ab158.dynamic();
  }
} catch (error) {
  console.error("ab158:", error);
}
