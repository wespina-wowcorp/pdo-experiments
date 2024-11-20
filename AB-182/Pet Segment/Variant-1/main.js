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

window.ab182.utagLink =
  window.ab182.utagLink ||
  ((tealiumEvent) => {
    if (utag && utag.link) return utag.link(tealiumEvent);
    return null;
  });

window.ab182.utagView =
  window.ab182.utagView ||
  ((tealiumEvent) => {
    if (utag && utag.view) return utag.view(tealiumEvent);
    return null;
  });

window.ab182.utagViewEvent = window.ab182.utagViewEvent || {
  tealium_event: "ab_test",
  test_name: "AB-182",
  test_event: "View promo",
  test_component: "Promo asset",
  test_id: "Pet segment V2",
  test_content: "Purina One Try me",
};

window.ab182.utagLinkEvent = window.ab182.utagLinkEvent || {
  tealium_event: "ab_test",
  test_name: "AB-182",
  test_event: "Click promo",
  test_component: "Promo asset",
  test_id: "Pet segment V2",
  test_content: "Purina One Try me",
};

window.ab182.addObserver =
  window.ab182.addObserver ||
  ((element) => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.ab182.utagView(window.ab182.utagViewEvent);
          observer.disconnect()
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);
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
                          <img src="${window.ab182.bannerImageMobile}" alt="" style="margin-block: 1rem !important; width: 100%; height: auto;">
                      </picture>
                  </a>
                </div>
              </div>
            `
          );

          const newExperimentBanner =
            pageContainer.querySelector(":scope .ab182");

          if (newExperimentBanner) {
            const image =
              newExperimentBanner.querySelector(":scope picture img");
            if (image) {
              window.ab182.addObserver(image);
            }

            newExperimentBanner.addEventListener(
              "click",
              (e) => {
                window.ab182.utagLink(window.ab182.utagLinkEvent);
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
