const Path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './index.ts',
  devtool: 'eval',
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
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      }
    ]
  },
  plugins: [
    new CircularDependencyPlugin(),
    new ForkTsCheckerWebpackPlugin({
      measureCompilationTime: true
    })
  ]
};
