document.documentElement.dataset.webAb158 = "1";

window.ab158 = window.ab158 || {};

window.ab158.dynamic =
  window.ab158.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!location.pathname.startsWith("/boosts")) {
        return observer.disconnect();
      }

      const edrGridContainer = document.querySelector("edr-dc-dynamic-content");

      const boostsSection = document.querySelector(
        "edr-dc-dynamic-content edr-section:nth-of-type(2)"
      );

      const moreBoostsSection = document.querySelector(
        "edr-dc-dynamic-content edr-section:nth-of-type(3)"
      );

      if (boostsSection && moreBoostsSection) {
        const boostsHeadingEl = boostsSection.querySelector(":scope edr-heading h3");
        const boostsSubheadingEl = boostsSection.querySelector(
          "edr-contentful-rich-text p"
        );
        const ctaContainer = boostsSection.querySelector(":scope edr-app-container");
        const moreBoostsHeadingEl =
          moreBoostsSection.querySelector(":scope edr-heading h3");
        const moreBoostsSubheadingEl = moreBoostsSection.querySelector(
          "edr-contentful-rich-text p"
        );
        let container = moreBoostsSection.querySelector(
          ":scope section .section__content edr-app-boost-offers-grid > div"
        );

        if (moreBoostsHeadingEl && boostsHeadingEl) {
          moreBoostsHeadingEl.textContent = boostsHeadingEl.textContent;
          boostsHeadingEl.style.display = "none";
        }
        if (moreBoostsSubheadingEl && boostsSubheadingEl) {
          moreBoostsSubheadingEl.textContent = boostsSubheadingEl.textContent;
          boostsSubheadingEl.style.display = "none";
        }
        if (container && ctaContainer) {
          container.append(ctaContainer);
        }
      }

      if (edrGridContainer && boostsSection) {
        edrGridContainer.insertBefore(moreBoostsSection, boostsSection);

        return observer.disconnect();
      }
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
