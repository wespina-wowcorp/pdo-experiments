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
      if (
        !location.pathname.startsWith("/boosts") &&
        location.pathname !== "/"
      ) {
        return observer.disconnect();
      }
      observer.disconnect();

      const edrGridContainer = document.querySelector(
        "edr-dc-dynamic-content:has(> edr-section)"
      );

      if (!edrGridContainer) {
        return observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }

      const boostsSection = document.querySelector(
        "edr-dc-dynamic-content edr-section:nth-of-type(2)"
      );

      const moreBoostsSection = document.querySelector(
        "edr-dc-dynamic-content edr-section:nth-of-type(3)"
      );

      if (boostsSection && moreBoostsSection) {
        const boostsHeadingEl = boostsSection.querySelector(
          ":scope edr-heading h3"
        );

        const boostsSubheadingEl = boostsSection.querySelector(
          "edr-contentful-rich-text p"
        );

        const ctaContainer = boostsSection.querySelector(
          ":scope edr-app-container"
        );
        const moreBoostsHeadingEl = moreBoostsSection.querySelector(
          ":scope edr-heading h3"
        );
        const moreBoostsSubheadingEl = moreBoostsSection.querySelector(
          ":scope edr-contentful-rich-text p"
        );

        const container = moreBoostsSection.querySelector(
          ":scope section .section__content edr-app-boost-offers-grid > div"
        );

        const boostsHeadingCopy = boostsSubheadingEl.cloneNode(true);

        // swap headings and cta
        if (moreBoostsHeadingEl && boostsHeadingEl) {
          moreBoostsHeadingEl.textContent = boostsHeadingEl.textContent;
          boostsHeadingEl.style.display = "none"; // add a class instead
        }
        if (moreBoostsSubheadingEl && boostsSubheadingEl) {
          moreBoostsSubheadingEl.textContent = boostsSubheadingEl.textContent;
        }
        if (boostsSubheadingEl) {
          boostsSubheadingEl.style.display = "none";
        }
        if (container && ctaContainer) {
          container.append(ctaContainer);

          const isBoostsPage = location.pathname.startsWith("/boosts");

          if (!isBoostsPage) {
            container.prepend(boostsHeadingCopy);
            ctaContainer.style.display = "none";
          }
        }
      }

      if (edrGridContainer && boostsSection) {
        edrGridContainer.insertBefore(moreBoostsSection, boostsSection);
      }

      observer.observe(document.body, { childList: true, subtree: true });
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
