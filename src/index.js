#!/usr/bin/env node

import spawn from 'cross-spawn'

const execCmd = {
  rimraf: 'rimraf dist',
  rollup: `rollup --config ${process.cwd()}/rollup.config.js`,
  eslint: 'eslint --ignore-path .gitignore --ext .js,.jsx,.ts,.tsx .',
  prettier: 'prettier --ignore-path .gitignore **/*.+(js|json|jsx|ts|tsx)',
}

const cmd = {
  build: `${execCmd.rimraf} && ${execCmd.rollup}`,
  lint: execCmd.eslint,
  format: `${execCmd.prettier} --write`,
  'check-format': `${execCmd.prettier} --list-different`,
  // check-types: "tsc --project ./dist/config/tsconfig.js",
  // lint-staged: "lint-staged",
  // validate: "npm-run-all --parallel check-types check-format lint build",
  // pre-commit: "npm run check-types && npm run lint-staged && npm run build", + test?
  // prepublishOnly: "npm run validate", o como se llame + test?
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
} else {
  console.log(`Unknown command ${command}`)
}
