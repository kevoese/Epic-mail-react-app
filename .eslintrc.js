module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier', 'plugin:react/recommended'],
  plugins: ['prettier'],
  env: {
    node: true,
    es6: true,
    mocha: true,
    browser: true,
  },
  settings: {
    'import/ignore': ['.scss', '.css'],
  },
  rules: {
    'react/prop-types': 0,
    'class-methods-use-this': 0,
    'require-jsdoc': 0,
    'one-var': 0,
    'linebreak-style': 0,
    'one-var-declaration-per-line': 0,
    'new-cap': 0,
    indent: ['error', 2],
    'consistent-return': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    curly: ['error', 'multi-line'],
    'import/no-unresolved': 0,
    'no-shadow': ['error', { allow: ['req', 'res', 'err'] }],
    'valid-jsdoc': [
      'error',
      {
        requireReturn: false,
        requireReturnType: false,
        requireParamDescription: false,
        requireReturnDescription: false,
      },
    ],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: false,
          MethodDefinition: false,
          ClassDeclaration: false,
        },
      },
    ],
  },
};
