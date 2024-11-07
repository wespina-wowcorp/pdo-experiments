document.documentElement.dataset.webAb158 = "1";
console.log(">>>>>>>>>>>>>>>>>>>> AB-158 COMBINED??? >>>>>>>>>>>>>>>>>>>>>>");

window.ab158 = window.ab158 || {};

window.ab158.isNotValidUrl =
  window.ab158.isNotValidUrl ||
  (() => !location.pathname.startsWith("/boosts") && location.pathname !== "/");

window.ab158.handleBoostsPage =
  window.ab158.handleBoostsPage ||
  (() => {
    const edrGridContainer = document.querySelector(
      "edr-dc-dynamic-content:has(> edr-section)"
    );
    const boostsSectionContent = document.querySelector(
      "edr-dc-dynamic-content > edr-section edr-app-boost-offers-grid.anchor-point-56bAAVgA8Z9MFb3Addl9Sn"
    );
    const moreBoostsSectionContent = document.querySelector(
      "edr-dc-dynamic-content edr-section edr-app-boost-offers-grid.anchor-point-6V3rNbyhl0iYzPRJPrwrS"
    );

    const includesBoostsSections = mutationList.some(
      (mutation) =>
        mutation.target === boostsSectionContent ||
        mutation.target === moreBoostsSectionContent
    );

    if (!includesBoostsSections) {
      return observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

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
  });

window.ab158.handleHomePage =
  window.ab158.handleHomePage ||
  (() => {
    // Homepage
    const boostsSectionContent = document.querySelector(
      "edr-dc-dynamic-content > edr-section.anchor-point-5osXGSUsuMLr5C0QJ1TjG7 edr-app-boost-offers-grid.anchor-point-6UMNWJEAHaof05gwXBXxTY"
    );
    const moreBoostsSectionContent = document.querySelector(
      "edr-dc-dynamic-content edr-section.anchor-point-3DzE5FSmQN0rQkfgAI5693 edr-app-boost-offers-grid.anchor-point-5kaqaQI1WboJqb0LVRKM5K"
    );

    const includesBoostsSections = mutationList.some(
      (mutation) =>
        mutation.target === boostsSectionContent ||
        mutation.target === moreBoostsSectionContent
    );

    if (!includesBoostsSections) {
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
      console.log(">>> BOTH EXISTS >>>>>");
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
      if (window.ab158.isNotValidUrl) {
        return observer.disconnect();
      }

      observer.disconnect();

      if (location.pathname.startsWith("/boosts")) {
        window.ab158.handleBoostsPage();
      } else {
        window.ab158.handleHomePage();
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


