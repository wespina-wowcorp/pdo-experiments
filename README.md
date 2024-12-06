# Product Discovery and Optimisation Optimizely Experiments

This repo is a collection of custom JS and CSS used within the Product Discovery and Optimisation (PDO) team's Web Experiments within [Optimizely](https://www.optimizely.com/).

The PDO team have a [Confluence page](https://woolworths-agile.atlassian.net/wiki/spaces/DAOPC/pages/32435375110/Product+Discovery+and+Optimisation) with details about the scope of works and how Optimizely experiments are used and built.


## Workflow

1. Generate a new experiment:
```bash
npm run generate
```
2. Add the following when prompted:
  - Experiment id: e.g.`AB-010`
  - Number of variants (not including Control):  e.g. `2`
  - Test description: e.g.: `Homepage new ad banner`
  - URL for the experiment: e.g. `https://www.woolworths.co.nz/`
  - Any more URLs? e.g. `n`

## How To's

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
