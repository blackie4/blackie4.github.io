var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: '../', // 打包后输出的目录
    publicPath: './', // 打包后资源文件的前缀
    filename: '[name].js',
    chunkFilename: "[id].chunk.js?[hash:8]"
  },
  plugins: [
    // 单独打包CSS
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    // Html文件处理
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        hash: true
    })
  ],
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extensions: ['', '.js', '.vue', '.less'],
    // 别名
    alias: {
      vue: 'vue/dist/vue.js', //webpack打包时，需要设置别名
      components: path.join(__dirname, './src/components'),
      routes: path.join(__dirname, './src/routes'),
      config: path.join(__dirname, './src/config'),
      store: path.join(__dirname, './src/store'),
      server: path.join(__dirname, './src/server'),
      router: path.join(__dirname, './src/router'),
      views: path.join(__dirname, './src/views')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  // 处理不同后缀的文件
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
    }, {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
    }, {
        test: /\.css$/,
        // loader: 'vue-style-loader!css-loader'
        loader: ExtractTextPlugin.extract("vue-style-loader", "css-loader")
    }, {
        test: /\.less$/,
        // loader: 'vue-style-loader!css-loader!less-loader'
        loader: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!less-loader')
    }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
            name: '[path][name].[ext]?[hash:8]',
            limit: 8192 // inline base64 URLs for 