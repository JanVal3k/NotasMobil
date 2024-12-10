const { rules } = require('eslint-config-prettier');

// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', '@expo/eslint-plugin'],
  rules: {
    'prettier/prettier': 'error',
    'no-trailing-spaces': 'off',
  },
  ignorePatterns: ['/dist/*'],
};
