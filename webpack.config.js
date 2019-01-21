let path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './index.ts',
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, './dist'),
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
        options: {
          transpileOnly: true // disable type checker - use the plugin
        }
      }

    }, {
      test: /\.worker\.(j|t)s$/,
      use: {
        loader: 'worker-loader',
        options: {
          inline: true
        }
      }
    }]
  },
  plugins: [
    new CircularDependencyPlugin(),
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
      measureCompilationTime: true
    })
  ]
};
