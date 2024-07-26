// ==UserScript==
// @name         AB-157: Variant 1
// @namespace    https://woolworths-agile.atlassian.net/browse/AB-157
// @version      AB-157_variant_1
// @description  Randomize Homepage Banner
// @author       Wilson
// @match        https://www.woolworths.co.nz/
// @require      file://C:/Users/1442718/Development/overrides/AB-157/Variant-1/main.js
// ==/UserScript==

console.log(">>>> AB-157 >>>>");
document.documentElement.dataset.webAb157 = "1";

window.ab157 = window.ab157 || {};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomiseArrayWithFixedPositions(array, randomisedPositions) {
  if (!array) return;
  const newArray = [...array];
  const itemsToShuffle = randomisedPositions.map((pos) => newArray[pos]);
  const shuffledItems = shuffleArray(itemsToShuffle);
  // Place the shuffled items back into the original array
  randomisedPositions.forEach((pos, index) => {
    newArray[pos] = shuffledItems[index];
  });

  return newArray;
}

window.ab157.dynamic =
  window.ab157.dynamic ||
  (() => {
    new MutationObserver((_, observer) => {
      if (location.pathname !== "/") {
        return observer.disconnect();
      }

      const heroCarousel = document.querySelector(
        "wnz-hero-carousel .hero-carousel-container .hero-items"
      );
      const heroCarouselItems = document.querySelectorAll(
        "wnz-hero-carousel .hero-carousel-container .hero-items wnz-hero-item"
      );

      if (heroCarousel) {
        // const FIXED_POSITIONS = [0, 1, 3, 5, 8];
        const RANDOMISED_POSITIONS = [2, 4, 6, 7];
        const shuffledCarouselItems = randomiseArrayWithFixedPositions(
          heroCarouselItems,
          RANDOMISED_POSITIONS
        );

        heroCarouselItems.forEach((item, index) => {
          let nodesFragment = document.createDocumentFragment();
          nodesFragment.appendChild(
            shuffledCarouselItems[index].cloneNode(true)
          );
          item.replaceWith(nodesFragment);
        });

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
    document.addEventListener("DOMContentLoaded", window.ab157.dynamic);
  } else {
    window.ab157.dynamic();
  }
} catch (error) {
  console.error("ab157:", error);
}
