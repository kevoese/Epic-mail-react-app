module.exports = {
  extends: ['airbnb-base', 'plugin:react/recommended'],
  env: {
    es6: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'one-var': 0,
    'linebreak-style': 0,
    'one-var-declaration-per-line': 0,
    'new-cap': 0,
    indent: ['error', 2],
    'consistent-return': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    curly: ['error', 'multi-line'],
    'import/no-unresolved': [2, { commonjs: true }],
    'no-shadow': ['error', { allow: ['req', 'res', 'err'] }],
    'valid-jsdoc': [
      'error',
      {
        requireReturn: true,
        requireReturnType: true,
        requireParamDescription: false,
        requireReturnDescription: true,
      },
    ],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
  },
};
