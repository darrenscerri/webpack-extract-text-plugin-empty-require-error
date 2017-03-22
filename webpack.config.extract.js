const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './bundle.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.execute.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  }
};

module.exports = config;
