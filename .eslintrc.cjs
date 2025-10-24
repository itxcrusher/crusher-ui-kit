/* eslint config for web components + lit */
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:wc/recommended',
    'plugin:lit/recommended',
  ],
  plugins: ['wc', 'lit'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: ['dist/**', 'node_modules/**'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-constant-binary-expression': 'off',
    'wc/guard-super-call': 'off', // Lit 3 patterns
  },
};
