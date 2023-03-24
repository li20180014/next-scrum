/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  printWidth: 80,
}
