const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/server',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  'module': {
    'rules': [
      {
        'test': /\.js$/,
        'use': {
          loader: 'babel-loader',
        }, 
        'exclude': [/node_modules/,nodeModulesPath]
      }
    ]
  },
  externals: [ nodeExternals() ],
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['yarn run:dev']
    })
  ],
  'resolve': {
    'extensions': ['.js', '.jsx'],
  },
  watch: NODE_ENV === 'development'
};