module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['/build/**/*'],
  rules: {
    semi: ['error', 'always'],
    eqeqeq: ['error', 'always'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
  globals: {
    React: true,
    JSX: true,
  },
};
