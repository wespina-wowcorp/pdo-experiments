#!/usr/bin/env node

import { input, confirm } from "@inquirer/prompts";
import fs from "node:fs";
import colors from "colors";

const LOG_MAGENTA = (text) => console.log(colors.magenta(text));

const testId = await input({
  message: "Enter experiment id (e.g. AB-123)",
  required: true,
});

const numberOfVariants = await input({
  message: "Enter number of variants (not including Control)",
  required: true,
});

const description = await input({
  message: "Enter test description (e.g. title of JIRA ticket)",
});

const urlMatch = await input({
  message: "Enter URL for experiment",
});

let urlMatch2 = null;

const answer = await confirm({ message: "Any more URLs?" });
if (answer) {
  urlMatch2 = await input({
    message: "Enter second URL for experiment",
  });
}

const variants = parseInt(numberOfVariants);

const MAX_ALLOWABLE_VARIANTS = 10;

if (!variants || variants > MAX_ALLOWABLE_VARIANTS) {
  throw new Error("Invalid number of variants");
}

const variantArray = [...Array(variants).keys()];

variantArray.forEach((variant) => {
  const variantNumber = variant + 1;
  const folderName = `${testId.trim()}/Variant-${variantNumber}`;
  const testNumber = testId.match(/(AB|AA)-(.*)/)?.[2];

  if (!testNumber) {
    throw new Error('Test ID must start with "AB-"');
  }

  const tamperMonkeyContent = `// ==UserScript==
// @name         ${testId}: Variant ${variantNumber}
// @namespace    https://woolworths-agile.atlassian.net/browse/${testId}
// @version      ${testId}_variant_${variantNumber}
// @description  ${description}
// @author       Wilson
// @match        ${urlMatch}${
    urlMatch2 ? "\n// @match        " + urlMatch2 : ""
  }
// @require      https://cdn.optimizely.com/js/21124251956.js
// @require      file://C:/Users/1442718/Development/overrides/${testId}/Variant-${variantNumber}/main.js
// @grant        GM_addStyle
// ==/UserScript==`;

  const content = `document.documentElement.dataset.webAb${testNumber} = "${variantNumber}";

window.ab${testNumber} = window.ab${testNumber} || {};

window.ab${testNumber}.utils = window.ab${testNumber}.utils || window.optimizely.get("utils");

window.ab${testNumber}.waitForElement =
  window.ab${testNumber}.waitForElement ||
  ((selector) => window.ab${testNumber}.utils.waitForElement(selector));

window.ab${testNumber}.init =
  window.ab${testNumber}.init ||
  (() => {
    // CHECK IF IT IS VALID URL

    window.ab${testNumber}
      .waitForElement("") // UPDATE SELECTOR
      .then((pageContainer) => {
        // EXPERIMENT RELATED CHANGES
        
      });
  });

try {
  if (document.body == null) {
    document.addEventListener("DOMContentLoaded", window.ab${testNumber}.init);
  } else {
    window.ab${testNumber}.init();
  }
} catch (error) {
  console.error("ab${testNumber}:", error);
}
`;

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
      fs.writeFileSync(`${folderName}/main.js`, content);
      fs.writeFileSync(
        `${folderName}/tamperMonkeyScript.js`,
        tamperMonkeyContent
      );
    }
  } catch (err) {
    console.error("Error: ", err);
  }
});

LOG_MAGENTA("***** FILES GENERATED *******");
