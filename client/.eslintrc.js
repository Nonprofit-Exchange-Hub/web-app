module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['/build/**/*'],
  rules: {
    semi: ['error', 'always'],
    eqeqeq: ['error', 'always'],
  },
  globals: {
    React: true,
    JSX: true,
  },
};
