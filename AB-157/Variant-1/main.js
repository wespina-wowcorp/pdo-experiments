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

window.ab157.positionsToShuffle = window.ab157.positionsToShuffle || [
  // 2, 4, 6, 7,
  2, 4, 6, // TODO - REMOVE
];

window.ab157.shuffleArray =
  window.ab157.shuffleArray ||
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

window.ab157.shuffleArrayWithPositions =
  window.ab157.shuffleArrayWithPositions ||
  function shuffleArrayWithPositions(array, randomisedPositions) {
    if (!array) return;

    const itemsToShuffle = randomisedPositions.map((pos) => array[pos]);
    const shuffledItems = window.ab157.shuffleArray(itemsToShuffle);
    // Place the shuffled items back into the original array
    randomisedPositions.forEach((pos, index) => {
      array[pos] = shuffledItems[index];
    });

    return array;
  };

window.ab157.queryStingExists =
  window.ab157.queryStingExists ||
  function queryStingExists(qs) {
    return qs.includes("?");
  };

window.ab157.queryStringUnifier =
  window.ab157.queryStringUnifier || "?";


window.ab157.dynamic =
  window.ab157.dynamic ||
  (() => {
    const carouselOrder = sessionStorage.getItem("ab157_hero_carousel_order");

    new MutationObserver((mutationList, observer) => {
      if (location.pathname !== "/") {
        return observer.disconnect();
      }

      const heroCarousel = document.querySelector(
        "wnz-hero-carousel .hero-carousel-container .hero-items"
      );
      const heroCarouselItems = document.querySelectorAll(
        "wnz-hero-carousel .hero-carousel-container .hero-items wnz-hero-item"
      );

      const totalItems = heroCarouselItems.length;

      if (!heroCarousel || totalItems === 0) {
        return;
      }

      let shuffledArray = window.ab157.shuffleArrayWithPositions(
        // Original order of the carousel items
        [...Array(totalItems).keys()], // e.g. '[0, 1, 2, 3, 4, 5, 6, 7, 8]'
        window.ab157.positionsToShuffle
      );

      if (carouselOrder !== null && typeof carouselOrder === "string") {
        // Carousel order is stored in local storage as a string
        // We need to convert it back to an array
        const carouselOrderArray = JSON.parse(carouselOrder);
        shuffledArray = carouselOrderArray;
      } else {
        sessionStorage.setItem(
          "ab157_hero_carousel_order",
          JSON.stringify(shuffledArray) // e.g. '[0, 1, 4, 7, 3, 2, 6, 5, 8]'
        );
      }

      const originalCarouselItems = [...heroCarouselItems].map((item) => {
        const mainImage = item.querySelector(
          ":scope wnz-hero-item-main-image a"
        );
        const contentContainer = item.querySelector(
          ":scope wnz-hero-item-content"
        );

        return {
          mainImage,
          contentContainer,
        };
      });

      const swapCarouselTiles = (image, contentContainer, indexToUpdate) => {
        if (!image || !contentContainer) return;

        const nodesFragment1 = document.createDocumentFragment();
        const newIndex = shuffledArray[indexToUpdate];
        const mainImage = originalCarouselItems[newIndex].mainImage.cloneNode(true);

        if (window.ab157.queryStingExists(mainImage.href)) {
          window.ab157.queryStringUnifier = "&";
        }

        nodesFragment1.appendChild(mainImage);
        image.replaceWith(nodesFragment1);

        // copy over click events
        if (mainImage) {
          mainImage.addEventListener('click', () => {
            originalCarouselItems[newIndex].mainImage.click();
            document.location.href = `${cta.href}${window.ab157.queryStringUnifier}ab157-1-position=${indexToUpdate}`;
          });
        }

        const nodesFragment2 = document.createDocumentFragment();
        const mainContentContainer =
          originalCarouselItems[newIndex].contentContainer.cloneNode(true);

        const cta = mainContentContainer.querySelector(
          ":scope section .cta-block a.hero-button"
        );

        nodesFragment2.appendChild(mainContentContainer);
        contentContainer.replaceWith(nodesFragment2);

        // copy over click events
        if (cta) {
          cta.addEventListener('click', () => {
            originalCarouselItems[newIndex].mainImage.click();
            document.location.href = `${cta.href}${window.ab157.queryStringUnifier}ab157-1-position=${indexToUpdate}`;
          });
        }
      };

      observer.disconnect();

      heroCarouselItems.forEach((item, index) => {
        if (index === shuffledArray[index]) return;

        const mainImage = item.querySelector(
          ":scope wnz-hero-item-main-image a"
        );
        const contentContainer = item.querySelector(
          ":scope wnz-hero-item-content"
        );

        swapCarouselTiles(mainImage, contentContainer, index);
      });

      // position 0 copies content from last position for a smoother animation
      // Only perform this swap if the last item has moved due to the shuffle
      const lastPosition = totalItems - 2;
      if (shuffledArray[lastPosition] !== lastPosition) {
        const mainImage = heroCarouselItems[0].querySelector(
          ":scope wnz-hero-item-main-image img"
        );
        const contentContainer = heroCarouselItems[0].querySelector(
          ":scope wnz-hero-item-content"
        );
        swapCarouselTiles(mainImage, contentContainer, lastPosition);
      }

    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab157.dynamic);
  } else {
    window.ab157.dynamic();
  }
} catch (error) {
  console.error("ab157:", error);
}
