// ==UserScript==
// @name         AB-135: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-135
// @version      AB-135_variant_1
// @description  Optimizing Boost Banner
// @author       Wilson
// @match        https://www.everydayrewards.co.nz/boosts
// @require      file://C:/Users/1442718/Development/overrides/AB-135/Variant-1/main.js
// ==/UserScript==

console.log(">>>> AB-135 >>>>");

// ****************************************

document.documentElement.dataset.webAb135 = "1";

window.ab135 = window.ab135 || {};

window.ab135.createPictureEl =
  window.ab135.createPictureEl ||
  (() => {
    const fragment = document.createDocumentFragment();
  });

window.ab135.changeContent =
  window.ab135.changeContent ||
  ((targetElement) => {
    const documentFragment = document.createRange().createContextualFragment(`
    <div class="banner__body-media" style="
      align-items: center;
      -ms-display: flex;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: var(--media-align);"
    >
      <div>
        <edr-image class="image" style="width: auto;">
          <div class="image__container>
            <picture>
              <source
                media="(min-width:1440px)"
                srcset="//images.ctfassets.net/28bohp801cze/qQGqRWGbL4Hk25wZs54vb/3ffe8c1bbecedc786b8451488ce9e69f/EDR_NZ-app.svg?fm=avif&amp;w=686&amp;h=421&amp;fit=fill&amp;q=100">
              <img src="//images.ctfassets.net/28bohp801cze/qQGqRWGbL4Hk25wZs54vb/3ffe8c1bbecedc786b8451488ce9e69f/EDR_NZ-app.svg?fm=avif&amp;w=686&amp;h=421&amp;fit=fill&amp;q=100" alt="Mobile phone in a hand">
            </picture>
          </div>
        </edr-image>
      </div>
    </div>
    `);
    targetElement.replaceWith(documentFragment);
  });

window.ab135.headingCopy =
  window.ab135.headingCopy ||
  "Get to 2,000 points faster with your weekly Boosts";

window.ab135.subTitleCopy =
  window.ab135.subTitleCopy ||
  'Hit "Boost" to activate your offers before you shop in-store or online. New Boosts are loaded every Monday.';

window.ab135.dynamic =
  window.ab135.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/boosts")) {
        return observer.disconnect();
      }

      const topBanner = document.querySelector(
        'edr-section[data-contentful-entry-id="1MEYNrqvRdEDCfQ52E0xQa"]'
      );

      if (!topBanner) {
        return;
      }

      const heading = document.querySelector(
        ".banner__body-info-content edr-heading h1"
      );
      const subHeading = document.querySelector(
        ".banner__body-info-content > p.banner__description"
      );
      console.log("🚀 ~ newMutationObserver ~ topBanner:", topBanner);

      const div = document.createElement("div");

      const edrBannerBody = topBanner.querySelector(
        ":scope edr-banner .banner .banner__body"
      );
      console.log("🚀 ~ newMutationObserver ~ edrBannerBody:", edrBannerBody);
      edrBannerBody.appendChild(div);

      window.ab135.changeContent(div);

      // create picture element
      // append picture element to topBanner

      if (heading) {
        heading.textContent = window.ab135.headingCopy;
      }

      if (subHeading) {
        subHeading.textContent = window.ab135.subTitleCopy;
      }

      observer.disconnect();
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab135.dynamic);
  } else {
    window.ab135.dynamic();
  }
} catch (error) {
  console.error("ab135:", error);
}
