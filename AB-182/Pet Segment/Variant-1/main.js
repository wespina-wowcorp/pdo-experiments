// ==UserScript==
// @name         AB-182: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-182
// @version      AB-182_variant_1
// @description  Cartology Personalization on Homepage
// @author       Wilson
// @match        https://www.woolworths.co.nz/
// @require      file://C:/Users/1442718/Development/overrides/AB-182/Pet Segment/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

document.documentElement.dataset.webAb182 = "1";

window.ab182 = window.ab182 || {};

window.ab182.utils = window.ab182.utils || window.optimizely.get("utils");

window.ab182.waitForElement =
  window.ab182.waitForElement ||
  ((selector) => window.ab182.utils.waitForElement(selector));

window.ab182.bannerImageDesktop =
  window.ab182.bannerImageDesktop ||
  "https://www.woolworths.co.nz/Content/Banners/DeliverySaver-Header-D-1190x280.jpg";

window.ab182.bannerImageMobile =
  window.ab182.bannerImageMobile ||
  "https://www.woolworths.co.nz/Content/Banners/DeliverySaver-Header-M-386x232.jpg";

window.ab182.bannerLink =
  window.ab182.bannerLink ||
  "https://www.woolworths.co.nz/deliverysubscription/plans";

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

window.ab182.init =
  window.ab182.init ||
  (() => {
    if (!window.ab182.isValidUrl) {
      return observer.disconnect();
    }

    window.ab182
      .waitForElement("wnz-home > #dynamic-content-bottom-panel > dc-container")
      .then((pageContainer) => {
        if (pageContainer.childNodes.length > 0) {
          const banner = document.createElement("div");
          pageContainer.appendChild(banner);

          window.ab182.changeContent(
            banner,
            `
              <div _ngcontent-app-c3428906611="" class="init-content-row row-fluid ng-star-inserted">
              <div class="init-content2-item init-content2-item-html ng-star-inserted">
                  <a href="${window.ab182.bannerLink}" class="ab182">
                      <picture>
                          <source srcset="${window.ab182.bannerImageDesktop}" media="(width > 640px)">
                          <img src="${window.ab182.bannerImageMobile}" alt="Delivery Saver Banner" style="margin-block: 1rem !important; width: 100%; height: auto;">
                      </picture>
                  </a>
                </div>
              </div>
            `
          );

          const newExperimentBanner =
            pageContainer.querySelector(":scope .ab182");

          if (newExperimentBanner) {
            newExperimentBanner.addEventListener(
              "click",
              (e) => {
                console.log(">>> CLICKED BANNER! >>>>>");
                // TODO - confirm with TASH
                // if (utag && utag.link) {
                //   utag.link({
                //     tealium_event: "ab_test",
                //     test_name: "AB-182",
                //     test_event: "click",
                //     test_component: "my_favourites_banner_generic",
                //     test_id: "variation_1_pet_segment",
                //     test_content: "delivery_saver",
                //   });
                // }
              },
              true
            );
          }
        }
      });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab182.init);
  } else {
    window.ab182.init();
  }
} catch (error) {
  console.error("ab182:", error);
}
