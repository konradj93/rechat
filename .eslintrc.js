const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  extends: ['airbnb-typescript', 'react-app', 'prettier'],
  plugins: ['prettier', "import"],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
};
