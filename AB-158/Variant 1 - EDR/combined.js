document.documentElement.dataset.webAb158 = "1";

window.ab158 = window.ab158 || {};

window.ab158.isValidUrl =
  window.ab158.isValidUrl ||
  (() => location.pathname.startsWith("/boosts") || location.pathname === "/");

window.ab158.handleBoostsPage =
  window.ab158.handleBoostsPage ||
  ((observer) => {
    const edrGridContainer = document.querySelector(
      "edr-dc-dynamic-content:has(> edr-section)"
    );

    const boostsSection = document.querySelector(
      "edr-dc-dynamic-content edr-section.anchor-point-3NTbY74npqKutVV12AGOh1"
    );

    const moreBoostsSection = document.querySelector(
      "edr-dc-dynamic-content edr-section.anchor-point-5MUMWDpdZELR6ljNpKUBtO"
    );

    if (!boostsSection || !moreBoostsSection) {
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

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
  });

window.ab158.handleHomePage =
  window.ab158.handleHomePage ||
  ((observer) => {
    // Homepage
    const boostsSectionContent = document.querySelector(
      "edr-dc-dynamic-content > edr-section.anchor-point-5osXGSUsuMLr5C0QJ1TjG7 edr-app-boost-offers-grid.anchor-point-6UMNWJEAHaof05gwXBXxTY"
    );
    const moreBoostsSectionContent = document.querySelector(
      "edr-dc-dynamic-content edr-section.anchor-point-3DzE5FSmQN0rQkfgAI5693 edr-app-boost-offers-grid.anchor-point-5kaqaQI1WboJqb0LVRKM5K"
    );

    if (!moreBoostsSectionContent || !boostsSectionContent) {
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const boostsSection = document.querySelector(
      "edr-dc-dynamic-content edr-section.anchor-point-5osXGSUsuMLr5C0QJ1TjG7"
    );

    const moreBoostsSection = document.querySelector(
      "edr-dc-dynamic-content edr-section.anchor-point-3DzE5FSmQN0rQkfgAI5693"
    );

    const edrGridContainer = document.querySelector(
      "edr-dc-dynamic-content:has(> edr-section)"
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
  });

window.ab158.dynamic =
  window.ab158.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      if (!window.ab158.isValidUrl) {
        return observer.disconnect();
      }

      observer.disconnect();

      if (location.pathname.startsWith("/boosts")) {
        window.ab158.handleBoostsPage(observer);
      } else {
        window.ab158.handleHomePage(observer);
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
