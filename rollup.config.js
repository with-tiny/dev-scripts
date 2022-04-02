import { defaultConfig } from './src/config/rollup.js'

const rollupConfig = {
  ...defaultConfig,
  entries: {
    index: 'src/index.js',
    'config/rollup': 'src/config/rollup.js',
    'config/eslint': 'src/config/eslintrc.js',
    'config/prettier': 'src/config/prettierrc.js',
  },
}

export default () => defaultConfig.run(rollupConfig)
