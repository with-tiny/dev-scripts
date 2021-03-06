export default {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'eslint-config-prettier'],
  rules: {
    strict: ['error', 'never'],
  },
  globals: {
    describe: 'writable',
    test: 'writable',
    expect: 'writable',
    beforeEach: 'writable',
    afterEach: 'writable',
    beforeAll: 'writable',
    afterAll: 'writable',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
}
