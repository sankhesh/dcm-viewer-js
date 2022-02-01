const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const entry = path.join(__dirname, 'src', 'index.js');
const html = path.join(__dirname, 'src', 'index.html');
const style = path.join(__dirname, 'src', 'style.css');
const nodeModules = path.join(__dirname, 'node_modules');
const dist = path.join(__dirname, 'dist');

module.exports = {
  entry,
  output: {
    path: dist,
    filename: 'index.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: html,
          to: dist,
        },
        {
          from: style,
          to: dist,
        },
      ],
    }),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    static: {
      directory: dist,
    },
    hot: false,
  },
};
