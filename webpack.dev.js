const Path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './index.ts',
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: Path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
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
        options: {
          transpileOnly: true // disable type checker - use the plugin
        }
      }
    }]
  },
  plugins: [
    new CircularDependencyPlugin(),
    new ForkTsCheckerWebpackPlugin({
      measureCompilationTime: true
    })
  ]
};
