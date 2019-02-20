const merge =  require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const path = require('path')
module.exports = merge(baseConfig,{
    mode: 'development',
    devtool: 'eval-source-map', // 指定加source-map的方式
    devServer: {
      hot:true,//热加载
      contentBase: path.join(__dirname, "..", "dist"), //静态文件根目录
      port: 3824, // 端口
      host: 'localhost'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //HMR
        new webpack.NamedModulesPlugin() // HMR
    ]
})