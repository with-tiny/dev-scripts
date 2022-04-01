import shebang from 'rollup-plugin-preserve-shebang'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync(process.cwd() + '/package.json'))

function onwarn(message) {
  if (message.code === 'EMPTY_BUNDLE')
    return
  console.error(message)
}

export default async () => {
  let tinyConf
  try {
    const tiny = await import(process.cwd() + '/.tiny.config.js');
    tinyConf = tiny?.default?.rollup
  }
  catch {}
  
  const config = {
    entries: tinyConf?.entries ?? {
      index: 'src/index.js',
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      ...tinyConf?.external || []
    ],
    plugins: [
      shebang(),
      resolve({ preferBuiltins: true }),
      json(),
      commonjs(),
      ...tinyConf?.plugins || []
    ]
  }

  return [
    {
      input: config.entries,
      output: {
        dir: 'dist',
        format: 'esm',
        sourcemap: 'inline',
        entryFileNames: '[name].js',
        exports: 'auto'
      },
      external: config.external,
      plugins: config.plugins,
      onwarn
    },
    {
      input: config.entries,
      output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: 'inline',
        entryFileNames: '[name].cjs',
        exports: 'auto'
      },
      external: config.external,
      plugins: config.plugins,
      onwarn
    },
  ]
}