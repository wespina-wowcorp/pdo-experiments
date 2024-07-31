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

// Original order of the carousel items
window.ab157.carouselOrder = window.ab157.carouselOrder || [0, 1, 2, 3, 4, 5, 6, 7, 8];

window.ab157.positionsToShuffle = window.ab157.positionsToShuffle || [2, 4, 6, 7]; // TODO - change this for variation 2

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
  function shuffleArrayWithPositions(
    array,
    randomisedPositions,
  ) {
    if (!array) return;

    const itemsToShuffle = randomisedPositions.map((pos) => array[pos]);
    const shuffledItems = window.ab157.shuffleArray(itemsToShuffle);
    // Place the shuffled items back into the original array
    randomisedPositions.forEach((pos, index) => {
      array[pos] = shuffledItems[index];
    });

    return array;
  };

window.ab157.clearStorage =
  window.ab157.clearStorage ||
  function clearStorage() {
    const session = sessionStorage.getItem("ab_157");
    if (session === null) {
      console.log(">>>> ************SESSION NULL ************ >>>>>>>");
      localStorage.removeItem("ab157_hero_carousel_order");
    }
    sessionStorage.setItem("ab_157", 1);
  };




window.ab157.dynamic =
  window.ab157.dynamic ||
  (() => {
    const carouselOrder = localStorage.getItem("ab157_hero_carousel_order");

    new MutationObserver((mutationList, observer) => {
      console.log(">>>>> DYNAMIC >>>>>>>");
      if (location.pathname !== "/") {
        return observer.disconnect();
      }

      const heroCarousel = document.querySelector(
        "wnz-hero-carousel .hero-carousel-container .hero-items"
      );
      const heroCarouselItems = document.querySelectorAll(
        "wnz-hero-carousel .hero-carousel-container .hero-items wnz-hero-item"
      );

      if (!heroCarousel || heroCarouselItems.length === 0) {
        return;
      }

      let shuffledArray = window.ab157.shuffleArrayWithPositions(
        [...window.ab157.carouselOrder],
        window.ab157.positionsToShuffle
      );


      if (carouselOrder !== null && typeof carouselOrder === "string") {
        const carouselOrderArray = carouselOrder.split(",").map(Number);
        shuffledArray = carouselOrderArray;
      } else {
        localStorage.setItem("ab157_hero_carousel_order", shuffledArray);
      }

      console.log("🚀 ~ newMutationObserver ~ shuffledArray:>>>>>>>>>>>>>", shuffledArray);
      console.log("🚀 ~ newMutationObserver ~ window.ab157.positionsToShuffle:", window.ab157.positionsToShuffle)


      window.ab157.positionsToShuffle

      const originalCarouselItems = [...heroCarouselItems].map((item) => {
        const mainImage = item.querySelector(":scope wnz-hero-item-main-image img");
        const contentContainer = item.querySelector(":scope wnz-hero-item-content");
        const contentImage1 = contentContainer.querySelector(':scope > div img:nth-of-type(1)');
        const contentImage2 = contentContainer.querySelector(':scope > div img:nth-of-type(2)');
        const textBlock = contentContainer.querySelector(':scope > section .text-block');
        const ctaBlock = contentContainer.querySelector(':scope > section .cta-block');

        return {
          mainImage,
          contentContainer,
          contentImage1,
          contentImage2,
          textBlock,
          ctaBlock
        }
      })
      console.log("🚀 ~ originalCarouselItems ~ originalCarouselItems:", originalCarouselItems)

      const PLACEHOLDER_IMAGE = (slideNumber) => `https://placehold.co/1994x864?text=Slide+${slideNumber}`; // TODO - REMOVE



      heroCarouselItems.forEach((item, index) => {
        if (index === shuffledArray[index] && (index !== 0 || index !== heroCarouselItems.length - 1)) return;
        const mainImage = item.querySelector(":scope wnz-hero-item-main-image img");
        const contentContainer = item.querySelector(":scope wnz-hero-item-content");
        const contentImage1 = contentContainer.querySelector(':scope > div img:nth-of-type(1)');
        const contentImage2 = contentContainer.querySelector(':scope > div img:nth-of-type(2)');
        const textBlock = contentContainer.querySelector(':scope > section .text-block');
        const ctaBlock = contentContainer.querySelector(':scope > section .cta-block');


      //     // if first or last indexes, copy from specific tiles
      //     // 0 copies content from slide 7
      //     // 8 copies content from slide 1

        if (originalCarouselItems[shuffledArray[index]]) {

          if (originalCarouselItems[shuffledArray[index]].mainImage) {
            const nodesFragment = document.createDocumentFragment();
            nodesFragment.appendChild(
              originalCarouselItems[shuffledArray[index]].mainImage.cloneNode(true)
            );
            mainImage.replaceWith(nodesFragment);
            // mainImage.src = PLACEHOLDER_IMAGE(index); // TODO - REMOVE
          }
          if (originalCarouselItems[shuffledArray[index]].contentContainer) {
            const nodesFragment = document.createDocumentFragment();
            nodesFragment.appendChild(
              originalCarouselItems[shuffledArray[index]].contentContainer.cloneNode(true)
            );
            contentContainer.replaceWith(nodesFragment);
          }
        }
      });


      // const shuffledCarouselItems = window.ab157.shuffleArrayWithPositions(
      //   heroCarouselItems,
      //   shuffledArray,
      // );

      // heroCarouselItems.forEach((item, index) => {
      //   let nodesFragment = document.createDocumentFragment();
      //   nodesFragment.appendChild(
      //     shuffledCarouselItems[index].cloneNode(true)
      //   );
      //   item.replaceWith(nodesFragment);
      // });

      return observer.disconnect();
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  });



// Main function and starting point of the experiment.
try {
  if (document.body == null) {
    // This happens when the experiment loads before the web page finishes loading.
    document.addEventListener("DOMContentLoaded", window.ab157.clearStorage);
    document.addEventListener("DOMContentLoaded", window.ab157.dynamic);
  } else {
    window.ab157.clearStorage();
    window.ab157.dynamic();
  }
} catch (error) {
  console.error("ab157:", error);
}

// [0, 1, 6, 3, 7, 5, 2, 4, 8]

