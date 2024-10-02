// ==UserScript==
// @name         AB-172: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-172
// @version      AB-172_variant_1
// @description  Encouraging Log in on Specials Page
// @author       Wilson
// @match        https://www.woolworths.co.nz/shop/specials*
// @require      file://C:/Users/1442718/Development/overrides/AB-172/Variant-1/main.js
// @grant        GM_addStyle
// ==/UserScript==

console.log(" >>>>>> AB-172 Running >>>>>>");

/* COPY FROM BELOW TO OPTIMIZELY */

document.documentElement.dataset.webAb172 = "1";

window.ab172 = window.ab172 || {};

window.ab172.changeContent =
  window.ab172.changeContent ||
  ((targetElement, html) => {
    const documentFragment = document
      .createRange()
      .createContextualFragment(html);
    targetElement.replaceWith(documentFragment);
  });

window.ab172.dynamic =
  window.ab172.dynamic ||
  (() => {
    new MutationObserver((mutationList, observer) => {
      const dynamicContent = document.querySelector(
        "#dynamic-content-secondary-panel"
      );

      observer.disconnect();

      if (!dynamicContent) {
        return observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }

      // Delay to ensure dynamic content is loaded
      setTimeout(() => {
        const topSection = dynamicContent.querySelector(
          ":scope .dynamic-content2-item:has(h1)"
        );

        const experimentLink = document.querySelector(".ab172");

        if (experimentLink) {
          return;
        }

        if (topSection) {
          const subheading = dynamicContent.querySelector(
            ':scope .dynamic-content-row dc-html p[style="text-align:center"]'
          );

          if (subheading) {
            subheading.ariaHidden = "true";
            subheading.classList.add("ab172-sr-hidden");
          }

          const span = document.createElement("span");
          topSection.insertBefore(span, subheading);
          window.ab172.changeContent(
            span,
            `<p style="text-align:center" class="ab172">
              <a href="/shop/securelogin" class="ab172-sign-in"><span>Sign in</span></a> or <a href="/shop/securelogin" class="ab172-register"><span>register</span></a> to activate your Boosts, and discover Member Prices and Specials on products you love.
             </p>
            `
          );

          const signInLink = topSection.querySelector(":scope .ab172-sign-in");
          const registerLink = topSection.querySelector(
            ":scope .ab172-register"
          );

          if (signInLink) {
            signInLink.addEventListener("click", () => {
              console.log("Sign in clicked");
              // TODO - add custom tracking
            });
          }

          if (registerLink) {
            registerLink.addEventListener("click", () => {
              console.log("Register clicked");
              // TODO - add custom tracking
            });
          }
        }
      }, 0);

      observer.observe(document.body, { childList: true, subtree: true });
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab172.dynamic);
  } else {
    window.ab172.dynamic();
  }
} catch (error) {
  console.error("ab172:", error);
}

GM_addStyle(`
html:not(#ab172)[data-web-ab172="1"] .ab172-sr-hidden {
  display: none;
}
`);
