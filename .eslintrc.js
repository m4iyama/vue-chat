module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
  ],
  rules: {
    'semi': [2, 'always'],
    'comma-dangle': [2, 'always-multiline'],
    'quotes': [2, 'single']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}