#!/usr/bin/env node

import { input } from '@inquirer/prompts';
import fs from 'node:fs';

const testId = await input({ message: 'Enter experiment id (e.g. AB-123)' });
const numberOfVariants = await input({ message: 'Enter number of variants (not including Control)' });
const variants = parseInt(numberOfVariants);

const MAX_ALLOWABLE_VARIANTS = 10;

if (!variants || variants > MAX_ALLOWABLE_VARIANTS) {
  throw new Error('Invalid number of variants');
}
console.log("🚀 ~ variants:", variants)

console.log('***** GENERATING FILES *******');

const variantArray = [...Array(variants + 1).keys()]
console.log("🚀 ~ variantArray:", variantArray)

variantArray.forEach((variant, index) => {
// TODO - validation for AB test name (starts with AB)
  // const variantNumber = index - 1;
  const folderName = `${testId.trim()}/Variant-${variant}`;

  console.log("🚀 ~ numberOfVariants.forEach ~ folderName:", folderName)
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
})
