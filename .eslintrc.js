module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    webextensions: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
};
