const path = require('path');

const config = {
  entry: './bundle.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  }
};

module.exports = config;
