const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        index: resolve("src/main.js")
    },
    output: {
        path: resolve('dist'),
        filename:'[name].[hash].js'
    },
    module:{
        rules:[
            {test:/\.vue$/,use:'vue-loader'},
            {
                test:/\.css$/,
                use:['vue-style-loader','css-loader']
            },
            {test: /\.(png|jpg|jpeg|gif|svg)/,use:'url-loader'},
            {
                test: /\.m?js$/,
                exclude: /(node_module)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin('dist'),
        new HtmlWebackPlugin({
            template: resolve("index.html")
        })
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.resolve(__dirname, 'src')
        }
    }
}