// https://docs.expo.dev/guides/using-eslint/

const { defineConfig } = require('eslint/config');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const expoConfig = require('eslint-config-universe/flat/native.js');

module.exports = defineConfig([
  expoConfig,
  eslintConfigPrettier,
  {
    ignores: ['dist/*'],
  },
]);
