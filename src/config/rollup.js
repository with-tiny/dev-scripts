import shebang from 'rollup-plugin-preserve-shebang'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync(process.cwd() + '/package.json'))

function onwarn(message) {
  if (message.code === 'EMPTY_BUNDLE') return
  console.error(message)
}

export const defaultConfig = {
  entries: {
    index: 'src/index.js',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [shebang(), resolve({ preferBuiltins: true }), json(), commonjs()],
  onwarn,
  outputs: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: 'inline',
      entryFileNames: '[name].mjs',
      exports: 'named',
    },
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: 'inline',
      entryFileNames: '[name].cjs',
      exports: 'named',
    },
  ],
  run: config =>
    config.outputs.map(out => ({
      input: config.entries,
      output: out,
      external: config.external,
      plugins: config.plugins,
      onwarn: config.onwarn,
    })),
}

export default async () => defaultConfig.run(defaultConfig)
