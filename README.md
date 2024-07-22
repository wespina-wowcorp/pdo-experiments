# Workflow

1. Open TamperMonkey, create new script
2. Create test folder and main `js` file e.g.: `C:\Users\1442718\Development\overrides\AB-164\Variant 2\main.js`
3. Add this comment and fill in details:

```js
// ==UserScript==
// @name         AB-{{test number}}: Variant 1
// @namespace    http://tampermonkey.net/
// @version      AB-{{test number}}_variant_2
// @description  {{description of the test}}
// @author       Wilson
// @match        https://www.woolworths.co.nz/*
// @require      file://{{file path}} - EXAMPLE: file://C:\Users\1442718\Development\overrides\AB-164\Variant 2\main.js
// ==/UserScript==
```

4. Add the same script to `main.js` file and add custom JS below comment.

## How to

### Add CSS to tampermonkey script

1. Add `@grant` to comment

```js
// @grant       GM_addStyle
```

2. Add styles within a string argument to the `GM_addStyle` function:

```js
GM_addStyle(`
  body {
    background-color: pink;
  }
`);
```
