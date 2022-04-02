import { defaultConfig } from './src/config/rollup.mjs'

const rollupConfig = {
  ...defaultConfig,
  entries: {
    index: "src/index.js",
    "config/rollup": "src/config/rollup.mjs"
  }
}

export default () => defaultConfig.run(rollupConfig)
