// ==UserScript==
// @name         AB-167: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-167
// @version      AB-167_variant_1
// @description  Cartology Personalization - Pet Segment
// @author       Wilson
// @match        https://www.woolworths.co.nz/
// @match        https://www.woolworths.co.nz/lists/myfavourites
// @require      file:///Users/wilsonespina/Development/woolworths/pdo-experiments/AB-167/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(">>>>>> AB-167 varation 1 >>>>>>>>");

document.documentElement.dataset.webAb167 = "1";

window.ab167 = window.ab167 || {};

window.ab167.changeContent =
  window.ab167.changeContent ||
  ((targetElement, html) => {
    const documentFragment = document
      .createRange()
      .createContextualFragment(html);
    targetElement.replaceWith(documentFragment);
  });

window.ab167.dynamic =
  window.ab167.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/lists/myfavourites")) {
        return observer.disconnect();
      }

      const productGrid = document.querySelector(
        ".contentContainer-main product-grid"
      );
      const includesSProductsGrid = mutationList.some(
        (mutation) => mutation.target === productGrid
      );
      const experimentClass = document.querySelector(".ab-167");

      if (!includesSProductsGrid || experimentClass) {
        return observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }

      observer.disconnect();

      const grid = productGrid.children;
      const div = document.createElement("div");

      const fourthTile = grid[3];
      fourthTile.parentNode.insertBefore(div, fourthTile);

      window.ab167.changeContent(
        div,
        `
        <cdx-cta _ngcontent-app-c37882650="" _ngcontent-app-c3412939284="" _nghost-app-c2668134291="" _nghost-app-c3713186528="" data-type="card" class="ng-star-inserted ab-167">
          <cdx-card _ngcontent-app-c37882650="" _nghost-app-c3713186528="" card-padding="none" card-center="false" card-rounded="false" class="card">
              <a _ngcontent-app-c37882650="" aria-label="linkText" class="cta-cover _noajax ng-star-inserted" href="/shop/productdetails?stockcode=375240&amp;name=woolworths-cheese-cheddar-everyday"></a><!---->
              <figure _ngcontent-app-c37882650=""><img _ngcontent-app-c37882650="" deferload="" alt="null" class="" src="/content/banners/F2514-CIGD-Cheese-HFGaward.jpg"></figure>
              <div _ngcontent-app-c37882650="" class="cta-caption ng-star-inserted">
                <p _ngcontent-app-c37882650="" class="heading--5 ng-star-inserted">Winner, Best Cheese – Block category</p>
                <button _ngcontent-app-c37882650="" cdxbutton="" fillstyle="primaryInverse" _nghost-app-c2304148310="" aria-disabled="false" align="center" size="default" inline="false" data-orientation="horizontal" fullwidth="true" data-slotendsize="default" data-slotstartsize="default" aria-busy="false" data-completed="false" style="pointer-events: auto;" class="">
                    <i _ngcontent-app-c2304148310="" class="button-icon--start"></i> Shop now 
                    <i _ngcontent-app-c2304148310="" class="button-icon--end">
                    </i>
                </button>
              </div>
          </cdx-card>
        </cdx-cta>
        `
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
    document.addEventListener("DOMContentLoaded", window.ab167.dynamic);
  } else {
    window.ab167.dynamic();
  }
} catch (error) {
  console.error("ab167:", error);
}
