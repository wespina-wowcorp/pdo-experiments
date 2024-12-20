// ==UserScript==
// @name         AB-135: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-135
// @version      AB-135_variant_1
// @description  Optimizing Boost Banner
// @author       Wilson
// @match        https://www.everydayrewards.co.nz/boosts
// @match        https://www-uat.everydayrewards.co.nz/boosts
// @require      file://C:/Users/1442718/Development/overrides/AB-135/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(">>>> AB-135! >>>>");

// ****************************************

document.documentElement.dataset.webAb135 = "1";

window.ab135 = window.ab135 || {};

window.ab135.changeContent =
  window.ab135.changeContent ||
  ((targetElement, html) => {
    const documentFragment = document
      .createRange()
      .createContextualFragment(html);
    targetElement.replaceWith(documentFragment);
  });

window.ab135.headingCopy =
  window.ab135.headingCopy ||
  "Get to 2,000 points faster with your weekly Boosts";

window.ab135.subTitleCopy =
  window.ab135.subTitleCopy ||
  'Hit "Boost" to activate your offers before you shop in-store or online. New Boosts are loaded every Monday.';

window.ab135.baseImagePath =
  window.ab135.baseImagePath ||
  "//images.ctfassets.net/28bohp801cze/qQGqRWGbL4Hk25wZs54vb/08567c8fe158e6e6445699ef200e2ac9/Phone_clearcut.png";

window.ab135.imageFormat = window.ab135.imageFormat || "webp";

window.ab135.dynamic =
  window.ab135.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      // EDR site seems to cache content and does not run mutation observer after return statement, navigating away and returning to the same page
			observer.disconnect();

      const topBanner = document.querySelector(
        'edr-section[data-contentful-entry-id="1MEYNrqvRdEDCfQ52E0xQa"]'
      );
      
      const experimentImage = document.querySelector(".ab135");

      if (!topBanner || experimentImage) {
        return observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }

      const heading = document.querySelector(
        ".banner__body-info-content edr-heading h1"
      );

      const infoContent = document.querySelector(".banner__body-info-content");
      const subHeading = infoContent.querySelector(
        ":scope > p.banner__description"
      );
      const div = document.createElement("div");

      const edrBannerBody = topBanner.querySelector(
        ":scope edr-banner .banner .banner__body"
      );

      edrBannerBody.appendChild(div);

      window.ab135.changeContent(
        div,
        `
        <div _ngcontent-ng-c2101707264 class="banner__body-media ab135">
          <div _ngcontent-ng-c2101707264>
            <edr-image _ngcontent-ng-c2101707264 _nghost-ng-c2101707264 class="image" style="width: auto;">
              <div class="image__container">
                <picture>
                  <source media="(min-width:1440px)" srcset="${window.ab135.baseImagePath}?fm=${window.ab135.imageFormat}&w=605&h=436&fit=fill&q=100">
                  <source media="(min-width:768px)" srcset="${window.ab135.baseImagePath}?fm=${window.ab135.imageFormat}&w=568&h=409&fit=fill&q=100">
                  <source srcset="${window.ab135.baseImagePath}?fm=${window.ab135.imageFormat}&w=340&h=280&fit=fill&q=100">
                  <img src="${window.ab135.baseImagePath}?fm=${window.ab135.imageFormat}" alt="Mobile phone being held in a hand">
                </picture>
              </div>
            </edr-image>
          </div>
        </div>
      `
      );

      if (heading) {
        const textEl = heading.querySelector(":scope span");
        if (textEl) {
          textEl.ariaHidden = "true";
          textEl.classList.add("sr-hidden");
        }
        const span = document.createElement("span");
        heading.appendChild(span);
        window.ab135.changeContent(
          span,
          `<span _ngcontent-ng-c652155298>
            ${window.ab135.headingCopy}
          </span>`
        );
      }

      if (infoContent && subHeading) {
        subHeading.ariaHidden = "true";
        subHeading.classList.add("sr-hidden");

        const paragraph = document.createElement("p");
        infoContent.appendChild(paragraph);
        window.ab135.changeContent(
          paragraph,
          `<p _ngcontent-ng-c2101707264="" edr-typography="" class="banner__description" _nghost-ng-c2124758243="" typographyas="sub-heading--1">
            ${window.ab135.subTitleCopy}
          </p>`
        );
      }

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
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
/* Fix line height for hidden text */
html:not(#ab135)[data-web-ab135="1"] .banner__body-info-content .banner__title {
  white-space: normal;
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



html:not(#ab135)[data-web-ab135="1"]
  edr-section[_nghost-ng-c1460657692=""]
  > section:has(.ab135.banner__body-media) {
  padding-bottom: 0 !important;
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
}


.sr-hidden {
  display: none;
}



`);

/*


.sr-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
*/
