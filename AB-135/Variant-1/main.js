// ==UserScript==
// @name         AB-135: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-135
// @version      AB-135_variant_1
// @description  Optimizing Boost Banner
// @author       Wilson
// @match        https://www.everydayrewards.co.nz/boosts
// @require      file://C:/Users/1442718/Development/overrides/AB-135/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(">>>> AB-135 >>>>");

// ****************************************

document.documentElement.dataset.webAb135 = "1";

window.ab135 = window.ab135 || {};

window.ab135.changeContent =
  window.ab135.changeContent ||
  ((targetElement) => {
    const documentFragment = document.createRange().createContextualFragment(`
    <div _ngcontent-ng-c2101707264 class="banner__body-media ab135">
      <div _ngcontent-ng-c2101707264>
        <edr-image _ngcontent-ng-c2101707264 _nghost-ng-c2101707264 class="image" style="width: auto;">
          <div class="image__container">
            <picture>
              <source media="(min-width:1440px)" srcset="//images.ctfassets.net/28bohp801cze/qQGqRWGbL4Hk25wZs54vb/3ffe8c1bbecedc786b8451488ce9e69f/EDR_NZ-app.svg?fm=avif&w=605&h=436&fit=fill&q=100">
              <source media="(min-width:768px)" srcset="//images.ctfassets.net/28bohp801cze/qQGqRWGbL4Hk25wZs54vb/3ffe8c1bbecedc786b8451488ce9e69f/EDR_NZ-app.svg?fm=avif&w=605&h=436&fit=fill&q=100">
              <source media="(min-width:1440px)" srcset="//images.ctfassets.net/28bohp801cze/qQGqRWGbL4Hk25wZs54vb/3ffe8c1bbecedc786b8451488ce9e69f/EDR_NZ-app.svg?fm=avif&w=375&h=261&fit=fill&q=100">
              <img src="//images.ctfassets.net/28bohp801cze/qQGqRWGbL4Hk25wZs54vb/3ffe8c1bbecedc786b8451488ce9e69f/EDR_NZ-app.svg?fm=avif&w=375&h=261&fit=fill&q=100" alt="Mobile phone in a hand">
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
      const div = document.createElement("div");

      const edrBannerBody = topBanner.querySelector(
        ":scope edr-banner .banner .banner__body"
      );

      edrBannerBody.appendChild(div);

      window.ab135.changeContent(div);

      if (heading) {
        heading.ariaLabel = window.ab135.headingCopy;
      }

      if (subHeading) {
        subHeading.ariaLabel = window.ab135.subTitleCopy;
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

GM_addStyle(`

html:not(#ab135)[data-web-ab135="1"] .ab135.banner__body {
  height: 100%;
  align-items: initial;
  -ms-display: flex;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: initial;
}

html:not(#ab135)[data-web-ab135="1"] .ab135.banner__body-media {
  align-items: center;
  -ms-display: flex;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: var(--media-align);
}

html:not(#ab135)[data-web-ab135="1"]
  .ab135.banner__body-media
  .image__container
  picture
  img {
  max-width: 100%;
  width: auto;
}

/* Padding */

html:not(#ab135)[data-web-ab135="1"]
  edr-section[_nghost-ng-c1460657692=""]
  > section {
  padding-bottom: 0 !important;
}

/* Replace text */

html:not(#ab135)[data-web-ab135="1"]
  edr-heading.banner__title.heading.heading--1
  h1
  span {
  color: transparent;
  font-size: 0;
  overflow: hidden;
}

html:not(#ab135)[data-web-ab135="1"]
  edr-heading.banner__title.heading.heading--1
  h1
  span::after {
  font-size: 2.375rem;
  color: rgb(58, 71, 78);
  content: "Get to 2,000 points faster with your weekly Boosts";
  display: inline-block;
}

html:not(#ab135)[data-web-ab135="1"]
  edr-heading.banner__title.heading.heading--1
  ~ p.banner__description {
  color: transparent;
  font-size: 0;
  overflow: hidden;
}

html:not(#ab135)[data-web-ab135="1"]
  edr-heading.banner__title.heading.heading--1
  ~ p.banner__description::after {
  font-size: 1.125rem;
  color: rgb(58, 71, 78);
  content: "Hit 'Boost' to activate your offers before you shop in-store or online. New Boosts are loaded every Monday.";
  display: inline-block;
}

@media screen and (min-width: 768px) {
  html:not(#ab135)[data-web-ab135="1"] .ab135.banner__body-media {
    padding: 0;
    justify-content: flex-end;
  }

  html:not(#ab135)[data-web-ab135="1"]
    edr-heading.banner__title.heading.heading--1
    ~ p.banner__description {
    padding: 0;
    justify-content: flex-end;
  }

  html:not(#ab135)[data-web-ab135="1"]
    edr-heading.banner__title.heading.heading--1
    h1
    span::after {
    color: rgb(58, 71, 78);
    font-size: 2.75rem;
  }

  html:not(#ab135)[data-web-ab135="1"]
    edr-heading.banner__title.heading.heading--1
    ~ p.banner__description::after {
    color: rgb(58, 71, 78);
  }
}

@media screen and (min-width: 1024px) {
  html:not(#ab135)[data-web-ab135="1"]
    edr-heading.banner__title.heading.heading--1
    h1
    span::after {
    font-size: 3rem;
  }

  html:not(#ab135)[data-web-ab135="1"]
    edr-heading.banner__title.heading.heading--1
    ~ p.banner__description::after {
    color: rgb(58, 71, 78);
    font-size: 1.5rem;
  }
}

`);
