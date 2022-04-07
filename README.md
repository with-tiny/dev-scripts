<div align="center">
  <h1>tiny-dev-scripts 🤏🛠️</h1>
  <p>Tiny development scripts for small projects</p>
  <hr />
  <p>
    <img src='https://img.shields.io/npm/v/@tiny-apps/dev-scripts.svg?style=flat-square' alt='version-badge'>
    <img src='https://img.shields.io/npm/l/@tiny-apps/dev-scripts.svg?style=flat-square' alt='license-badge'>
  </p>
</div>

## Installation

Go to the root of your project and run:

```
npm install -D @tiny-apps/dev-scripts
```

## Usage

Set package.json scripts to tiny-dev-scripts. These options are available

```json
  {
    "scripts": {
      "build": "tiny-dev-scripts build",
      "lint": "tiny-dev-scripts lint",
      "format": "tiny-dev-scripts format",
      "check-format": "tiny-dev-scripts check-format",
      ...moreComingSoon
    }
  }
```

And just run them

```
npm run build
OR
npm run lint
etc...
```

## Scripts

### Build

Powered by RollUp.  
You will need a rollup.config.js file in your project root. It should look like this:

```js
import config from './node_modules/@tiny-apps/dev-scripts/dist/config/rollup.mjs'
export default config
```

If you want to extend default configuration, you can do it overrinding defaultConfig. Here is an example:

```js
import { defaultConfig, runConfig } from './node_modules/@tiny-apps/dev-scripts/dist/config/rollup.mjs'

const rollupConfig = {
  ...defaultConfig,
  entries: {
    index: 'src/index.js',
    runner: 'src/runner.js',
  },
}

export default () => runConfig(rollupConfig)
```

Available options:
- entries
- external
- plugins
- onwarn
- outputs

### Lint

Powered by ESLint.  
You will need a .eslintrc.cjs file in your project root. It should look like this:

```js
module.exports = require('./node_modules/@tiny-apps/dev-scripts/dist/config/eslint.cjs').default
```

If you want to extend default configuration, you can override it in the ESLint way.

### Format & Check-Format

Powered by Prettier.  
You will need a .prettierrc.cjs file in your project root. It should look like this:

```js
module.exports = require('./node_modules/@tiny-apps/dev-scripts/dist/config/prettier.cjs').default
```

If you want to extend default configuration, you can override it in the Prettier way.

## Features

✅ Build. with Rollup  
✅ Lint. with ESLint  
✅ Format. with Prettier  
✅ Check-Format. with Prettier  
🔲 Lint-Staged. Lint && Format. with Lint-Staged  
🔲 Test. with Tiny-Testing-Library  
🔲 Test-Watch. with Tiny-Testing-Library  
🔲 Validate. Check-Format && Lint && Test && Build. with Npm-Run-All  
🔲 Pre-Commit. Lint-Staged && Build. with Pre-Commit  
🔲 Pre-Publish. Validate
