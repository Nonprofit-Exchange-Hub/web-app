module.exports = {
  extends: ['eslint:recommended', 'react-app'],
  ignorePatterns: ['/build/**/*'],
  rules: {
    semi: ['error', 'always'],
    eqeqeq: ['error', 'always'],
  },
};
