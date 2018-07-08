module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'plugin:prettier/essential',
    '@vue/prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}