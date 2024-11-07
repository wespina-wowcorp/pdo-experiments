// ==UserScript==
// @name         AB-182: Variant 2
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-182
// @version      AB-182_variant_2
// @description  Cartology Personalization on Homepage
// @author       Wilson
// @match        https://www.woolworths.co.nz/
// @require      file://C:/Users/1442718/Development/overrides/AB-182/Baby Segment/Variant-2/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(' >>>>>> AB-182 Running >>>>>>');

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb182 = "2";

window.ab182 = window.ab182 || {};

window.ab182.bannerImageDesktop =
  window.ab182.bannerImageDesktop ||
  "https://www.woolworths.co.nz/Content/Banners/Huggies-Header-D-1190x280.jpg";

window.ab182.bannerImageMobile =
  window.ab182.bannerImageMobile ||
  "https://www.woolworths.co.nz/Content/Banners/Huggies-Header-M-386x232.jpg";

window.ab182.bannerLink =
  window.ab182.bannerLink ||
  "https://www.woolworths.co.nz/shop/searchproducts?search=Huggies%20nappies";

window.ab182.isValidUrl =
  window.ab182.isValidUrl || (() => location.pathname === "/");

window.ab182.changeContent =
  window.ab182.changeContent ||
  ((targetElement, html) => {
    const documentFragment = document
      .createRange()
      .createContextualFragment(html);
    targetElement.replaceWith(documentFragment);
  });

window.ab182.dynamic =
  window.ab182.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!window.ab182.isValidUrl) {
        return observer.disconnect();
      }

      const recipesBanner = document.querySelector(
        "wnz-home > section > dc-container recipe-grid-container"
      );

      const experimentBanner = document.querySelector(".ab182");

      if (!recipesBanner || experimentBanner) {
        return observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }

      const pageContainer = document.querySelector(
        "wnz-home > #dynamic-content-bottom-panel"
      );

      const banner = document.createElement("div");
      pageContainer.appendChild(banner);

      window.ab182.changeContent(
        banner,
        `
        <div _ngcontent-app-c3428906611="" class="dynamic-content-row row-fluid ng-star-inserted">
         <div class="dynamic-content2-item dynamic-content2-item-html ng-star-inserted">
            <a href="${window.ab182.bannerLink}" class="ab182">
                <picture>
                    <source srcset="${window.ab182.bannerImageDesktop}" media="(width > 640px)">
                    <img src="${window.ab182.bannerImageMobile}" alt="Baby Banner" style="margin-block: 1rem !important; width: 100%; height: auto;">
                </picture>
            </a>
          </div>
        </div>
      `
      );

      const newExperimentBanner = pageContainer.querySelector(":scope .ab182");

      newExperimentBanner.addEventListener(
        "click",
        (e) => {
          e.stopImmediatePropagation();
          e.stopPropagation();

          console.log(">>> CLICKED BANNER >>>>>");
          // TODO - confirm with TASH
          // if (utag && utag.link) {
          //   utag.link({
          //     tealium_event: "ab_test",
          //     test_name: "AB-182",
          //     test_event: "click",
          //     test_component: "my_favourites_banner_baby",
          //     test_id: "variation_1_baby_segment",
          //     test_content: "delivery_saver",
          //   });
          // }
        },
        true
      );

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
    document.addEventListener("DOMContentLoaded", window.ab182.dynamic);
  } else {
    window.ab182.dynamic();
  }
} catch (error) {
  console.error("ab182:", error);
}

