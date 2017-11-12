module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  rules: {
    'max-len': [2, 80, 2, {
      'ignoreComments': true,
      'ignoreUrls': true
    }]
  }
};
