#!/usr/bin/env node

import spawn from 'cross-spawn'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync(process.cwd() + '/package.json'))
const deps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]
const rollupPath = deps.includes('@tiny-apps/dev-scripts') ? 'node_modules/@tiny-apps/dev-scripts/dist/config/rollup.js' : 'src/config/rollup.mjs'

const cmd = {
  build: `rimraf dist && rollup -c ${rollupPath}`,
  // lint: "eslint --config ./dist/config/eslint.js --ignore-path .gitignore --ext .js,.jsx,.ts,.tsx .",
  // checktypes: "tsc --project ./dist/config/tsconfig.js",
  // prettier: "prettier --config ./dist/config/prettier.js --ignore-path .gitignore **/*.+(js|json|jsx|ts|tsx)",
  // format: "npm run exec -- prettier --write",
  // checkformat: "npm run exec -- prettier --list-different",
  // lintstaged: "lint-staged",
  // validate: "npm-run-all --parallel checktypes checkformat lint build",
  // precommit: "npm run checktypes && npm run lintstaged && npm run build",
  // test: "tiny-testing-library"
}

const launchCommand = (cmd, args) => {
  const result = spawn.sync(cmd, args, { stdio: 'inherit' })
  if (result.signal) return 1
  return result.status
}

let command = process.argv.slice(2)[0]
if (Object.keys(cmd).includes(command)) {
  const commands = cmd[command].split('&&')

  let child
  for (let i = 0; i < commands.length; i++) {
    child = launchCommand('npx', commands[i].trim().split(' '))

    if (child !== 0) process.exit(child)
  }
  process.exit(child)
}
else {
  console.log(`Unknown command ${command}`)
}

// build
// lint
// checkformat (no me lanza prettier con los argunmentos que le paso -list-different-)
// format (no me lanza prettier con los argunmentos que le paso -write-)
// checktypes
// lintstaged
// validate
// precommit
// test
