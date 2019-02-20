const merge =  require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const path = require('path')
module.exports = merge(baseConfig,{
    mode: 'production',
    plugins: []
})