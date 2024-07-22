#!/usr/bin/env node

import { input } from "@inquirer/prompts";
import fs from "node:fs";

const testId = await input({ message: "Enter experiment id (e.g. AB-123)" });
const numberOfVariants = await input({
  message: "Enter number of variants (not including Control)",
});
const variants = parseInt(numberOfVariants);

const MAX_ALLOWABLE_VARIANTS = 10;

if (!variants || variants > MAX_ALLOWABLE_VARIANTS) {
  throw new Error("Invalid number of variants");
}

console.log("***** GENERATING FILES *******");

const variantArray = [...Array(variants).keys()];

variantArray.forEach((variant) => {
  // TODO - validation for AB test name (starts with AB)
  const variantNumber = variant + 1;
  const folderName = `${testId.trim()}/Variant-${variantNumber}`;
  const testNumber = testId.match(/AB-(.*)/)?.[1];

  if (!testNumber) {
    throw new Error('Test ID must start with "AB-"')
  }

  const content = `
  // ==UserScript==
  // @name         ${testId}: Variant ${variantNumber}
  // @namespace    https://woolworths-agile.atlassian.net/browse/${testId}
  // @version      ${testId}_variant_${variantNumber}
  // @description  {{description}}
  // @author       Wilson
  // @match        {{url_match}}
  // @require      file://C:/Users/1442718/Development/overrides/${testId}/Variant-${variantNumber}/main.js
  // ==/UserScript==

  document.documentElement.dataset.webAb${testNumber} = "${variantNumber}";
  `;

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
      fs.writeFileSync(`${folderName}/main.js`, content);
    }
  } catch (err) {
    console.error(err);
  }
});

console.log("***** OPERATION COMPLETE *******");
