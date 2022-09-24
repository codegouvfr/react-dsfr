<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i> React implementation of the <a href="https://www.systeme-de-design.gouv.fr/">DSFR</a> </i>
    <br>
    <br>
    <a href="https://github.com/codegouvfr/dsfr-react/actions">
      <img src="https://github.com/codegouvfr/dsfr-react/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://www.npmjs.com/package/dsfr-react">
      <img src="https://img.shields.io/npm/dm/dsfr-react">
    </a>
    <a href="https://github.com/codegouvfr/dsfr-react/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/dsfr-react">
    </a>
</p>
<p align="center">
  <a href="https://etalab-2.gitbook.io/dsfr-react/">Documentation</a>
</p>

# Development

```bash
yarn
yarn build
npx tsc -w
npx tsc -p src/bin -w & npx tsc -p src -w

# Open another Terminal

yarn start_cra  # For testing in in a Create React App setup
yarn start_next # For testing in a Next.js setup
```

## How to publish a new version on NPM, how to release a beta version

This repo was bootstrapped form [garronej/ts-ci](https://github.com/garronej/ts-ci) have a look at the
documentation of this starter for understanding the lifecycle of this repo.
