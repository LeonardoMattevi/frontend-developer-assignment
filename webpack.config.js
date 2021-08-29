const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './js/components/carousel.js',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'carousel.min.js', // `-${Date.now()}.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'script-loader',
        },
      },
    ],
  },
};
