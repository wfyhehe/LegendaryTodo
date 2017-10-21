const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize:true}),
    // new webpack.optimize.CommonsChunkPlugin('common'),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html'
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),
    // 分离CSS和JS文件
    new ExtractTextPlugin('/css/[name].[chunkhash:8].css'),
  ],
  entry:{
    app: path.resolve(__dirname, 'app/index.jsx'),
    // 将 第三方依赖（node_modules中的） 单独打包
    vendor: [
      'react',
      'react-dom',
      'react-mobx',
      'react-router',
      'mobx',
      'es6-promise',
      'whatwg-fetch',
      'immutable'
    ]
  },
  output:{
    path: __dirname + "/build",
    filename: "[name].[chunkhash:8].js"
    // publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.less/, use: ['style-loader','css-loader','less-loader']},
      { test: /\.css$/, use: ['style-loader','css-loader'] },
      { test: /\.(png|jpg|jpeg)$/, use: ['url-loader']},
      {test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss','.less','jsonp']
  }
}
