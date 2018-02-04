import babel from 'rollup-plugin-babel';

export default {
  input: `${__dirname}/src/index.js`,
  output: {
    name: 'CreditCardInput',
    file: `${__dirname}/lib/index.js`,
    format: 'umd',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      payment: 'payment',
      'credit-card-type': 'creditCardType',
      'styled-components': 'styled'
    }
  },
  external: [
    'react',
    'react-dom',
    'credit-card-type',
    'payment',
    'styled-components',
    'prop-types'
  ],
  plugins: [
    babel({
      presets: [['env', { modules: false }], 'react'],
      plugins: [
        'external-helpers',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    })
  ]
};
