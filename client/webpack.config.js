/* eslint-disable no-undef */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'source-map',
  plugins: [
    // autoprefixer 是 postcss-loader 的 插件，需要在这里进行 autoprefixer 插件的配置
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        minimize: true,
        postcss: [autoprefixer({browsers: ['last 2 versions']})]
      }
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000'
    }),
    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ],
  entry: {
    main: path.resolve(__dirname, './app/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, use: ['url-loader']},
      {test: /\.(png|gif|jpg|jpeg|bmp)$/i, use: ['url-loader']},
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.less', 'jsonp']
  },
  devServer: {
    progress: true,
    hot: true,
    inline: true,
    port: 3000
  }
}
