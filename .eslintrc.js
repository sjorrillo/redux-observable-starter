module.exports = {
  extends: ['universe/node', 'universe/native'],
  plugins: [
    'react-hooks',
  ],
  rules: {
    camelcase: [2, {
      allow: [] // add alowed variables
    }],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-bitwise': 0,
    'no-unused-vars': [2, { vars: 'all', args: 'after-used', varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'prefer-template': 2,
    'prefer-rest-params': 2,
    'quotes': [2, 'single', 'avoid-escape'],
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react/prefer-stateless-function': 0,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/jsx-closing-bracket-location': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  },
  globals: {
    document: true,
  },
};