const Path = require('path');

module.exports = {
  context: Path.resolve(__dirname),
  entry: './index.ts',
  mode: 'production',
  output: {
    path: Path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
      }
    }]
  }
};
