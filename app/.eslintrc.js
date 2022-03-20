module.exports = {
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['simple-import-sort'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    eqeqeq: 'error',
    'import/order': 'off',
    'import/no-cycle': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'no-console': 'warn',
    'prettier/prettier': 'warn',
    'sort-imports': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {},
    },
  ],
};
