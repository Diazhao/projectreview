/**
 * 公共配置
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    devtool: 'eval-source-map',

    devServer: {
        contentBase: path.join(__dirname, '../public/'),
        port: 8000,
        hot: true,
        compress: true,
        open: true,
        inline: true,
        proxy: {
            '/': 'http://127.0.0.1:3000/'
        }
    },

    // 入口
    entry: {
        main: './src/index',
        vendors: ['react']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../public'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    // 加载器
    module: {
        // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    sourceMap: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('babel-loader'),
                options: {
                  cacheDirectory: true
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images/'
                }
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': resolve('src')
        }
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.VERSION': `'${pkg.version}'`
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.bundle.js' }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../public/index.html'),
            template: path.join(__dirname, '../public/index.html')
        }),
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
