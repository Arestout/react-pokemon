const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const getFileName = (ext = '[ext]', name = '[name]') => {
  return isDev ? `${name}.${ext}` : `${name}.[contenthash].${ext}`;
};

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      reduxApp: path.resolve(__dirname, 'src/redux'),
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      config: path.resolve(__dirname, 'src/config'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './index.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'dist/css'),
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|ts)x?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: !isDev,
        removeAttributeQuotes: !isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${getFileName('css')}`,
      chunkFilename: getFileName('css', '[id]'),
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
  ],
};
