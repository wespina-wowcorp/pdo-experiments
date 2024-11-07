// ==UserScript==
// @name         AB-158: Variant 1 Combined - EDR
// @namespace    http://tampermonkey.net/
// @version      AB-158_variant_1_edr_homepage_and_boots
// @description  EDR site - Swap Product and Basket & Category Boosts (homepage & boosts)
// @author       Wilson
// @match        https://www.everydayrewards.co.nz/
// @match        https://www.everydayrewards.co.nz/boosts/*
// @match        https://www-uat.everydayrewards.co.nz/
// @match        https://www-uat.everydayrewards.co.nz/boosts/*
// @require      file://C:\Users\1442718\Development\overrides\AB-158\Variant 1 - EDR\combined.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(">>>>>>>>>>>>>>>>>>>> AB-158 COMBINED >>>>>>>>>>>>>>>>>>>>>>");

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
        console.log(".>>>> Disconnect >>>>>");
        return observer.disconnect();
      }

      observer.disconnect();

      if (location.pathname.startsWith("/boosts")) {
        // Boosts page
        const edrOffersGrid = document.querySelector(
          "edr-dc-dynamic-content > edr-section > edr-app-boost-offers-grid)"
        );

        const includesEdrGrid = mutationList.some(
          (mutation) => mutation.target === edrOffersGrid
        );

        if (!includesEdrGrid) {
          return observer.observe(document.body, {
            childList: true,
            subtree: true,
          });
        }
        console.log(">>>> BOOSTS PAGE >>>>>");
        const boostsSection = document.querySelector(
          "edr-dc-dynamic-content edr-section.anchor-point-3NTbY74npqKutVV12AGOh1"
        );

        const moreBoostsSection = document.querySelector(
          "edr-dc-dynamic-content edr-section.anchor-point-5MUMWDpdZELR6ljNpKUBtO"
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
        }
      } else {
        // Homepage
        console.log(">>>>> HOMEPAGe >>>>>>>");
        const boostsSection = document.querySelector(
          "edr-dc-dynamic-content edr-section.anchor-point-5osXGSUsuMLr5C0QJ1TjG7"
        );

        const moreBoostsSection = document.querySelector(
          "edr-dc-dynamic-content edr-section.anchor-point-3DzE5FSmQN0rQkfgAI5693"
        );

        const includesBoostsSections = mutationList.some(
          (mutation) => mutation.target === boostsSection || mutation.target === moreBoostsSection
        );

        if (!includesBoostsSections) {
          return observer.observe(document.body, {
            childList: true,
            subtree: true,
          });
        }
        console.log(">>>> HOME PAGE AFTER >>>>>");

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
            boostsHeadingEl.style.display = "none";
          }
          if (moreBoostsSubheadingEl && boostsSubheadingEl) {
            moreBoostsSubheadingEl.textContent = boostsSubheadingEl.textContent;
          }
          if (boostsSubheadingEl) {
            boostsSubheadingEl.style.display = "none";
          }
          if (container && ctaContainer) {
            container.prepend(boostsHeadingCopy);
            ctaContainer.style.display = "none";
          }
        }

        if (edrGridContainer && boostsSection) {
          edrGridContainer.insertBefore(moreBoostsSection, boostsSection);
        }
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
  html:not(#ab158)[data-web-ab158="1"] head:has(link[href="https://www.everydayrewards.co.nz/"], link[href="https://www.everydayrewards.co.nz/"]) + body edr-dc-dynamic-content edr-section.anchor-point-5osXGSUsuMLr5C0QJ1TjG7" > section,
  html:not(#ab158)[data-web-ab158="1"] head:has(link[href="https://www-uat.everydayrewards.co.nz/"], link[href="https://www-uat.everydayrewards.co.nz/"]) + body edr-dc-dynamic-content edr-section.anchor-point-5osXGSUsuMLr5C0QJ1TjG7" > section {
    background-color: var(--color-secondary--light-grey) !important;
  }

  html:not(#ab158)[data-web-ab158="1"] head:has(link[href="https://www.everydayrewards.co.nz/"]) + body edr-dc-dynamic-content edr-section.anchor-point-3DzE5FSmQN0rQkfgAI5693 > section,
  html:not(#ab158)[data-web-ab158="1"] head:has(link[href="https://www-uat.everydayrewards.co.nz/"]) + body edr-dc-dynamic-content edr-section.anchor-point-3DzE5FSmQN0rQkfgAI5693 > section {
    background-color: var(--color-secondary--white) !important;
  }
`);
