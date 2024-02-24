/** @type {import("stylelint").Config} */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    // 素の CSS 向けのルールで、それ以外では独自構文と相性が悪く非推奨なのでオフにする
    'media-query-no-invalid': null,
  },
};
