// https://docs.expo.dev/guides/using-eslint/

const { defineConfig } = require('eslint/config');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const expoConfig = require('eslint-config-universe/flat/native.js');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
]);
