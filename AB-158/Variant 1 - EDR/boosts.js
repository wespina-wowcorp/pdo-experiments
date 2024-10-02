// ==UserScript==
// @name         AB-158: Variant 1 - EDR
// @namespace    http://tampermonkey.net/
// @version      AB-158_variant_1_edr
// @description  EDR site - Swap Product and Basket & Category Boosts (boosts)
// @author       Wilson
// @match        https://www.everydayrewards.co.nz/boosts*
// @match        https://www-uat.everydayrewards.co.nz/boosts*
// @require      file://C:\Users\1442718\Development\overrides\AB-158\Variant 1 - EDR\boosts.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(">>>>>>>>>>>>>>>>>>>> AB-158 >>>>>>>>>>>>>>>>>>>>>>");

document.documentElement.dataset.webAb158 = "1";

window.ab158 = window.ab158 || {};

window.ab158.dynamic =
  window.ab158.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/boosts")) {
        return observer.disconnect();
      }

      observer.disconnect();

      const edrGridContainer = document.querySelector(
        "edr-dc-dynamic-content:has(> edr-section)"
      );

      const experimentClass = document.querySelector(".ab158");

      if (!edrGridContainer) {
        return observer.disconnect();
      }

      if (experimentClass) {
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
        }
      }

      if (edrGridContainer && boostsSection) {
        edrGridContainer.insertBefore(moreBoostsSection, boostsSection);
        edrGridContainer.classList.add("ab158");
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

GM_addStyle(`
  html:not(#ab158)[data-web-ab158="1"] head:has(link[href="https://www.everydayrewards.co.nz/"], link[href="https://www.everydayrewards.co.nz/"]) + body edr-dc-dynamic-content edr-section:nth-of-type(2) > section,
  html:not(#ab158)[data-web-ab158="1"] head:has(link[href="https://www.everydayrewards.co.nz/"], link[href="https://www-uat.everydayrewards.co.nz/"]) + body edr-dc-dynamic-content edr-section:nth-of-type(2) > section {
    background-color: var(--color-secondary--light-grey) !important;
  }

  html:not(#ab158)[data-web-ab158="1"] head:has(link[href="https://www.everydayrewards.co.nz/"]) + body edr-dc-dynamic-content edr-section:nth-of-type(3) > section,
  html:not(#ab158)[data-web-ab158="1"] head:has(link[href="https://www-uat.everydayrewards.co.nz/"]) + body edr-dc-dynamic-content edr-section:nth-of-type(3) > section {
    background-color: var(--color-secondary--white) !important;
  }
`);
