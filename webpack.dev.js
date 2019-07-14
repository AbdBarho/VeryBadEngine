const Path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: './index.ts',
  devtool: 'source-map',
  mode: 'development',
  watch: true,
  output: {
    path: Path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  stats: {
    colors: true,
    modules: true,
    reasons: false,
    errorDetails: true
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{
      test: /\.worker\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'worker-loader',
        options: {
          inline: true,
          fallback: false
        }
      }

    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: 'ts-loader'
    }, ]
  },
  plugins: [
    new CircularDependencyPlugin()
  ]
};
