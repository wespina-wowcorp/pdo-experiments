document.documentElement.dataset.aaWeb2 = "1";
console.info(
  "Optimizely Web Experimentation -",
  "Starting A/A Test (Tealium Events)-",
  "Variation 1"
);
console.info(
  "Optimizely Web Experimentation -",
  "User Id:",
  window.optimizely.get("visitor").visitorId
);
console.info(
  "Optimizely Web Experimentation -",
  "Revision:",
  window.optimizely.get("data").revision
);

window.aaWeb2 = window.aaWeb2 || {};

window.aaWeb2.utils = window.aaWeb2.utils || window["optimizely"].get("utils");

window.aaWeb2.waitForElement =
  window.aaWeb2.waitForElement ||
  ((selector) => window.aaWeb2.utils.waitForElement(selector));

window.aaWeb2.observeSelector =
  window.aaWeb2.observeSelector ||
  ((selector, callback, options) =>
    window.aaWeb2.utils.observeSelector(selector, callback, options));

window.aaWeb2.isValidUrl =
  window.aaWeb2.isValidUrl || (() => location.pathname === "/");

window.aaWeb2.utagLink =
  window.aaWeb2.utagLink ||
  ((tealiumEvent) => {
    if (utag && utag.link) return utag.link(tealiumEvent);
    return null;
  });

window.aaWeb2.dynamic =
  window.aaWeb2.dynamic ||
  (() => {
    if (!window.aaWeb2.isValidUrl) {
      return observer.disconnect();
    }

    window.aaWeb2
      .waitForElement("global-nav-search")
      .then((globalNavSearchEl) => {
        const searchBar = globalNavSearchEl.querySelector(":scope #search");
        if (searchBar) {
          searchBar.addEventListener("click", () => {
            window.aaWeb2.utagLink({
              tealium_event: "ab_test",
              test_name: "notification_event",
              test_event: "aa_test_2",
              test_component: "search_input",
            });
          });
        }
      });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.aaWeb2.dynamic);
  } else {
    window.aaWeb2.dynamic();
  }
} catch (error) {
  console.error("aaWeb2:", error);
}
